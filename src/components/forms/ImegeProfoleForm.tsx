"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { SubmitButton } from "../custom/SignButton";
import ImageProfile from "../custom/ImageProfile";
import { uploadProfileImageAction } from "@/data/actions/profile-action";
import { useFormState } from "react-dom";
import { ZodErrors } from "../custom/ZErrors";
import { StrapiErrors } from "../custom/StrapiError";

interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export const ImegeProfoleForm = ({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>;
  className?: string;
}) => {
  //взято из документации, используем useFomrData и передаем дополнительные аргументы с помощю метода bind
  //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
  //Возможно передать id просто указав скрытый input в форме с value={id} и добавить в payload на отправке
  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
    null,
    data?.id,
  );

  const [formState, formAction] = useFormState(
    uploadProfileImageWithIdAction,
    initialState,
  );
  console.log(formState);

  return (
    <form action={formAction} className={cn("space-y-4", className)}>
      <div className="">
        <ImageProfile
          id="image"
          name="userImage"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <ZodErrors error={formState.zodErrors?.image} />
        <StrapiErrors error={formState.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Обновит аватар" loadingText="Сохранение" />
      </div>
    </form>
  );
};
