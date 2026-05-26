import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";
import type { ModalType } from "../types/ui";
import type { User } from "../types/users";
import type { Client } from "../types/client";

type Props = {
  openModal: (modalType: ModalType | null, id: null | string) => void;
  users: User[];
  clients: Client[];
};

export const ClientsList = () => {
  const { openModal, users, clients }: Props = useOutletContext();

  const clientsMapByUser = useMemo(() => {
    const map = new Map<string, Client[]>();

    for (const client of clients) {
      if (!client.ownerKey) continue;

      const prev = map.get(client.ownerKey);
      prev === undefined ? map.set(client.ownerKey, [client]) : prev.push(client);
    }

    return map;
  }, [clients]);
  return (
    <div >
      <h2 className="text-orange-400">Client management module is planned</h2>
    </div>
  );
};
