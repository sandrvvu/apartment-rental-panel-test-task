"use client";

import { AptFilterBar, AptList } from "@/components/features";
import { AptDialogForm } from "@/components/features/apartments/AptDialogForm";
import { AptFilter, PriceFilter } from "@/lib/types";
import { useGetAllApartmentsQuery } from "@/store/api/apartmentApi";
import { useState, useMemo } from "react";

export default function Home() {
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({});
  const [roomFilter, setRoomFilter] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filterParams: AptFilter = useMemo(
    () => ({
      rooms: roomFilter ?? undefined,
      priceFrom: priceFilter.from,
      priceTo: priceFilter.to,
    }),
    [roomFilter, priceFilter]
  );

  const { data, isLoading } = useGetAllApartmentsQuery(filterParams);

  const filtered = data?.filter((apt) => {
    const roomMatch = roomFilter === null || apt.rooms === roomFilter;
    const priceMatch =
      (priceFilter.from === undefined || apt.price >= priceFilter.from) &&
      (priceFilter.to === undefined || apt.price <= priceFilter.to);
    return roomMatch && priceMatch;
  });

  return (
    <div className="my-10 mx-6 sm:mx-20 flex flex-col justify-center">
      <div className="flex justify-between items-center">
        <h1 className="--font-bitter text-xl font-bold sm:text-3xl">
          Apartment Rental Panel
        </h1>
        <AptDialogForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
      <p className="text-sm sm:text-lg text-gray-500 my-2">
        Manage your rental listings effortlessly in one clean dashboard. Add,
        edit, and remove apartments, set prices, and filter by rooms or
        budget—all with a few clicks. Perfect for busy landlords and property
        managers.
      </p>

      <AptFilterBar
        onRoomChange={setRoomFilter}
        onPriceChange={setPriceFilter}
      />

      <AptList data={filtered} isLoading={isLoading} />
    </div>
  );
}

