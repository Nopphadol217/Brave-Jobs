import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { jobListingTable } from "./jobListing";
import { relations } from "drizzle-orm";

export const applicationStage = [
  "denied",
  "applied",
  "interested",
  "interviewed",
  "hired",
] as const;
export type ApplicationStages = (typeof applicationStage)[number];
export const applicationStageEnum = pgEnum(
  "job_listing_application_stage",
  applicationStage
);

export const jobListingApplicationTable = pgTable(
  "job_listing_applications",
  {
    jobListingId: uuid()
      .references(() => jobListingTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: varchar()
      .references(() => UserTable.id, { onDelete: "cascade" })
      .notNull(),
    coverLetter: text(),
    rating: integer(),
    stage: applicationStageEnum().notNull().default("applied"),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.jobListingId, table.userId] })]
);

export const jobListingApplicationRelations = relations(
  jobListingApplicationTable,
  ({ one }) => ({
    jobListing: one(jobListingTable, {
      fields: [jobListingApplicationTable.jobListingId],
      references: [jobListingTable.id],
    }),
    user: one(UserTable, {
      fields: [jobListingApplicationTable.userId],
      references: [UserTable.id],
    }),
  })
);
