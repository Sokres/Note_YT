// https://docs.strapi.io/dev-docs/plugins/upload документация по работе с файлами STRAPI
import { getAuthToken } from "@/data/services/get-token";
import { flattenAttributes } from "@/lib/utils";
import { getStrapiURL } from "@/lib/utils";
import { upadteData } from "./update-data";
import axios from "axios";

export async function fileDeleteService(imageId: string) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("Не наеден токен");
  //Отправка запроса на удаленеи
  const data = await upadteData("DELETE", `/api/upload/files/${imageId}`);
  // удаление лишних данных
  const flattenedData = flattenAttributes(data);
  console.log(flattenedData);
  return flattenedData;
}

export async function fileUploadService(image: any) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("Не наеден токен");

  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);

  const formData = new FormData();
  formData.append("files", image, image.name);

  try {
    const { data } = await axios(url.href, {
      headers: { Authorization: `Bearer ${authToken}` },
      method: "POST",
      data: formData,
    });

    return data;
  } catch (err) {
    console.error("Ошибка загрузки:", err);
    if (axios.isAxiosError(err)) {
      return {
        error: err.response?.data || { message: err.message },
      };
    } else {
      return {
        error: { message: String(err) },
      };
    }
  }
}
