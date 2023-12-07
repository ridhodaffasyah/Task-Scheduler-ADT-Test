import React, { useState } from "react";
import Image from "next/image";
import { ListContactProps } from "@/utils/interface";

const TaskList: React.FC<ListContactProps> = ({
  title,
  desc,
  date,
  hours,
  isFavorite,
  onFavoriteToggle,
  onUnfavoriteToggle,
  onRemoveContact,
  onClick,
}) => {
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget.id === "edit-btn") {
      setIsEditHovered(true);
    } else if (event.currentTarget.id === "delete-btn") {
      setIsDeleteHovered(true);
    } else if (event.currentTarget.id === "favorite-btn") {
      setIsFavoriteHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsEditHovered(false);
    setIsDeleteHovered(false);
    setIsFavoriteHovered(false);
  };

  return (
    <div className="flex items-center gap-[1rem] lg:p-[1rem_2rem] rounded-[0.25rem] bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] transition-all duration-[0.25s] ease-in-out w-full hover:bg-[#fff3da] hover:text-black hover:cursor-pointer sm:p-[1rem_1.5rem_1rem_1.75rem]">
      <div className="flex items-center lg:gap-[1rem] w-full sm:gap-[1.75rem]">
        <div className="w-[75px] lg:h-[75px] flex items-center justify-center sm:w-[30px] sm:h-[30px]">
          <Image
            src="/images/task.png"
            alt="profile"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <strong>{title}</strong>
          <p>{desc}</p>
          <p>
            {date} ({hours})
          </p>
        </div>
      </div>
      <div className="flex lg:flex-row items-center lg:gap-[1rem] justify-end sm:flex-col sm:p-0 sm:gap-[0.5rem]">
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <Image
            src={
              isFavorite || isFavoriteHovered
                ? "/images/star-on.png"
                : "/images/star-off.png"
            }
            alt="star"
            id="favorite-btn"
            width={20}
            height={20}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={isFavorite ? onUnfavoriteToggle : onFavoriteToggle}
          />
        </div>
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <Image
            src={isEditHovered ? "/images/edit-on.png" : "/images/edit-off.png"}
            alt="edit"
            width={20}
            height={20}
            id="edit-btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
          />
        </div>
        <div className="w-[20px] h-[20px] flex items-center justify-center">
          <Image
            src={
              isDeleteHovered
                ? "/images/delete-on.png"
                : "/images/delete-off.png"
            }
            alt="delete"
            width={20}
            height={20}
            id="delete-btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onRemoveContact}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
