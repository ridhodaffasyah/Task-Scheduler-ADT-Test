import Image from "next/image";
import React, { useEffect, useState } from "react";
import LayoutPages from "@/components/layout";
import TaskList from "@/components/molecule/ListTask";
import Container from "@/components/organism/Container";
import PopupMessage from "@/components/atom/PopUpMessage";
import FormModal from "@/components/organism/Form";
import Pagination from "@/components/molecule/Pagination";

import { useSelector, useDispatch } from "react-redux";
import { useGetTaskMutation, useDeleteTaskMutation } from "@/services/task";
import { setTask, setShowModalNotif } from "@/redux/slice/taskSlice";
import ListNotification from "@/components/molecule/ListNotification";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
}

const Home = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [statusOptions] = useState([
    "done",
    "in-progress",
    "pending",
    "created",
    "all",
  ]);

  const task = useSelector((state: any) => state.task);
  const showModalNotif = useSelector((state: any) => state.task.showModalNotif);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getTask({})
      .unwrap()
      .then((res) => {
        dispatch(setTask(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [listTask, setListTask] = useState(task.task);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the contacts for the current page
  const currentPageTask = listTask.task?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(listTask.task.length / itemsPerPage);

  const dispatch = useDispatch();

  const [getTask] = useGetTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsEdit(true);
    setIsShowModal(true);
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

  const handleAddButton = () => {
    setIsShowModal(true);
  };

  const handleRemoveTask = (id: any) => {
    deleteTask(id)
      .unwrap()
      .then((res) => {
        getTask({})
          .unwrap()
          .then((res) => {
            dispatch(setTask(res));
            setIsSuccess(true);
            showSuccessMessage("Task deleted successfully!");
            // Update the listTask state with the new task list
            setListTask({ task: res.task });
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
      setListTask(task.task);
    } else {
      const filteredTask = task.task?.task?.filter(
        (task: any) =>
          task.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          task.status.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setListTask({ task: filteredTask });
    }
  };

  const updateListTask = (newTask: any) => {
    setListTask({ task: [...listTask.task, newTask] });
  };

  const updateEditedTask = (updatedTask: any) => {
    const updatedTaskList = listTask.task?.map((task: any) => {
      if (task._id === updatedTask._id) {
        return updatedTask;
      }
      return task;
    });

    setListTask({ task: updatedTaskList });
  };

  const handleFilterStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      // Show all tasks
      setListTask(task.task);
    } else {
      // Filter tasks based on the selected status
      const filteredTasks = task.task?.task?.filter(
        (task: any) => task.status === e.target.value
      );
      setListTask({ task: filteredTasks });
    }
  };

  const calculateTimeRemaining = (date: any): TimeRemaining => {
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

  const [listTaskDeadline, setListTaskDeadline] = useState<any>([]);
  const [messageDeadline, setMessageDeadline] = useState<any>("");

  const checkDeadline = (date: any) => {
    const { days, hours, minutes } = calculateTimeRemaining(date);
    if (days === 0) {
      return {
        bool: true,
        msg: "Don't forget to complete your task, the deadline is today!",
      };
    }
    return {
      bool: false,
      msg: "",
    };
  };

  const updateListTaskDeadline = () => {
    const updatedListTaskDeadline = listTask.task?.filter(
      (task: any) => checkDeadline(task.date).bool
    );
    setListTaskDeadline(updatedListTaskDeadline);
    setMessageDeadline(checkDeadline(listTask.task[0]?.date).msg);
  };

  useEffect(() => {
    updateListTaskDeadline();
  }, []);

  return (
    <LayoutPages>
      <div className='bg-[url("/images/background.jpg")] bg-cover bg-center bg-no-repeat h-[100vh] w-full opacity-[0.06]' />
      <div className="h-[100vh] w-full">
        <Container isLandingPage>
          <div className="flex flex-col md:justify-center md:text-left md:items-start w-[65%] h-full items-center justify-end text-center">
            <h1 className="md:text-[5rem] font-[900] text-black mb-[1rem] uppercase text-[2rem]">
              Task Scheduler
            </h1>
            <h2 className="md:text-[1.75rem] font-[500] text-black mb-[1rem] text-[1.25rem]">
              <span className="md:text-[2rem] underline decoration-black md:decoration-[0.25rem] underline-offset-[0.6rem] decoration-[0.15rem] text-[1.25rem]">
                Manage
              </span>{" "}
              your task, for the better future!
            </h2>
          </div>
          <div className="flex md:flex-row md:w-full md:h-full items-center md:justify-end relative z-[2] w-[70%] h-[80%] mt-[1rem] mb-[2rem] flex-col justify-start">
            <img
              className="w-[60%] h-auto drop-shadow-[0_0_0.75rem_rgba(0,0,0,0.5)]"
              src="/images/cartoon-2.png"
              alt="cartoon"
            />
          </div>
        </Container>
        <Container id="contact-list">
          <div className="flex md:flex-row flex-col justify-between items-center mt-[1rem] md:gap-0 gap-[1rem]">
            <h1 className="md:text-[2rem] font-bold md:text-left text-[1.5rem] text-center">
              List of Task
            </h1>
            <div className="flex md:flex-row md:items-center md:justify-end md:w-[50%] md:gap-[2rem] w-full flex-col gap-[0.25rem] justify-center">
              <div className="flex flex-row items-center justify-center gap-[1rem]">
                <div className="w-[25px] h-[25px] flex items-center justify-center">
                  <Image
                    src="/images/filter.png"
                    alt="add"
                    className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]"
                    width={25}
                    height={25}
                  />
                </div>
                <select
                  className="p-[0.25rem_0.5rem] capitalize shadow-[0_0_0.1rem_rgba(0,0,0,0.25)] text-black rounded-[0.25rem] md:text-[1rem] md:w-full w-1/2 md:h-[2.5rem] h-[2rem] outline-none transition-all duration-[0.25s] ease-in-out cursor-pointer focus:border-[1px_solid_black] focus:shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] text-[0.75rem]"
                  id="filter-status"
                  value={filteredStatus}
                  onChange={(e) => {
                    setFilteredStatus(e.target.value);
                    handleFilterStatus(e);
                  }}
                >
                  <option value="" hidden disabled selected>
                    {filteredStatus}
                  </option>
                  {statusOptions.map((option) => (
                    <option className="capitalize" key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="flex items-center md:m-0 m-auto md:justify-between gap-[0.75rem] p-[0.75rem] md:w-auto w-1/2 justify-center hover:cursor-pointer hover:font-bold"
                onClick={handleAddButton}
              >
                <div className="w-[25px] h-[25px] flex items-center justify-center">
                  <Image
                    src="/images/add.png"
                    alt="add"
                    className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]"
                    width={25}
                    height={25}
                  />
                </div>
                <span>Add Task</span>
              </div>
              <input
                className="md:w-[40%] md:h-[2.5rem] shadow-[0_0_0.1rem_rgba(0,0,0,0.5)] rounded-[0.5rem] border-[1px_solid_#000] p-[0_1rem] md:text-[1rem] font-[500] text-black outline-none transition-all duration-[0.25s] ease-in-out focus:shadow-[0_0_0.5rem_rgba(0,0,0,0.25)] text-[0.75rem] w-full h-[2rem] mb-[2rem] md:mb-0"
                type="text"
                placeholder="Search Task..."
                onInput={handleSearch}
              />
            </div>
          </div>

          {task.length === 0 ? (
            <p className="lg:text-[1.25rem] font-[500] text-black mb-[1rem] text-center sm:text-[1.5rem]">
              You don't have any tasks yet.
            </p>
          ) : (
            <div className="flex w-full md:p-[0_5rem_0_5rem] flex-col gap-[1rem] p-0">
              <div className="grid md:grid-cols-[repeat(2,1fr)] gap-[1rem] grid-cols-[repeat(1,1fr)]">
                {currentPageTask?.map((task: any) => (
                  <TaskList
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    desc={task.desc}
                    date={task.date}
                    status={task.status}
                    onRemoveTask={() => handleRemoveTask(task._id)}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onClick={() => handleTaskClick(task)}
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
        <div className="flex justify-center items-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
      </div>
      {isSuccess && <PopupMessage message={message} type="success" />}
      {isError && <PopupMessage message={message} type="error" />}
      {(isShowModal || isEdit) && (
        <FormModal
          setIsShowModal={setIsShowModal}
          updateListTask={updateListTask}
          updateEditedTask={updateEditedTask}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedTask={selectedTask}
          showErrorMessage={showErrorMessage}
          showSuccessMessage={showSuccessMessage}
        />
      )}
      {showModalNotif && (
        <ListNotification
          listTaskDeadline={listTaskDeadline}
          messageDeadline={messageDeadline}
          onRemoveTask={() => handleRemoveTask(task._id)}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onClick={() => handleTaskClick(task)}
        />
      )}
    </LayoutPages>
  );
};

export default Home;
