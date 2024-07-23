import { Button } from "@/components/ui/button";

import { CircleUser, Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const BoardLayout = ({ children }: { readonly children: ReactNode }) => {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[230px_1fr] lg:grid-cols-[330px_1fr]">
      <div className="flex h-full max-h-screen flex-col gap-2 border-r-2 border-gray-500 bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex-1">
          <nav className="my-5 grid items-start bg-gray-100/40 px-2 text-sm font-medium dark:bg-gray-800/40 lg:pl-20 lg:pr-4">
            <Link
              href="/board"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-6 w-6" />
              Панель
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CircleUser className="h-6 w-6" />
              Аккаунт
            </Link>
          </nav>
        </div>
      </div>

      <main className="flex flex-col overflow-scroll">{children}</main>
    </section>
  );
};

export default BoardLayout;
