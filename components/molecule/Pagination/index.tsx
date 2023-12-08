import React from "react";
import PaginationItem from "@/components/atom/PaginationItem";

import { Paginationrops } from "@/utils/interface";

const Pagination: React.FC<Paginationrops> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mb-[2rem] flex-wrap items-center">
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        />
      ))}
    </div>
  );
};

export default Pagination;
