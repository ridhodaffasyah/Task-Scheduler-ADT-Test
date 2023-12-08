import React from "react";
import { ContainerProps } from "@/utils/interface";

const Container: React.FC<ContainerProps> = ({
  isLandingPage,
  children,
  id,
}) => {
  return isLandingPage ? (
    <div className="absolute md:flex-row top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-full h-full md:p-[0_5rem_0_10rem] flex-col p-0">{children}</div>
  ) : (
    <div className="flex md:w-full md:p-[1rem_5rem_1rem_5rem] flex-col md:gap-[3rem] md:mb-[1rem] p-[0_1rem_0_1rem]" id={id}>{children}</div>
  );
};

export default Container;