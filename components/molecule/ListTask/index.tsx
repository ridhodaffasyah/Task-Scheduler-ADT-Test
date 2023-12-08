import React, { useState } from "react";
import Image from "next/image";
import { ListContactProps } from "@/utils/interface";

const TaskList: React.FC<ListContactProps> = ({
  title,
  desc,
  date,
  status,
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

  const convertDate = (date: any) => {
    // From 2024-12-31T17:00:00.000Z to 31 December 2024
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    return `${day} ${month} ${year}`;
  };

  const calculateTimeRemaining = (date: any) => {
    // Convert the deadline string to a Date object
    const deadline = new Date(date);

    // Get the current time
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const timeRemaining = deadline.getTime() - currentTime.getTime();

    // Convert milliseconds to days, hours, minutes, and seconds
    const days: number = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

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
          <div>
            <p className="font-bold">
              {convertDate(date)}
            </p>
            {
              calculateTimeRemaining(date).minutes > 0 ? (
                <span>Remaining time: {`${calculateTimeRemaining(date).days} Days ${calculateTimeRemaining(date).hours} Hours ${calculateTimeRemaining(date).minutes} Minutes`}</span>
              ) : (
                <span className="italic">Out of date or The task already finished!</span>
              )
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-[1rem] w-[25%] h-full items-end">
        <strong className={`${status == "pending" ? "text-red-500" : status == "in-progress" ? "text-yellow-600" : status == "done" ? "text-green-600" : "text-black"} uppercase font-bold`}>{status}</strong>
        <div className="flex lg:flex-row items-center lg:gap-[1rem] justify-end sm:flex-col sm:p-0 sm:gap-[0.5rem]">
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
      
    </div>
  );
};

export default TaskList;
