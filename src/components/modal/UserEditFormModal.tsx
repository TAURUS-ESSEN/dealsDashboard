import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mapUserToFormState } from "../../utils/mapToApiData";

import { Modal } from "./Modal";

import type { User, UserFormState, UserSubmitData } from "../../types/users";
import { createRenderErrors } from "../../utils/renderErrors";
import { defaultUserFormState } from "../../constants/fallBacks";
import { userFormSchema } from "../../types/users";

type Props =
  | {
      closeModal: () => void;
      user: User;
      mode: "edit";
      onSaveUser: (id: string | null, user: UserSubmitData) => Promise<void>;
    }
  | {
      closeModal: () => void;
      mode: "create";
      onSaveUser: (id: string | null, user: UserSubmitData) => Promise<void>;
    };

export const UserEditFormModal = (props: Props) => {
  const { closeModal, mode, onSaveUser } = props;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formData = useMemo<UserFormState>(() => {
    return mode === "edit" ? mapUserToFormState(props.user) : defaultUserFormState;
  }, [mode, mode === "edit" ? props.user : null]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UserFormState>({ mode: "onTouched", resolver: zodResolver(userFormSchema) });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = async (data: UserFormState) => {
    const user: UserSubmitData = {
      userKey: mode === "edit" ? props.user.userKey : null,
      avatarUrl: "",
      ...data,
    };
    const id = mode === "edit" ? props.user.id : null;

    try {
      await onSaveUser(id, user);
      setSubmitError(null);
      closeModal();
    } catch (errors) {
      if (errors instanceof Error) {
        setSubmitError(
          mode === "edit"
            ? "Failed to update manager. Please try again."
            : "Failed to create manager. Please try again.",
        );
      }
    }
  };

  const renderErrors = createRenderErrors<UserFormState>(errors);

  return (
    <Modal title={`${mode === "edit" ? `Edit manager` : "Create manager"}`} closeModal={closeModal}>
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
            <input {...register("fullName")} placeholder="Ivan Petrov" />
          </label>
          {renderErrors("fullName")}

          <div className="modalFieldGrid">
            <label className="modalField">
              Role
              <input {...register("role")} placeholder="Sales Manager" />
            </label>

            <label className="modalField">
              Email
              <input {...register("email")} placeholder="ivan.petrov@example.com" />
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
        <div className="flex justify-center text-red-600">{submitError}</div>
      </form>
    </Modal>
  );
};
