import { ClientsTableRender } from "../components/debug/ClientsTableRender";
import { UsersTableRender } from "../components/debug/UsersTableRender";
import { DealsTableRender } from "../components/debug/DealsTableRender";
import { TasksTableRender } from "../components/debug/TasksTableRender";
import type { User } from "../types/users";
import type { Client } from "../types/client";
import type { Task } from "../types/tasks";
import type { Deal } from "../types/deals";
import type { ApiErrors } from "../types/api";
type Props = {
  users: User[];
  clients: Client[];
  tasks: Task[];
  deals: Deal[];
  errors: ApiErrors;
};
export const DebugInfo = ({ users, clients, deals, tasks, errors }: Props) => {
  return (
    <div className="flex flex-col">
      <ClientsTableRender clients={clients} errors={errors} />
      <UsersTableRender users={users} errors={errors} />
      <DealsTableRender deals={deals} errors={errors} />
      <TasksTableRender tasks={tasks} errors={errors} />
    </div>
  );
};
