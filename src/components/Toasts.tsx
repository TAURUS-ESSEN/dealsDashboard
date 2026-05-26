import { createPortal } from "react-dom";
import { CheckCircle2, Pencil, Trash2, X } from "lucide-react";
import { useEffect } from "react";

import type { Toast, ToastType } from "../types/ui";

type Props = {
  toasts: Toast[];
  removeToast: (id: number) => void;
};

const toastMeta: Record<ToastType, { title: string; Icon: typeof CheckCircle2 }> = {
  create: { title: "Created", Icon: CheckCircle2 },
  update: { title: "Updated", Icon: Pencil },
  delete: { title: "Deleted", Icon: Trash2 },
};

const toastClass: Record<ToastType, string> = {
  create: "toast--create",
  update: "toast--update",
  delete: "toast--delete",
};

export const Toasts = ({ toasts, removeToast }: Props) => {
  const toastRoot = document.getElementById("root-toast");

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      removeToast(toasts[0].id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  if (!toastRoot) return null;

  return createPortal(
    toasts.length > 0 && (
      <div className="toastStack toastStackShow">
        {toasts.map((toast) => {
          const { title, Icon } = toastMeta[toast.type];

          return (
            <article className={`toast ${toastClass[toast.type]}`} key={toast.id}>
              <div className="toastIcon">
                <Icon size={16} aria-hidden="true" />
              </div>
              <div className="toastContent">
                <p className="toastTitle">{title}</p>
                <p className="toastMessage">{toast.message}</p>
              </div>
              <button
                className="toastCloseButton"
                type="button"
                aria-label="Close notification"
                onClick={() => removeToast(toast.id)}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </article>
          );
        })}
      </div>
    ),
    toastRoot,
  );
};
