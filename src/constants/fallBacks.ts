import type { ClientFallback, ClientFormState } from "../types/client";
import type { TaskFormState } from "../types/tasks";
import type { UserFallback } from "../types/users";
import type { TaskFallback } from "../types/tasks";
import type { UserFormState } from "../types/users";

export const clientDefaultFallback: ClientFallback = {
  clientName: "Unknown",
  clientEmail: "Unknown",
  clientPhone: "Unknown",
  clientStatus: "unknown",
  clientIndustry: "unknown",
};

export const defaultClientState: ClientFormState = {
  company: "",
  industry: "",
  status: "unknown",
  email: "",
  phone: "",
  lastContactAt: "",
  notes: "",
};

export const defaultUserFormState: UserFormState = {
  fullName: "",
  role: "",
  email: "",
  active: true,
};

export const userDefaultFallback: UserFallback = {
  ownerName: "Unknown",
  ownerRole: "unknown",
  ownerEmail: null,
};

export const tasksDefaultFallback: TaskFallback = {
  nextTaskKey: null,
  nextTaskTitle: null,
  nextTaskStatus: null,
  nextTaskPriority: null,
  nextTaskDueDate: null,
  taskCount: 0,
  openTaskCount: 0,
  overdueTaskCount: 0,
};

export const defaultTaskState: TaskFormState = {
  title: "",
  status: "unknown",
  priority: "low",
  dueDate: "",
};
