import type { ReactNode } from 'react';
import './shared-ui.css';

interface ConfirmModalProps {
  title: string;
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="confirm-modal__overlay" onClick={onCancel}>
      <div className="confirm-modal__dialog" onClick={(event) => event.stopPropagation()}>
        <h2 className="confirm-modal__title">{title}</h2>
        {message && <div className="confirm-modal__message">{message}</div>}
        <div className="confirm-modal__actions">
          <button type="button" className="btn btn-link" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
