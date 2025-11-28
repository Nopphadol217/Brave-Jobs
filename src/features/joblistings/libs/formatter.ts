import { experienceLevel, jobListingType, locationRequirement, wageInterval } from "@/drizzle/schema";

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
export function formatJobLocationRequirement(
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
      throw new Error(`invalid wage interval: ${locationRequirement satisfies never}`);
  }
}

// Experien
export function formatExperienceLevel(
  experienceLevel: experienceLevel
) {
  switch (experienceLevel) {
      case "junior":
      return "Junior";
    case "mid-level":
      return "Mid Level";
    case "senior":
      return "Senior";
    default:
      throw new Error(`invalid wage interval: ${experienceLevel satisfies never}`);
  }
}


// Type 
export function formatJobListingTypes(
  type: jobListingType
) {
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
