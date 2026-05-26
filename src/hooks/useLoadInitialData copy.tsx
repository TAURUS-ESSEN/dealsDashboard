import { useEffect, useState } from "react";
import type { Client } from "../types/client";
import type { User } from "../types/users";
import type { Deal } from "../types/deals";
import type { Task } from "../types/tasks";
import type { ApiErrors } from "../types/api";
import { loadClients } from "../normalized/normalizedClients";

import { loadUsers } from "../normalized/normalizeUsers";
import { loadDeals } from "../normalized/normalizedDeals";
import { loadTasks } from "../normalized/normalizeTasks";

export const useLoadInitialData = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ApiErrors>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedClientsData: Client[] = await loadClients();
        setClients(fetchedClientsData);
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, clients: "Error by loading clients data" }));
          console.log(`Error by loading clients data - ${error.message}`);
        }
      }

      try {
        const fetchedUsersData: User[] = await loadUsers();
        setUsers(fetchedUsersData);
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, users: "Error by loading users data" }));
          console.log(`Error by loading users data - ${error.message}`);
        }
      }

      try {
        const fetchedDealsData: Deal[] = await loadDeals();
        setDeals(fetchedDealsData);
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, deals: "Error by loading deals data" }));
          console.log(`Error by loading deals data - ${error.message}`);
        }
      }

      try {
        const fetchedTaskData: Task[] = await loadTasks();
        setTasks(fetchedTaskData);
        setIsLoading(true)
      } catch (error) {
        if (error instanceof Error) {
          setErrors((prev) => ({ ...prev, tasks: "Error by loading tasks data" }));
          console.log(`Error by loading tasks data - ${error.message}`);
        }
      } 
      finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      const fetchedClientsData: Client[] = await loadClients();
      setClients(fetchedClientsData);
      const fetchedUsersData: User[] = await loadUsers();
      setUsers(fetchedUsersData);
      const fetchedDealsData: Deal[] = await loadDeals();
      setDeals(fetchedDealsData);
      const fetchedTaskData: Task[] = await loadTasks();
      setTasks(fetchedTaskData);
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, refresh: "Error by resfreshing data" }));
        console.log(`Error by refreshing data - ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    refreshData,
    errors,
    clients,
    users,
    deals,
    tasks,
    isLoading,
  };
};
