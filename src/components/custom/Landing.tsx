import Link from "next/link";

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

const Landing = ({ data }: Readonly<LandingPage>) => {
  console.dir(data, { depth: null });
  const { header, description, image, link } = data;
  const imgURL = `${"http://localhost:1337"}${image.url}`;
  return (
    <header className="relative h-[600px] overflow-hidden bg-white">
      <img
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
        height={1080}
        src={imgURL}
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
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
          href={link.url}
        >
          {link.text}
        </Link>
      </div>
    </header>
  );
};

export default Landing;
