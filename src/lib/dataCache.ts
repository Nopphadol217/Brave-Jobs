type CacheTag =
  | "users"
  | "organizations"
  | "jobListings"
  | "userNotficationSettings"
  | "userResumes"
  | "jobListingApplications"
  | "organizationUserSettings";

export function getGlobaltag(tag: CacheTag) {
  return `global:${tag} ` as const;
}

export function getOrganizationTag(tag: CacheTag, organizationId: string) {
  return `global:${organizationId}-${tag} ` as const;
}
export function getIdTag(tag: CacheTag, id: string) {
  return `global:${id}-${tag} ` as const;
}
