import { loadClientsDataApi } from "../api/clientsApi";
import type { RawClient } from "../types/client";
import { rawClientsSchema } from "../types/client";

export const loadRawClients = async (): Promise<RawClient[]> => {
  const data = await loadClientsDataApi();

  const result = rawClientsSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`incoming clients data is wrong`);
  }
  return result.data;
};
