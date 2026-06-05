import type { Client, NewClient, NewClientToSave } from "../types/client";
import { createClientApi, editClientApi } from "../api/clientsApi";
import type { Deal, DealToSave, NewDealFormState, DealWithClientToSave } from "../types/deals";
import type { NewTaskToSave, Task } from "../types/tasks";
import { editDealApi, createDealApi, deleteDealApi } from "../api/dealsApi";
import type { DetailedInfo, ToastType } from "../types/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  clearDetailedDeal: () => void;
};

export const useDashboardActions = ({
  detailedInfo,
  createToast,
  clearDetailedDeal,
}: UseDashboardActionsArgs) => {
  const queryClient = useQueryClient();

  const createClientMutation = useMutation({
    mutationFn: createClientApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const editClientMutation = useMutation({
    mutationFn: editClientApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const createDealMutation = useMutation({
    mutationFn: createDealApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const editDealMutation = useMutation({
    mutationFn: editDealApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const deleteDealMutation = useMutation({
    mutationFn: deleteDealApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] }),
  });

  const createTaskMutation = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const editTaskMutation = useMutation({
    mutationFn: editTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleSaveClient = async (id: string | null, client: Client | NewClient): Promise<void> => {
    let toastMessage = "";
    let toastType: ToastType = "update";

    if (id === null) {
      if (!detailedInfo?.deal || !client.clientKey) return;

      await createClientMutation.mutateAsync(client as NewClientToSave);
      const updatedDeal = {
        ...detailedInfo.deal,
        clientKey: client.clientKey,
      };

      const data: DealToSave = mapDealToSaveData(updatedDeal);
      await editDealMutation.mutateAsync({ id: detailedInfo.deal.id, updatedDeal: data });
      toastMessage = "Client successfully created";
      toastType = "create";
    } else {
      const data = mapClientToSaveData(client as Client);
      await editClientMutation.mutateAsync({ id, updatedClient: data });
      toastMessage = "Client successfully updated";
    }

    createToast(toastMessage, toastType);
  };

  const handleCreateDeal = async (data: NewDealFormState): Promise<void> => {
    if (data.clientType === "old") {
      const deal = mapNewDealToSaveData(data as NewDealFormState);
      await createDealMutation.mutateAsync(deal);
    }

    if (data.clientType === "new") {
      const dealAndClient: DealWithClientToSave = mapNewDealWithClientToSaveData(data);
      await createClientMutation.mutateAsync(dealAndClient.newClient);

      await createDealMutation.mutateAsync(dealAndClient.newDeal);
    }
    createToast("Deal successfully created", "create");
  };

  const handleUpdateDeal = async (id: string, deal: Deal): Promise<void> => {
    const data = mapDealToSaveData(deal as Deal);
    await editDealMutation.mutateAsync({ id, updatedDeal: data });

    createToast("Deal successfully updated", "update");
  };

  const handleTaskInfo = async (id: string | null, task: Task | NewTaskToSave): Promise<void> => {
    const data = mapTaskToSaveData(task as Task);
    let toastMessage = "Task successfully updated";
    let toastType: ToastType = "update";

    if (id !== null) {
      await editTaskMutation.mutateAsync({ id, updatedTask: data });
    } else {
      await createTaskMutation.mutateAsync(data);
      toastMessage = "Task successfully created";
      toastType = "create";
    }

    createToast(toastMessage, toastType);
  };

  const handleDeleteOptions = async (id: string, mode: "deal" | "task"): Promise<void> => {
    let toastMessage = "";

    if (mode === "deal") {
      if (!detailedInfo?.deal) return;

      await Promise.all(detailedInfo.dealTasks.map((task) => deleteTaskMutation.mutateAsync(task.id)));
      await deleteDealMutation.mutateAsync(id);
      clearDetailedDeal();
      toastMessage = "Deal and related tasks deleted";
    }
    if (mode === "task") {
      await deleteTaskMutation.mutateAsync(id);
      toastMessage = "Task successfully deleted";
    }

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
