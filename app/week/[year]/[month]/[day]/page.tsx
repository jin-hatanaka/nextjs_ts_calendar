import WeekCalendar from "@/features/calendar/WeekCalendar";

type PropsType = {
  params: Promise<{
    year: string;
    month: string;
    day: string;
  }>;
};

const WeekPage = async ({ params }: PropsType) => {
  const { year, month, day } = await params;
  const currentDate = new Date(Number(year), Number(month) - 1, Number(day));
  return <WeekCalendar currentDate={currentDate} />;
};

export default WeekPage;
