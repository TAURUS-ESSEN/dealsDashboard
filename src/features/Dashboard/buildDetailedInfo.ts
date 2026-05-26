import type { Task } from "../../types/tasks";
import type { DashboardRow } from "../../types/dashboardRow";
import type { Deal } from "../../types/deals";
import type { Client } from "../../types/client";

export const buildDetailedInfo = (
  detailedDealId: string | null,
  tasks: Task[],
  clients: Client[],
  tableData: DashboardRow[],
  deals: Deal[],
) => {
  const tasksMap: Map<string, Task[]> = new Map();
  for (const t of tasks) {
    const prev = tasksMap.get(t.dealKey);
    prev === undefined ? tasksMap.set(t.dealKey, [t]) : prev.push(t);
  }

  if (detailedDealId === null) return null;

  const row: DashboardRow | null = tableData.find((row) => row.dealKey === detailedDealId) ?? null;
  if (row === null) return null;

  const deal: Deal | null = deals.find((deal) => deal.dealKey === detailedDealId) ?? null;
  if (!deal) return null;

  const client: Client | null = clients.find((client) => client.clientKey === row?.clientKey) ?? null;

  const tasksData = tasksMap.get(row.dealKey);

  const dealTasks: Task[] | null = tasksData !== undefined ? [...tasksData?.values()] : [];

  return {
    row,
    client,
    deal,
    dealTasks,
  };
};
