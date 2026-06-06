import { TriangleAlert } from "lucide-react";
import { Modal } from "./Modal";
import { useState } from "react";

type Props = {
  title: string;

  entityName: string;
  warningText: string;
  onConfirm: () => Promise<void>;
  closeModal: () => void;
};

export const DeleteModal = ({ title, entityName, warningText, onConfirm, closeModal }: Props) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const deleteValue = async () => {
    try {
      await onConfirm();
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError("Failed to delete. Please try again.");
      }
    }
  };

  return (
    <Modal title={title} closeModal={closeModal}>
      <div className="modalForm">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-red-600 text-white">
              <TriangleAlert size={18} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-red-950">{warningText}:</p>
              <p className="mt-1 break-words text-sm font-semibold text-gray-900">{entityName}</p>
            </div>
          </div>
        </div>

        <div className="modalActions">
          <button type="button" className="btnCancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="button" className="btnDanger" onClick={() => deleteValue()}>
            Delete
          </button>
        </div>
        <div className="flex justify-center text-red-600">{submitError}</div>
      </div>
    </Modal>
  );
};
