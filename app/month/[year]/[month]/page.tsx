import MonthCalendar from "@/features/calendar/MonthCalendar";

type PropsType = {
  params: Promise<{
    year: string;
    month: string;
  }>;
};

const MonthPage = async ({ params }: PropsType) => {
  const { year, month } = await params;
  const currentDate = new Date(Number(year), Number(month) - 1);
  return <MonthCalendar currentDate={currentDate} />;
};

export default MonthPage;
