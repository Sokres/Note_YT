import { LogoutAction } from "@/data/actions/auth-actoin";
import { LogOut } from "lucide-react";
//используем библиотеку с иконками https://lucide.dev/guide/
export function LogoutButton() {
  return (
    <form action={LogoutAction}>
      <button type="submit">
        <LogOut className="h-6 w-6 hover:text-primary" />
      </button>
    </form>
  );
}
