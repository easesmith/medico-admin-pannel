import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, MapPin, HeartPulse, Contact } from "lucide-react";

export default function PatientDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Personal Info */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <InfoSkeleton key={i} />
          ))}
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Address</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <InfoSkeleton key={i} />
          ))}
        </CardContent>
      </Card>

      {/* Medical Info */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <HeartPulse className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Medical Information</h2>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <InfoSkeleton />
          <Separator />
          <InfoSkeleton />
          <Separator />
          <InfoSkeleton />
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <Contact className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Emergency Contact</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-6">
          <InfoSkeleton />
          <InfoSkeleton />
          <div className="md:col-span-2">
            <InfoSkeleton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3 w-24 bg-muted" />
      <Skeleton className="h-4 w-48 bg-muted" />
    </div>
  );
}
