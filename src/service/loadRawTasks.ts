import { loadRawTasksApi } from "../api/tasksApi";
import type { RawTask } from "../types/tasks";
import { hasFields } from "../utils/hasFields";

const RAW_TASK_FIELDS = [
  "taskKey",
  "clientKey",
  "dealKey",
  "assigneeKey",
  "title",
  "status",
  "priority",
  "dueDate",
  "createdAt",
  "id",
];

function isRawTask(data: unknown): data is RawTask[] {
  return Array.isArray(data) && data !== null && data.every((user) => hasFields(user, RAW_TASK_FIELDS));
}

export const loadRawTasks = async (): Promise<RawTask[]> => {
  const data = await loadRawTasksApi();
  if (!isRawTask(data)) {
    throw new Error(`loaded tasks data is invalid`);
  }
  return data;
};
