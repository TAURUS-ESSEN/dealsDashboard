import { loadRawDealsApi } from "../api/dealsApi";
import type { RawDeal } from "../types/deals";
import { rawDealsSchema } from "../types/deals";

export const loadRawDeals = async (): Promise<RawDeal[]> => {
  const data = await loadRawDealsApi();
  const result = rawDealsSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`loaded raw deals data is invalid`);
  }

  return result.data;
};
