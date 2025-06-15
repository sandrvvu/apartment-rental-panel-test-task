import { Button } from "@/components/ui";
import Image from "next/image";

type ApartmentMainImageProps = {
  src?: string;
  title: string;
  onDelete: (imageUrl: string) => void;
};

export const AptMainImage = ({
  src,
  title,
  onDelete,
}: ApartmentMainImageProps) => {
  if (!src) {
    return (
      <div className="w-1/2 h-80 flex items-center justify-center border rounded-xl bg-gray-100 text-gray-400 text-sm">
        No image
      </div>
    );
  }

  return (
    <div className="relative w-1/2 h-80 rounded-xl overflow-hidden">
      <Image
        src={src}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        sizes="50vw"
      />
      {onDelete && (
        <Button
          onClick={() => onDelete(src)}
          className="absolute top-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded"
        >
          ✕
        </Button>
      )}
    </div>
  );
};
