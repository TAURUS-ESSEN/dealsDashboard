import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
  title: string;
  children: ReactNode;
  closeModal: () => void;
};

export const Modal = ({ title, children, closeModal }: Props) => {
  const modalRoot = document.getElementById("root-modal");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [closeModal]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className="modalOverlay"
      onClick={(e) => {
        e.currentTarget === e.target && closeModal();
      }}
    >
      <div className="modalContent" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modalTopbar">
          <h3 id="modal-title" className="modalTitle">
            {title}
          </h3>
          <button type="button" className="modalCloseButton" onClick={closeModal} aria-label="Close dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};
