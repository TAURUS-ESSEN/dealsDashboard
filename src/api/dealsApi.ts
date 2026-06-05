import { URL_DEALS_API } from "../constants/urls";
import type { DealToSave, NewDealToSave } from "../types/deals";
import { jsonOption, requestJson, requestVoid } from "./httpClient";
type Props = {
  id: string,
  updatedDeal: DealToSave,
};

export const loadRawDealsApi = async (): Promise<unknown> => {
  return await requestJson(URL_DEALS_API, "loading deals raw data");
};

export const createDealApi = async (newDeal: NewDealToSave): Promise<void> => {
  await requestVoid(URL_DEALS_API, "creating new deal", jsonOption("POST", newDeal));
};

export const editDealApi = async ({id, updatedDeal}:Props): Promise<void> => {
  await requestVoid(`${URL_DEALS_API}/${id}`, "updating deal data", jsonOption("PUT", updatedDeal));
};

export const deleteDealApi = async (id: string): Promise<void> => {
  await requestVoid(`${URL_DEALS_API}/${id}`, "deleting deal data", { method: "DELETE" });
};
