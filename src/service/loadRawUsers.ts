import type { RawUser } from "../types/users";
import { loadUsersDataApi } from "../api/usersApi";
import { hasFields } from "../utils/hasFields";

const RAW_USER_FIELDS = ["id", "userKey", "fullName", "email", "role", "avatarUrl", "active"] as const;

function isRawUser(data: unknown): data is RawUser[] {
  return Array.isArray(data) && data !== null && data.every((user) => hasFields(user, RAW_USER_FIELDS));
}

export const loadRawUsers = async (): Promise<RawUser[]> => {
  const data = await loadUsersDataApi();
  if (!isRawUser(data)) {
    throw new Error(`incoming users data is wrong`);
  }
  return data;
};
