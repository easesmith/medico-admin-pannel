"use client";

import { useEffect, useState } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  RotateCcwIcon,
  FileOutputIcon,
} from "lucide-react";
import { H1 } from "@/components/typography";
import Link from "next/link";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Patient } from "@/components/patient/patient";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExportPatientsModal } from "@/components/patient/export-modal";

const patientsData = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.m@email.com",
    phone: "(555) 123-4567",
    gender: "Female",
    bloodGroup: "O-",
    location: "New York",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA18k_zA2uawCAuJ60bBAQ1yWUIDro2hDUxIYdHsJAtz5ZyaCzECBZmRIHBJI2AD1jRBM1PgavjTe-Vzmr1N46e2pdc1C_WNvOaHxgkcj9vAUsGInLwMBpkI4c_9KE_ZbJl3gq_D0erwd3QO7HBkrhDYPfc9AItVETgyoOFPXGu-3VEN6ayYC9bW6BPxC-LghMFrolNpgvWDUp5vIDkBQY9nd3IVXBJjE9LlItPkrC89qMUg4HK5C8TxG69CMbnQ1p9WzWgcNPrGkCN",
    createdAt: "2023-10-26",
  },
  {
    id: 2,
    name: "Ben Carter",
    email: "ben.c@email.com",
    phone: "(555) 987-6543",
    gender: "Male",
    bloodGroup: "A+",
    location: "London",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfpbjQM8QA17UzTG0b14fiOfVRry2gDSp8HXF5TQn8DZjaHSvipX8yaKdGmSqxNZbYYv-9jyOxwnVpndstkelnbUM4ckfCZc-NBBI2YY9W7NVMX36Tj5uedr0HcJ6oIsznSxoj7mppUGhhDSeFFrddVqPQx6FSJDxyTmLJpdReZ0tc723VYdmNtr5Hb8HBtPrTB5NjoTTIm8HxlPhZLrtu11wgKi2OuDPBvEjHO9uQXl2_W3CaESOSVLDtKQglfeMpE16GFaL3Imct",
    createdAt: "2023-10-25",
  },
];

const PatientsPage = () => {
  const [gender, setGender] = useState("all");
  const [bloodGroup, setBloodGroup] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [patients, setPatients] = useState([]);
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

  useEffect(() => {
    if (data) {
      setPatients(data?.data?.patients || []);
      setPageCount(data?.totalPages || 0);
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <H1>Patients</H1>

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
            <label className="text-sm font-medium mb-1 block">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Blood Group
            </label>
            <Select value={bloodGroup} onValueChange={setBloodGroup}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="medico" onClick={handleExort}>
                <FileOutputIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export Data</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <Patient key={patients._id || index} patient={patient} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Patient.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>

        {patients?.length === 0 && !isLoading && (
          <DataNotFound name="Patients" />
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

export default PatientsPage;
