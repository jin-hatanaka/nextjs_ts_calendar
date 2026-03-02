"use client";

import { getMonth } from "date-fns";
import useWeekCalendar from "./hooks/useWeekCalendar";
import CalendarNav from "./components/CalendarNav";
import CalendarHeader from "./components/CalendarHeader";
import WeekCalendarBody from "./components/WeekCalendarBody";

type PropsType = {
  currentDate: Date;
};

const WeekCalendar = ({ currentDate }: PropsType) => {
  const { dateList, addSchedule, saveSchedule, deleteSchedule } =
    useWeekCalendar({
      currentDate: currentDate,
    });
  console.log(dateList);
  return (
    <>
      <h1 className="font-bold text-3xl mb-5">{`${getMonth(currentDate) + 1}月`}</h1>
      <CalendarNav
        mode="week"
        currentDate={currentDate}
        addSchedule={addSchedule}
      />
      <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
        <CalendarHeader />
        <WeekCalendarBody
          currentDate={currentDate}
          dateList={dateList}
          saveSchedule={saveSchedule}
          deleteSchedule={deleteSchedule}
        />
      </table>
    </>
  );
};

export default WeekCalendar;
