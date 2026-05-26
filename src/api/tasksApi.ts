import { jsonOption, requestJson, requestVoid } from "../api/httpClient";
import { URL_TASKS_API } from "../constants/urls";
import type { NewTaskToSave, TaskToSave } from "../types/tasks";

export const loadRawTasksApi = async (): Promise<unknown> => {
  return await requestJson(URL_TASKS_API, "loading tasks data from API");
};

export const editTaskApi = async (id: string, updatedTask: TaskToSave): Promise<void> => {
  await requestVoid(`${URL_TASKS_API}/${id}`, "error by task updating", jsonOption("PUT", updatedTask));
};

export const createTaskApi = async (newTask: NewTaskToSave): Promise<void> => {
  await requestVoid(URL_TASKS_API, "error by task creating ", jsonOption("POST", newTask));
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await requestVoid(`${URL_TASKS_API}/${id}`, "error by task deleting ", { method: "DELETE" });
};
