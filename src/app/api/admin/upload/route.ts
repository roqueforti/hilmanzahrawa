import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split('.').pop() || 'png';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    if (isSupabaseConfigured) {
      // Upload to Supabase Storage bucket 'portfolio'
      const { data, error } = await supabaseAdmin.storage
        .from('portfolio')
        .upload(fileName, fileBuffer, {
          contentType: file.type || 'image/png',
          upsert: true
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        throw error;
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('portfolio')
        .getPublicUrl(fileName);

      return NextResponse.json({
        success: true,
        url: publicUrlData.publicUrl,
        fileName
      });
    }

    // Fallback if Supabase credentials are not configured yet: return inline Base64 data URL
    const mimeType = file.type || 'image/png';
    const base64 = fileBuffer.toString('base64');
    const dataUri = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUri,
      fileName,
      notice: 'Supabase storage is not configured yet. Uploaded as inline data URL for local testing.'
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to upload media file'
    }, { status: 500 });
  }
}
