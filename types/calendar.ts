export type Schedule = {
  id: number;
  date: Date;
  title: string;
  description: string;
};

export type MonthDateList = {
  date: Date;
  schedules: Schedule[];
}[][];

export type WeekDateList = {
  date: Date;
  schedules: Schedule[];
}[];

export type NewSchedule = {
  title: string;
  date: string;
  description: string;
};

export type Mode = "month" | "week";

export type EditSchedule = { title: string; description: string };
