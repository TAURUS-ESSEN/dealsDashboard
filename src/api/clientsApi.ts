import { URL_CLIENTS_API } from "../constants/urls";
import { requestJson, requestVoid, jsonOption } from "./httpClient";
import type { NewClientToSave, ClientToSave } from "../types/client";

type Props = {
  id: string;
  updatedClient: ClientToSave;
};
export const loadClientsDataApi = async () => {
  return await requestJson(URL_CLIENTS_API, "loading clients data");
};

export const createClientApi = async (newClient: NewClientToSave): Promise<void> => {
  await requestVoid(URL_CLIENTS_API, "creating client data", jsonOption("POST", newClient));
};

export const editClientApi = async ({ id, updatedClient }: Props): Promise<void> => {
  console.log('id',id, 'base',updatedClient)
  await requestVoid(`${URL_CLIENTS_API}/${id}`, "updating client data", jsonOption("PUT", updatedClient));
};
