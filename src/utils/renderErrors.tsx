import type { ReactNode } from "react";

type FieldError = {
  message?: string;
};

export function createRenderErrors<T extends object>(
  errors: Partial<Record<keyof T, FieldError>>
) {
  return function renderErrors(name: keyof T): ReactNode | null {
    const error = errors[name];

    if (!error?.message) return null;

    return <div className="modalError">{error.message}</div>;
  };
}