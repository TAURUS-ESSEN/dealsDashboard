import { type ChangeEvent, useState } from "react";
import type { Filters, Presets } from "../types/ui";
import { DEFAULT_FILTER_VALUES } from "../constants/defaults";

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTER_VALUES);

  const handleFiltersState = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    let { value, name } = e.currentTarget;
    const key = name as keyof Filters;
    if (key === "searchRequest") value = value.toLowerCase();

    if (key === "overdue") {
      const checked = (e.currentTarget as HTMLInputElement).checked;
      setFilters((prev) => ({ ...prev, overdue: checked }));
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [key]: key === "searchRequest" ? value.toLowerCase() : value,
    }));
  };

  const sortBy = (name: string) => {
    setFilters((prev) => {
      let newDirection: "asc" | "desc" = "asc";
      if (prev.sortBy === name) {
        newDirection = prev.sortDirection === "asc" ? "desc" : "asc";
      }
      const newState = { ...prev, sortBy: name, sortDirection: newDirection };
      return newState;
    });
  };

  const onPreset = (presetName: Presets) => {
    setFilters(DEFAULT_FILTER_VALUES);
    setFilters((prev) => ({ ...prev, activePreset: presetName }));
  };

  const sortDirection = filters.sortDirection;
  const sortColumn = filters.sortBy
  return { filters, handleFiltersState, sortBy, onPreset, sortDirection, sortColumn  };
};
