import { NewSchedule, Schedule } from "@/types/calendar";
import { format, parse } from "date-fns";
import { ChangeEvent, SubmitEvent, useState } from "react";

const INIT_SCHEDULE: NewSchedule = {
  title: "",
  // Date → 文字列に変換
  date: format(new Date(), "yyyy-MM-dd"), // format(変換したいDate, フォーマット文字列)
  description: "",
};

type PropsType = {
  closeModal: () => void;
  addSchedule: (schedule: Schedule) => void;
};

const useCreateSchedule = ({ closeModal, addSchedule }: PropsType) => {
  const [newSchedule, setNewSchedule] = useState<NewSchedule>(INIT_SCHEDULE);
  const [errorMessage, setErrorMessage] = useState("");

  const changeNewSchedule = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleCreateSchedule = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, date, description } = newSchedule;
    if (title === "") {
      setErrorMessage("タイトルを入力してください");
      return;
    } else {
      setErrorMessage("");
    }
    const schedule: Schedule = {
      id: 100001,
      title,
      // 文字列 → Dateに変換
      date: parse(date, "yyyy-MM-dd", new Date()), // parse(文字列, フォーマット, 基準日)
      description,
    };
    addSchedule(schedule);
    setNewSchedule(INIT_SCHEDULE);
    closeModal();
  };

  return { errorMessage, newSchedule, changeNewSchedule, handleCreateSchedule };
};

export default useCreateSchedule;
