import { Skeleton } from "@/components/ui/skeleton";

export const SocialPostSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Back link */}
      <Skeleton className="h-4 w-32" />

      <div className="bg-white">
        <div className="flex flex-col h-full">
          {/* Media Section */}
          <div className="px-6 pt-6 pb-3 border-b">
            <Skeleton className="aspect-square w-[320px] rounded-xl ml-10" />
          </div>

          {/* Content + Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-[65%_33%] gap-[2%] bg-white">
            {/* Left Content */}
            <LeftContentSkeleton />

            {/* Right Overview */}
            <OverviewSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

const LeftContentSkeleton = () => {
  return (
    <div className="border-r min-w-0">
      <div className="px-6 py-4 space-y-6">
        {/* Content */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[75%]" />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};


const OverviewSkeleton = () => {
  return (
    <div className="flex-1 min-w-0">
      {/* Tabs */}
      <div className="mx-6 mt-4 mb-2 flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 flex-1 rounded-md" />
      </div>

      <div className="px-6 pb-6 pt-2 space-y-5">
        {/* Creator Row */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <Skeleton className="h-16 col-span-2 rounded-xl" />
        </div>
      </div>
    </div>
  );
};


const StatCardSkeleton = () => {
  return (
    <div className="p-3 rounded-xl border flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
  );
};


export const CommentsSkeleton = () => {
  return (
    <div className="px-6 py-4 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-5">
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
};

