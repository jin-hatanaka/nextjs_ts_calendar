import { Schedule, WeekDateList } from "@/types/calendar";
import { eachDayOfInterval, endOfWeek, isSameDay, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { getScheduleList } from "../queries/getScheduleList";

type PropsType = {
  currentDate: Date;
};

const useWeekCalendar = ({ currentDate }: PropsType) => {
  const [dateList, setDateList] = useState<WeekDateList>([]);

  const getDateListIndex = (
    currentDateList: WeekDateList,
    schedule: Schedule,
  ) => {
    // currentDateList(1週間の配列)から1日ずつ取り出す -> その1日と schedule.date と同じ日があるかチェック -> あればその1日の index を返す
    const index = currentDateList.findIndex((item) =>
      isSameDay(item.date, schedule.date),
    );
    return index;
  };

  const addSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const index = getDateListIndex(newDateList, schedule);
    if (index === -1) return;

    newDateList[index].schedules = [...newDateList[index].schedules, schedule];
    setDateList(newDateList);
  };

  const saveSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const index = getDateListIndex(newDateList, schedule);
    if (index === -1) return;

    const updatedSchedule = newDateList[index].schedules.map((item) =>
      item.id === schedule.id ? schedule : item,
    );
    newDateList[index].schedules = updatedSchedule;
    setDateList(newDateList);
  };

  const deleteSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const index = getDateListIndex(newDateList, schedule);
    if (index === -1) return;

    const schedules = newDateList[index].schedules.filter(
      (item) => item.id !== schedule.id,
    );
    newDateList[index].schedules = schedules;
    setDateList(newDateList);
  };

  useEffect(() => {
    // 1週間の配列を作成
    const newDateList = eachDayOfInterval({
      start: startOfWeek(currentDate),
      end: endOfWeek(currentDate),
    }).map((date) => ({ date, schedules: [] as Schedule[] }));

    const scheduleList = getScheduleList();
    scheduleList.forEach((schedule) => {
      const index = getDateListIndex(newDateList, schedule);
      if (index === -1) return;

      // その日の schedules 配列に、schedule を追加
      newDateList[index].schedules = [
        ...newDateList[index].schedules,
        schedule,
      ];
    });
    setDateList(newDateList);
  }, [currentDate]);

  return {
    dateList,
    addSchedule,
    saveSchedule,
    deleteSchedule,
  };
};

export default useWeekCalendar;
