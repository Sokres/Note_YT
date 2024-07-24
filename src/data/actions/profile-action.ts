"use server";
import qs from "qs";
import { upadteData } from "../services/update-data";
import { flattenAttributes } from "@/lib/utils";
import { getUserMeLoader } from "../services/getUserMeLoader";
import { z } from "zod";
import { fileDeleteService, fileUploadService } from "../services/file-servis";
export const updateProfileActions = async (
  userId: string,
  preState: any,
  formData: FormData,
) => {
  // Метод для преобразования в объект
  const objFormData = Object.fromEntries(formData);
  const query = qs.stringify({ populate: "*" });
  const payload = {
    userNames: objFormData.userNames,
    userLastName: objFormData.userLastName,
    bio: objFormData.bio,
  };
  const updateProfile = await upadteData(
    "put",
    `/api/users/${userId}?${query}`,
    payload,
  );
  //Проверка как и в auth-action все по калсиике на данные
  if (!updateProfile.data) {
    return {
      ...preState,
      strapiErrors: null,
      message: "Что-то пошло не так.",
    };
  }
  // Ошибка непосредсвенно в страпи
  //   console.log(updateProfile);
  if (updateProfile.error) {
    console.log(updateProfile.error);
    return {
      ...preState,
      strapiErrors: updateProfile.error,
      // не забыть добавить отображение ошибки в ProfileForm
      message: "Оштбка в starpi.",
    };
  }
  // Фукнция СТРАПИ для удаления лишних атрибутов при ответе
  const flattenedData = flattenAttributes(updateProfile);
  // ! не забыть дать разрешеие в админке
  return {
    ...preState,
    message: "Профиль обновлен",
    data: flattenedData,
    strapiErrors: null,
  };
};

//Работа с аватаром пользователя
const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// создаем валидаци для ZOD можно подглядеть на https://stackoverflow.com/questions/72674930/zod-validator-validate-image
const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false;
      else return true;
    }, "Обновите или добавьте новое изображение")

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Доступны только .jpg, .jpeg, .png and .webp.",
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
});

export async function uploadProfileImageAction(
  imageId: string,
  prevState: any,
  formData: FormData,
) {
  // Получение пользователя
  const user = await getUserMeLoader();
  if (!user.ok) throw new Error("Вам не разрешено данное действие.");

  const userId = user.data.id;

  //Опять преобразуем в объект
  const data = Object.fromEntries(formData);
  console.log(data);
  // Делаем валидацию
  const validatedFields = imageSchema.safeParse({
    image: data.userImage,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      data: null,
      message: "Invalid Image",
    };
  }

  // Удаление предыдущего изображения
  if (imageId) {
    try {
      await fileDeleteService(imageId);
    } catch (error) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        message: "Failed to Delete Previous Image.",
      };
    }
  }

  // Загрузка нового изображнеия
  const fileUploadResponse = await fileUploadService(data.userImage);
  console.log(fileUploadResponse);
  //Стандартная работа с ошибками
  if (!fileUploadResponse) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ошибка, что-то пошло не так",
    };
  }

  if (fileUploadResponse.error) {
    return {
      ...prevState,
      strapiErrors: fileUploadResponse.error,
      zodErrors: null,
      message: "Не удалось загрузить изображение.",
    };
  }
  // посмотреть ответ
  // получаем идантификатор изображения
  const updatedImageId = fileUploadResponse[0].id;
  console.log(updatedImageId);
  const payload = { userImage: updatedImageId };

  // Обновление изображения
  const updateImageResponse = await upadteData(
    "PUT",
    `/api/users/${userId}`,
    payload,
  );
  const flattenedData = flattenAttributes(updateImageResponse);

  return {
    ...prevState,
    data: flattenedData,
    zodErrors: null,
    strapiErrors: null,
    message: "Изображение обновлено",
  };
}
