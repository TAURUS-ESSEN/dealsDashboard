import { loadRawTasksApi } from "../api/tasksApi";
import { rawTasksSchema, type RawTask } from "../types/tasks";

export const loadRawTasks = async (): Promise<RawTask[]> => {
  const data = await loadRawTasksApi();
  const result = rawTasksSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`loaded tasks data is invalid`);
  }
  return result.data;
};
