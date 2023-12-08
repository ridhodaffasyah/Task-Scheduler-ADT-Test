import React, { useState } from "react";
import Image from "next/image";
import { ListTaskProps } from "@/utils/interface";

const TaskList: React.FC<ListTaskProps> = ({
  title,
  desc,
  date,
  status,
  onRemoveTask,
  onClick,
}) => {
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget.id === "edit-btn") {
      setIsEditHovered(true);
    } else if (event.currentTarget.id === "delete-btn") {
      setIsDeleteHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsEditHovered(false);
    setIsDeleteHovered(false);
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
    const hours: number = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    // const seconds: number = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes };
  };

  return (
    <div className="flex items-center gap-[1rem] md:p-[1rem_2rem] rounded-[0.25rem] bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] transition-all duration-[0.25s] ease-in-out w-full hover:bg-[#fff3da] hover:text-black hover:cursor-pointer p-[1rem_1.5rem_1rem_1.75rem]">
      <div className="flex items-center md:gap-[1rem] w-full gap-[1.75rem]">
        <div className="md:w-[75px] md:h-[75px] flex items-center justify-center w-[30px] h-[30px]">
          <Image
            src="/images/task.png"
            alt="profile"
            width={100}
            height={100}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <strong className="md:text-[1rem] text-[0.65rem]">{title}</strong>
          <p className="md:text-[1rem] text-[0.65rem]">{desc}</p>
          <div>
            <p className="font-bold md:text-[1rem] text-[0.65rem]">
              {convertDate(date)}
            </p>
            {calculateTimeRemaining(date).minutes > 0 ? (
              <span className="md:text-[1rem] text-[0.65rem]">
                Remaining time:{" "}
                {`${calculateTimeRemaining(date).days} Days ${
                  calculateTimeRemaining(date).hours
                } Hours ${calculateTimeRemaining(date).minutes} Minutes`}
              </span>
            ) : (
              <span className="italic md:text-[1rem] text-[0.65rem]">
                Out of date or The task already finished!
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-[1rem] w-[25%] h-full items-end">
        <strong
          className={`${
            status == "pending"
              ? "text-red-500"
              : status == "in-progress"
              ? "text-yellow-600"
              : status == "done"
              ? "text-green-600"
              : "text-black"
          } uppercase font-bold md:text-[1rem] text-[0.6rem]`}
        >
          {status}
        </strong>
        <div className="flex md:flex-row items-center md:gap-[1rem] justify-end flex-col p-0 gap-[0.5rem]">
          <div className="w-[20px] h-[20px] flex items-center justify-center">
            <Image
              src={
                isEditHovered ? "/images/edit-on.png" : "/images/edit-off.png"
              }
              alt="edit"
              width={20}
              height={20}
              id="edit-btn"
              className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
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
              className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
              id="delete-btn"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={onRemoveTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
