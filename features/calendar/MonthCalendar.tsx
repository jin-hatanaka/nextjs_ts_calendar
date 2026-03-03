"use client";

import { getMonth } from "date-fns";
import CalendarNav from "./components/CalendarNav";
import CalendarHeader from "./components/CalendarHeader";
import useMonthCalendar from "./hooks/useMonthCalendar";
import MonthCalendarBody from "./components/MonthCalendarBody";

type PropsType = {
  currentDate: Date;
};

const MonthCalendar = ({ currentDate }: PropsType) => {
  const { dateList, addSchedule, saveSchedule, deleteSchedule } =
    useMonthCalendar({
      currentDate: currentDate,
    });
  return (
    <>
      <h1 className="font-bold text-3xl mb-5">{`${getMonth(currentDate) + 1}月`}</h1>
      <CalendarNav
        mode="month"
        currentDate={currentDate}
        addSchedule={addSchedule}
      />
      <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
        <CalendarHeader />
        <MonthCalendarBody
          currentDate={currentDate}
          dateList={dateList}
          saveSchedule={saveSchedule}
          deleteSchedule={deleteSchedule}
        />
      </table>
    </>
  );
};

export default MonthCalendar;
