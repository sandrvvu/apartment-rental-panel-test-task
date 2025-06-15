import { Apartment } from "@/lib/types";
import { AptCard } from "../AptCard";
import { AptCardSkeleton } from "../AptCardSkeleton";

export function AptList({
  data,
  isLoading,
}: {
  data?: Apartment[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 pt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <AptCardSkeleton key={index} />
        ))}
      </section>
    );
  }
  return (
    <>
      {data && data.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 pt-4">
          {data.map((apt) => (
            <AptCard key={apt._id} apt={apt} />
          ))}
        </section>
      ) : (
        <p className="text-center text-gray-500 mt-4">No apartments.</p>
      )}
    </>
  );
}
