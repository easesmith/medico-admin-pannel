"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BackLink } from "@/components/shared/back-link";
import { H1 } from "@/components/typography";
import {
  User,
  MapPin,
  HeartPulse,
  Contact,
  Clock,
  Pill,
  History,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useApiQuery } from "@/hooks/useApiQuery";
import PatientDetailsSkeleton from "@/components/patient/patient-details-skeleton";
import { format } from "date-fns/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info } from "@/components/shared/info";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddMedication } from "@/components/patient/add-medication";
import { Medication } from "@/components/patient/medication";
import Link from "next/link";

const PatientDetailsPage = () => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useApiQuery({
    url: `/admin/patients/${params.patientId}`,
    queryKeys: ["patients", params.patientId],
  });

  const patient = data?.data?.patient;
  console.log("patient data", data);

  if (isLoading) return <PatientDetailsSkeleton />;

  if (!patient)
    return (
      <div className="text-center text-muted-foreground mt-10">
        No patient data found.
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <BackLink href="/admin/patients">
            <H1>Patient Details</H1>
          </BackLink>
          <Badge
            variant="secondary"
            className={`${
              patient.isActive
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
            }`}
          >
            {patient.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <Button variant="medico" asChild>
          <Link href={`/admin/patients/${params.patientId}/bookings`}>
            View Treatment History
          </Link>
        </Button>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-[160px_1fr] gap-6">
          <Avatar className="size-40">
            <AvatarImage
              src={patient.profilePhoto || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{patient.firstName ?? "Patient"}</AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <Info label="Full Name" value={patient.firstName} />
            <Info label="Email" value={patient.email} />
            <Info label="Phone" value={patient.phone} />
            <Info label="Gender" value={patient.gender} />
            <Info
              label="Date of Birth"
              value={
                patient.dateOfBirth &&
                format(new Date(patient.dateOfBirth), "dd MMM, yyyy")
              }
            />
            <Info label="Blood Group" value={patient.bloodGroup} />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Address</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 pt-6">
          <Info
            label="Street"
            value={patient.address?.street || "Not provided"}
          />
          <Info label="City" value={patient.address?.city || "Not provided"} />
          <Info
            label="State"
            value={patient.address?.state || "Not provided"}
          />
          <Info
            label="Country"
            value={patient.address?.country || "Not provided"}
          />
          <Info
            label="Pincode"
            value={patient.address?.pincode || "Not provided"}
          />
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 border-b pb-3">
          <div className="flex flex-row items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Medical Information</h2>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Add Medication</Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Info
            label="Allergies"
            value={
              patient.allergies?.length
                ? patient.allergies.join(", ")
                : "No allergies listed"
            }
          />
          <Separator />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Current Medications</p>
            <div className="flex gap-4 items-center flex-wrap">
              {patient.currentMedications?.length
                ? patient.currentMedications.map((item, index) => (
                    <Medication key={index} item={item} />
                  ))
                : "No medications listed"}
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <History className="h-4 w-4" /> Medical History
            </h3>
            {patient.medicalHistory?.length ? (
              <ul className="space-y-2">
                {patient.medicalHistory.map((mh, idx) => (
                  <li
                    key={idx}
                    className="border rounded-md p-3 text-sm bg-muted/30"
                  >
                    <p>
                      <span className="font-medium">Condition:</span>{" "}
                      {mh.condition}
                    </p>
                    <p>
                      <span className="font-medium">Diagnosed:</span>{" "}
                      {mh.diagnosedDate
                        ? format(new Date(mh.diagnosedDate), "dd MMM, yyyy")
                        : "Not provided"}
                    </p>
                    <p>
                      <span className="font-medium">Notes:</span> {mh.notes}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No history found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b pb-3">
          <Contact className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Emergency Contact</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 pt-6">
          <Info
            label="Name"
            value={patient.emergencyContact?.name || "Not provided"}
          />
          <Info
            label="Relation"
            value={patient.emergencyContact?.relation || "Not provided"}
          />
          <Info
            label="Phone"
            value={patient.emergencyContact?.phone || "Not provided"}
          />
        </CardContent>
      </Card>

      {/* Meta Info */}
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>
          Created:{" "}
          {patient.createdAt &&
            format(new Date(patient.createdAt), "dd MMM, yyyy")}{" "}
          | Updated:{" "}
          {patient.updatedAt &&
            format(new Date(patient.updatedAt), "dd MMM, yyyy")}
        </p>
      </div>

      {isModalOpen && (
        <AddMedication
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default PatientDetailsPage;
