import { UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";
import { VALID_CLIENT_STATUSES } from "../../constants/defaults";
import { ClientFormState } from "../../types/client";
type Props = {
  register: UseFormRegister<ClientFormState>;
  renderErrors: (name: keyof ClientFormState) => ReactNode | null;
};

export const ClientFields = ({ register, renderErrors }: Props) => {
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-3 text-xs font-bold uppercase text-gray-500">Client profile</p>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
            Company
            <input {...register("company")} placeholder="Acme Corp" />
          </label>
          {renderErrors("company")}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Industry
              <input {...register("industry")} placeholder="SaaS" />
            </label>

            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Status
              <select {...register("status")}>
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
            <input {...register("email")} placeholder="contact@acme.io" />
          </label>
          {renderErrors("email")}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Phone
              <input {...register("phone")} placeholder="+1 415 555 0198" />
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
    </>
  );
};
