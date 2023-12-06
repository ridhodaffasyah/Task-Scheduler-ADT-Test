import React from "react";
import { NavbarProps } from "@/utils/interface";

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <header className="flex items-center justify-between pl-[2rem] pt-[2rem] pr-[2rem] pb-[2rem] bg-transparent absolute top-0 left-0 z-[2] w-full">
      {children}
    </header>
  );
};

export default Navbar;
