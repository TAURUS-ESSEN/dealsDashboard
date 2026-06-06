import { useState, useEffect, useCallback, useMemo } from "react";
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
  const { loadingErrors, clients, users, deals, tasks, isLoading, isBackgroundFetching } = useLoadInitialData();
  const { filters, handleFiltersState, sortBy, sortDirection, onPreset, sortColumn } = useFilters();
  const { toasts, createToast, removeToast } = useToasts();
  const { modal, openModal, closeModal } = useModal();
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const [detailedDealId, setDetailedDealId] = useState<string | null>(null);
  const [isDetailsManuallyClosed, setIsDetailsManuallyClosed] = useState(false);

  const tableData: DashboardRow[] = useMemo(() => {
    return buildDashboardRows(clients, users, deals, tasks);
  }, [clients, users, deals, tasks]);
  const filteredData: DashboardRow[] = useMemo(() => {
    return filterDashboardRows(tableData, filters);
  }, [tableData, filters]);

  useEffect(() => {
    if (isLoading || isDetailsManuallyClosed) return;

    if (filteredData.length === 0) {
      setDetailedDealId(null);
      setActiveRow(null);
      return;
    }

    const selectedRowExists = filteredData.some((row) => row.dealKey === detailedDealId);

    if (!detailedDealId || !selectedRowExists) {
      const firstDealKey = filteredData[0].dealKey;
      setDetailedDealId(firstDealKey);
      setActiveRow(firstDealKey);
    }
  }, [isLoading, filteredData, detailedDealId, isDetailsManuallyClosed]);

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
      clearDetailedDeal: () => setDetailedDealId(null),
    });

  const onShow = (id: string): void => {
    setDetailedDealId(id);
    setActiveRow(id);
  };

  const { handleUser, handleDeleteUser } = useUserActions({ createToast });

  const closeDetails = useCallback((): void => {
    setDetailedDealId(null);
    setActiveRow(null);
    setIsDetailsManuallyClosed(true);
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
        <DashboardSidebar openModal={openModal} />
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
            isLoading,
            loadingErrors,
            isBackgroundFetching
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
