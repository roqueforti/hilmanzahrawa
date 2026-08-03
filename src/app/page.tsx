import { client } from "@/sanity/client";
import ClientPage from "./ClientPage";

export const revalidate = 60;

export default async function Page() {
  const query = `{
    "projects": *[_type == "project"] | order(_createdAt desc) {
      _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
      mediaType, videoUrl, layoutSize,
      "gallery": gallery[].asset->url
    },
    "bio": *[_type == "bio"] | order(_updatedAt desc)[0] {
      ...,
      "avatarUrl": avatar.asset->url,
      socialLinks[] { platform, url }
    },
    "experiences": *[_type == "experience"] | order(startDate desc) {
      _id, company, role, startDate, endDate, description, "slug": slug.current
    },
    "education": *[_type == "education"] | order(startDate desc) {
      _id, school, degree, startDate, endDate, details
    },
    "honors": *[_type == "honor"] | order(date desc) {
      _id, title, issuer, date
    },
    "certificates": *[_type == "certificate"] | order(date desc) {
      _id, title, issuer, date, "imageUrl": image.asset->url
    },
    "organizations": *[_type == "organization"] | order(startDate desc) {
      _id, role, organization, period
    },
    "landingPage": *[_type == "landingPage"][0] {
      ...,
      itProjectsOrder[]->{
        _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
        mediaType, videoUrl, layoutSize,
        "gallery": gallery[].asset->url
      },
      designProjectsOrder[]->{
        _id, title, description, tags, "slug": slug.current, image, featured, link, year, subtitle, category, role, deviceType,
        mediaType, videoUrl, layoutSize,
        "gallery": gallery[].asset->url
      }
    }
  }`;

  let data = null;
  try {
    data = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
    data = {};
  }

  return <ClientPage initialData={data} />;
}
