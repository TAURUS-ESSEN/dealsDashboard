import type { DetailedInfo, Modal } from "../../types/ui";
import type { NewClient, Client } from "../../types/client";
import type { EmptyUser, User } from "../../types/users";
import type { Deal, NewDealToSave, NewDealFormState } from "../../types/deals";
import type { NewTaskToSave, Task } from "../../types/tasks";

import { ClientFormModal } from "./ClientFormModal";
import { DealEditFormModal } from "./DealEditFormModal";
import { TaskFormModal } from "./TaskFormModal";
import { DeleteModal } from "./DeleteModal";
import { DealCreateModal } from "./DealCreateModal";
import { UserEditFormModal } from "./UserEditFormModal";

type Props = {
  closeModal: () => void;
  modal: Modal;
  detailedInfo: DetailedInfo | null;
  users: User[];
  clients: Client[];
  onSaveClient: (id: string | null, client: NewClient | Client) => Promise<void>;
  onSaveTask: (id: string | null, task: NewTaskToSave | Task) => Promise<void>;
  onUpdateDeal: (id: string, deal: Deal) => Promise<void>;
  onSaveUser: (user: User | EmptyUser) => Promise<void>;
  onCreateDeal: (data: NewDealFormState) => Promise<void>;
  onDelete: (id: string, mode: "deal" | "task") => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
};

export const ModalHost = ({
  modal,
  closeModal,
  detailedInfo,
  users,
  clients,
  onSaveClient,
  onUpdateDeal,
  onCreateDeal,
  onSaveTask,
  onSaveUser,
  onDelete,
  onDeleteUser,
}: Props) => {
  // const {modal} = useAppContext()

  switch (modal.type) {
    case "createDeal":
      return (
        <DealCreateModal
          closeModal={closeModal}
          users={users}
          clients={clients}
          onCreateDeal={onCreateDeal}
        />
      );
    case "editUser": {
      const user = users.find((user) => user.id === modal.id);
      if (!user) return null;
      return <UserEditFormModal closeModal={closeModal} user={user} mode="edit" onSaveUser={onSaveUser} />;
    }
    case "createUser": {
      return <UserEditFormModal closeModal={closeModal} mode="create" onSaveUser={onSaveUser} />;
    }
    case "deleteUser": {
      const user = users.find((user) => user.id === modal.id);
      if (!user) return null;
      return (
        <DeleteModal
          title="Delete manager"
          entityName={user.fullName}
          warningText="This will permanently delete the manager"
          onConfirm={() => onDeleteUser(user.id)}
          closeModal={closeModal}
        />
      );
    }
    default:
      break;
  }

  if (!detailedInfo) return null;

  const { client, deal, row, dealTasks } = detailedInfo;

  if (!row) return null;

  switch (modal.type) {
    case "editClient":
      if (!client) return null;
      return <ClientFormModal mode="edit" closeModal={closeModal} client={client} onSave={onSaveClient} />;
    case "addClient":
      return <ClientFormModal mode="create" closeModal={closeModal} onSave={onSaveClient} />;
    case "editTask": {
      const task = dealTasks.find((task) => task.taskKey === modal.id);
      if (!task) return null;
      return <TaskFormModal mode="edit" closeModal={closeModal} task={task} onSave={onSaveTask} />;
    }
    case "addTask":
      return <TaskFormModal mode="create" closeModal={closeModal} row={row} onSave={onSaveTask} />;
    case "deleteTask": {
      const task = dealTasks.find((task) => task.id === modal.id);
      if (!task) return null;
      return (
        <DeleteModal
          title="Delete task"
          entityName={task.title}
          warningText="This will permanently delete the task"
          onConfirm={() => onDelete(task.id, "task")}
          closeModal={closeModal}
        />
      );
    }
    case "editDeal":
      if (!deal) return null;
      return (
        <DealEditFormModal closeModal={closeModal} deal={deal} users={users} onUpdateDeal={onUpdateDeal} />
      );
    case "deleteDeal":
      if (!deal) return null;
      return (
        <DeleteModal
          title="Delete Deal"
          entityName={deal?.title}
          warningText="This will permanently delete the deal"
          onConfirm={() => onDelete(deal.id, "deal")}
          closeModal={closeModal}
        />
      );

    default:
      return null;
  }
};
