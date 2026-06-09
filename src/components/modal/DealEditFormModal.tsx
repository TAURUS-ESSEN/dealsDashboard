import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "./Modal";

import type { User } from "../../types/users";
import type { Deal, EditDealFormState, EditDealSubmit } from "../../types/deals";
import { editDealSchema } from "../../types/deals";
import { VALID_DEAL_STAGES } from "../../constants/defaults";
import { createRenderErrors } from "../../utils/renderErrors";
import { mapDealToFormState } from "../../utils/mapToApiData";

type Props = {
  closeModal: () => void;
  deal: Deal;
  users: User[];
  onUpdateDeal: (id: string, deal: EditDealSubmit) => Promise<void>;
};

export const DealEditFormModal = ({ closeModal, deal, users, onUpdateDeal }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditDealFormState>({ mode: "onTouched", resolver: zodResolver(editDealSchema) });
  const formData = mapDealToFormState(deal);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = async (data: EditDealFormState) => {
    const editedDeal: EditDealSubmit = {
      ...data,
      dealKey: deal.dealKey,
      clientKey: deal.clientKey,
      createdAt: deal.createdAt,
      updatedAt: new Date().toISOString().slice(0, 10),
      id: deal.id,
    };
    try {
      await onUpdateDeal(editedDeal.id, editedDeal);
      closeModal();
    } catch (errors) {
      if (errors instanceof Error) {
        setSubmitError("Failed to update deal. Please try again.");
      }
    }
  };

  const renderErrors = createRenderErrors<EditDealFormState>(errors);

  return (
    <Modal title="Edit deal" closeModal={closeModal}>
      <div className="flex justify-center text-red-600">{submitError}</div>

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
          <p className="modalSectionTitle">Forecast</p>
          <div className="modalFieldGrid">
            <label className="modalField">
              Value
              <input type="number" {...register("value")} placeholder="42000" />
            </label>

            <label className="modalField">
              Probability
              <input type="number" {...register("probability")} placeholder="65" />
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
