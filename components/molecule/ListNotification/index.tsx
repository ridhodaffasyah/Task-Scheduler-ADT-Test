import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowModalNotif } from "@/redux/slice/taskSlice";
import { ListNotificationProps } from "@/utils/interface";
import TaskList from "../ListTask";

const ListNotification: React.FC<ListNotificationProps> = ({
  messageDeadline,
  listTaskDeadline,
  onRemoveTask,
  isEdit,
  setIsEdit,
  onClick,
}) => {
  const dispatch = useDispatch();

  const showModalNotif = useSelector((state: any) => state.task.showModalNotif);
  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch(setShowModalNotif(!showModalNotif));
    }, 300);
  };

  return (
    <div className="fixed top-0 left-0 z-[999] w-full h-full flex items-center justify-center overflow-hidden bg-[rgba(0,0,0,0.4)] duration-[0.3s] ease-in-out transition-opacity">
      <div className="bg-[#fefefe] p-[2rem] rounded-[0.25rem] lg:w-[75%] lg:max-h-[80vh] overflow-y-auto sm:w-full sm:max-h-[100vh]">
        <span
          className="text-[#aaa] float-right text-[28px] font-bold hover:text-orange-400 hover:no-underline hover:cursor-pointer focus:text-orange-400 focus:no-underline focus:cursor-pointer"
          onClick={handleCloseModal}
        >
          &times;
        </span>
        <div className="flex flex-col lg:gap-[1rem] sm:gap-[0.25rem]">
          <h2 className="font-bold text-[1.5rem]">List Notification</h2>
        </div>
        <div className="flex flex-col gap-[0.5rem] my-[1rem]">
          <p className="text-black font-bold italic underline text-[1.5rem]">
            {messageDeadline}
          </p>
        </div>
        <div className="flex gap-[1rem] flex-col items-center justify-center">
          {listTaskDeadline.map((item: any) => (
            <TaskList
              key={item._id}
              title={item.title}
              desc={item.desc}
              date={item.date}
              status={item.status}
              onRemoveTask={onRemoveTask}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListNotification;
