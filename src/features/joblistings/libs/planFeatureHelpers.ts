import { getCurrentOrganization } from "@/services/clerk/libs/getCurrentAuth";
import { cacheTag } from "next/cache";
import { getJobListingOrganizationTag } from "../db/cache/jobListings";
import { db } from "@/drizzle/db";
import { JobListingTable } from "@/drizzle/schema";
import { and, count, eq } from "drizzle-orm";
import { hasPlanFeature } from "@/services/clerk/libs/planFeatures";



export async function hasReachedMaxPublishedJobListings() {
  const { orgId } = await getCurrentOrganization();
  if (orgId == null) return true;

  const count = await getPublishedJobListingsCount(orgId);
  const canPost = await Promise.all([
    hasPlanFeature("post_1_job_listing").then(has => has && count < 1),
    hasPlanFeature("post_3_job_listings").then(has =>  has && count < 3),
    hasPlanFeature("post_15_job_listings").then(has =>  has && count < 15),
]);
    return !canPost.some(Boolean)
}

async function getPublishedJobListingsCount(orgId: string) {
  "use cache";
  cacheTag(getJobListingOrganizationTag(orgId));

  const [res] = await db
    .select({ count: count() })
    .from(JobListingTable)
    .where(
      and(
        eq(JobListingTable.organizationId, orgId),
        eq(JobListingTable.status, "published")
      )
    );

  return res?.count ?? 0;
}


