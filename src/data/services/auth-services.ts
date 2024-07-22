import { getStrapiURL } from "@/lib/utils";
import axios from "axios";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = getStrapiURL();

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", baseUrl);
  try {
    const response = await axios.post(url.href, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.log("Ошибка регистрации", err);
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
export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl);
  try {
    const { data } = await axios.post(
      url.href,
      { ...userData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (err) {
    console.log("Ошибка авторизации", err);
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
