import Logo from "./Logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
const Header = ({ data }: Readonly<HeaderProps>) => {
  const { logoText, ctaButton } = data;
  return (
    <header className="relative z-10 shadow-xl">
      <div className="mx-auto my-0 flex max-w-6xl justify-between py-3">
        <Logo></Logo>
        <Link href={ctaButton.url}>
          <Button>{ctaButton.text}</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
