import Landing from "@/components/custom/Landing";
import Advantages from "@/components/custom/Advantages";
import { getHomePageData } from "@/data/loadersData";

//Функция проверки для отображения блоков
function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.landing":
      return <Landing key={block.id} data={block} />;
    case "layout.advantages-section":
      return <Advantages key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const starpiData = await getHomePageData();

  const { blocks } = starpiData;
  if (!blocks) return <div>Данных для отображения нет</div>;
  return <>{blocks.map((block: any) => blockRenderer(block))}</>;
}
