"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  loginUserService,
  registerUserService,
} from "../services/auth-services";
//НАстройка для храннения chokes
const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
//схема для отображнея сообщений в форме https://zod.dev/
const schemaReg = z.object({
  username: z
    .string()
    .min(3, { message: "Ваше имя должно быть от 3 до 20 символов" })
    .max(20, {
      message: "Ваше имя должно быть от 3 до 20 символов",
    }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" })
    .max(100, {
      message: "Пароль должен содержать максимум 100 символов",
    }),
  email: z.string().email({
    message: "Введите корректный email",
  }),
});
const schemaAutarisation = z.object({
  identifier: z.string().email({
    message: "Введите корректный email",
  }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" })
    .max(100, {
      message: "Пароль должен содержать максимум 100 символов",
    }),
});
//action для регистрации
export const regUserAction = async (prevState: any, formData: FormData) => {
  const variables = schemaReg.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });
  if (!variables.success) {
    return {
      ...prevState,
      zodError: variables.error.flatten().fieldErrors,
      message: "Ошибка",
    };
  }
  const responseData = await registerUserService(variables.data);
  if (!responseData) {
    return {
      ...prevState,
      zodError: null,
      strapiError: null,
      message: "Ошибка",
    };
  }
  if (responseData.error) {
    return {
      ...prevState,
      strapiError: responseData.error,
      zodError: null,
      message: "Ошибка Strapi",
    };
  }
  cookies().set("jwt", responseData.jwt, config);
  redirect("/board");
};

export const authUserAction = async (prevState: any, formData: FormData) => {
  const variables = schemaAutarisation.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });
  if (!variables.success) {
    return {
      ...prevState,
      zodError: variables.error.flatten().fieldErrors,
      message: "Отсутствуют поля. Не удалось войти в систему.",
    };
  }
  const responsDate = await loginUserService(variables.data);
  if (!responsDate) {
    return {
      zodError: null,
      strapiError: null,
      message: "Ошибка",
    };
  }
  if (responsDate.error) {
    return {
      ...prevState,
      strapiError: responsDate.error.error,
      zodError: null,
      message: "Ошибка Strapi",
    };
  }
  cookies().set("jwt", responsDate.jwt, config);
  redirect("/board");
};
export const LogoutAction = async () => {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
};
