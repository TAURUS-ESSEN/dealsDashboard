export interface RawUser {
  userKey: string;
  fullName: string;
  role: string;
  email: string;
  avatarUrl: string;
  active: string;
  id: string;
}

export type UserToSave = Omit<User, "issues" | "email" | "avatarUrl" | "active"> & {
  email: string;
  avatarUrl: string;
  active: string;
};
export type NewUserToSave = Omit<UserToSave, "id">;

export type UserIssue = "missingFullName" | "missingRole" | "missingEmail" | "invalidEmail" | "inactiveUser";
export type User = {
  userKey: string;
  fullName: string;
  role: string;
  email: string | null;
  avatarUrl: string | null; //спорное поле.
  active: boolean;
  issues: UserIssue[];
  id: string;
};

export type UserFallback = {
  ownerName: string;
  ownerRole: string;
  ownerEmail: string | null;
};

export type EmptyUser = {
  userKey: null;
  fullName: string;
  role: string;
  email: string|null;
  avatarUrl: string;
  active: boolean;
};
