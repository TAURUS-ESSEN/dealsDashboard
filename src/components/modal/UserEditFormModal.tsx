import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "./Modal";

import type { User, EmptyUser } from "../../types/users";
import { createRenderErrors } from "../../utils/renderErrors";
import { emptyUser } from "../../constants/fallBacks";

type Props =
  | {
      closeModal: () => void;
      user: User;
      mode: "edit";
      onSaveUser: (user: User | EmptyUser) => Promise<void>;
    }
  | {
      closeModal: () => void;
      mode: "create";
      onSaveUser: (user: User | EmptyUser) => Promise<void>;
    };

export const UserEditFormModal = (props: Props) => {
  const { closeModal, mode, onSaveUser } = props;
  const formData = mode === "edit" ? props.user : emptyUser;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<User | EmptyUser>({ mode: "onTouched" });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = async (data: User | EmptyUser) => {
    await onSaveUser(data);
    closeModal();
  };

  const renderErrors = createRenderErrors<User>(errors);

  return (
    <Modal
      title={`${mode === "edit" ? `Edit manager` : "Create manager"}`}
      closeModal={closeModal}
    >
      <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="modalHeader">
          <div>
            <p className="text-xs font-bold uppercase text-gray-500">Manager profile</p>
            <p className="mt-1 text-sm text-gray-600">
              {mode === "edit" ? props.user.fullName : "Add a manager to the CRM team"}
            </p>
          </div>
        </div>

        <div className="modalSection">
          <p className="modalSectionTitle">Contact info</p>

          <label className="modalField">
            Full name
            <input {...register("fullName", { required: "Full name is required" })} placeholder="Ivan Petrov" />
          </label>
          {renderErrors("fullName")}

          <div className="modalFieldGrid">
            <label className="modalField">
              Role
              <input {...register("role", { required: "Role is required" })} placeholder="Sales Manager" />
            </label>

            <label className="modalField">
              Email
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9+_.-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                    message: "Not valid email",
                  },
                })}
                placeholder="ivan.petrov@example.com"
              />
            </label>
          </div>
          {renderErrors("role")}
          {renderErrors("email")}
        </div>

        <div className="modalSection">
          <p className="modalSectionTitle">Status</p>
          <label className="modalChoice">
            <input type="checkbox" {...register("active")} />
            <span>Active manager</span>
          </label>
        </div>

        <div className="modalActions">
          <button type="button" className="btnCancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" disabled={!isDirty || isSubmitting} className="btnSave">
            {isSubmitting ? "Saving..." : mode === "edit" ? "Save changes" : "Create manager"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
