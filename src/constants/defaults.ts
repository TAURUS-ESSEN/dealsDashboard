import type { Filters } from "../types/ui";
export const DEMO_TODAY = "2026-05-12";
export const VALID_CLIENT_STATUSES = ["lead", "active", "inactive", "archived", "unknown"] as const;
export const VALID_DEAL_STAGES = [
  "lead",
  "contacted",
  "proposal",
  "negotiation",
  "won",
  "lost",
  "unknown",
] as const;
export const VALID_TASK_STATUSES = ["todo", "in_progress", "done", "cancelled", "unknown"] as const;
export const VALID_TASK_PRIORITY = ["low", "medium", "high", "urgent"] as const;

export const DEFAULT_FILTER_VALUES: Filters = {
  searchRequest: null,
  stage: "all",
  owner: "all",
  overdue: false,
  sortBy: null,
  sortDirection: "asc",
  activePreset: null,
 
};
