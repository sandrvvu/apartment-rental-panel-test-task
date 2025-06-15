"use client";

import { Button, Input } from "@/components/ui";
import { useAddApartmentImagesMutation } from "@/store/api/apartmentApi";
import { useRef } from "react";

type AptAddImagesProps = {
  aptId: string;
};

export const AptAddImages = ({ aptId }: AptAddImagesProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addImages] = useAddApartmentImagesMutation();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    await addImages({ id: aptId, files: Array.from(files) });
    e.target.value = "";
  };

  return (
    <>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        + Add Images
      </Button>
    </>
  );
};
