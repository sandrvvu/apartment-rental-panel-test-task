import { Skeleton } from "@/components/ui";

export const ApartmentSkeleton = () => {
  return (
    <div className="my-10 mx-5 sm:mx-20 flex flex-col gap-4">
      <Skeleton className="h-8 w-1/3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>

      <div className="flex gap-6 mb-5">
        <Skeleton className="w-1/2 h-80 rounded-xl" />
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};
