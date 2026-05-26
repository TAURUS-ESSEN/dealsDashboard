import type { Client, NewClient, ClientToSave, NewClientToSave } from "../types/client";
import { createClientApi, editClientApi } from "../api/clientsApi";
import type { Deal, DealToSave, NewDealToSave, NewDealFormState, DealWithClientToSave } from "../types/deals";
import type { NewTaskToSave, Task } from "../types/tasks";
import { editDealApi, createDealApi, deleteDealApi } from "../api/dealsApi";
import type { DetailedInfo, ToastType } from "../types/ui";
import {
  mapClientToSaveData,
  mapDealToSaveData,
  mapTaskToSaveData,
  mapNewDealToSaveData,
  mapNewDealWithClientToSaveData,
} from "../utils/mapToApiData";
import { editTaskApi, createTaskApi, deleteTaskApi } from "../api/tasksApi";
type UseDashboardActionsArgs = {
  detailedInfo: DetailedInfo | null;
  createToast: (message: string, type: ToastType) => void;
  refreshData: () => Promise<void>;
  clearDetailedDeal: () => void;
};

export const useDashboardActions = ({
  detailedInfo,
  createToast,
  refreshData,
  clearDetailedDeal,
}: UseDashboardActionsArgs) => {
  const handleSaveClient = async (id: string | null, client: Client | NewClient): Promise<void> => {
    let toastMessage = "";
    let toastType: ToastType = "update";

    if (id === null) {
      if (!detailedInfo?.deal || !client.clientKey) return;

      await createClientApi(client as NewClientToSave);
      const updatedDeal = {
        ...detailedInfo.deal,
        clientKey: client.clientKey,
      };

      const data: DealToSave = mapDealToSaveData(updatedDeal);
      await editDealApi(detailedInfo.deal.id, data);
      toastMessage = "Client successfully created";
      toastType = "create";
    } else {
      const data = mapClientToSaveData(client as Client);
      await editClientApi(id, data as ClientToSave);
      toastMessage = "Client successfully updated";
    }

    await refreshData();
    createToast(toastMessage, toastType);
  };

  const handleCreateDeal = async (data: NewDealFormState): Promise<void> => {
    if (data.clientType === "old") {
      const deal = mapNewDealToSaveData(data as NewDealFormState);
      await createDealApi(deal);
    }

    if (data.clientType === "new") {
      const dealAndClient: DealWithClientToSave = mapNewDealWithClientToSaveData(data);
      await createClientApi(dealAndClient.newClient);

      await createDealApi(dealAndClient.newDeal);
    }
    await refreshData();
    createToast("Deal successfully created", "create");
  };

  const handleUpdateDeal = async (id: string, deal: Deal): Promise<void> => {
    const data = mapDealToSaveData(deal as Deal);
    await editDealApi(id, data);

    await refreshData();
    createToast("Deal successfully updated", "update");
  };

  const handleTaskInfo = async (id: string | null, task: Task | NewTaskToSave): Promise<void> => {
    const data = mapTaskToSaveData(task as Task);
    let toastMessage = "Task successfully updated";
    let toastType: ToastType = "update";

    if (id !== null) {
      await editTaskApi(id, data);
    } else {
      console.log(id, data);
      await createTaskApi(data);
      toastMessage = "Task successfully created";
      toastType = "create";
    }

    await refreshData();
    createToast(toastMessage, toastType);
  };

  const handleDeleteOptions = async (id: string, mode: "deal" | "task"): Promise<void> => {
    let toastMessage = "";

    if (mode === "deal") {
      if (!detailedInfo?.deal) return;

      await Promise.all(detailedInfo.dealTasks.map((task) => deleteTaskApi(task.id)));

      await deleteDealApi(id);
      clearDetailedDeal();
      toastMessage = "Deal and related tasks deleted";
    }
    if (mode === "task") {
      await deleteTaskApi(id);
      toastMessage = "Task successfully deleted";
    }

    await refreshData();
    createToast(toastMessage, "delete");
  };
  return {
    handleSaveClient,
    handleCreateDeal,
    handleUpdateDeal,
    handleTaskInfo,
    handleDeleteOptions,
  };
};
