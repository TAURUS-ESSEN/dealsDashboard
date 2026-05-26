import { Trash2, CirclePlus, X } from "lucide-react";
import {ProbabilityBar} from '../Probability'
import type { DetailedInfo } from "../../types/ui";
import type { ModalType } from "../../types/ui";

type Props = {
  detailedInfo: DetailedInfo | null;
  openModal: (modalType: ModalType | null, id: null | string) => void;
  closeDetails: () => void;
};
export const DashboardDetails = ({ detailedInfo, openModal, closeDetails }: Props) => {
  if (!detailedInfo || !detailedInfo.row) return;
  let { row, client, dealTasks } = detailedInfo;

  return (
    <div className="mt-2 mr-1 flex w-[410px] min-w-[410px] shrink-0 flex-col gap-2 rounded border border-gray-300 bg-white p-2">
      <div className="flex min-w-0 items-start justify-between gap-2 rounded bg-amber-500 p-2">
        <span className="min-w-0">
          <h2 className="truncate text-lg font-medium text-white" title={row.dealTitle}>
            {row.dealTitle}
          </h2>
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded border border-orange-200 bg-orange-50 px-2 py-1 text-sm font-semibold text-orange-900">
            {row.stage}
          </span>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-white duration-300 hover:bg-white/25"
            onClick={closeDetails}
            aria-label="Close details"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto_auto] gap-2 p-2 text-sm font-medium">
        <span className="truncate border-r px-1" title={row.clientName}>{row.clientName}</span>
        <span className="truncate border-r px-1" title={row.ownerName}>{row.ownerName}</span>
        <span className="whitespace-nowrap border-r px-1">{row.expectedCloseDate}</span>
        <span className="whitespace-nowrap border-r px-1">${row.value.toLocaleString("en-US")}</span>
      </div>

      <div className="p-2 border border-gray-300 rounded shadow">
        <div className="flex justify-between items-center border-b border-gray-400">
          <div>Deal overview</div>
          <div>
            <button className="editBtn" onClick={() => openModal("editDeal", row.id)}>
              Edit
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Value</span>
          <span>${row.value.toLocaleString("en-US")}</span>
        </div>
        <div className="flex justify-between">
          <span>Probability</span>
          <span><ProbabilityBar value={row.probability} /> </span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span>{row.clientStatus}</span>
        </div>
      </div>

      <div className="p-2 border border-gray-300 rounded shadow">
        <div className="flex justify-between items-center border-b border-gray-400">
          <div>Client</div>
          <div>
            {client !== null && (
              <button className="editBtn" onClick={() => openModal("editClient", client.clientKey)}>
                Edit
              </button>
            )}
          </div>
        </div>
        {client !== null && (
          <>
            <div className="flex justify-between gap-3">
              <span>Company</span>
              <span className="min-w-0 max-w-[240px] truncate text-right" title={client.company}>{client.company}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Industry</span>
              <span className="min-w-0 max-w-[240px] truncate text-right" title={client.industry}>{client.industry}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Email</span>
              <span className="min-w-0 max-w-[240px] truncate text-right" title={client.email ?? "-"}>{client.email ?? "-"}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Phone</span>
              <span className="min-w-0 max-w-[240px] truncate text-right" title={client.phone}>{client.phone}</span>
            </div>
            <div>
              <details>
                <summary>more info</summary>
                <div className="flex justify-between">
                  <span>Created at</span>
                  <span>{client.createdAt ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last contact at</span>
                  <span>{client.lastContactAt ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span>{client.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tags</span>
                  <span>{client.tags.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Notes</span>
                  <span>{client.notes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Client issues</span>
                  <span>{client.issues.join(", ")}</span>
                </div>
              </details>
            </div>
          </>
        )}
        {client === null && (
          <div className="flex flex-col justify-center">
            <div>Missing client data</div>
            <div>
              <button className="bg-black text-white p-2" onClick={() => openModal("addClient", null)}>
                Add client Info
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 border border-gray-300 rounded shadow">
        <div className="flex justify-between items-center border-b border-gray-400">
          <div>Next task</div>
          <div>
            {row.nextTaskKey && (
              <button className="editBtn" onClick={() => openModal("editTask", row.nextTaskKey)}>
                Edit
              </button>
            )}
          </div>
        </div>
        {row.nextTaskKey && (
          <>
            <div className="flex justify-between gap-3">
              <span>Task</span>
              <span className="min-w-0 max-w-[240px] truncate text-right" title={row.nextTaskTitle ?? ""}>{row.nextTaskTitle}</span>
            </div>
            <div className="flex justify-between">
              <span>Priority</span>
              <span>{row.nextTaskPriority}</span>
            </div>
            <div className="flex justify-between">
              <span>Due date</span>
              <span>
                {row.nextTaskDueDate}
                {row.isNextTaskOverdue}
              </span>
            </div>
            <div>
              <details>
                <summary>Tasks history</summary>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th>Task</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealTasks.map((task) => (
                      <tr key={task.id} className="even:bg-gray-100">
                        <td>
                          <button onClick={() => openModal("editTask", task.taskKey)}>{task.title}</button>
                        </td>
                        <td>{task.status}</td>
                        <td>
                          <button onClick={()=>openModal("deleteTask", task.id)}>
                            <Trash2 color="red" size={16} strokeWidth={1} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </div>
          </>
        )}
        {!row.nextTaskKey && (
          <>
            <div>Deal has no task.</div>
          </>
        )}
      </div>
      <div className="p-2 border border-gray-300 rounded shadow">
        <div className="border-b border-gray-400">Issues</div>
        <div className="mt-1">
          {row.issues.map((issue) => (
            <span key={issue} className="p-1 bg-amber-100 rounded">{issue}</span>
          ))}
        </div>
      </div>
      <div className="p-2 border-gray-300 border rounded">
        <div className="flex justify-between">
          <button
            className="flex w-32 items-center justify-center gap-2 rounded-md border border-[#eb7001] bg-white px-3 py-2 text-sm font-semibold text-[#eb7001] duration-300 hover:bg-orange-50"
            onClick={() => openModal("addTask", null)}
          >
            <span className="flex items-center gap-2">
              <CirclePlus size={16} strokeWidth={2} />
              Add task
            </span>
          </button>
          <button
            className="flex w-32 items-center justify-center gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 duration-300 hover:bg-red-100"
            onClick={() => openModal("deleteDeal", row.id)}
          >
            <span className="flex items-center gap-2">
              <Trash2 size={16} strokeWidth={2} />
              Delete Deal
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
