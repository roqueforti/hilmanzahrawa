import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    let feedUrl;
    
    // Handle different username formats: @username, username, hilmanzahrawa.medium.com, or full URL
    const cleanUsername = username.trim().replace(/\/$/, ""); // remove trailing slash
    
    if (cleanUsername.includes('.') || cleanUsername.includes('http')) {
      // It's likely a subdomain or full URL
      try {
        const url = cleanUsername.includes('http') ? new URL(cleanUsername) : new URL(`https://${cleanUsername}`);
        // For Medium subdomains, the feed is at subdomain.medium.com/feed
        feedUrl = `https://${url.host}/feed`;
      } catch (e) {
        // Fallback for weird formats
        feedUrl = `https://${cleanUsername.replace(/^@/, "")}.medium.com/feed`;
      }
    } else {
      // Standard @username format
      const formattedUsername = cleanUsername.startsWith('@') ? cleanUsername : `@${cleanUsername}`;
      feedUrl = `https://medium.com/feed/${formattedUsername}`;
    }

    console.log(`Fetching Medium feed for ${username}: ${feedUrl}`);
    
    const response = await fetch(feedUrl);
    const xml = await response.text();

    if (!response.ok) {
      console.error(`Medium Feed Fetch Failed: ${response.status}`, xml);
      return NextResponse.json({ error: "Failed to fetch Medium feed" }, { status: response.status });
    }

    // Split by <item> tag with case-insensitivity and optional attributes
    const items = xml.split(/<item\b[^>]*>/i).slice(1);
    console.log(`Found ${items.length} items in Medium feed`);

    const articles = items.map(item => {
      // Improved regex with case-insensitivity and optional spaces
      const titleMatch = item.match(/<title(?:\s+[^>]*)?>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/title>/i);
      const linkMatch = item.match(/<link(?:\s+[^>]*)?>\s*([\s\S]*?)\s*<\/link>/i);
      const pubDateMatch = item.match(/<pubDate(?:\s+[^>]*)?>\s*([\s\S]*?)\s*<\/pubDate>/i);
      
      const contentMatch = item.match(/<content:encoded(?:\s+[^>]*)?>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/content:encoded>/i);
      const content = contentMatch ? contentMatch[1] : "";
      const thumbnailMatch = content.match(/<img.*?src=["'](.*?)["']/i);

      return {
        title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : "Untitled",
        link: linkMatch ? linkMatch[1].trim() : "#",
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : null,
        thumbnail: thumbnailMatch ? thumbnailMatch[1] : null
      };
    }).slice(0, 6);

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Medium API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
