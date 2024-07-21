// import qs from "qs";
// import { flattenAttributes, getStrapiURL } from "@/lib/utils";

// const baseUrl = getStrapiURL();

// async function fetchData(url: string) {
//   const authToken = null; // we will implement this later getAuthToken() later
//   const headers = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authToken}`,
//     },
//   };

//   try {
//     const response = await fetch(url, authToken ? headers : {});
//     const data = await response.json();
//     return flattenAttributes(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // or return null;
//   }
// }
// export async function getHomePageData() {
//   const url = new URL("/api/home-page", baseUrl);

//   url.search = qs.stringify({
//     populate: {
//       blocks: {
//         populate: {
//           image: {
//             fields: ["url", "alternativeText"],
//           },
//           link: {
//             populate: true,
//           },
//           advantages: {
//             populate: {
//               image: {
//                 fields: ["url", "alternativeText"],
//               },
//             },
//           },
//         },
//       },
//     },
//   });

//   return await fetchData(url.href);
// }

import qs from "qs";
import axios from "axios";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

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

export async function getHomePageData() {
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
export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);
  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });
  // console.log("object");
  return fetchData(url.href);
}
