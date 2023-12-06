import React from "react";
import { ContainerProps } from "@/utils/interface";

const Container: React.FC<ContainerProps> = ({
  isLandingPage,
  children,
  id,
}) => {
  return isLandingPage ? (
    <div className="absolute lg:flex-row top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-full h-full lg:p-[0_5rem_0_10rem] sm:flex-col sm:p-0">{children}</div>
  ) : (
    <div className="flex w-full h-full lg:p-[1rem_5rem_0_5rem] flex-col gap-[3rem] mb-[1rem] sm:p-[0_1rem_0_1rem]" id={id}>{children}</div>
  );
};

export default Container;