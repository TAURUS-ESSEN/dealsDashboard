import type { DashboardRow } from "../../types/dashboardRow";
import type { Summary } from "../../types/ui";

type Props = {
  filteredData: DashboardRow[];
};

export const DashboardSummary = ({ filteredData }: Props) => {
  const summary: Summary = filteredData.reduce(
    (acc, row) => {
      acc.deals++;
      if (row.stage !== "lost") {
        acc.totalValue += row.value;
      }

      if (row.stage === "won") {
        acc.wonDeals++;
      }
      if (row.stage !== "lost" && row.stage !== "won") {
        acc.openDeals++;
        acc.overdueTasks += row.overdueTaskCount;
      }

      return acc;
    },
    { deals: 0, totalValue: 0, openDeals: 0, wonDeals: 0, overdueTasks: 0 },
  );

  return (
    <>
        <div className="flex gap-0 border rounded py-2 m-2 border-gray-400 bg-white">
          <div className="flex gap-2 items-center border-r border-gray-400 px-2 ">
            <h2 className="font-medium text-xl">Deals</h2>
            <span className="p-1 bg-gray-300 rounded">{summary.deals}</span>
          </div>
          <div className="flex flex-col border-r border-gray-400 px-2">
            <span className="text-sm text-gray-500">Total value</span>
            <span className="text-lg font-medium">${summary.totalValue.toLocaleString("en-US")}</span>
          </div>
          <div className="flex flex-col  border-r border-gray-400 px-2">
            <span className="text-sm text-gray-500">Open deals</span>
            <span className="text-lg font-medium">{summary.openDeals}</span>
          </div>
          <div className="flex flex-col  border-r border-gray-400 px-2">
            <span className="text-sm text-gray-500">Won deals</span>
            <span className="text-lg font-medium text-green-600">{summary.wonDeals}</span>
          </div>
          <div className="flex flex-col border-gray-400 px-2">
            <span className="text-sm text-gray-500">Overdue tasks</span>
            <span className="text-lg font-medium text-red-600"> {summary.overdueTasks}</span>
          </div>
        </div>
   
    </>
  );
};
