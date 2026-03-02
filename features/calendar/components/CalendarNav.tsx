import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { addMonths, addWeeks } from "date-fns";
import { useState } from "react";
import CreateScheduleModal from "./CreateScheduleModal";
import { Mode, Schedule } from "@/types/calendar";
import { useRouter } from "next/navigation";

type PropsType = {
  mode: Mode;
  currentDate: Date;
  addSchedule: (schedule: Schedule) => void;
};

const CalendarNav = ({ mode, currentDate, addSchedule }: PropsType) => {
  const router = useRouter();
  const [isOpne, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const moveDate = (amount: number) => {
    const newDate =
      mode === "month"
        ? addMonths(currentDate, amount)
        : addWeeks(currentDate, amount);
    if (mode === "month") {
      router.push(`/month/${newDate.getFullYear()}/${newDate.getMonth() + 1}`);
    } else {
      router.push(
        `/week/${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`,
      );
    }
  };

  const moveToday = () => {
    const today = new Date();
    if (mode === "month") {
      router.push(`/month/${today.getFullYear()}/${today.getMonth() + 1}`);
    } else {
      router.push(
        `/week/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
      );
    }
  };

  const toggleViewMode = () => {
    if (mode === "month") {
      router.push(
        `/week/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/1`,
      );
    } else {
      router.push(
        `/month/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`,
      );
    }
  };

  return (
    <div className="w-[80%] flex justify-between mb-2">
      <div className="flex items-center text-white gap-4">
        <PrimaryBtn size="sm" color="primary" onClick={() => moveDate(-1)}>
          ←
        </PrimaryBtn>
        <PrimaryBtn size="sm" color="primary" onClick={moveToday}>
          今日
        </PrimaryBtn>
        <PrimaryBtn size="sm" color="primary" onClick={() => moveDate(1)}>
          →
        </PrimaryBtn>
        {mode === "month" ? (
          <PrimaryBtn
            size="sm"
            color="primary"
            onClick={() => toggleViewMode()}
          >
            月
          </PrimaryBtn>
        ) : (
          <PrimaryBtn
            size="sm"
            color="primary"
            onClick={() => toggleViewMode()}
          >
            週
          </PrimaryBtn>
        )}
      </div>
      <PrimaryBtn size="sm" color="primary" onClick={() => setIsOpen(true)}>
        予定作成
      </PrimaryBtn>
      <CreateScheduleModal
        isOpen={isOpne}
        closeModal={closeModal}
        addSchedule={addSchedule}
      />
    </div>
  );
};

export default CalendarNav;
