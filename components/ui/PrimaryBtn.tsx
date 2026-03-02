import { ReactNode } from "react";

type PropsType = {
  size: "sm" | "lg";
  color: "primary" | "danger";
  onClick: () => void;
  children: ReactNode;
};

const SIZE_MAPPING = {
  sm: "p-2 text-sm",
  lg: "p-4 text-lg",
};

const COLOR_MAPPING = {
  primary: "bg-lime-800",
  danger: "bg-red-700",
};

const PrimaryBtn = ({ size, color, onClick, children }: PropsType) => {
  return (
    <button
      className={`${COLOR_MAPPING[color]} text-white ${SIZE_MAPPING[size]} rounded-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
