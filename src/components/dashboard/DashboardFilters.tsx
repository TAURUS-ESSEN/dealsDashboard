import { VALID_DEAL_STAGES } from "../../constants/defaults";

import type { ChangeEvent } from "react";
import type { Filters } from "../../types/ui";
import type { User } from "../../types/users";

type Props = {
  onChangeFilters: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  filters: Filters;
  users: User[];
};

export const DashboardFilters = ({ onChangeFilters, filters, users }: Props) => {
  return (
    <>
      <div className="py-2 my-2 flex gap-4 items-center">
        <input
          className="w-70"
          name="searchRequest"
          placeholder="Search deals"
          onChange={onChangeFilters}
          value={filters.searchRequest ? filters.searchRequest : ""}
        />

        <select className="p-1 w-40" name="stage" onChange={onChangeFilters} id="stage" value={filters.stage}>
          <option value="all">All stages</option>
          {VALID_DEAL_STAGES.map((stage, index) => (
            <option key={index}>{stage}</option>
          ))}
        </select>

        <select className="p-1 w-40 border rounded" name="owner" onChange={onChangeFilters} value={filters.owner}>
          <option value={"all"}>All owners</option>
          {users.map((user) => (
            <option key={user.userKey} value={user.userKey}>
              {user.fullName}
            </option>
          ))}
        </select>

        <label className="flex gap-1 text-white">
          <input type="checkbox" name="overdue" checked={filters.overdue} onChange={onChangeFilters} />
          has overdue task
        </label>
        {filters.overdue}
      </div>
    </>
  );
};
