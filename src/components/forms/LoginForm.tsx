"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { authUserAction } from "@/data/actions/auth-actoin";
import { ZodErrors } from "../custom/ZErrors";
import { StrapiErrors } from "../custom/StrapiError";
import { SubmitButton } from "../custom/SignButton";

const INITIAL_STATE = {
  data: null,
  zodError: null,
  message: null,
};
export function LoginForm() {
  const [formState, actionForm] = useFormState(authUserAction, INITIAL_STATE);
  console.log(formState?.strapiError?.message);
  return (
    <div className="w-full max-w-md xl:min-w-80">
      <form action={actionForm}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Войти</CardTitle>
            <CardDescription>Введите свои данные</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="введите ваш пароль"
              />
              <ZodErrors error={formState?.zodError?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Войти"
              loadingText="Загрузка"
            />
            <StrapiErrors error={formState?.strapiError} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Еще нет акканута?
          <Link className="ml-2 underline" href="signup">
            Зарегистрируйся
          </Link>
        </div>
      </form>
    </div>
  );
}
