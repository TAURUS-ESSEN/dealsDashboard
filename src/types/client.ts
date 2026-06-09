import { VALID_CLIENT_STATUSES } from "../constants/defaults";
import { z } from "zod";

export const rawClientSchema = z.object({
  clientKey: z.string(),
  company: z.string(),
  industry: z.string(),
  status: z.string(),
  email: z.string(),
  phone: z.string(),
  ownerKey: z.string(),
  createdAt: z.string(),
  lastContactAt: z.string(),
  tags: z.string(),
  notes: z.string(),
  id: z.string(),
});

export const rawClientsSchema = z.array(rawClientSchema)
export type RawClient = z.infer<typeof rawClientSchema>

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
  ownerKey: string | null;
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
