import { dateColor } from "@/lib/date";
import { MonthDateList, Schedule } from "@/types/calendar";
import { getDate } from "date-fns";
import ScheduleBtn from "./ScheduleBtn";
import { useState } from "react";
import ScheduleDetailModal from "./ScheduleDetailModal";

type PropsType = {
  currentDate: Date;
  dateList: MonthDateList;
  saveSchedule: (schedule: Schedule) => void;
  deleteSchedule: (schedule: Schedule) => void;
};

const MonthCalendarBody = ({
  currentDate,
  dateList,
  saveSchedule,
  deleteSchedule,
}: PropsType) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const closeModal = () => setSelectedSchedule(null);

  return (
    <>
      <tbody>
        {dateList.map((oneWeek, weekIndex) => (
          <tr key={`week-${weekIndex}`} className="mx-10">
            {oneWeek.map((item, dayIndex) => (
              <td
                key={`day-${weekIndex}-${dayIndex}`}
                className="bg-white h-[10vh] border-2 border-solid border-lime-800 align-top"
              >
                <span
                  className={`inline-block w-5 leading-5 text-center ${dateColor(item.date, currentDate)}`}
                >
                  {getDate(item.date)}
                </span>
                <div className="flex flex-col items-center gap-1 pb-2">
                  {item.schedules.map((schedule) => (
                    <ScheduleBtn
                      key={schedule.id}
                      onClick={() => setSelectedSchedule(schedule)}
                    >
                      {schedule.title}
                    </ScheduleBtn>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <ScheduleDetailModal
        selectedSchedule={selectedSchedule}
        closeModal={closeModal}
        saveSchedule={saveSchedule}
        deleteSchedule={deleteSchedule}
      />
    </>
  );
};

export default MonthCalendarBody;
