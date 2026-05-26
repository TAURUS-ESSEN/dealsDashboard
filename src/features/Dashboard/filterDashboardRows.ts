import type { DashboardRow } from "../../types/dashboardRow";
import type { Filters } from "../../types/ui";

export const filterDashboardRows = (rows: DashboardRow[], filters: Filters) => {
  let filteredRows = [...rows].filter(
    (row) =>
      (filters.searchRequest === null ||
        row.dealTitle.toLowerCase().includes(filters.searchRequest) ||
        row.clientName.toLowerCase().includes(filters.searchRequest)) &&
      (filters.stage === "all" || row.stage === filters.stage) &&
      (filters.owner === "all" || row.ownerKey === filters.owner) &&
      (!filters.overdue || row.isNextTaskOverdue) &&
      (filters.activePreset !== "highValue" || row.value >= 50000) &&
      (filters.activePreset !== "atRisk" ||
        (row.stage !== "won" && row.stage !== "lost" && row.overdueTaskCount > 0)) &&
      (filters.activePreset !== "noNextTask" || row.nextTaskTitle === null) &&
      (filters.activePreset !== "needsOwner" || row.issues.includes("missingOwnerData")),
  );

  if (filters.sortBy !== null) {
    const value = filters.sortBy as keyof DashboardRow;

    if (value === "value" || value === "probability") {
      filters.sortDirection === "asc"
        ? filteredRows.sort((a, b) => a[value] - b[value])
        : filteredRows.sort((a, b) => b[value] - a[value]);
    } else {
      filters.sortDirection === "asc"
        ? filteredRows.sort((a, b) => String(a[value]).localeCompare(String(b[value])))
        : filteredRows.sort((a, b) => String(b[value]).localeCompare(String(a[value])));
    }
  }

  return filteredRows;
};
