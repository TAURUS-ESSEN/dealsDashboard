import { z } from "zod";

export const rawUserSchema = z.object({
  userKey: z.string(),
  fullName: z.string(),
  role: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
  active: z.string(),
  id: z.string(),
});

export const rawUsersSchema = z.array(rawUserSchema);
export type RawUser = z.infer<typeof rawUserSchema>;

export type UserToSave = Omit<User, "id" | "issues" | "email" | "avatarUrl" | "active"> & {
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
  avatarUrl: string | null;
  active: boolean;
  issues: UserIssue[];
  id: string;
};

export type UserFallback = {
  ownerName: string;
  ownerRole: string;
  ownerEmail: string | null;
};

export type UserSubmitData = {
  userKey: string | null;
  fullName: string;
  role: string;
  email: string | null;
  avatarUrl: string;
  active: boolean;
  id?: string;
};

export const userFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required is required")
    .min(2, "Full name must be at least 2 characters"),
  role: z.string().trim().min(1, "Role is required").min(2, "Role must be at least 2 characters"),
  email: z.string().trim().min(1, "Email is required").email("Email is not valid"),
  active: z.boolean(),
});

export type UserFormState = z.infer<typeof userFormSchema>;
