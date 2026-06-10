import { VALID_DEAL_STAGES } from "../constants/defaults";
import { NewClientToSave } from "./client";
import { VALID_CLIENT_STATUSES } from "../constants/defaults";
import { z } from "zod";

export const rawDealSchema = z.object({
  dealKey: z.string(),
  clientKey: z.string(),
  ownerKey: z.string(),
  title: z.string(),
  stage: z.string(),
  value: z.string(),
  probability: z.string(),
  expectedCloseDate: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
});

export const rawDealsSchema = z.array(rawDealSchema);
export type RawDeal = z.infer<typeof rawDealSchema>;

export type DealToSave = RawDeal;
export type NewDealToSave = Omit<Deal, "id" | "meta" | "issues" | "value" | "probability"> & {
  value: string;
  probability: string;
};

export type DealStages = (typeof VALID_DEAL_STAGES)[number];
export type DealIssue =
  | "missingTitle"
  | "unknownStage"
  | "invalidValue"
  | "invalidProbability"
  | "invalidDate"
  | "missingExpectedCloseDate"
  | "missingCreatedAt";

export type Deal = {
  dealKey: string;
  clientKey: string;
  ownerKey: string;
  title: string;
  stage: DealStages;
  value: number;
  probability: number;
  expectedCloseDate: string | null;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;

  meta: {
    rawStage?: string;
  };
  issues: DealIssue[];
  id: string;
};

export type DealWithClientToSave = {
  newClient: NewClientToSave;
  newDeal: NewDealToSave;
};

export const editDealSchema = z.object({
  title: z.string().trim().min(1, "Title is required").min(2, "Title must be at least 2 characters"),
  ownerKey: z.string(),
  stage: z.enum(VALID_DEAL_STAGES),
  value: z.number(),
  probability: z.number().min(0).max(100),
  expectedCloseDate: z.iso.date("date is required"),
  description: z.string(),
});

export type EditDealFormState = z.infer<typeof editDealSchema>;
export type EditDealSubmit = Omit<Deal, "issues" | "meta">;

export const baseDealSchema = z.object({
  title: z.string().trim().min(1, "Title is required").min(2, "Title must be at least 2 characters"),
  ownerKey: z.string(),
  stage: z.enum(VALID_DEAL_STAGES),
  value: z.number(),
  probability: z.number().min(0).max(100),
  expectedCloseDate: z.iso.date("date is required"),
  description: z.string(),
});

const existingClientDealSchema = baseDealSchema.extend({
  clientType: z.literal("old"),
  clientKey: z.string().min(1, "Client is required"),
});

const newClientDealSchema = baseDealSchema.extend({
  clientType: z.literal("new"),
  company: z.string().trim().min(1, "Company is required").min(2, "Company must be at least 2 characters"),
  industry: z.string().trim().min(1, "Industry is required").min(2, "Industry must be at least 2 characters"),
  status: z.enum(VALID_CLIENT_STATUSES),
  email: z.string().trim().min(1, "Email is required").email("Email is not valid"),
  phone: z.string().min(1, "Phone is required"),
  lastContactAt: z.iso.date("date is required"),
  notes: z.string(),
});

export const createDealSchema = z.discriminatedUnion("clientType", [
  existingClientDealSchema,
  newClientDealSchema,
]);

export type CreateDealFormState = z.infer<typeof createDealSchema>;
export type ExistingClientDealFormState = Extract<CreateDealFormState, { clientType: "old" }>;
export type NewClientDealFormState = Extract<CreateDealFormState, { clientType: "new" }>;
