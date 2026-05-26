import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import { emptyTaskFallback } from "../../constants/fallBacks";
import { Modal } from "./Modal";

import type { DashboardRow } from "../../types/dashboardRow";
import type { Task, NewTaskToSave, EmptyTask } from "../../types/tasks";
import { VALID_TASK_PRIORITY, VALID_TASK_STATUSES } from "../../constants/defaults";
import { createRenderErrors } from "../../utils/renderErrors";

type Props =
  | {
      closeModal: () => void;
      mode: "edit";
      task: Task;
      onSave: (id: string | null, task: NewTaskToSave | Task) => Promise<void>;
    }
  | {
      closeModal: () => void;
      mode: "create";
      onSave: (id: string | null, task: NewTaskToSave | Task) => Promise<void>;
      row: DashboardRow;
    };

export const TaskFormModal = (props: Props) => {
  const { closeModal, mode, onSave } = props;
  const formData: Task | EmptyTask = mode === "edit" ? props.task : emptyTaskFallback;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<Task | EmptyTask>({ mode: "onTouched" });

  useEffect(() => {
    reset(formData);
  }, []);

  const onSubmit = async (data: Task | EmptyTask) => {
    const id = mode === "edit" ? props.task.id : null;

    if (mode === "create") {
      data.taskKey = `task_${nanoid(8)}`;
      data.createdAt = new Date().toISOString().slice(0, 10);
      data.dealKey = props.row.dealKey;
      data.clientKey = props.row.clientKey;
      data.assigneeKey = props.row.ownerKey;
    }

    await onSave(id, data as Task);
    closeModal();
  };

  const renderErrors = createRenderErrors<EmptyTask>(errors);

  return (
    <Modal title={mode === "edit" ? "Edit task" : "Create task"} closeModal={closeModal}>
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
