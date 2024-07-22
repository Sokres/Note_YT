import { ReactNode } from "react";

const AuthLayout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default AuthLayout;
