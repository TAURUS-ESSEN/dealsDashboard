import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { tasksFormSchema } from "../../types/tasks";
import { mapTaskToFormState } from "../../utils/mapToApiData";

import { defaultTaskState } from "../../constants/fallBacks";
import { Modal } from "./Modal";

import type { DashboardRow } from "../../types/dashboardRow";
import type { Task, TaskFormState, TaskSubmitFormData } from "../../types/tasks";
import { VALID_TASK_PRIORITY, VALID_TASK_STATUSES } from "../../constants/defaults";
import { createRenderErrors } from "../../utils/renderErrors";

type Props =
  | {
      closeModal: () => void;
      mode: "edit";
      task: Task;
      onSave: (id: string | null, task: TaskSubmitFormData) => Promise<void>;
    }
  | {
      closeModal: () => void;
      mode: "create";
      onSave: (id: string | null, task: TaskSubmitFormData) => Promise<void>;
      row: DashboardRow;
    };

export const TaskFormModal = (props: Props) => {
  const { closeModal, mode, onSave } = props;
  const formData: TaskFormState = mode === "edit" ? mapTaskToFormState(props.task) : defaultTaskState;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<TaskFormState>({ mode: "onTouched", resolver: zodResolver(tasksFormSchema) });

  useEffect(() => {
    reset(formData);
  }, [reset]);

  const onSubmit = async (data: TaskFormState) => {
    const id = mode === "edit" ? props.task.id : null;
    const task: TaskSubmitFormData = {
      ...data,
      taskKey: mode === "create" ? `task_${nanoid(8)}` : props.task.taskKey,
      createdAt: mode === "create" ? new Date().toISOString().slice(0, 10) : props.task.createdAt,
      dealKey: mode === "create" ? props.row.dealKey : props.task.dealKey,
      clientKey: mode === "create" ? props.row.clientKey : props.task.clientKey,
      assigneeKey: mode === "create" ? props.row.ownerKey : props.task.assigneeKey,
    };

    try {
      await onSave(id, task);
      closeModal();
    } catch (errors) {
      if (errors instanceof Error) {
        setSubmitError(
          mode === "edit"
            ? "Failed to update task. Please try again."
            : "Failed to create task. Please try again.",
        );
      }
    }
  };

  const renderErrors = createRenderErrors<TaskFormState>(errors);

  return (
    <Modal title={mode === "edit" ? "Edit task" : "Create task"} closeModal={closeModal}>
      <div className="flex justify-center text-red-600">{submitError}</div>
      <form className="modalForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="modalSection">
          <p className="modalSectionTitle">Task details</p>
          <div className="flex flex-col gap-3">
            <label className="modalField">
              Task title
              <input
                {...register("title", { required: "Task title required" })}
                placeholder="Send revised proposal"
              />
            </label>
            {renderErrors("title")}

            <div className="modalFieldGrid">
              <label className="modalField">
                Priority
                <select {...register("priority")}>
                  {VALID_TASK_PRIORITY.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
              </label>

              <label className="modalField">
                Status
                <select {...register("status")}>
                  {VALID_TASK_STATUSES.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>
            {renderErrors("priority")}
            {renderErrors("status")}

            <label className="modalField">
              Due date
              <input type="date" {...register("dueDate", { required: "Due date is required" })} />
            </label>
            {renderErrors("dueDate")}
          </div>
        </div>

        <div className="modalActions">
          <button type="button" className="btnCancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" disabled={!isDirty || !isValid || isSubmitting} className="btnSave">
            {mode === "edit" ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
