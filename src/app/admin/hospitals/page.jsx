"use client";

import { Hospital } from "@/components/hospital/hospital";
import { ExportPatientsModal } from "@/components/patient/export-modal";
import { Patient } from "@/components/patient/patient";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApiQuery } from "@/hooks/useApiQuery";
import { RotateCcwIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

const hospitalsData = [
  {
    clinicName: "Bright Smile Dental",
    clinicReceptionNumber: "9876543210",
    clinicConsultationFees: "500",
    numberOfDentalChairs: "3",
    clinicOwnership: "Dr. Mehta",
    propertyOwnership: "Owned",
    selectedHolidays: [{ day: "Sunday" }],
    address: "A-12 MG Road",
    area: "Andheri West",
    nearbyLandmark: "Infinity Mall",
    pincode: "400053",
    city: "Mumbai",
    state: "Maharashtra",
    longitude: "72.834",
    latitude: "19.119",
    defaultClinic: true,
    status: "active",
  },
  {
    clinicName: "ToothCare Clinic",
    clinicReceptionNumber: "9123456789",
    clinicConsultationFees: "400",
    numberOfDentalChairs: "2",
    clinicOwnership: "Dr. Patel",
    propertyOwnership: "Rented",
    selectedHolidays: [{ day: "Monday" }],
    address: "23/4 Park Street",
    area: "Salt Lake",
    nearbyLandmark: "City Centre Mall",
    pincode: "700064",
    city: "Kolkata",
    state: "West Bengal",
    longitude: "88.394",
    latitude: "22.572",
    defaultClinic: false,
    status: "inactive",
  },
];

const HospitalPage = () => {
  const [gender, setGender] = useState("all");
  const [bloodGroup, setBloodGroup] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [hospitals, setHospitals] = useState([...hospitalsData]);
  const [limit, setLimit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    setGender("all");
    setBloodGroup("all");
    setStatus("all");
    setSearch("");
  };

  const handleExort = () => {
    setIsModalOpen(true);
  };

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/patients?isActive=${
      status === "all" ? null : status === "true"
    }&page=${page}&limit=${limit}&searchQuery=${encodeURIComponent(
      search
    )}&gender=${
      gender === "all" ? "" : encodeURIComponent(gender)
    }&bloodGroup=${bloodGroup === "all" ? "" : encodeURIComponent(bloodGroup)}`,
    queryKeys: ["patients", status, page, search, limit, gender, bloodGroup],
  });

  console.log("data", data);

  // useEffect(() => {
  //   if (data) {
  //     setPatients(data?.data?.patients || []);
  //     setPageCount(data?.totalPages || 0);
  //   }
  // }, [data]);

  return (
    <div className="space-y-6">
      <H1>Hospitals</H1>

      {/* Filters */}
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="text-sm font-medium mb-1 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4  text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-lg bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcwIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset Filters</p>
            </TooltipContent>
          </Tooltip>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="medico" onClick={handleExort}>
                <FileOutputIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Data</p>
            </TooltipContent>
          </Tooltip> */}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clinic</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Ownership</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.map((hospital, index) => (
              <Hospital key={hospital?._id || index} hospital={hospital} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Hospital.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {hospitals?.length === 0 && !isLoading && (
          <DataNotFound name="Hospitals" />
        )}
      </div>

      <PaginationComp
        page={page}
        pageCount={pageCount}
        setPage={setPage}
        className="mt-8 mb-5"
      />

      {isModalOpen && (
        <ExportPatientsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default HospitalPage;
