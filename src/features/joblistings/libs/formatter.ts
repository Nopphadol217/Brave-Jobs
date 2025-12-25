import {
  experienceLevel,
  JobListingStatus,
  jobListingType,
  locationRequirement,
  wageInterval,
} from "@/drizzle/schema";

// wageInterval
export function formatWageInterval(interval: wageInterval) {
  switch (interval) {
    case "hourly":
      return "Hour";
    case "yearly":
      return "Year";
    default:
      throw new Error(`invalid wage interval: ${interval satisfies never}`);
  }
}

//LocationRequirement
export function formatLocationRequirement(
  locationRequirement: locationRequirement
) {
  switch (locationRequirement) {
    case "remote":
      return "Remote";
    case "in-office":
      return "In Office";
    case "hybrid":
      return "Hybrid";
    default:
      throw new Error(
        `invalid wage interval: ${locationRequirement satisfies never}`
      );
  }
}

// Experien
export function formatExperienceLevel(experienceLevel: experienceLevel) {
  switch (experienceLevel) {
    case "junior":
      return "Junior";
    case "mid-level":
      return "Mid Level";
    case "senior":
      return "Senior";
    default:
      throw new Error(
        `invalid wage interval: ${experienceLevel satisfies never}`
      );
  }
}

// Type
export function formatJobListingTypes(type: jobListingType) {
  switch (type) {
    case "full-time":
      return "Full Time";
    case "part-time":
      return "Part Time";
    case "internship":
      return "Internship";
    default:
      throw new Error(`invalid wage interval: ${type satisfies never}`);
  }
}

export function formatJobListingStatus(status: JobListingStatus) {
  switch (status) {
    case "published":
      return "Active";
    case "draft":
      return "Draft";
    case "delisted":
      return "Delisted";
    default:
      throw new Error(`Unknow Status: ${status satisfies never}`);
  }
}

export function formatWage(wage: number, wageInterval: wageInterval) {
  const wageFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  switch (wageInterval) {
    case "hourly": {
      return `${wageFormatter.format(wage)} / hr`;
    }
    case "yearly": {
      return wageFormatter.format(wage);
    }
    default:
      throw new Error(`Unknow wage interval: ${wageInterval satisfies never}`);
  }
}

export function formatJobListingLocation({
  stateAbbreviation,
  city,
}: {
  stateAbbreviation: string | null;
  city: string | null;
}) {
  if (stateAbbreviation == null && city == null) return "None";

  const locationParts = [];
  if (city != null) locationParts.push(city);
  if (stateAbbreviation != null)
    locationParts.push(stateAbbreviation.toUpperCase());

  return locationParts.join(", ");
}
