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

export function LoginForm() {
  return (
    <div className="w-full max-w-md xl:min-w-80">
      <form>
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
                placeholder="введите ваш email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="введите ваш пароль"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full">Войти</button>
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
