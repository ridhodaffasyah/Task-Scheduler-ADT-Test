import React from "react";
import { ButtonProps } from "@/utils/interface";

const Button: React.FC<ButtonProps> = ({ isExplore, text, handleButton }) => {
  return isExplore ? (
    <button className="bg-black text-white px-[1.5rem] py-[0.75rem] rounded-[0.25rem] border-none text-[1rem] font-bold cursor-pointer transition-all duration-[0.25s] ease-in-out hover:bg-[#DFA46D] hidden md:flex" onClick={handleButton}>{text}</button>
  ) : (
    <button className="bg-[#DFA46D] text-white px-[0.75rem] py-[1.5rem] rounded-[0.25rem] border-none text-[1rem] font-bold cursor-pointer transition-all duration-[0.25s] ease-in-out hover:bg-[#DFA46D] hidden md:flex" onClick={handleButton}>{text}</button>
  );
};

export default Button;