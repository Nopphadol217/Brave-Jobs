import { db } from "@/drizzle/db";
import { jobListingTable, UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

import { revalidateJobListingCache } from "./cache/jobListings";

export async function insertJobListing(
  jobListing: typeof jobListingTable.$inferInsert
) {
  const [newListing] = await db
    .insert(jobListingTable)
    .values(jobListing)
    .returning({
      id: jobListingTable.id,
      organizationId: jobListingTable.organizationId,
    });

  revalidateJobListingCache(newListing);

  return newListing
}
