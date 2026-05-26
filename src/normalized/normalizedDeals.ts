import { VALID_DEAL_STAGES } from "../constants/defaults";
import { loadRawDeals } from "../service/loadRawDeals";
import type { Deal, RawDeal, DealStages, DealIssue } from "../types/deals";
import { normalizeStrings } from "../utils/normalizeStrings";
import { isValidISODate } from "../utils/isValidISODate";

export const loadDeals = async (): Promise<Deal[]> => {
  const rawDeals = await loadRawDeals();
  return normalizeDeals(rawDeals);
};

const normalizeTitle = (title: string, issues: DealIssue[]): string => {
  const cleared = title.trim();
  if (cleared === "") {
    issues.push("missingTitle");
    return "Unknown";
  }
  return cleared;
};

function isValidDealStages(data: string): data is DealStages {
  return VALID_DEAL_STAGES.includes(data as DealStages);
}

const normalizeStage = (data: string, meta: Deal["meta"], issues: DealIssue[]): DealStages => {
  const cleared = String(normalizeStrings(data, { lower: true }));
  if (!isValidDealStages(cleared)) {
    issues.push("unknownStage");
    meta.rawStage = data.trim();
    return "unknown";
  }
  return cleared;
};

const normalizeNumbers = (
  value: string,
  fieldName: "value" | "probability",
  issues: DealIssue[],
): number => {
  const raw = value.trim();

  if (raw === "") {
    issues.push(fieldName === "value" ? "invalidValue" : "invalidProbability");
    return 0;
  }

  const cleaned = raw
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  if (cleaned === "" || cleaned === "-" || cleaned === "." || cleaned === "-.") {
    issues.push(fieldName === "value" ? "invalidValue" : "invalidProbability");
    return 0;
  }

  const number = Number(cleaned);

  if (!Number.isFinite(number)) {
    issues.push(fieldName === "value" ? "invalidValue" : "invalidProbability");
    return 0;
  }

  return number;
};


const normalizeDate = (date: string, fieldName: string, issues: DealIssue[]): string | null => {
  let cleared = String(date).trim();
  if (cleared === "") {
    if (fieldName === "expectedCloseDate") {
      issues.push("missingExpectedCloseDate");
    }
    if (fieldName === "createdAt") {
      issues.push("missingCreatedAt");
      return null;
    }
    return null;
  }

  if (cleared.length === 10) {
    cleared = cleared.replace(/\//g, "-");
  }

  if (!isValidISODate(cleared)) {
    issues.push("invalidDate");
    return null;
  }
  return cleared;
};

const createDeal = (raw: RawDeal): Deal => {
  const issues: DealIssue[] = [];
  const meta: Deal["meta"] = {};
  const title = normalizeTitle(raw.title, issues);
  const stage = normalizeStage(raw.stage, meta, issues);
  const value = normalizeNumbers(raw.value, "value",   issues);
  const probability = normalizeNumbers(raw.probability, "probability",  issues);
  const expectedCloseDate = normalizeDate(raw.expectedCloseDate, "expectedCloseDate", issues);
  const createdAt = normalizeDate(raw.createdAt, "createdAt", issues);
  const updatedAt = normalizeDate(raw.updatedAt, "updatedAt", issues);

  return {
    dealKey: raw.dealKey,
    clientKey: raw.clientKey,
    ownerKey: raw.ownerKey,
    title,
    stage,
    value,
    probability,
    expectedCloseDate,
    description: raw.description,
    createdAt,
    updatedAt,
    meta,
    issues,
    id: raw.id,
  };
};

const normalizeDeals = (rawDeals: RawDeal[]): Deal[] => {
  const deals: Deal[] = [];
  for (const rawDeal of rawDeals) {
    const deal = createDeal(rawDeal);
    deals.push(deal);
  }

  return deals;
};
