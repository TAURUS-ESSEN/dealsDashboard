import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import { defaultClientState } from "../../constants/fallBacks";
import { nanoid } from "nanoid";
import { Modal } from "./Modal";
import { useEffect } from "react";
import {
  type Client,
  type ClientFormState,
  type ClientSubmitData,
  clientFormSchema,
} from "../../types/client";

import { createRenderErrors } from "../../utils/renderErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapClientToFormState } from "../../utils/mapToApiData";
import { ClientFields } from "./ClientFields";

type Props =
  | {
      closeModal: () => void;
      mode: "create";
      onSave: (id: string | null, client: ClientSubmitData) => Promise<void>;
    }
  | {
      closeModal: () => void;
      mode: "edit";
      client: Client;
      onSave: (id: string | null, client: ClientSubmitData) => Promise<void>;
    };

export const ClientFormModal = (props: Props) => {
  const { closeModal, mode, onSave } = props;
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formData = useMemo<ClientFormState>(() => {
    return mode === "edit" ? mapClientToFormState(props.client) : defaultClientState;
  }, [mode, mode === "edit" ? props.client : null]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<ClientFormState>({ mode: "onTouched", resolver: zodResolver(clientFormSchema) });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const renderErrors = createRenderErrors<ClientFormState>(errors);

  const onSubmit = async (data: ClientFormState) => {
    const id = mode === "edit" && props.client ? props.client.id : null;
    const clientToSave: ClientSubmitData = {
      ...data,
      clientKey: mode === "create" ? `cl_${nanoid(8)}` : (props.client.clientKey ?? ""),
      ownerKey: mode === "create" ? "" : (props.client.ownerKey ?? ""),
      createdAt: mode === "create" ? new Date().toISOString().slice(0, 10) : (props.client.createdAt ?? ""),
      tags: mode === "create" ? [] : (props.client.tags ?? []),
    };

    try {
      await onSave(id, clientToSave);
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(
          mode === "edit"
            ? "Failed to update client. Please try again."
            : "Failed to create client. Please try again.",
        );
      }
    }
  };

  return (
    <>
      <Modal title={mode === "edit" ? "Edit client" : "Add client info"} closeModal={closeModal}>
        <div className="flex justify-center text-red-600">{submitError}</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <ClientFields register={register} renderErrors={renderErrors} />

          <div className="sticky bottom-0 -mx-4 -mb-4 flex justify-end gap-2 border-t border-gray-200 bg-slate-50 px-4 py-3">
            <button type="button" className="btnCancel" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" disabled={!isDirty || isSubmitting} className="btnSave">
              {mode === "edit" ? "Save Changes" : "Add info"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
