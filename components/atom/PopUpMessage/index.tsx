import React from "react";
import Image from "next/image";
import { PopupMessageProps } from "@/utils/interface";

const PopupMessage: React.FC<PopupMessageProps> = ({ message, type }) => {
  return (
    <div className="fixed top-[5%] lg:right-[2%] z-[9999] flex items-center justify-center sm:right-[4%]">
      <div className="flex items-center justify-between w-full lg:p-[1rem_1rem] rounded-[0.25rem] border-[1px_solid_#000] bg-white lg:text-[1rem] font-bold text-center shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] gap-[1rem] sm:p-[0.5rem_0.5rem] sm:text-[0.75rem]">
        <Image
            src={
                type === "success" ? "/images/success.png" : "/images/failed.png"
            }
            alt="icon-msg"
            width={25}
            height={25}
            className="w-[25px] h-[25px] sm:w-[16px] sm:h-[16px]"
        />
        <p className="lg:text-[1rem] font-bold sm:text-[0.75rem]">{message}</p>
      </div>
    </div>
  );
};

export default PopupMessage;