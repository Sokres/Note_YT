interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null;
  if (error.message === "Email or Username are already taken") {
    return (
      <div className="text-md py-2 italic text-red-500">
        Такой email уже зарегистрирован
      </div>
    );
  }
  return (
    <div className="text-md py-2 italic text-green-700">{error.message}</div>
  );
}
