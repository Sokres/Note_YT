import Link from "next/link";
import { LogoutButton } from "./LogOut";

interface LoginInUser {
  username: string;
  email: string;
}
const LogInUser = ({ userData }: { readonly userData: LoginInUser }) => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/board/account"
        className="rounded-lg px-3 py-2 font-semibold text-muted-foreground transition-all hover:text-primary"
      >
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
};

export default LogInUser;
