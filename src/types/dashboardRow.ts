import type { Deal } from "./deals";
export type DashboardIssue = "missingClientData" | "missingOwnerData" | "noTasks" | "overdue";
export type DashboardRow = Pick<
  Deal,
  "id" | "dealKey" | "stage" | "value" | "probability" | "expectedCloseDate" | "clientKey" | "ownerKey"
> & {
  dealTitle: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  clientStatus: string;
  clientIndustry: string;
  ownerName: string;
  ownerRole: string;
  ownerEmail: string | null;

  nextTaskKey: string | null;
  nextTaskTitle: string | null;
  nextTaskStatus: string | null;
  nextTaskPriority: string | null;
  nextTaskDueDate: string | null;
  isNextTaskOverdue: boolean;
  taskCount: number;
  openTaskCount: number;
  overdueTaskCount: number;
  issues: DashboardIssue[];
};
