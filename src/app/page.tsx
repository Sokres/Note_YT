import qs from "qs";
import axios from "axios";
import { flattenAttributes } from "@/lib/utils";
import Landing from "@/components/custom/Landing";
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});
async function getDataStrapi(path: string) {
  const baseUrl = "http://localhost:1337/";
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;
  try {
    const response = await axios.get(url.href, {
      //аналог cache: 'no-store'
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    const filterData = flattenAttributes(response.data);
    console.dir(filterData, { depth: null });
    return filterData;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const starpiData = await getDataStrapi("api/home-page");

  const { title, description, blocks } = starpiData;
  return (
    <>
      <Landing data={blocks[0]} />
    </>
  );
}
