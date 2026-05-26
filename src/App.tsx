import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useLoadInitialData } from "./hooks/useLoadInitialData";
import { useFilters } from "./hooks/useFilters";
import { useDashboardActions } from "./hooks/useDashboardActions";
import { useToasts } from "./hooks/useToasts";
import { useModal } from "./hooks/useModal";
import { useUserActions } from "./hooks/useUserActions";

import type { DashboardRow } from "./types/dashboardRow";
import type { DetailedInfo } from "./types/ui";

import { DashboardDetails } from "./components/dashboard/DashboardDetails";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { ModalHost } from "./components/modal/ModalHost";
import { Toasts } from "./components/Toasts";

import { buildDashboardRows } from "./features/Dashboard/buildDashboardRows";
import { filterDashboardRows } from "./features/Dashboard/filterDashboardRows";
import { buildDetailedInfo } from "./features/Dashboard/buildDetailedInfo";

// import { DebugInfo } from "./components/DebugInfo";

export const App = () => {
  const { refreshData, errors, clients, users, deals, tasks } = useLoadInitialData();
  const { filters, handleFiltersState, sortBy, sortDirection, onPreset, sortColumn } = useFilters();
  const { toasts, createToast, removeToast } = useToasts();
  const { modal, openModal, closeModal } = useModal();
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const [detailedDealId, setDetailedDealId] = useState<string | null>(null);
  const tableData: DashboardRow[] = buildDashboardRows(clients, users, deals, tasks);
  const filteredData: DashboardRow[] = filterDashboardRows(tableData, filters);

  const detailedInfo: DetailedInfo | null = buildDetailedInfo(
    detailedDealId,
    tasks,
    clients,
    tableData,
    deals,
  );

  const { handleSaveClient, handleCreateDeal, handleUpdateDeal, handleTaskInfo, handleDeleteOptions } =
    useDashboardActions({
      detailedInfo,
      createToast,
      refreshData,
      clearDetailedDeal: () => setDetailedDealId(null),
    });

  const onShow = (id: string): void => {
    setDetailedDealId(id);
    setActiveRow(id);
  };

  const { handleUser, handleDeleteUser } = useUserActions({createToast, refreshData});

  const closeDetails = useCallback((): void => {
    setDetailedDealId(null);
    setActiveRow(null);
  }, []);
  const isDetailsOpen: boolean = Boolean(detailedInfo?.row);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      closeDetails();
    }
  }, [location.pathname, closeDetails]);
 
  return (
    <>
      <Toasts toasts={toasts} removeToast={removeToast} />
      <main className="flex gap-2 ">
        <DashboardSidebar openModal={openModal} users={users} />
        <Outlet
          context={{
            onPreset,
            filters,
            filteredData,
            users,
            clients,
            handleFiltersState,
            activeRow,
            onShow,
            sortBy,
            sortDirection,
            sortColumn,
            isDetailsOpen,
            openModal,
          }}
        />
        <DashboardDetails detailedInfo={detailedInfo} openModal={openModal} closeDetails={closeDetails} />
      </main>

      {/* <DebugInfo users={users} clients={clients}  deals={deals} tasks={tasks} errors={errors}/> */}

      <ModalHost
        modal={modal}
        closeModal={closeModal}
        detailedInfo={detailedInfo}
        onSaveClient={handleSaveClient}
        onUpdateDeal={handleUpdateDeal}
        onCreateDeal={handleCreateDeal}
        onSaveTask={handleTaskInfo}
        onDelete={handleDeleteOptions}
        onSaveUser={handleUser}
        onDeleteUser={handleDeleteUser}
        users={users}
        clients={clients}
      />
    </>
  );
};
