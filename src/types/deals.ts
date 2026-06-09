import { VALID_DEAL_STAGES } from "../constants/defaults";
import { NewClient, NewClientToSave } from "./client";
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

export type NewDealFormState = NewDealToSave &
  NewClient & {
    clientType: "old" | "new";
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
