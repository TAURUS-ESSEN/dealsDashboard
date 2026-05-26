import { useCallback, useState } from "react";

import type { Modal, ModalType } from "../types/ui";

export const useModal = () => {
  const [modal, setModal] = useState<Modal>({ isOpen: false, type: null, id: null });

  const openModal = useCallback((modalType: ModalType | null, id: string | null = null): void => {
    setModal({ isOpen: true, type: modalType, id });
  }, []);

  const closeModal = useCallback((): void => {
    setModal({ isOpen: false, type: null, id: null });
  }, []);

  return { modal, openModal, closeModal };
};
