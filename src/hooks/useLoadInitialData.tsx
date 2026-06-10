import { useEffect, useState} from "react";
import type { Client } from "../types/client";
import type { User } from "../types/users";
import type { Deal } from "../types/deals";
import type { Task } from "../types/tasks";
import type { InitialDataErrors } from "../types/api";
import { loadClients } from "../normalized/normalizedClients";

import { loadUsers } from "../normalized/normalizeUsers";
import { loadDeals } from "../normalized/normalizedDeals";
import { loadTasks } from "../normalized/normalizeTasks";
import { useQuery } from "@tanstack/react-query";

export const useLoadInitialData = () => {
  const [loadingErrors, setLoadingErrors] = useState<InitialDataErrors>({});

  const {
    data: clients = [],
    error: clientsError,
    isError: isClientsError,
    isPending: clientsPending,
    isFetching: clientsFetching,
  } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: loadClients,
  });

  const {
    data: deals = [],
    error: dealsError,
    isError: isDealsError,
    isPending: dealsPending,
     isFetching: dealsFetching,
  } = useQuery<Deal[]>({
    queryKey: ["deals"],
    queryFn: loadDeals,
  });

  const {
    data: tasks = [],
    error: tasksError,
    isError: isTasksError,
    isPending: tasksPending,
    isFetching: tasksFetching,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: loadTasks,
  });

  const {
    data: users = [],
    error: usersError,
    isError: isUsersError,
    isPending: usersPending,
    isFetching: usersFetching,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: loadUsers,
  });

  useEffect(() => {
    const nextErrors: InitialDataErrors = {};

    if (isClientsError && clientsError) {
      nextErrors.clients = `Error by loading clients data - ${clientsError.message}`;
    }

    if (isDealsError && dealsError) {
      nextErrors.deals = `Error by loading deals data - ${dealsError.message}`;
    }

    if (isTasksError && tasksError) {
      nextErrors.tasks = `Error by loading tasks data - ${tasksError.message}`;
    }

    if (isUsersError && usersError) {
      nextErrors.users = `Error by loading users data - ${usersError.message}`;
    }

     setLoadingErrors(nextErrors);
  }, [
    isClientsError,
    clientsError,
    isDealsError,
    dealsError,
    isTasksError,
    tasksError,
    isUsersError,
    usersError,
  ]);
 
  const isLoading = clientsPending || dealsPending || tasksPending || usersPending;
  const isFetching = clientsFetching || dealsFetching || tasksFetching || usersFetching
  const isBackgroundFetching = !isLoading && isFetching;

  return {
    loadingErrors,
    clients,
    users,
    deals,
    tasks,
    isLoading,
    isBackgroundFetching
  };
};
