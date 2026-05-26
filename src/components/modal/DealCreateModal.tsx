import { useForm } from "react-hook-form";
import { Modal } from "./Modal";

import type { NewDealFormState } from "../../types/deals";
import type { User } from "../../types/users";
import type { Client } from "../../types/client";
import { VALID_DEAL_STAGES, VALID_CLIENT_STATUSES } from "../../constants/defaults";
import {createRenderErrors} from '../../utils/renderErrors'

type Props = {
  users: User[];
  clients: Client[];
  closeModal: () => void;
  onCreateDeal: (data: NewDealFormState) => Promise<void>;
};

export const DealCreateModal = ({ users, clients, onCreateDeal, closeModal }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<NewDealFormState>({ mode: "onTouched" });
  const clientType = watch("clientType");

  const renderErrors = createRenderErrors<NewDealFormState>(errors);

  const onSubmit = async (data: NewDealFormState): Promise<void> => {
    await onCreateDeal(data);
    closeModal();
  };

  return (
    <Modal title="Create deal" closeModal={closeModal}>
      <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="modalSection">
          <p className="modalSectionTitle">Deal overview</p>
          <div className="flex flex-col gap-3">
            <label className="modalField">
              Deal title
              <input {...register("title", { required: "Deal title is required" })} placeholder="Enterprise CRM rollout" />
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
                <input
                  type="date"
                  {...register("expectedCloseDate", {
                    required: "Expected close date is required",
                  })}
                />
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
                <input
                  type="radio"
                  value="old"
                  {...register("clientType", {
                    required: "Choose client type",
                  })}
                />
                Existing client
              </label>
              <label className="modalChoice">
                <input
                  type="radio"
                  value="new"
                  {...register("clientType", {
                    required: "Choose client type",
                  })}
                />
                New client
              </label>
            </div>
            {renderErrors("clientType")}

            {clientType === "old" && (
              <>
                <label className="modalField">
                  Client
                  <select {...register("clientKey", { required: "Client is required" })}>
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

            {clientType === "new" && (
              <>
                <label className="modalField">
                  Company
                  <input {...register("company", { required: "Company is required" })} placeholder="Acme Corp" />
                </label>
                {renderErrors("company")}

                <div className="modalFieldGrid">
                  <label className="modalField">
                    Industry
                    <input {...register("industry", { required: "Industry is required" })} placeholder="SaaS" />
                  </label>

                  <label className="modalField">
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

                <label className="modalField">
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

                <div className="modalFieldGrid">
                  <label className="modalField">
                    Phone
                    <input {...register("phone", { required: "Phone is required" })} placeholder="+1 415 555 0198" />
                  </label>

                  <label className="modalField">
                    Last contact
                    <input
                      type="date"
                      {...register("lastContactAt", { required: "Last contact at required" })}
                    />
                  </label>
                </div>
                {renderErrors("phone")}
                {renderErrors("lastContactAt")}

                <label className="modalField">
                  Notes
                  <textarea {...register("notes")} placeholder="Notes" rows={3} />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="modalSection">
          <p className="modalSectionTitle">Forecast</p>
          <div className="modalFieldGrid">
            <label className="modalField">
              Value
              <input
                type="number"
                {...register("value", { required: "Value is required", valueAsNumber: true })}
                placeholder="42000"
              />
            </label>

            <label className="modalField">
              Probability
              <input
                type="number"
                {...register("probability", { required: "Probability is required" })}
                placeholder="65"
              />
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
          <button type="submit" disabled={!isDirty || !isValid || isSubmitting} className="btnSave">
            {isSubmitting ? "Creating..." : "Create deal"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
