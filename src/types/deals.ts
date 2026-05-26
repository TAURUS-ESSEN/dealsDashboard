import { VALID_DEAL_STAGES } from "../constants/defaults";
import { NewClient, NewClientToSave } from "./client";

export interface RawDeal {
  dealKey: string;
  clientKey: string;
  ownerKey: string;
  title: string;
  stage: string;
  value: string;
  probability: string;
  expectedCloseDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

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
