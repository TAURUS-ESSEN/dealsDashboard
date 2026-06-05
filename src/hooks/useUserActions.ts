import { mapUserToSaveData, mapNewUserToSaveData } from "../utils/mapToApiData";
import { createUserApi, deleteUserApi, editUserApi } from "../api/usersApi";
import type { EmptyUser, User } from "../types/users";
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

  const handleUser = async (data: User | EmptyUser): Promise<void> => {
    let toastMessage = "";
    let toastType: ToastType = "update";
    if ("id" in data) {
      const user = mapUserToSaveData(data as User);
      await editUserMutation.mutateAsync({ id: user.id, updatedUser: user });
      toastMessage = "Manager successfully updated";
    } else {
      const newUser = mapNewUserToSaveData(data);
      await createUserMutation.mutateAsync(newUser);
      toastMessage = "Manager successfully created";
      toastType = "create";
    }
    createToast(toastMessage, toastType);
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    await deleteUserMutation.mutateAsync(id);
    createToast("User successfully deleted", "delete");
  };
  return {
    handleUser,
    handleDeleteUser,
  };
};
