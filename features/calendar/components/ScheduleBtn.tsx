import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  onClick: () => void;
};

const ScheduleBtn = ({ children, onClick }: PropsType) => {
  return (
    <button
      className="block bg-lime-800 text-white rounded-sm w-[94%] px-2 text-left"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ScheduleBtn;
