import { DashboardTable } from "../components/dashboard/DashboardTable";
import { DashboardFilters } from "../components/dashboard/DashboardFilters";
import { DashboardSummary } from "../components/dashboard/DashboardSummary";
import { DashboardPresets } from "../components/dashboard/DashboardPresets";
import { DashboardPagination } from "../components/dashboard/DashboardPagination";
import { usePagination } from "../hooks/usePagination";
import { useOutletContext, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import type { ChangeEvent } from "react";
import type { Filters, Presets } from "../types/ui";
import type { DashboardRow } from "../types/dashboardRow";
import type { User } from "../types/users";

type Props = {
  onPreset: (value: Presets) => void;
  filters: Filters;
  filteredData: DashboardRow[];
  users: User[];
  activeRow: string | null;
  onShow: (id: string) => void;
  sortBy: (name: string) => void;
  sortDirection: "asc" | "desc";
  sortColumn: string | null;
  isDetailsOpen: boolean;
  handleFiltersState: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isLoading:boolean
};

export const DashboardMain = ({}: Props) => {
  const {
    onPreset,
    filters,
    filteredData,
    handleFiltersState,
    activeRow,
    onShow,
    sortBy,
    sortDirection,
    sortColumn,
    isDetailsOpen,
    users,
    isLoading,
  }: Props = useOutletContext();
  
  const { page, pageSize, totalPages, startIndex, endIndex, startItem, endItem, setPage, setPageSize } =
    usePagination({ totalItems: filteredData.length });
  const pageRows = filteredData.slice(startIndex, endIndex);
  // const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [
    filters.searchRequest,
    filters.stage,
    filters.owner,
    filters.overdue,
    filters.sortBy,
    filters.sortDirection,
    filters.activePreset,
    setPage,
  ]);

  const handlePageSizeChange = (nextPageSize: number): void => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#282d34] px-2">
      <div className="flex justify-between items-center border-b border-gray-700">
        <DashboardPresets onPreset={onPreset} filters={filters} />
        <DashboardSummary filteredData={filteredData} />
      </div>
      <DashboardFilters onChangeFilters={handleFiltersState} filters={filters} users={users} />
      <DashboardTable
        filteredData={pageRows}
        activeRow={activeRow}
        onShow={onShow}
        sortBy={sortBy}
        sortDirection={sortDirection}
        sortColumn={sortColumn}
        isCompact={isDetailsOpen}
        isLoading = {isLoading}
      />
      <DashboardPagination
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalItems={filteredData.length}
        startItem={startItem}
        endItem={endItem}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};
