import { type ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "./Modal";

import type { User } from "../../types/users";
import type { Deal } from "../../types/deals";
import { VALID_DEAL_STAGES } from "../../constants/defaults";
import {createRenderErrors} from '../../utils/renderErrors'

type Props = {
  closeModal: () => void;
  deal: Deal;
  users: User[];
  onUpdateDeal: (id: string, deal: Deal) => Promise<void>;
};

export const DealEditFormModal = ({ closeModal, deal, users, onUpdateDeal }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<Deal>({ mode: "onTouched" });

  useEffect(() => {
    reset(deal);
  }, []);

  const onSubmit = async (data: Deal) => {
    data.updatedAt = new Date().toISOString().slice(0, 10);
    await onUpdateDeal(data.id, data);
    closeModal();
  };

  const renderErrors = createRenderErrors<Deal>(errors);
  
  return (
    <Modal title="Edit deal" closeModal={closeModal}>
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
                {...register("probability", { required: "Probability is required", valueAsNumber: true })}
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
          <button type="submit" disabled={!isDirty || isSubmitting} className="btnSave">
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
