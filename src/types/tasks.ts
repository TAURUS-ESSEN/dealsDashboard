import { VALID_TASK_PRIORITY, VALID_TASK_STATUSES } from "../constants/defaults";

export interface RawTask {
  taskKey: string;
  clientKey: string;
  dealKey: string;
  assigneeKey: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  id: string;
}

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

export type NewTaskToSave = Omit<RawTask, "id">;
export type TaskToSave = RawTask;
export type EmptyTask = Omit<Task, "id" | "taskKey" | "meta" | "issues"> & {
  taskKey: null;
};