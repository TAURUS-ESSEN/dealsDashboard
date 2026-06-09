import { rawUsersSchema, type RawUser } from "../types/users";
import { loadUsersDataApi } from "../api/usersApi";

export const loadRawUsers = async (): Promise<RawUser[]> => {
  const data = await loadUsersDataApi();
  const result = rawUsersSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`incoming users data is wrong`);
  }
  return result.data;
};
