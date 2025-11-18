import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Services = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <H1>Services</H1>
        <Button variant="medico" asChild>
          <Link href={"/admin/services/add"}>
            <PlusIcon />
            Add Service
          </Link>
        </Button>
      </div>

    </div>
  );
};

export default Services;
