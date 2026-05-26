import { useCallback, useState } from "react";

import type { Toast, ToastType } from "../types/ui";

export const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const createToast = useCallback((message: string, type:ToastType): void => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, createToast, removeToast };
};
