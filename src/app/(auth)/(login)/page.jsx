import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-2xl font-semibold flex gap-y-2 justify-center items-center h-screen flex-col">
      <h1>Home page</h1>
      <Button>
        <Link href="/admin/dashboard">Dashboard</Link>
      </Button>
    </div>
  );
}
