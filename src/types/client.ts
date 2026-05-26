import { VALID_CLIENT_STATUSES } from "../constants/defaults";
import { NewDealToSave } from "./deals";

export interface RawClient {
  clientKey: string;
  company: string;
  industry: string;
  status: string;
  email: string;
  phone: string;
  ownerKey: string;
  createdAt: string;
  lastContactAt: string;
  tags: string;
  notes: string;
  id: string;
}

export type NewClientToSave = Omit<RawClient, "id">;
export type ClientToSave = RawClient;

export type ClientIssue =
  | "missingName"
  | "missingCompanyName"
  | "missingIndustry"
  | "unknownStatus"
  | "invalidEmail"
  | "missingEmail"
  | "missingPhone"
  | "missingCreatedAt"
  | "invalidCreatedAt"
  | "missingLastContactAt"
  | "invalidLasContactAt"
  | "inactiveClient"
  | "missingOwner";

export type ClientStatus = (typeof VALID_CLIENT_STATUSES)[number];
export interface Client {
  clientKey: string | null;
  company: string;
  industry: string;
  status: ClientStatus;
  email: string | null;
  phone: string;
  ownerKey: string|null;
  createdAt: string | null;
  lastContactAt: string | null;
  tags: string[];
  notes: string;
  issues: ClientIssue[];
  meta: {
    rawStatus?: string;
    rawEmail?: string;
    rawCreatedAt?: string;
  };
  id: string;
}


export type ClientFallback = {
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  clientStatus: string;
  clientIndustry: string;
};

export type EmptyClient = Omit<Client, "id" | "clientKey" | "meta" | "issues"> & {
  clientKey: null;
};

export type NewClient = Omit<Client, "id" | "meta" | "issues" | "tags"> & {
  tags: string;
};
