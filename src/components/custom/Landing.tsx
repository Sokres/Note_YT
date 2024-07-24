import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { getUserMeLoader } from "@/data/services/getUserMeLoader";

export interface LandingPage {
  data: {
    id: number;
    __component: string;
    header: string;
    description: string;
    image: Image;
    link: Link;
  };
}

export interface Image {
  id: number;
  url: string;
  alternativeText: string;
}

export interface Link {
  id: number;
  url: string;
  text: string;
  isExt: boolean;
}

const Landing = async ({ data }: Readonly<LandingPage>) => {
  const user = await getUserMeLoader();
  const { header, description, image, link } = data;
  return (
    <header className="relative h-[600px] overflow-hidden bg-white">
      <StrapiImage
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
        height={1080}
        src={image.url}
        width={1920}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="sha max-w-6xl text-4xl font-bold text-purple-600 md:text-5xl lg:text-6xl">
          {header}
        </h1>
        <p className="mt-4 max-w-6xl text-lg text-gray-600 md:text-xl lg:text-2xl">
          {description}
        </p>
        <Link
          className="mt-8 items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow transition-all hover:bg-purple-300"
          href={user.ok ? "/board" : link.url}
        >
          {user.ok ? "Войти в панель" : link.text}
        </Link>
      </div>
    </header>
  );
};

export default Landing;
