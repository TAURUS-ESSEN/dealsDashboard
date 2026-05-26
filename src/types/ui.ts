import type { Deal, DealStages } from "./deals";
import type { DashboardRow } from "./dashboardRow";
import type { Client } from "./client";
import type { Task } from "./tasks";

export type Presets = "all" | "highValue" | "atRisk" | "noNextTask" | "needsOwner";
export type Filters = {
  searchRequest: string | null;
  stage: DealStages | "all";
  owner: string;
  overdue: boolean;
  sortBy: string | null;
  sortDirection: "asc" | "desc";
  activePreset: Presets | null;
};

export type Summary = {
  deals: number;
  totalValue: number;
  openDeals: number;
  wonDeals: number;
  overdueTasks: number;
};

export type ModalType =
  | "editClient"
  | "addClient"
  | "createDeal"
  | "editDeal"
  | "editTask"
  | "addTask"
  | "deleteTask"
  | "deleteDeal"
  | "createUser"
  | "editUser"
  | "deleteUser";
export type Modal = {
  isOpen: boolean;
  type: null | ModalType;
  id: null | string;
};

export type DetailedInfo = {
  row: DashboardRow | null;
  client: Client | null;
  deal: Deal | null;
  dealTasks: Task[];
};

export type ToastType = "create" | "update" | "delete";
export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};
