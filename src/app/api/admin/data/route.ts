import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured, fallbackPortfolioData } from '@/lib/supabase';

// GET all data for the CMS dashboard
export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      isConfigured: false,
      data: fallbackPortfolioData,
      message: 'Supabase credentials are not configured in .env.local. Using fallback portfolio data.'
    });
  }

  try {
    const [
      { data: projects },
      { data: bioList },
      { data: experiences },
      { data: education },
      { data: honors },
      { data: certificates },
      { data: organizations },
      { data: landingPageList },
    ] = await Promise.all([
      supabaseAdmin.from('projects').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('bio').select('*').limit(1),
      supabaseAdmin.from('experiences').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('education').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('honors').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('certificates').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('organizations').select('*').order('sort_order', { ascending: true }),
      supabaseAdmin.from('landing_page').select('*').limit(1),
    ]);

    return NextResponse.json({
      isConfigured: true,
      data: {
        projects: projects || [],
        bio: bioList?.[0] || fallbackPortfolioData.bio,
        experiences: experiences || [],
        education: education || [],
        honors: honors || [],
        certificates: certificates || [],
        organizations: organizations || [],
        landingPage: landingPageList?.[0] || fallbackPortfolioData.landingPage
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      isConfigured: true,
      error: error.message,
      data: fallbackPortfolioData
    }, { status: 500 });
  }
}

// POST: Create or Update an item in a specific table
export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: false,
      error: 'Supabase credentials are not configured in .env.local yet. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to save changes to the database.'
    }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { table, item } = body;

    if (!table || !item) {
      return NextResponse.json({ success: false, error: 'Table and item data are required' }, { status: 400 });
    }

    const validTables = ['projects', 'bio', 'experiences', 'education', 'honors', 'certificates', 'organizations', 'landing_page'];
    if (!validTables.includes(table)) {
      return NextResponse.json({ success: false, error: 'Invalid table name' }, { status: 400 });
    }

    // Single record tables (bio, landing_page)
    if (table === 'bio' || table === 'landing_page') {
      const { data: existing } = await supabaseAdmin.from(table).select('id').limit(1);
      let result;
      if (existing && existing.length > 0) {
        result = await supabaseAdmin.from(table).update({ ...item, updated_at: new Date().toISOString() }).eq('id', existing[0].id).select();
      } else {
        result = await supabaseAdmin.from(table).insert([item]).select();
      }

      if (result.error) throw result.error;
      return NextResponse.json({ success: true, item: result.data?.[0] });
    }

    // Multi-record tables (projects, experiences, etc.)
    if (item.id) {
      // Update
      const { data, error } = await supabaseAdmin
        .from(table)
        .update({ ...item, updated_at: new Date().toISOString() })
        .eq('id', item.id)
        .select();

      if (error) throw error;
      return NextResponse.json({ success: true, item: data?.[0] });
    } else {
      // Insert
      const { data, error } = await supabaseAdmin
        .from(table)
        .insert([item])
        .select();

      if (error) throw error;
      return NextResponse.json({ success: true, item: data?.[0] });
    }
  } catch (error: any) {
    console.error("Error saving data:", error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to save item' }, { status: 500 });
  }
}

// DELETE: Remove an item by id
export async function DELETE(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: false,
      error: 'Supabase credentials not configured'
    }, { status: 400 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    const id = searchParams.get('id');

    if (!table || !id) {
      return NextResponse.json({ success: false, error: 'Table and id are required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete' }, { status: 500 });
  }
}
