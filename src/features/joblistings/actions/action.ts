"use server";

import { getCurrentOrganization } from "@/services/clerk/libs/getCurrentAuth";
import { jobListingSchema } from "./schema";
import z from "zod";
import { redirect } from "next/navigation";
import { insertJobListing } from "../db/jobListing";

export async function createJobListing(
  unsafeData: z.infer<typeof jobListingSchema>
) {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null) {
    return {
      error: true,
      message: "You don't have permission to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "There are an error creating your job listing",
    };
  }

  const jobListing = await insertJobListing({
    ...data,
    organizationId: orgId,
    status: "draft",
  });
  redirect(`/employer/job-listing/${jobListing.id}`);
}
