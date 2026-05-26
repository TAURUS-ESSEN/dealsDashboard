import { URL_CLIENTS_API } from "../constants/urls";
import { requestJson, requestVoid, jsonOption } from "./httpClient";
import type { NewClientToSave, ClientToSave} from "../types/client";

export const loadClientsDataApi = async () => {
  return await requestJson(URL_CLIENTS_API, "loading clients data");
};

export const createClientApi = async (newClient: NewClientToSave): Promise<void> => {
  await requestVoid(URL_CLIENTS_API, "creating client data", jsonOption("POST", newClient));
};

export const editClientApi = async (id: string, updatedClient: ClientToSave): Promise<void> => {
  await requestVoid(`${URL_CLIENTS_API}/${id}`, "updating client data", jsonOption("PUT", updatedClient));
};
