import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserMeLoader } from "@/data/services/getUserMeLoader";
import LogInUser from "./LogInUser";
interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string | undefined;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}
const Header = async ({ data }: Readonly<HeaderProps>) => {
  const user = await getUserMeLoader();
  console.log(user);
  const { logoText, ctaButton } = data;
  return (
    <header className="relative z-10 shadow-xl">
      <div className="mx-auto my-0 flex justify-between px-20 py-3">
        <Logo></Logo>
        {!user.ok ? (
          <Link href={ctaButton.url}>
            <Button>{ctaButton.text}</Button>
          </Link>
        ) : (
          <LogInUser userData={user.data} />
        )}
      </div>
    </header>
  );
};

export default Header;
