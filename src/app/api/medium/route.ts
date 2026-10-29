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
      try {
        const url = cleanUsername.includes('http') ? new URL(cleanUsername) : new URL(`https://${cleanUsername}`);
        feedUrl = `https://${url.host}/feed`;
      } catch {
        feedUrl = `https://${cleanUsername.replace(/^@/, "")}.medium.com/feed`;
      }
    } else {
      const formattedUsername = cleanUsername.startsWith('@') ? cleanUsername : `@${cleanUsername}`;
      feedUrl = `https://medium.com/feed/${formattedUsername}`;
    }

    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)'
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      console.error(`Medium Feed Fetch Failed: ${response.status}`);
      return NextResponse.json({ error: "Failed to fetch Medium feed" }, { status: response.status });
    }

    const xml = await response.text();
    const items = xml.split(/<item\b[^>]*>/i).slice(1);

    const articles = items.map(item => {
      const titleMatch = item.match(/<title(?:\s+[^>]*)?>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/title>/i);
      const linkMatch = item.match(/<link(?:\s+[^>]*)?>\s*([\s\S]*?)\s*<\/link>/i);
      const pubDateMatch = item.match(/<pubDate(?:\s+[^>]*)?>\s*([\s\S]*?)\s*<\/pubDate>/i);
      
      const contentMatch = item.match(/<content:encoded(?:\s+[^>]*)?>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/content:encoded>/i);
      const content = contentMatch ? contentMatch[1] : "";
      const thumbnailMatch = content.match(/<img.*?src=["'](.*?)["']/i);

      // Extract categories
      const categories: string[] = [];
      const catRegex = /<category(?:\s+[^>]*)?>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/category>/gi;
      let m;
      while ((m = catRegex.exec(item)) !== null) {
        if (m[1] && m[1].trim()) categories.push(m[1].trim());
      }

      // Clean snippet
      const cleanSnippet = content
        .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const words = cleanSnippet.split(/\s+/).length;
      const readMinutes = Math.max(2, Math.ceil(words / 180));

      return {
        title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : "Untitled",
        link: linkMatch ? linkMatch[1].trim() : "#",
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : null,
        thumbnail: thumbnailMatch ? thumbnailMatch[1] : null,
        categories: categories.slice(0, 4),
        snippet: cleanSnippet.slice(0, 180) + (cleanSnippet.length > 180 ? '...' : ''),
        readTime: `${readMinutes} min read`
      };
    }).slice(0, 10);

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Medium API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
