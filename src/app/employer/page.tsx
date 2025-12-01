import { db } from "@/drizzle/db"
import { jobListingTable } from "@/drizzle/schema"
import { getJobListingOrganizationTag } from "@/features/joblistings/db/cache/jobListings"
import { getCurrentOrganization } from "@/services/clerk/libs/getCurrentAuth"

import { desc, eq } from "drizzle-orm"
import { cacheTag } from "next/cache"

import { redirect } from "next/navigation"
import { Suspense } from "react"

export default function EmployerHomePage() {
  return (
    <Suspense>
      <SuspendedPage />
    </Suspense>
  )
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization()
  if (orgId == null) return null

  const jobListing = await getMostRecentJobListing(orgId)
  if (jobListing == null) {
    redirect("/employer/job-listings/new")
  } else {
    redirect(`/employer/job-listings/${jobListing.id}`)
  }
}

async function getMostRecentJobListing(orgId: string) {
  "use cache"
  cacheTag(getJobListingOrganizationTag(orgId))

  return db.query.jobListingTable.findFirst({
    where: eq(jobListingTable.organizationId, orgId),
    orderBy: desc(jobListingTable.createdAt),
    columns: { id: true },
  })
}