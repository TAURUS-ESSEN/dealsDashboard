import { DEMO_TODAY } from "../../constants/defaults";
import { clientDefaultFallback, tasksDefaultFallback, userDefaultFallback } from "../../constants/fallBacks";
import type { Client, ClientFallback } from "../../types/client";
import type { DashboardRow, DashboardIssue } from "../../types/dashboardRow";
import type { Deal } from "../../types/deals";
import type { Task, TaskFallback } from "../../types/tasks";
import type { User, UserFallback } from "../../types/users";

export const buildDashboardRows = (
  clients: Client[],
  users: User[],
  deals: Deal[],
  tasks: Task[],
): DashboardRow[] => {
  const dashboardRows: DashboardRow[] = [];

  const clientsMap: Map<string, Client> = new Map(
    clients
      .filter((c): c is Client & { clientKey: string } => c.clientKey !== null)
      .map((c) => [c.clientKey, c]),
  );

  const usersMap: Map<string, User> = new Map(users.map((u) => [u.userKey, u]));

  const tasksMapByDealKey: Map<string, Task[]> = new Map();
  for (const t of tasks) {
    const prev = tasksMapByDealKey.get(t.dealKey);
    prev === undefined ? tasksMapByDealKey.set(t.dealKey, [t]) : prev.push(t);
  }

  const getTasksByDealKey = (id: string): Task[] | undefined => {
    return tasksMapByDealKey.get(id);
  };

  const getClientData = (id: string, issues: DashboardIssue[]): ClientFallback => {
    const clientData: Client | undefined = clientsMap.get(id);
    if (!clientData) {
      issues.push("missingClientData");
      return clientDefaultFallback;
    }
    return {
      clientName: clientData.company,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      clientIndustry: clientData.industry,
      clientStatus: clientData.status,
    };
  };

  const getOwnerData = (id: string, issues: DashboardIssue[]): UserFallback => {
    const ownerData: User | undefined = usersMap.get(id);
    if (!ownerData) {
      issues.push("missingOwnerData");
      return userDefaultFallback;
    }

    return {
      ownerName: ownerData.fullName,
      ownerRole: ownerData.role,
      ownerEmail: ownerData.email,
    };
  };

  const getTasksData = (id: string, issues: DashboardIssue[]): TaskFallback => {
    const tasksData = getTasksByDealKey(id);
    if (!tasksData) {
      issues.push("noTasks");
      return tasksDefaultFallback;
    }

    const calculatedTaskTypes = tasksData.reduce(
      (acc, task) => {
        acc.taskCount++;
        if (checkOverdue(task.dueDate)) acc.overdueTaskCount++;
        else acc.openTaskCount++;
        return acc;
      },
      {
        taskCount: 0,
        openTaskCount: 0,
        overdueTaskCount: 0,
      },
    );

    let nextTask: Task | null = null;

    for (const task of tasksData) {
      if (task.status === "done" || task.status === "cancelled") {
        continue;
      }

      if (task.dueDate === null) {
        continue;
      }

      if (nextTask === null) {
        nextTask = task;
        continue;
      }

      if (nextTask.dueDate === null) {
        nextTask = task;
        continue;
      }

      if (task.dueDate < nextTask.dueDate) {
        nextTask = task;
      }
    }

    if (nextTask === null) {
      return tasksDefaultFallback;
    }

    return {
      nextTaskKey: nextTask.taskKey,
      nextTaskTitle: nextTask.title,
      nextTaskStatus: nextTask.status,
      nextTaskPriority: nextTask.priority,
      nextTaskDueDate: nextTask.dueDate,
      taskCount: calculatedTaskTypes.taskCount,
      openTaskCount: calculatedTaskTypes.openTaskCount,
      overdueTaskCount: calculatedTaskTypes.overdueTaskCount,
    };
  };

  const checkOverdue = (nextTaskDueDate: string | null, issues?: DashboardIssue[]) => {
    if (!nextTaskDueDate) return false;

    const now = new Date(DEMO_TODAY);
    const dueDate = new Date(nextTaskDueDate);

    if (now > dueDate) {
      issues?.push("overdue");
      return true;
    }
    return false;
  };

  const createRow = (deal: Deal): DashboardRow => {
    const issues: DashboardIssue[] = [];
    const client = getClientData(deal.clientKey, issues);
    const owner = getOwnerData(deal.ownerKey, issues);
    const tasks = getTasksData(deal.dealKey, issues);

    const isNextTaskOverdue = checkOverdue(tasks.nextTaskDueDate, issues);
    return {
      id: deal.id,
      dealTitle: deal.title,
      dealKey: deal.dealKey,
      stage: deal.stage,
      value: deal.value,
      probability: deal.probability,
      expectedCloseDate: deal.expectedCloseDate,
      clientKey: deal.clientKey,
      ownerKey: deal.ownerKey,
      clientName: client.clientName,
      clientEmail: client.clientEmail,
      clientPhone: client.clientPhone,
      clientStatus: client.clientStatus,
      clientIndustry: client.clientIndustry,
      ownerName: owner.ownerName,
      ownerRole: owner.ownerRole,
      ownerEmail: owner.ownerEmail,
      nextTaskKey: tasks.nextTaskKey,
      nextTaskTitle: tasks.nextTaskTitle,
      nextTaskStatus: tasks.nextTaskStatus,
      nextTaskPriority: tasks.nextTaskPriority,
      nextTaskDueDate: tasks.nextTaskDueDate,
      isNextTaskOverdue,
      taskCount: tasks.taskCount,
      openTaskCount: tasks.openTaskCount,
      overdueTaskCount: tasks.overdueTaskCount,
      issues,
    };
  };

  for (const d of deals) {
    const row: DashboardRow = createRow(d);
    dashboardRows.push(row);
  }
  // console.log(dashboardRows);
  return dashboardRows;
};
