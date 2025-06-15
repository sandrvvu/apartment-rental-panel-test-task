import { Button } from "@/components/ui";
import Image from "next/image";

type AptGalleryProps = {
  images: string[];
  onDeleteImage: (imageUrl: string) => void;
};

export const AptGallery = ({ images, onDeleteImage }: AptGalleryProps) => {
  if (!images.length) return null;

  return (
    <div className="mt-4">
      <p className="mb-2 italic">More images:</p>
      <div className="flex flex-wrap gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-[48%] h-80">
            <Image
              src={img}
              alt={`apartment-${idx}`}
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-xl"
            />
            <Button
              onClick={() => onDeleteImage(img)}
              className="absolute top-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded"
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
