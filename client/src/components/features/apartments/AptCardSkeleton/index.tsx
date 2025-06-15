import { Skeleton } from "@/components/ui";

export function AptCardSkeleton() {
  return (
    <div className="border-2 border-gray-200 shadow-md rounded-xl py-3 px-5">
      <Skeleton className="w-full h-40 rounded mb-3" />
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-1" />
      <Skeleton className="h-6 w-1/3 mt-2" />
    </div>
  );
}
