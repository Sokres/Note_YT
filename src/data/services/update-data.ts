import axios from "axios";
import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

export async function upadteData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("Token не наеден");

  try {
    const { data } = await axios(url.href, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: { ...payload },
    });
    return data;
  } catch (err) {
    console.log("Ошш", err);
    if (axios.isAxiosError(err)) {
      return {
        error: err.response?.data || { message: err.message },
      };
    } else {
      return {
        error: { message: String(err) },
      };
    }
    throw err;
  }
}
