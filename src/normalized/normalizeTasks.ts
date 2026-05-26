import type { Task, RawTask, TaskPriority, TaskStatuses, TaskIssue } from "../types/tasks";
import { VALID_TASK_PRIORITY, VALID_TASK_STATUSES } from "../constants/defaults";
import { loadRawTasks } from "../service/loadRawTasks";
import { normalizeStrings } from "../utils/normalizeStrings";
import { isValidISODate } from "../utils/isValidISODate";

export const loadTasks = async (): Promise<Task[]> => {
  const rawTasks: RawTask[] = await loadRawTasks();
  return normalizeTasks(rawTasks);
};

const normalizeTitle = (title: string, issues: TaskIssue[]): string => {
  const cleared = title.trim();
  if (cleared === "") {
    issues.push("missingTitle");
    return "Unknown";
  }
  return cleared;
};

function isValidTaskStatus(data: string): data is TaskStatuses {
  return VALID_TASK_STATUSES.includes(data as TaskStatuses);
}
const normalizeStatus = (status: string, meta: Task["meta"], issues: TaskIssue[]): TaskStatuses => {
  const cleared = String(normalizeStrings(status, { lower: true }));
  if (!isValidTaskStatus(cleared)) {
    issues.push("unknownStatus");
    meta.rawStatus = status.trim();
    return "unknown";
  }
  return cleared;
};
function isValidTaskPriority(data: string): data is TaskPriority {
  return VALID_TASK_PRIORITY.includes(data as TaskPriority);
}
const normalizePriority = (data: string): TaskPriority => {
  const cleared = String(normalizeStrings(data, { lower: true }));
  if (!isValidTaskPriority(cleared)) {
    return "medium";
  }
  return cleared;
};

const normalizeDate = (date: string, fieldName: string, issues: TaskIssue[]): string | null => {
  let cleared = String(date).trim();
  if (cleared === "") {
    if (fieldName === "dueDate") {
      issues.push("missingDueDate");
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

const createTask = (raw: RawTask): Task => {
  const issues: TaskIssue[] = [];
  const meta: Task["meta"] = {};
  const title = normalizeTitle(raw.title, issues);
  const status = normalizeStatus(raw.status, meta, issues);
  const priority = normalizePriority(raw.priority);
  const dueDate = normalizeDate(raw.dueDate, "dueDate", issues);
  const createdAt = normalizeDate(raw.createdAt, "createdAt", issues);
  return {
    taskKey: raw.taskKey,
    clientKey: raw.clientKey,
    dealKey: raw.dealKey,
    assigneeKey: raw.assigneeKey,
    title,
    status,
    priority,
    dueDate,
    createdAt,
    issues,
    meta,
    id: raw.id,
  };
};

const normalizeTasks = (rawTasks: RawTask[]): Task[] => {
  const tasks: Task[] = [];
  for (const rawTask of rawTasks) {
    const task: Task = createTask(rawTask);
    tasks.push(task);
  }
  return tasks;
};
