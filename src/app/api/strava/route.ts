import { getStravaActivities, getStravaProfile, getStravaStats, getStravaClubs } from "@/lib/strava";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [activities, profile, clubs] = await Promise.all([
      getStravaActivities(),
      getStravaProfile(),
      getStravaClubs()
    ]);

    const stats = await getStravaStats(profile.id);

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
