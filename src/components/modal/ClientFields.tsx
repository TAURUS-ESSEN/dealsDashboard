import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { VALID_CLIENT_STATUSES } from "../../constants/defaults";

type ClientFieldNames = "company" | "industry" | "status" | "email" | "phone" | "lastContactAt" | "notes";

type Props<TForm extends FieldValues> = {
  register: UseFormRegister<TForm>;
  renderErrors: (name: ClientFieldNames) => ReactNode | null;
};

export const ClientFields = <TForm extends FieldValues>({ register, renderErrors }: Props<TForm>) => {
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-3 text-xs font-bold uppercase text-gray-500">Client profile</p>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
            Company
            <input {...register("company" as Path<TForm>)} placeholder="Acme Corp" />
          </label>
          {renderErrors("company")}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Industry
              <input {...register("industry" as Path<TForm>)} placeholder="SaaS" />
            </label>

            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Status
              <select {...register("status" as Path<TForm>)}>
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
            <input {...register("email" as Path<TForm>)} placeholder="contact@acme.io" />
          </label>
          {renderErrors("email")}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Phone
              <input {...register("phone" as Path<TForm>)} placeholder="+1 415 555 0198" />
            </label>

            <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
              Last contact
              <input type="date" {...register("lastContactAt" as Path<TForm>)} />
            </label>
          </div>
          {renderErrors("phone")}
          {renderErrors("lastContactAt")}

          <label className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
            Notes
            <textarea {...register("notes" as Path<TForm>)} placeholder="Notes" rows={3} />
          </label>
        </div>
      </div>
    </>
  );
};
