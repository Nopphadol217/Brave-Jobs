import { wageInterval } from "@/drizzle/schema";

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
