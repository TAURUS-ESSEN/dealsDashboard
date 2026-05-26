import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";
import { Pencil, Trash2, Users } from "lucide-react";

import type { ModalType } from "../types/ui";
import type { User, UserIssue } from "../types/users";
import type { Client } from "../types/client";

type Props = {
  openModal: (modalType: ModalType | null, id: null | string) => void;
  users: User[];
  clients: Client[];
};

const issueLabels: Record<UserIssue, string> = {
  missingFullName: "Missing name",
  missingRole: "Missing role",
  missingEmail: "Missing email",
  invalidEmail: "Invalid email",
  inactiveUser: "Inactive",
};

export const UsersList = () => {
  const { openModal, users, clients }: Props = useOutletContext();

  const clientsMapByUser = useMemo(() => {
    const map = new Map<string, Client[]>();

    for (const client of clients) {
      if (!client.ownerKey) continue;

      const prev = map.get(client.ownerKey);
      prev === undefined ? map.set(client.ownerKey, [client]) : prev.push(client);
    }

    return map;
  }, [clients]);

  const activeUsersCount = users.filter((user) => user.active).length;
  const usersWithIssuesCount = users.filter((user) => user.issues.length > 0).length;
  const assignedClientsCount = users.reduce((count, user) => count + (clientsMapByUser.get(user.userKey)?.length ?? 0), 0);

  return (
    <section className="m-2 flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Managers</h1>
          <p className="text-sm text-slate-400">Team directory and ownership overview</p>
        </div>

        <div className="flex overflow-hidden rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3">
            <Users size={18} className="text-[#eb7001]" />
            <span className="text-xl text-slate-500">Managers</span>
            <strong className="text-xl">{users.length}</strong>
          </div>
          <div className="border-l border-slate-300 px-4 py-3">
            <span className="block text-sm text-slate-500">Active</span>
            <strong className="text-xl text-emerald-600">{activeUsersCount}</strong>
          </div>
          <div className="border-l border-slate-300 px-4 py-3">
            <span className="block text-sm text-slate-500">Issues</span>
            <strong className="text-xl text-red-600">{usersWithIssuesCount}</strong>
          </div>
          <div className="border-l border-slate-300 px-4 py-3">
            <span className="block text-sm text-slate-500">Clients</span>
            <strong className="text-xl">{assignedClientsCount}</strong>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] table-fixed">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[18%]" />
              <col className="w-[24%]" />
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[6%]" />
              <col className="w-[5%]" />
            </colgroup>
            <thead className="bg-slate-200 text-left text-sm font-semibold text-slate-700">
              <tr>
                <th className="px-3 py-3">Manager</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Issues</th>
                <th className="px-3 py-3">Clients</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {users.map((user) => {
                const clientsCount = clientsMapByUser.get(user.userKey)?.length ?? 0;

                return (
                  <tr key={user.id} className="odd:bg-white even:bg-slate-100 hover:bg-orange-50">
                    <td className="px-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-950">{user.fullName || "Unknown manager"}</p>
                        <p className="truncate text-xs text-slate-500">{user.userKey}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="block truncate text-slate-900">{user.role || "Unknown role"}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="block truncate text-slate-900">{user.email ?? "Unknown"}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          user.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {user.issues.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.issues.map((issue) => (
                            <span
                              key={issue}
                              className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800"
                            >
                              {issueLabels[issue]}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">No issues</span>
                      )}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-900">{clientsCount}</td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#eb7001] text-white duration-200 hover:bg-amber-600"
                          onClick={() => openModal("editUser", user.id)}
                          aria-label={`Edit ${user.fullName}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-300 bg-red-50 text-red-600 duration-200 hover:bg-red-100"
                          onClick={() => openModal("deleteUser", user.id)}
                          aria-label={`Delete ${user.fullName}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
