import { Schedule, WeekDateList } from "@/types/calendar";
import { eachDayOfInterval, endOfWeek, isSameDay, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";
import { getScheduleList } from "../queries/getScheduleList";

type PropsType = {
  currentDate: Date;
};

const useWeekCalendar = ({ currentDate }: PropsType) => {
  const [scheduleList, setScheduleList] = useState<Schedule[]>(() =>
    getScheduleList(),
  );

  const dateList = useMemo(() => {
    // 1週間の配列を作成
    const baseList: WeekDateList = eachDayOfInterval({
      start: startOfWeek(currentDate),
      end: endOfWeek(currentDate),
    }).map((date) => ({ date, schedules: [] as Schedule[] }));

    scheduleList.forEach((schedule) => {
      // baseList(1週間の配列)から1日ずつ取り出す -> その1日と schedule.date と同じ日があるかチェック -> あればその1日の index を返す
      const index = baseList.findIndex((item) =>
        isSameDay(item.date, schedule.date),
      );
      if (index === -1) return;
      baseList[index].schedules.push(schedule);
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

export default useWeekCalendar;
