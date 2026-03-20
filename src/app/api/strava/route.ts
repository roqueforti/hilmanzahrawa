import { getStravaActivities, getStravaProfile, getStravaStats, getStravaClubs } from "@/lib/strava";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [activities, profile, clubs] = await Promise.all([
      getStravaActivities().catch(() => []),
      getStravaProfile().catch(() => null),
      getStravaClubs().catch(() => [])
    ]);

    let stats = null;
    if (profile?.id) {
      try {
        stats = await getStravaStats(profile.id);
      } catch (e) {
        console.error("Stats fetch failed", e);
      }
    }

    return NextResponse.json({ 
      activities,
      profile,
      stats,
      clubs
    });
  } catch (error: any) {
    console.error("Strava API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Strava data" }, { status: 500 });
  }
}
