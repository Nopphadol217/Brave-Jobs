"use client"
import { PricingTable } from "@/services/clerk/components/PricingTable";

export default function PricingPage() {
  return (
    <div className="flex justify-center items-center p-4 min-h-full">
      <PricingTable />
    </div>
  );
}
