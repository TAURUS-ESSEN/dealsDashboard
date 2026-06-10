import { useForm } from "react-hook-form";
import { Modal } from "./Modal";
import { useState } from "react";

import type { CreateDealFormState } from "../../types/deals";
import type { User } from "../../types/users";
import type { Client } from "../../types/client";
import { VALID_DEAL_STAGES } from "../../constants/defaults";
import { createRenderErrors } from "../../utils/renderErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDealSchema } from "../../types/deals";
import { ClientFields } from "./ClientFields";

type Props = {
  users: User[];
  clients: Client[];
  closeModal: () => void;
  onCreateDeal: (data: CreateDealFormState) => Promise<void>;
};

export const DealCreateModal = ({ users, clients, onCreateDeal, closeModal }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateDealFormState>({ mode: "onTouched", resolver: zodResolver(createDealSchema) });
  const clientType = watch("clientType");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const renderErrors = createRenderErrors<CreateDealFormState>(errors);

  const onSubmit = async (data: CreateDealFormState): Promise<void> => {
    try {
      await onCreateDeal(data);
      closeModal();
    } catch (errors) {
      if (errors instanceof Error) {
        setSubmitError("Failed to create deal. Please try again.");
      }
    }
  };

  return (
    <Modal title="Create deal" closeModal={closeModal}>
      <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="modalSection">
          <p className="modalSectionTitle">Deal overview</p>
          <div className="flex flex-col gap-3">
            <label className="modalField">
              Deal title
              <input {...register("title")} placeholder="Enterprise CRM rollout" />
            </label>
            {renderErrors("title")}

            <label className="modalField">
              Manager
              <select {...register("ownerKey")}>
                {users.map((user) => (
                  <option value={user.userKey} key={user.userKey}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </label>
            {renderErrors("ownerKey")}

            <div className="modalFieldGrid">
              <label className="modalField">
                Stage
                <select {...register("stage")}>
                  {VALID_DEAL_STAGES.map((stage) => (
                    <option value={stage} key={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </label>

              <label className="modalField">
                Expected close
                <input type="date" {...register("expectedCloseDate")} />
              </label>
            </div>
            {renderErrors("stage")}
            {renderErrors("expectedCloseDate")}
          </div>
        </div>

        <div className="modalSection">
          <p className="modalSectionTitle">Client</p>
          <div className="flex flex-col gap-3">
            <div className="modalChoiceGroup">
              <label className="modalChoice">
                <input type="radio" value="old" {...register("clientType")} />
                Existing client
              </label>
              <label className="modalChoice">
                <input type="radio" value="new" {...register("clientType")} />
                New client
              </label>
            </div>
            {renderErrors("clientType")}

            {clientType === "old" && (
              <>
                <label className="modalField">
                  Client
                  <select {...register("clientKey")}>
                    {clients.map(
                      (client) =>
                        client.clientKey !== null && (
                          <option value={client.clientKey} key={client.clientKey}>
                            {client.company}
                          </option>
                        ),
                    )}
                  </select>
                </label>
                {renderErrors("clientKey")}
              </>
            )}

            {clientType === "new" && <ClientFields register={register} renderErrors={renderErrors} />}
          </div>
        </div>

        <div className="modalSection">
          <p className="modalSectionTitle">Forecast</p>
          <div className="modalFieldGrid">
            <label className="modalField">
              Value
              <input type="number" {...register("value", { valueAsNumber: true })} placeholder="42000" />
            </label>

            <label className="modalField">
              Probability
              <input type="number" {...register("probability", { valueAsNumber: true })} placeholder="65" />
            </label>
          </div>
          {renderErrors("value")}
          {renderErrors("probability")}
        </div>

        <div className="modalSection">
          <p className="modalSectionTitle">Notes</p>
          <label className="modalField">
            Description
            <textarea {...register("description")} placeholder="Deal description" rows={3} />
          </label>
        </div>

        <div className="modalActions">
          <button type="button" className="btnCancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="btnSave">
            {isSubmitting ? "Creating..." : "Create deal"}
          </button>
        </div>
        <div className="flex justify-center text-red-600">{submitError}</div>
      </form>
    </Modal>
  );
};
