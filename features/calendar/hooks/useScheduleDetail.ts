import { EditSchedule, Schedule } from "@/types/calendar";
import { ChangeEvent, SubmitEvent, useState } from "react";

type PropsType = {
  closeModal: () => void;
  selectedSchedule: Schedule | null;
  saveSchedule: (schedule: Schedule) => void;
  deleteSchedule: (schedule: Schedule) => void;
};

const useScheduleDetail = ({
  closeModal,
  selectedSchedule,
  saveSchedule,
  deleteSchedule,
}: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSchedule, setEditSchedule] = useState<EditSchedule>({
    title: "",
    description: "",
  });

  const startEditing = () => {
    if (!selectedSchedule) return;
    setEditSchedule({
      title: selectedSchedule.title,
      description: selectedSchedule.description,
    });
    setIsEditing(true);
  };

  const changeEditSchedule = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setEditSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSchedule = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSchedule) return;
    const { id, date } = selectedSchedule;
    const { title, description } = editSchedule;
    const schedule: Schedule = {
      id,
      title,
      date,
      description,
    };
    saveSchedule(schedule);
    setIsEditing(false);
    closeModal();
  };

  const handleDeleteSchedule = () => {
    if (!selectedSchedule) return;
    const { id, date, title, description } = selectedSchedule;
    const schedule: Schedule = {
      id,
      title,
      date,
      description,
    };
    deleteSchedule(schedule);
    closeModal();
  };

  return {
    isEditing,
    startEditing,
    setIsEditing,
    handleEditSchedule,
    editSchedule,
    changeEditSchedule,
    handleDeleteSchedule,
  };
};

export default useScheduleDetail;
