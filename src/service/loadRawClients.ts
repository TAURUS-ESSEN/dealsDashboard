import { loadClientsDataApi } from "../api/clientsApi";
import type { RawClient } from "../types/client";
import { hasFields } from "../utils/hasFields";

const RAW_CLIENT_FIELDS = [
  "clientKey",
  "company",
  "industry",
  "status",
  "email",
  "phone",
  "ownerKey",
  "createdAt",
  "lastContactAt",
  "tags",
  "notes",
  "id",
] as const;

function isRawClient(data: unknown): data is RawClient[] {
  return Array.isArray(data) && data !== null && data.every((client) => hasFields(client, RAW_CLIENT_FIELDS));
}

export const loadRawClients = async (): Promise<RawClient[]> => {
  const data = await loadClientsDataApi();
  if (!isRawClient(data)) {
    throw new Error(`incoming clients data is wrong`);
  }
  return data;
};
 