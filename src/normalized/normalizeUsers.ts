import { loadRawUsers } from "../service/loadRawUsers";
import type { RawUser, User, UserIssue } from "../types/users";
import { normalizeStrings } from "../utils/normalizeStrings";

export const loadUsers = async (): Promise<User[]> => {
  const rawUsers: RawUser[] = await loadRawUsers();
  return normalizeUsers(rawUsers);
};

const normalizeFields = (value: string, fieldName: string, issues: UserIssue[]): string => {
  const cleared = value.trim();
  if (cleared === "") {
    if (fieldName === "fullName") {
      issues.push("missingFullName");
      return "Unknown";
    }

    if (fieldName === "role") {
      issues.push("missingRole");
      return "unknown";
    }
  }

  return cleared;
};

const normalizeEmail = (email: string, issues: UserIssue[]): string | null => {
  const cleared = normalizeStrings(email, { lower: true });
  if (!cleared) {
    issues.push("missingEmail");
    return null;
  }
  if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(cleared)) {
    issues.push("invalidEmail");
    return null;
  }
  return cleared;
};

const normalizeActive = (active: string, issues: UserIssue[]): boolean => {
  const cleared = normalizeStrings(active, { lower: true });
  if (cleared !== "yes" && cleared !== "active" && cleared !== "true") {
    issues.push("inactiveUser");
    return false;
  }
  return true;
};

const createUser = (raw: RawUser): User => {
  const issues: UserIssue[] = [];
  const fullName = normalizeFields(raw.fullName, "fullName", issues);
  const role = normalizeFields(raw.role, "role", issues);
  const email = normalizeEmail(raw.email, issues);
  const active = normalizeActive(raw.active, issues);
  const avatarUrl = normalizeStrings(raw.avatarUrl)
  return {
    userKey: raw.userKey,
    fullName,
    role,
    email,
    avatarUrl,
    active,
    issues,
    id: raw.id,
  };
};

const normalizeUsers = (rawUsers: RawUser[]): User[] => {
  const users: User[] = [];

  for (const raw of rawUsers) {
    const user: User = createUser(raw);

    users.push(user);
  }
  return users;
};
