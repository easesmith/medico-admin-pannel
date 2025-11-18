"use client";

import { DoctorDetails } from "@/components/doctor/doctor-details";
import { ServicePartnerDetails } from "@/components/service-partner/service-partner-details";
import { BackLink } from "@/components/shared/back-link";
import { H1 } from "@/components/typography";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useParams } from "next/navigation";

const ServicePartnerPage = () => {
  const params = useParams();

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/doctors/${params.servicePartnerId}`,
    queryKeys: ["service-partners"],
  });

  console.log("data", data);

  return (
    <div>
      <BackLink href="/admin/service-partners">
        <H1>Service Partner Details</H1>
      </BackLink>
      <ServicePartnerDetails doctor={data?.data?.doctor || ""} />
    </div>
  );
};

export default ServicePartnerPage;