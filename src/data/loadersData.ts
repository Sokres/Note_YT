import qs from "qs";
import axios from "axios";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

const baseUrl = getStrapiURL();
//сам запрос для фукнций
async function fetchData(url: string) {
  const authToken = null;
  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken ? `Bearer ${authToken}` : undefined,
  };

  try {
    const response = await axios.get(url, { headers });
    return flattenAttributes(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
//Фнукция получения данных для домашней страницы, с пмомщбю qs преобразуем структуру в запрос
export async function getHomePageData() {
  noStore();
  const url = new URL("/api/home-page", baseUrl);
  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          advantages: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        },
      },
    },
  });

  return await fetchData(url.href);
}
//фукция получения данных для всего остального
export async function getGlobalPageData() {
  noStore();
  const url = new URL("/api/global", baseUrl);
  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });
  return fetchData(url.href);
}
export async function getGlobalPageMetadata() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    fields: ["title", "description"],
  });

  return await fetchData(url.href);
}
