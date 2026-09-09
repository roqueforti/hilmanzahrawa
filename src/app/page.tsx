import { getPortfolioData } from "@/lib/supabase";
import ClientPage from "./ClientPage";

export const revalidate = 60;

export default async function Page() {
  const data = await getPortfolioData();
  return <ClientPage initialData={data} />;
}
