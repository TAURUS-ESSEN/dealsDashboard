import { MoveUp, MoveDown } from "lucide-react";
import type { DashboardRow } from "../../types/dashboardRow";
import { ProbabilityBar } from "../Probability";
type Props = {
  filteredData: DashboardRow[];
  onShow: (id: string) => void;
  sortBy: (name: string) => void;
  activeRow: string | null;
  sortDirection: "asc" | "desc";
  sortColumn: string | null;
  isCompact: boolean;
};

export const DashboardTable = ({
  filteredData,
  onShow,
  activeRow,
  sortBy,
  sortDirection,
  sortColumn,
  isCompact,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
      <table className={`${isCompact ? "min-w-[880px]" : "min-w-[1120px]"} w-full table-fixed`}>
        {isCompact ? (
          <colgroup>
            <col className="w-[200px]" />
            <col className="w-[150px]" />
            <col className="w-[90px]" />
            <col className="w-[85px]" />
            <col className="w-[145px]" />
            <col className="w-[110px]" />
            <col className="w-[100px]" />
          </colgroup>
        ) : (
          <colgroup>
            <col className="w-[210px]" />
            <col className="w-[160px]" />
            <col className="w-[90px]" />
            <col className="w-[85px]" />
            <col className="w-[150px]" />
            <col className="w-[115px]" />
            <col className="w-[210px]" />
            <col className="w-[100px]" />
          </colgroup>
        )}
        <thead className="bg-gray-200 ">
          <tr>
            <th>
              <button
                onClick={() => sortBy("dealTitle")}
                className={`flex sortBtn ${sortColumn === "dealTitle" ? "sortBtnActive" : ""}`}
              >
                Deal
                {sortColumn === "dealTitle" && (
                  <span>{sortDirection === "asc" ? <MoveUp width={16} /> : <MoveDown width={16} />}</span>
                )}
              </button>
            </th>
            <th>
              <button
                onClick={() => sortBy("clientName")}
                className={`flex sortBtn ${sortColumn === "clientName" ? "sortBtnActive" : ""}`}
              >
                Client
                {sortColumn === "clientName" && (
                  <span>{sortDirection === "asc" ? <MoveUp width={16} /> : <MoveDown width={16} />}</span>
                )}
              </button>
            </th>
            <th className="whitespace-nowrap">Stage</th>
            <th>
              <button
                onClick={() => sortBy("value")}
                className={`flex sortBtn ${sortColumn === "value" ? "sortBtnActive" : ""}`}
              >
                Value
                {sortColumn === "value" && (
                  <span>{sortDirection === "asc" ? <MoveUp width={16} /> : <MoveDown width={16} />}</span>
                )}
              </button>
            </th>
            <th>
              <button
                onClick={() => sortBy("probability")}
                className={`flex sortBtn ${sortColumn === "probability" ? "sortBtnActive" : ""}`}
              >
                Probability
                {sortColumn === "probability" && (
                  <span>{sortDirection === "asc" ? <MoveUp width={16} /> : <MoveDown width={16} />}</span>
                )}
              </button>
            </th>
            <th className="whitespace-nowrap">Owner</th>
            {!isCompact && <th className="whitespace-nowrap">Next task</th>}
            <th className="whitespace-nowrap">Due date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 && (
            <>
              <tr>
                <td colSpan={isCompact ? 7 : 8}>No data. Change filter request.</td>
              </tr>
            </>
          )}
          {filteredData.length !== 0 &&
            filteredData.map((row) => (
              <tr
                className={`border-b border-t border-gray-200 even:bg-gray-100 hover:bg-amber-100 duration-300 ${
                  activeRow === row.dealKey ? "activeRow " : ""
                }`}
                key={row.id}
              >
                <td className="truncate whitespace-nowrap" title={row.dealTitle}>
                  <button className="block w-full truncate text-left" onClick={() => onShow(row.dealKey)}>
                    {row.dealTitle}
                  </button>
                </td>
                <td className="truncate whitespace-nowrap" title={row.clientName}>
                  {row.clientName}
                </td>
                <td className="whitespace-nowrap">{row.stage}</td>
                <td className="whitespace-nowrap">${row.value.toLocaleString("en-US")}</td>
                <td className="whitespace-nowrap">
                  <ProbabilityBar value={row.probability} />
                </td>
                <td className="whitespace-nowrap">{row.ownerName}</td>
                {!isCompact && (
                  <td className="truncate whitespace-nowrap" title={row.nextTaskTitle ?? ""}>
                    {row.nextTaskTitle}
                  </td>
                )}
                <td className={`${row.isNextTaskOverdue ? "text-red-500" : "text-black"} whitespace-nowrap`}>
                  {row.nextTaskDueDate}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
