import { URL_USERS_API } from "../constants/urls";
import { requestJson, requestVoid, jsonOption } from "./httpClient";
import type { NewUserToSave, UserToSave } from "../types/users";

export const loadUsersDataApi = async () => {
  return await requestJson(URL_USERS_API, "loading users data");
};

export const editUserApi = async (id: string, updatedUser: UserToSave): Promise<void> => {
  await requestVoid(`${URL_USERS_API}/${id}`, "editing users data", jsonOption("PUT", updatedUser));
};

export const createUserApi = async (newUser: NewUserToSave): Promise<void> => {
  await requestVoid(URL_USERS_API, "creating new user", jsonOption("POST", newUser));
};

export const deleteUserApi = async (id: string): Promise<void> => {
  await requestVoid(`${URL_USERS_API}/${id}`, "deleting user", { method: "DELETE" });
};
