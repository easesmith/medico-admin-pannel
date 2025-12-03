"use client";

import { BackLink } from "@/components/shared/back-link";
import { H1 } from "@/components/typography";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApiQuery } from "@/hooks/useApiQuery";
import DataNotFound from "@/components/shared/DataNotFound";
import { PaginationComp } from "@/components/shared/PaginationComp";
import { Booking } from "@/components/patient/booking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildQuery } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";

const Bookings = () => {
  const params = useParams();
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("");

  const handleReset = () => {
    setStatus("all");
    setPage(1);
    setLimit("10");
    setDateRange("");
  };

  const query = buildQuery({
    status: status,
    filterBy: dateRange,
    page,
    limit,
    patientId: params.patientId,
  });

  const { data, isLoading, error } = useApiQuery({
    url: `/patient/myTreatmentHistory?${query}`,
    queryKeys: ["bookings", page, limit, status, params.patientId, dateRange],
  });

  console.log("data", data);

  useEffect(() => {
    if (data?.data) {
      setBookings(data?.data?.timeline);
      setPageCount(data?.pagination?.totalPages || 1);
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="flex gap-5 items-center justify-between">
        <BackLink href={`/admin/patients/${params.patientId}`}>
          <H1>Treatment History</H1>
        </BackLink>
        <div className="flex gap-5 items-end">
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
                    <label className="text-sm font-medium mb-1 block">Limit</label>
                    <Select value={limit} onValueChange={(value) => setLimit(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                        <SelectItem value="50">50</SelectItem>
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
        </div>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Category</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings?.map((booking) => (
              <Booking key={booking._id} booking={booking} />
            ))}

            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <Booking.Skeleton key={index} />
              ))}
          </TableBody>
        </Table>
        {bookings?.length === 0 && !isLoading && (
          <DataNotFound name="Bookings" />
        )}
      </div>

      <PaginationComp
        page={page}
        pageCount={pageCount}
        setPage={setPage}
        className="mt-8 mb-5"
      />
    </div>
  );
};

export default Bookings;
