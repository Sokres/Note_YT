import { useRef, useState } from "react";
import { StrapiImage } from "./StrapiImage";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ImageProfileProps {
  id: string;
  name: string;
  label: string;
  showCard?: boolean;
  defaultValue?: string;
}
// FileReader объект который отвечает за чтение файла
function generateDataUrl(file: File, callback: (imageUrl: string) => void) {
  const reader = new FileReader();
  //функция вывода reader.result  данных файла
  reader.onload = () => callback(reader.result as string);
  //считать данные как base64
  reader.readAsDataURL(file);
}
function ImagePreview({ dataUrl }: { readonly dataUrl: string }) {
  return (
    <StrapiImage
      src={dataUrl}
      alt="preview"
      height={100}
      width={100}
      className="w-full rounded-lg object-cover"
    />
  );
}

function ImageCard({
  dataUrl,
  fileInput,
}: {
  readonly dataUrl: string;
  readonly fileInput: React.RefObject<HTMLInputElement>;
}) {
  //проеряем приходят ли данны о изображении с сервера
  console.log(dataUrl);
  const imagePreview = dataUrl ? (
    <ImagePreview dataUrl={dataUrl} />
  ) : (
    <p>Не выбрано изображение</p>
  );

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-4 rounded-md border p-4">
        {imagePreview}
      </div>
      <button
        onClick={() => fileInput.current?.click()}
        className="absolute inset-0 w-full"
        type="button"
      ></button>
    </div>
  );
}
const ImageProfile = ({
  id,
  name,
  label,
  showCard,
  defaultValue,
}: Readonly<ImageProfileProps>) => {
  const ref = useRef<HTMLInputElement>(null);
  //Записываем данные файла через useState и передаем их в ImageCard
  const [dataUrl, setDataUrl] = useState<string | null>(defaultValue ?? null);
  //Полцчаем input через ref
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //получаем данные из input
    const file = e.target.files?.[0];
    if (file) generateDataUrl(file, setDataUrl);
  };
  return (
    <>
      <div className="hidden">
        <Label htmlFor={name}>{label}</Label>
        <Input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={ref}
          accept="image/*"
        />
      </div>

      <ImageCard dataUrl={dataUrl ?? ""} fileInput={ref} />
    </>
  );
};

export default ImageProfile;
