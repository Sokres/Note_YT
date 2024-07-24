import { StrapiImage } from "./StrapiImage";

export interface AdvantagePropsCompontn {
  id: number;
  __component: string;
  header: string;
  description: string;
  title: string;
  advantages: AdvantageProps[];
}

export interface AdvantageProps {
  id: number;
  heading: string;
  subHeading: string;
  image: AdvantageImage;
}
export interface AdvantageImage {
  id: number;
  url: string;
  alternativeText: string;
}

const Advantages = ({ data }: { readonly data: AdvantagePropsCompontn }) => {
  const { advantages } = data;
  return (
    <section className="bg-zinc-100 pt-16">
      <ul className="m-0 mx-auto my-0 max-w-6xl list-none p-0">
        {advantages.map((advantage) => (
          <li
            key={advantage.id}
            className="mt-4 flex flex-1 gap-4 even:flex-row-reverse"
          >
            <StrapiImage
              alt="Background"
              className="h-auto w-[calc(50%-16px)] object-cover"
              height={600}
              src={advantage.image.url}
              width={300}
            />
            <div className="w-[calc(50%-16px)] grow self-center">
              <h2 className="">{advantage.heading}</h2>
              <p className="">{advantage.subHeading}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Advantages;
