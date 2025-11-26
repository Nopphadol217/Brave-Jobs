import { db } from "@/drizzle/db";
import { jobListingTable } from "@/drizzle/schema";
import { getJobListingOranizationTag } from "@/features/joblistings/cache/jobListings";

import { getCurrentOrganization } from "@/services/clerk/libs/getCurrentAuth";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";

export default function EmployerHomePage() {
  return <h1></h1>;
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization();
  if (orgId == null) return null;

  const jobListing = await getMostRecentJobListing(orgId);
  if (jobListing == null) {
    redirect("/employer/job-listing/new");
  } else {
    redirect(`/employer/job-listing/${jobListing.id}`);
  }
}

async function getMostRecentJobListing(orgId: string) {
  "use cache";

  // TODO
  cacheTag(getJobListingOranizationTag(orgId));

  return db.query.jobListingTable.findFirst({
    where: eq(jobListingTable.orgranizationId, orgId),
    orderBy: desc(jobListingTable.createdAt),
    columns: { id: true },
  });
}
