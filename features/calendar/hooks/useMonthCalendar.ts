import { useMemo, useState } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { MonthDateList, Schedule } from "@/types/calendar";
import { getScheduleList } from "../queries/getScheduleList";

type PropsType = {
  currentDate: Date;
};

const useMonthCalendar = ({ currentDate }: PropsType) => {
  const [scheduleList, setScheduleList] = useState<Schedule[]>(() =>
    getScheduleList(),
  );

  const dateList = useMemo(() => {
    // 表示したい1ヶ月カレンダーの各週初日の日付(日曜日)の配列を作成
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
    // 1ヶ月の二次元配列を作成
    const baseList: MonthDateList = monthOfSundayList.map((date) =>
      // 1週間の配列を作成
      eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({ date, schedules: [] as Schedule[] })),
    );

    scheduleList.forEach((schedule) => {
      // baseList を1週間ずつ取り出す -> その週の中に schedule.date と同じ日があるかチェック -> あればその週の index を返す
      const weekIndex = baseList.findIndex((week) =>
        week.some((item) => isSameDay(item.date, schedule.date)),
      );
      if (weekIndex === -1) return;
      // 予定が入る週を1日ずつ取り出す -> その1日と schedule.date と同じ日があるかチェック -> あればその1日の index を返す
      const dayIndex = baseList[weekIndex].findIndex((item) =>
        isSameDay(item.date, schedule.date),
      );
      baseList[weekIndex][dayIndex].schedules.push(schedule);
    });
    return baseList;
  }, [currentDate, scheduleList]);

  const addSchedule = (schedule: Schedule) => {
    setScheduleList((prev) => [...prev, schedule]);
  };

  const saveSchedule = (schedule: Schedule) => {
    setScheduleList((prev) =>
      prev.map((item) => (item.id === schedule.id ? schedule : item)),
    );
  };

  const deleteSchedule = (schedule: Schedule) => {
    setScheduleList((prev) => prev.filter((item) => item.id !== schedule.id));
  };

  return {
    dateList,
    addSchedule,
    saveSchedule,
    deleteSchedule,
  };
};

export default useMonthCalendar;
