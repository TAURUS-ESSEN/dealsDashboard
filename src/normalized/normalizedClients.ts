import { VALID_CLIENT_STATUSES } from "../constants/defaults";
import { loadRawClients } from "../service/loadRawClients";
import type {
  RawClient,
  Client,
  ClientIssue,
  ClientStatus,

} from "../types/client";
import { normalizeStrings } from "../utils/normalizeStrings";
import { isValidISODate } from "../utils/isValidISODate";

export const loadClients = async (): Promise<Client[]> => {
  const rawClients: RawClient[] = await loadRawClients();
  return normalizeClients(rawClients);
};

const normalizeNames = (name: string, fieldName: string, issues: ClientIssue[]): string => {
  const cleared = normalizeStrings(name);
  if (!cleared) {
    if (fieldName === "company") issues.push("missingCompanyName");
    if (fieldName === "industry") issues.push("missingIndustry");
    if (fieldName === "phone") issues.push("missingPhone");
    return "Unknown";
  }
  return cleared;
};

function validClientStatus(value: string): value is ClientStatus {
  return VALID_CLIENT_STATUSES.includes(value as ClientStatus);
}
const normalizeStatus = (status: string, issues: ClientIssue[], meta: Client["meta"]): ClientStatus => {
  const cleared = normalizeStrings(status, { lower: true });
  if (cleared === null || !validClientStatus(cleared)) {
    meta.rawStatus = status.trim();
    issues.push("unknownStatus");
    return "unknown";
  }

  return cleared;
};

const normalizeEmail = (email: string, issues: ClientIssue[], meta: Client["meta"]): string | null => {
  const cleared = normalizeStrings(email, { lower: true });
  if (!cleared) {
    issues.push("missingEmail");
    return null;
  }
  if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(cleared)) {
    issues.push("invalidEmail");
    meta.rawEmail = email.trim();
    return null;
  }
  return cleared;
};

const normalizeDate = (data: string, fieldName: string, issues: ClientIssue[], meta: Client["meta"]): string | null => {
  let cleared = String(data).trim();

  if (cleared === "") {
    if (fieldName === "createdAt") issues.push("missingCreatedAt");
    if (fieldName === "lastContactAt") issues.push("missingLastContactAt");
    return null;
  }

  if (cleared.length === 10) {
    cleared = cleared.replace(/\//g, "-");
  }

  if (!isValidISODate(cleared)) {
    if (fieldName === "createdAt") {
      issues.push("invalidCreatedAt");
      meta.rawCreatedAt = data.trim();
    }
    if (fieldName === "lastContactAt") {
      issues.push("invalidLasContactAt");
    }
    return null;
  }
  return cleared;
};

const normalizeOwnerKey = (ownerKey:string, issues:ClientIssue[]):string|null => {
  const cleared =   normalizeStrings(ownerKey, { lower: true });
  if (!cleared) {
    issues.push('missingOwner')
  }
  return cleared
}

const createClient = (raw: RawClient): Client => {
  const clientKey = raw.clientKey.trim();
  const issues: ClientIssue[] = [];
  const meta: Client["meta"] = {};
  const company = normalizeNames(raw.company, "company", issues);
  const industry = normalizeNames(raw.industry, "industry", issues);
  const status = normalizeStatus(raw.status, issues, meta);
  const email = normalizeEmail(raw.email, issues, meta);
  const phone = normalizeNames(raw.phone, "phone", issues);

  const ownerKey = normalizeOwnerKey(raw.ownerKey, issues)

  const createdAt = normalizeDate(raw.createdAt, "createdAt", issues, meta);
  const lastContactAt = normalizeDate(raw.lastContactAt, "lastContactAt", issues, meta);
  const notes = raw.notes;
  const id = raw.id;
  const tags = raw.tags.split(",");

  const client = {
    clientKey,
    company,
    industry,
    status,
    email,
    phone,
    ownerKey,
    createdAt,
    lastContactAt,
    tags,
    notes,
    issues,
    meta,
    id,
  };

  return client;
};

const normalizeClients = (rawClients: RawClient[]): Client[] => {
  const clients: Client[] = [];

  for (const rawClient of rawClients) {
    const client = createClient(rawClient);
    clients.push(client);
  }


  return clients
};