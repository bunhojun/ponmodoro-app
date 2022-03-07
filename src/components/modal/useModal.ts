import { useState } from "react";

export type OpenModal = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => void;

export type OpenConfirmationModal = ({
  title,
  message,
  onApprove,
}: {
  title: string;
  message: string;
  onApprove: () => void;
}) => void;

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [onApprove, setOnApprove] = useState<() => void>(() => null);

  const openModal: OpenModal = ({ title, message }) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const openConfirmationModal: OpenConfirmationModal = ({
    title,
    message,
    onApprove,
  }) => {
    openModal({ title, message });
    setOnApprove(() => onApprove);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    openConfirmationModal,
    closeModal,
    onApprove,
    modalMessage,
    modalTitle,
  };
};
