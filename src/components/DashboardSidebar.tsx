import { Link, NavLink, useLocation } from "react-router-dom";
import type { ModalType } from "../types/ui";
import type { User } from "../types/users";

type Props = {
  openModal: (modalType: ModalType | null, id: null | string) => void;
  users: User[];
};
import { Users, TriangleAlert, Plus, List } from "lucide-react";

export const DashboardSidebar = ({ openModal, users }: Props) => {
  const location = useLocation();
  const actionByPath: Partial<
    Record<
      string,
      {
        label: string;
        modalType: ModalType;
      }
    >
  > = {
    "/": {
      label: "New Deal",
      modalType: "createDeal",
    },
    "/clients": {
      label: "New Client",
      modalType: "addClient",
    },
    "/users": {
      label: "New Manager",
      modalType: "createUser",
    },
  };
  const primaryAction = actionByPath[location.pathname];

  return (
    <div className="bg-[#192026] text-white   w-45 px-3 text-lg">
      <div className="mt-1 mb-4 text-center font-bold">
        <Link to="/">Pipeline CRM</Link>
      </div>
      <div className="flex items-center gap-1 my-5">
        <button
          className="flex gap-1 w-full justify-center bg-[#eb7001] text-white p-2 rounded hover:bg-amber-700 duration-300"
          onClick={() => openModal(primaryAction.modalType, null)}
        >
          <Plus width={18} />
          {primaryAction.label}
        </button>
      </div>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 my-2 ${location.pathname === "/" || isActive ? "sidebarActive" : ""}`
          }
        >
          <List /> <span>Deals</span>
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/users"
          className={({ isActive }) => `flex items-center gap-2 my-2 ${isActive ? "sidebarActive" : ""}`}
        >
          <Users /> <span>Managers</span>
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/clients"
          className={({ isActive }) => `flex items-center gap-2 my-2 ${isActive ? "sidebarActive" : ""}`}
        >
          <Users /> <span>Clients</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-2 my-2">
        <TriangleAlert /> <span>Problems</span>
      </div>
    </div>
  );
};
