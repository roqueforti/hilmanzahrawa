const client_id = process.env.STRAVA_CLIENT_ID;
const client_secret = process.env.STRAVA_CLIENT_SECRET;
const refresh_token = process.env.STRAVA_REFRESH_TOKEN;

const TOKEN_ENDPOINT = `https://www.strava.com/oauth/token`;
const ACTIVITIES_ENDPOINT = `https://www.strava.com/api/v3/athlete/activities`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: client_id!,
      client_secret: client_secret!,
      refresh_token: refresh_token!,
      grant_type: 'refresh_token',
    }),
  });

  return response.json();
};

export const getStravaActivities = async () => {
  const { access_token } = await getAccessToken();

  // Filter from November 1st, 2025 (Epoch: 1730419200)
  const after = 1730419200;
  
  const response = await fetch(`${ACTIVITIES_ENDPOINT}?after=${after}&per_page=100`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const activities = await response.json();

  // Fetch details for the latest 12 activities to get photos (limit 12 to respect API usage)
  const detailedActivities = await Promise.all(
    activities.slice(0, 12).map(async (activity: any) => {
      if (activity.total_photo_count > 0) {
        try {
          const detailResponse = await fetch(`https://www.strava.com/api/v3/activities/${activity.id}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          const detail = await detailResponse.json();
          return { 
            ...activity, 
            primary_photo: detail.photos?.primary?.urls?.['600'] || detail.photos?.primary?.urls?.['base'] 
          };
        } catch (e) {
          return activity;
        }
      }
      return activity;
    })
  );

  return [...detailedActivities, ...activities.slice(12)];
};
export const getStravaProfile = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://www.strava.com/api/v3/athlete`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.json();
};

export const getStravaStats = async (athleteId: number) => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.json();
};

export const getStravaClubs = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(`https://www.strava.com/api/v3/athlete/clubs`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.json();
};
