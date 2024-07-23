import { LogoutAction } from "@/data/actions/auth-actoin";
import { LogOut } from "lucide-react";
//используем библиотеку с иконками https://lucide.dev/guide/
export function LogoutButton() {
  return (
    <form action={LogoutAction}>
      <button
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        type="submit"
      >
        <LogOut className="h-6 w-6" />
      </button>
    </form>
  );
}
