import { loadRawDealsApi } from "../api/dealsApi";
import type { RawDeal } from "../types/deals";
import { hasFields } from "../utils/hasFields";

const RAW_DEAL_FIELDS = [
  "dealKey",
  "clientKey",
  "ownerKey",
  "title",
  "stage",
  "value",
  "probability",
  "expectedCloseDate",
  "description",
  "createdAt",
  "updatedAt",
  "id",
] as const;

function isRawDeal(deal: unknown): deal is RawDeal[] {
  return Array.isArray(deal) && deal !== null && deal.every((deal) => hasFields(deal, RAW_DEAL_FIELDS));
}

export const loadRawDeals = async (): Promise<RawDeal[]> => {
  const data = await loadRawDealsApi();
  if (!isRawDeal(data)) {
    throw new Error(`loaded raw deals data is invalid`);
  }
  return data;
};
