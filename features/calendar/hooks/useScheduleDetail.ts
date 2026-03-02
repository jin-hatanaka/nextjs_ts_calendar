import { EditSchedule, Schedule } from "@/types/calendar";
import { ChangeEvent, SubmitEvent, useEffect, useState } from "react";

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

  const changeEditSchedule = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setEditSchedule({ ...editSchedule, [name]: value });
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

  useEffect(() => {
    if (!selectedSchedule) return;
    setEditSchedule({
      title: selectedSchedule.title,
      description: selectedSchedule.description,
    });
    setIsEditing(false);
  }, [selectedSchedule]);

  return {
    isEditing,
    setIsEditing,
    handleEditSchedule,
    editSchedule,
    changeEditSchedule,
    handleDeleteSchedule,
  };
};

export default useScheduleDetail;
