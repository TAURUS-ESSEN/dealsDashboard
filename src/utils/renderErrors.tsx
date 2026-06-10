import type { ReactNode } from "react";

type FieldError = {
  message?: string;
};

type KeysOfUnion<T> = T extends T ? keyof T : never;

export function createRenderErrors<T extends object>(
  errors: Partial<Record<KeysOfUnion<T>, FieldError>>
) {
  return function renderErrors(name: KeysOfUnion<T>): ReactNode | null {
    const error = errors[name];

    if (!error?.message) return null;

    return <div className="modalError">{error.message}</div>;
  };
}
