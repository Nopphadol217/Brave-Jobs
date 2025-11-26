import { getGlobaltag, getIdTag, getOrganizationTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";
import { getOrganizationIdTag } from "../../organization/db/cache/user";

export function getJobListingGlobalTag() {
  return getGlobaltag("jobListings");
}
export function getJobListingOranizationTag(organizationId: string) {
  return getOrganizationTag("jobListings", organizationId);
}

export function getJobListingIdTag(id: string) {
  return getIdTag("jobListings", id);
}

export function revalidateJobListingCache({
  id,
  organizationId,
}: {
  id: string;
  organizationId: string;
}) {
  revalidateTag(getJobListingGlobalTag());
  revalidateTag(getJobListingOranizationTag(organizationId));
  revalidateTag(getJobListingIdTag(id));
}
