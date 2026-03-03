import { useEffect, useState } from "react";
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
  const [dateList, setDateList] = useState<MonthDateList>([]);

  const getDateListIndex = (
    currentDateList: MonthDateList,
    schedule: Schedule,
  ) => {
    // currentDateList を1週間ずつ取り出す -> その週の中に schedule.date と同じ日があるかチェック -> あればその週の index を返す
    const firstIndex = currentDateList.findIndex((onWeek) =>
      onWeek.some((item) => isSameDay(item.date, schedule.date)),
    );
    if (firstIndex === -1) return [-1, -1];
    // 予定が入る週を1日ずつ取り出す -> その1日と schedule.date と同じ日があるかチェック -> あればその1日の index を返す
    const secondIndex = currentDateList[firstIndex].findIndex((item) =>
      isSameDay(item.date, schedule.date),
    );
    return [firstIndex, secondIndex];
  };

  const addSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
    if (firstIndex === -1) return;

    newDateList[firstIndex][secondIndex].schedules = [
      ...newDateList[firstIndex][secondIndex].schedules,
      schedule,
    ];
    setDateList(newDateList);
  };

  const saveSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
    if (firstIndex === -1) return;

    const schedules = newDateList[firstIndex][secondIndex].schedules.map(
      (item) => (item.id === schedule.id ? schedule : item),
    );
    newDateList[firstIndex][secondIndex].schedules = schedules;
    setDateList(newDateList);
  };

  const deleteSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
    if (firstIndex === -1) return;

    const schedules = newDateList[firstIndex][secondIndex].schedules.filter(
      (item) => item.id !== schedule.id,
    );
    newDateList[firstIndex][secondIndex].schedules = schedules;
    setDateList(newDateList);
  };

  useEffect(() => {
    // 表示したい1ヶ月カレンダーの各週初日の日付(日曜日)の配列を作成
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
    // 1ヶ月の二次元配列を作成
    const newDateList: MonthDateList = monthOfSundayList.map((date) => {
      // 1週間の配列を作成
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({ date, schedules: [] as Schedule[] }));
    });

    const scheduleList = getScheduleList();
    scheduleList.forEach((schedule) => {
      const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
      if (firstIndex === -1) return;

      // その日の schedules 配列に、schedule を追加
      newDateList[firstIndex][secondIndex].schedules = [
        ...newDateList[firstIndex][secondIndex].schedules,
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

export default useMonthCalendar;
