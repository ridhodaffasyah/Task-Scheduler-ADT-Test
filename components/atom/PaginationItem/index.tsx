import React from "react";
import { PaginationItemProps } from "@/utils/interface";

const PaginationItem: React.FC<PaginationItemProps> = ({
  page,
  className,
  onClick,
}) => {
  return (
    <a
      className={`${
        className === "active" && "bg-orange-400 text-white border-orange-400"
      } p-[0.5rem_0.75rem] m-[0_0.25rem] border-[1px_solid_#ccc] rounded-[4px] cursor-pointer no-underline hover:bg-orange-400 hover:text-white`}
      onClick={onClick}
    >
      {page}
    </a>
  );
};

export default PaginationItem;
