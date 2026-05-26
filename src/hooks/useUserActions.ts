import { mapUserToSaveData, mapNewUserToSaveData } from "../utils/mapToApiData";
import { createUserApi, deleteUserApi, editUserApi } from "../api/usersApi";
import type { EmptyUser, User, UserToSave } from "../types/users";

import type { ToastType } from "../types/ui";
type Props = {
  createToast: (message: string, type: ToastType) => void;
  refreshData: () => Promise<void>;
};

export const useUserActions = ({ createToast, refreshData }: Props) => {
  const handleUser = async (data: User | EmptyUser): Promise<void> => {
    let toastMessage = "";
    let toastType: ToastType = "update";
    if ("id" in data) {
      const user = mapUserToSaveData(data as User);
      await editUserApi(user.id, user as UserToSave);
      toastMessage = "Manager successfully updated";
    } else {
      const newUser = mapNewUserToSaveData(data);
      await createUserApi(newUser);
      console.log(data);
      toastMessage = "Manager successfully created";
      toastType = "create";
    }
    await refreshData();
    createToast(toastMessage, toastType);
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    await deleteUserApi(id);
    await refreshData();
    createToast("User successfully deleted", "delete");
  };
  return {
    handleUser,
    handleDeleteUser,
  };
};
