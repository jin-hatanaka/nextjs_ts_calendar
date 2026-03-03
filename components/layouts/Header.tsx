import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const Header = ({ children }: PropsType) => {
  return (
    <div className="realative">
      <header className="bg-white leading-12.5 fixed top-0 left-0 right-0 ">
        <div className="sm:container sm:mx-auto">
          <p className="logo">カレンダー</p>
        </div>
      </header>
      <main className="pt-12.5 bg-linear-to-r from-lime-100 to-lime-200 h-screen flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Header;
