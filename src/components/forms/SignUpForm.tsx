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
import { regUserAction } from "@/data/actions/auth-actoin";
import { useFormState } from "react-dom";
import { ZodErrors } from "../custom/ZErrors";
import { StrapiErrors } from "../custom/StrapiError";
import { SubmitButton } from "../custom/SignButton";

const INITIAL_STATE = {
  data: null,
  zodError: null,
  message: null,
};

export function SignupForm() {
  const [formState, formAction] = useFormState(regUserAction, INITIAL_STATE);

  return (
    <div className="w-full max-w-md xl:min-w-80">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Регистрация</CardTitle>
            <CardDescription>Создай новый аккаунт</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Ваше имя</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Имя"
              />
              <ZodErrors error={formState?.zodError?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Ваш email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState?.zodError?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.zodError?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton
              className="w-full"
              text="Sign Up"
              loadingText="Loading"
            />
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Уже есть аккаунт?
          <Link className="ml-2 underline" href="login">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
