import type { ClientFallback, EmptyClient } from "../types/client";
import type { EmptyTask, NewTaskToSave } from "../types/tasks";
import type { UserFallback } from "../types/users";
import type { TaskFallback } from "../types/tasks";
import type { EmptyUser } from "../types/users";

export const clientDefaultFallback: ClientFallback = {
  clientName: "Unknown",
  clientEmail: "Unknown",
  clientPhone: "Unknown",
  clientStatus: "unknown",
  clientIndustry: "unknown",
};

export const emptyClient: EmptyClient = {
  clientKey: null,
  company: "",
  industry: "",
  status: "unknown",
  email: null,
  phone: "",
  ownerKey: "unknown",
  createdAt: null,
  lastContactAt: null,
  tags: [],
  notes: "",
};

export const emptyUser: EmptyUser = {
  userKey: null,
  fullName: "",
  role: "",
  email: null,
  avatarUrl: "",
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

export const emptyTaskFallback: EmptyTask = {
  taskKey: null,
  clientKey: "",
  dealKey: "",
  assigneeKey: "",
  title: "",
  status: "unknown",
  priority: "low",
  dueDate: "",
  createdAt: "",
};
