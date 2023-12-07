import Image from "next/image";
import React, { useEffect, useState } from "react";
import LayoutPages from "@/components/layout";
import TaskList from "@/components/molecule/ListTask";
import Container from "@/components/organism/Container";
import PopupMessage from "@/components/atom/PopUpMessage";

import { useSelector, useDispatch } from "react-redux";
import {
  useGetTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
} from "@/services/task";
import { setTask } from "@/redux/slice/taskSlice";

const Home = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const task = useSelector((state: any) => state.task);
  const [listTask, setListTask] = useState(task);

  const dispatch = useDispatch();
  const [getTask] = useGetTaskMutation();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    getTask()
      .unwrap()
      .then((res) => {
        dispatch(setTask(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(task);

  const handleTaskClick = (task: any) => {
    console.log(task);
  };

  const handleFavoriteToggle = (id: any) => {
    console.log(id);
  };

  const handleUnfavoriteToggle = (id: any) => {
    console.log(id);
  };

  const showSuccessMessage = (message: string) => {
    setIsSuccess(true);
    setMessage(message);

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setMessage("");
    }, 3000);
  };

  const showErrorMessage = (message: string) => {
    setIsError(true);
    setMessage(message);

    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      setIsError(false);
      setMessage("");
    }, 3000);
  };

  const handleAddContact = () => {
    setIsShowModal(true);
    console.log("add");
  };

  const handleRemoveTask = (id: any) => {
    deleteTask(id)
      .unwrap()
      .then((res) => {
        getTask()
          .unwrap()
          .then((res) => {
            dispatch(setTask(res));
            setIsSuccess(true);
            showSuccessMessage("Task deleted successfully!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        showErrorMessage("Failed to delete task!");
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setListTask(task);
    } else {
      const filteredTask = listTask.task.task?.filter((task: any) =>
        task.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setListTask({ task: { task: filteredTask } });
    }
  };

  return (
    <LayoutPages>
      <div className='bg-[url("/images/background.jpg")] bg-cover bg-center bg-no-repeat h-[100vh] w-full opacity-[0.06]' />
      <div className="h-[100vh] w-full">
        <Container isLandingPage>
          <div className="flex flex-col lg:justify-center lg:text-left lg:items-start w-[65%] h-full sm:items-center sm:justify-end sm:text-center">
            <h1 className="lg:text-[5rem] font-[900] text-black mb-[1rem] uppercase sm:text-[2rem]">
              Task Scheduler
            </h1>
            <h2 className="lg:text-[1.75rem] font-[500] text-black mb-[1rem] sm:text-[1.25rem]">
              <span className="lg:text-[2rem] underline decoration-black lg:decoration-[0.25rem] underline-offset-[0.6rem] sm:decoration-[0.15rem] sm:text-[1.25rem]">
                Manage
              </span>{" "}
              your task, for the better future!
            </h2>
          </div>
          <div className="flex lg:flex-row lg:w-full lg:h-full items-center lg:justify-end relative z-[2] sm:w-[70%] sm:h-[80%] sm:mt-[1rem] sm:mb-[2rem] sm:flex-col sm:justify-start">
            <img
              className="w-[60%] h-auto drop-shadow-[0_0_0.75rem_rgba(0,0,0,0.5)]"
              src="/images/cartoon-2.png"
              alt="cartoon"
            />
          </div>
        </Container>
        <Container id="contact-list">
          <div className="flex justify-between items-center mt-[1rem]">
            <h1 className="lg:text-[2rem] font-bold lg:text-left sm:text-[1.75rem] sm:text-center">
              List of Task
            </h1>
            <div className="flex lg:flex-row items-center lg:justify-end lg:w-[50%] lg:gap-[2rem] sm:w-full sm:flex-col sm:gap-[0.25rem] sm:justify-center">
            <div
              className="flex items-center justify-between gap-[0.75rem] p-[0.75rem] hover:cursor-pointer hover:font-bold"
              onClick={handleAddContact}
            >
              <div className="w-[25px] h-[25px] flex items-center justify-center">
                <Image src="/images/add.png" alt="add" width={25} height={25} />
              </div>
              <span>Add Contact</span>
            </div>
            <input
              className="lg:w-[40%] lg:h-[2.5rem] rounded-[0.5rem] border-[1px_solid_#000] p-[0_1rem] lg:text-[1rem] font-[500] text-black outline-none transition-all duration-[0.25s] ease-in-out focus:shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] sm:text-[0.75rem] sm:w-full sm:h-[2rem]"
              type="text"
              placeholder="Search Contact..."
              onInput={handleSearch}
            />
          </div>
          </div>
          
          {task.length === 0 ? (
            <p className="lg:text-[1.25rem] font-[500] text-black mb-[1rem] text-center sm:text-[1.5rem]">
              You don't have any tasks yet.
            </p>
          ) : (
            <div className="flex w-full lg:p-[0_5rem_0_5rem] flex-col gap-[1rem] sm:p-0">
              <div className="grid lg:grid-cols-[repeat(2,1fr)] gap-[1rem] sm:grid-cols-[repeat(1,1fr)]">
                {listTask.task?.task?.map((task: any) => (
                  <TaskList
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    desc={task.desc}
                    date={task.date}
                    status={task.status}
                    onFavoriteToggle={() => handleFavoriteToggle(task.id)}
                    onUnfavoriteToggle={() => handleUnfavoriteToggle(task.id)}
                    onRemoveContact={() => handleRemoveTask(task._id)}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onClick={() => handleTaskClick(task)}
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
      {isSuccess && <PopupMessage message={message} type="success" />}
      {isError && <PopupMessage message={message} type="error" />}
      {/* {(isShowModal || isEdit) && (
        <FormModal
          setIsShowModal={setIsShowModal}
          // updateContactsList={updateContactsList}
          // updateEditedContact={updateEditedContact}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedContact={selectedContact}
          showErrorMessage={showErrorMessage}
          showSuccessMessage={showSuccessMessage}
        />
      )} */}
    </LayoutPages>
  );
};

export default Home;
