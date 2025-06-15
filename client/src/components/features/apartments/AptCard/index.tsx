import { Badge } from "@/components/ui";
import { Apartment } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export function AptCard({ apt }: { apt: Apartment }) {
  return (
    <div className="border-2 border-gray-200 shadow-md rounded-xl transition hover:shadow-lg py-3 px-5 cursor-pointer">
      <Link href={apt._id}>
        <div className="h-40 w-full bg-gray-100 mb-3">
          {apt.images.length > 0 ? (
            <Image
              src={apt.images[0]}
              alt={apt.title}
              width={400}
              height={400}
              className="w-full border h-40 object-cover rounded"
            />
          ) : (
            <div className="flex border items-center justify-center rounded h-full w-full text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="flex justify-between items-center text-lg sm:text-xl gap-2 ">
          <h2 className="--font-bitter font-semibold">{apt.title}</h2>
          <Badge className="text-xs" variant="default">
            {apt.rooms} rooms
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 min-h-[calc(2*1.25rem)]">
          {apt.description}
        </p>

        <p className="mt-2 text-gray-500 text-sm sm:text-md">
          <span className="text-lg sm:text-xl text-black font-semibold ">
            ${apt.price}
          </span>{" "}
          /month
        </p>
      </Link>
    </div>
  );
}
