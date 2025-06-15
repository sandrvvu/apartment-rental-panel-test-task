"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import {
  useDeleteApartmentImageMutation,
  useDeleteApartmentMutation,
  useGetApartmentByIdQuery,
} from "@/store/api/apartmentApi";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  AptDetails,
  AptGallery,
  AptMainImage,
  DeleteApartmentDialog,
  AptDialogForm,
  AptAddImages,
  ApartmentSkeleton,
} from "@/components/features/apartments";

type Params = Promise<{ id: string }>;

export default function Apartment(props: { params: Params }) {
  const { id } = use(props.params);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: apt, isLoading } = useGetApartmentByIdQuery(id);
  const [deleteApartment] = useDeleteApartmentMutation();
  const [deleteImage] = useDeleteApartmentImageMutation();

  const handleDeleteImage = async (imageUrl: string) => {
    await deleteImage({ id, imageUrl });
  };

  const handleDelete = async () => {
    await deleteApartment(id);
    router.push("/");
  };

  if (isLoading) {
    return <ApartmentSkeleton />;
  }

  if (!apt) {
    notFound();
  }

  return (
    <div className="my-10 mx-5 sm:mx-20 flex flex-col gap-4">
      <Link href="/">
        <ArrowLeft />
      </Link>
      <div className="flex justify-between items-center">
        <h1 className="--font-bitter text-2xl font-semibold">
          Apartment Details
        </h1>
        <div className="flex gap-2">
          <AptDialogForm
            apt={apt}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
          <DeleteApartmentDialog onDelete={handleDelete} />
        </div>
      </div>

      <div className="flex gap-6 mb-5">
        <AptMainImage
          src={apt.images?.[0]}
          title={apt.title}
          onDelete={handleDeleteImage}
        />
        <AptDetails
          title={apt.title}
          description={apt.description}
          rooms={apt.rooms}
          price={apt.price}
        />
      </div>

      <AptAddImages aptId={id} />

      <AptGallery
        images={apt.images.slice(1)}
        onDeleteImage={handleDeleteImage}
      />
    </div>
  );
}
