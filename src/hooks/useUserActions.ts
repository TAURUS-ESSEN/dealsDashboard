import { mapUserToSaveData, mapNewUserToSaveData } from "../utils/mapToApiData";
import { createUserApi, deleteUserApi, editUserApi } from "../api/usersApi";
import type { UserSubmitData } from "../types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ToastType } from "../types/ui";

type Props = {
  createToast: (message: string, type: ToastType) => void;
};

export const useUserActions = ({ createToast }: Props) => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const editUserMutation = useMutation({
    mutationFn: editUserApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleUser = async (id: string | null, data: UserSubmitData): Promise<void> => {
    let toastMessage = "";
    let toastType: ToastType = "update";
    if (id !== null) {
      try {
        const user = mapUserToSaveData(data);
        await editUserMutation.mutateAsync({ id, updatedUser: user });
        toastMessage = "Manager successfully updated";
      } catch (error) {
        createToast("Failed to update manager", "error");
        throw error;
      }
    } else {
      try {
        const newUser = mapNewUserToSaveData(data);
        await createUserMutation.mutateAsync(newUser);
        toastMessage = "Manager successfully created";
        toastType = "create";
      } catch (error) {
        createToast("Failed to create manager", "error");
        throw error;
      }
    }
    createToast(toastMessage, toastType);
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      await deleteUserMutation.mutateAsync(id);
      createToast("User successfully deleted", "delete");
    } catch (error) {
      createToast("Failed to delete manager", "error");
      throw error;
    }
  };
  return {
    handleUser,
    handleDeleteUser,
  };
};
