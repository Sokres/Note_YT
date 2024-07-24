"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/SignButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { updateProfileActions } from "@/data/actions/profile-action";
import { StrapiErrors } from "../custom/StrapiError";

interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  userNames: string;
  userLastName: string;
  bio: string;
  credits: number;
}
//Отображение данных с возможностю подсвечивания с помощю классов
function CountBox({ text }: { readonly text: number }) {
  const style = "font-bold text-md mx-1";
  const color = text > 0 ? "text-primary" : "text-red-500";
  return (
    <div className="flex h-9 w-full items-center justify-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none">
      You have<span className={cn(style, color)}>{text}</span>credit(s)
    </div>
  );
}
const INITIAL_STATE_FORM = {
  data: null,
  strapiErrors: null,
  message: null,
};
export function ProfileForm({
  data,
  className,
}: {
  readonly data: ProfileFormProps;
  readonly className?: string;
}) {
  //взято из документации, используем useFomrData и передаем дополнительные аргументы с помощю метода bind
  //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
  //Возможно передать id просто указав скрытый input в форме с value={id} и добавить в payload на отправке
  const updateUserWithId = updateProfileActions.bind(null, data.id);
  const [formState, fommAction] = useFormState(
    updateUserWithId,
    INITIAL_STATE_FORM,
  );
  return (
    <form action={fommAction} className={cn("space-y-4", className)}>
      <div className="grid space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Логин"
            defaultValue={data.username || ""}
            disabled
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data.email || ""}
            disabled
          />
          <CountBox text={data.credits} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="userNames"
            placeholder="Ваше имя"
            defaultValue={data.userNames || ""}
          />
          <Input
            id="lastName"
            name="userLastName"
            placeholder="Ваша фамилия"
            defaultValue={data.userLastName || ""}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Расскажите немного о себе"
          className="h-[224px] w-full resize-none rounded-md border p-2"
          defaultValue={data.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Обновить данные" loadingText="Сорхранение" />
      </div>
      <StrapiErrors error={formState?.strapiErrors} />
    </form>
  );
}
