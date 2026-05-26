import { useForm } from "react-hook-form";
import { emptyClient } from "../../constants/fallBacks";
import { nanoid } from "nanoid";
import { Modal } from "./Modal";
import { useEffect } from "react";
import type { Client, NewClient, EmptyClient } from "../../types/client";
import { VALID_CLIENT_STATUSES } from "../../constants/defaults";
import {createRenderErrors} from '../../utils/renderErrors'

type Props =
  | {
      closeModal: () => void;
      mode: "create";
      onSave: (id: string | null, client: NewClient | Client) => Promise<void>;
    }
  | {
      closeModal: () => void;
      mode: "edit";
      client: Client;
      onSave: (id: string | null, client: NewClient | Client) => Promise<void>;
    };

export const ClientFormModal = (props: Props) => {
  const { closeModal, mode, onSave } = props;
  const formData = mode === "edit" ? props.client : emptyClient;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
    reset,
  } = useForm<EmptyClient | Client>({ mode: "onTouched" });

  useEffect(() => {
    reset(formData);
  }, []);


  const renderErrors = createRenderErrors<EmptyClient>(errors);

  const onSubmit = async (data: EmptyClient | Client) => {
    const id = mode === "edit" && props.client ? props.client.id : null;

    if (mode === "create") {
      data.clientKey = `cl_${nanoid(8)}`;
      data.ownerKey = "";
      data.createdAt = new Date().toISOString().slice(0, 10);
      data.tags = [];
    }
    await onSave(id, data as Client);
    closeModal();
  };

  return (
    <>
      <Modal title={mode === "edit" ? "Edit client" : "Add client info"} closeModal={closeModal}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="mb-3 text-xs font-bold uppercase text-gray-500">Client profile</p>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                Company
                <input {...register("company", { required: "Company is required" })} placeholder="Acme Corp" />
              </label>
              {renderErrors("company")}

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                  Industry
                  <input {...register("industry", { required: "Industry is required" })} placeholder="SaaS" />
                </label>

                <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                  Status
                  <select {...register("status", { required: "Status is required" })}>
                    {VALID_CLIENT_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>
              {renderErrors("industry")}
              {renderErrors("status")}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="mb-3 text-xs font-bold uppercase text-gray-500">Contact</p>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                Email
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                      message: "Not valid Email",
                    },
                  })}
                  placeholder="contact@acme.io"
                />
              </label>
              {renderErrors("email")}

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                  Phone
                  <input {...register("phone", { required: "Phone is required" })} placeholder="+1 415 555 0198" />
                </label>

                <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                  Last contact
                  <input type="date" {...register("lastContactAt")} />
                </label>
              </div>
              {renderErrors("phone")}

              <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                Notes
                <textarea {...register("notes")} placeholder="Notes" rows={3} />
              </label>
            </div>
          </div>

          <div className="sticky bottom-0 -mx-4 -mb-4 flex justify-end gap-2 border-t border-gray-200 bg-slate-50 px-4 py-3">
            <button type="button" className="btnCancel" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="btnSave"
            >
              {mode === "edit" ? "Save Changes" : "Add info"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
