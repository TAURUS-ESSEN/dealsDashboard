import { VALID_TASK_PRIORITY, VALID_TASK_STATUSES } from "../constants/defaults";
import { z } from "zod";

export const rawTaskSchema = z.object({
  taskKey: z.string(),
  clientKey: z.string(),
  dealKey: z.string(),
  assigneeKey: z.string(),
  title: z.string(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string(),
  createdAt: z.string(),
  id: z.string(),
});

export const rawTasksSchema = z.array(rawTaskSchema);
export type RawTask = z.infer<typeof rawTaskSchema>;

export type TaskStatuses = (typeof VALID_TASK_STATUSES)[number];
export type TaskPriority = (typeof VALID_TASK_PRIORITY)[number];
export type TaskIssue =
  | "missingTitle"
  | "unknownStatus"
  | "missingDueDate"
  | "missingCreatedAt"
  | "invalidDate";
export type Task = {
  taskKey: string;
  clientKey: string;
  dealKey: string;
  assigneeKey: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string | null;
  issues: TaskIssue[];
  meta: {
    rawStatus?: string;
  };
  id: string;
};

export type TaskFallback = {
  nextTaskKey: string | null;
  nextTaskTitle: string | null;
  nextTaskStatus: TaskStatuses | null;
  nextTaskPriority: TaskPriority | null;
  nextTaskDueDate: string | null;
  taskCount: number;
  openTaskCount: number;
  overdueTaskCount: number;
};

export type TaskToSave = Omit<RawTask, "id">;
export const tasksFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").min(2, "Title must be at least 2 characters"),
  priority: z.enum(VALID_TASK_PRIORITY),
  status: z.enum(VALID_TASK_STATUSES),
  dueDate: z.iso.date("date is required"),
});

export type TaskFormState = z.infer<typeof tasksFormSchema>;
export type TaskSubmitFormData = Omit<Task, "issues" | "meta" | "id">;
