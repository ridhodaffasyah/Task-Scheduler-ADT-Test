import React, { useEffect, useState } from "react";
import LayoutPages from "@/components/layout";
import TaskList from "@/components/molecule/ListTask";
import Container from "@/components/organism/Container";
import PopupMessage from "@/components/atom/PopUpMessage";

import { useSelector, useDispatch } from "react-redux";
import { useGetTaskMutation, useAddTaskMutation, useDeleteTaskMutation } from "@/services/task";
import { setTask } from "@/redux/slice/taskSlice";

const Home = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const task = useSelector((state: any) => state.task);

  const dispatch = useDispatch();
  const [getTask] = useGetTaskMutation();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    getTask().unwrap().then((res) => {
      dispatch(setTask(res));
    }).catch((err) => {
      console.log(err);
    }
    );
  }, []);

  console.log(task)

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

  const handleRemoveTask = (id: any) => {
    deleteTask(id).unwrap().then((res) => {
      getTask().unwrap().then((res) => {
        dispatch(setTask(res));
        setIsSuccess(true);
        showSuccessMessage("Task deleted successfully!");
      }).catch((err) => {
        console.log(err);
      }
      );
    }).catch((err) => {
      console.log(err);
      setIsError(true);
      showErrorMessage("Failed to delete task!");
    }
    );
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
          <h1 className="lg:text-[2rem] mt-[1rem] font-bold lg:text-left sm:text-[1.75rem] sm:text-center">
            List of Task
          </h1>
          {task.length === 0 ? (
            <p className="lg:text-[1.25rem] font-[500] text-black mb-[1rem] text-center sm:text-[1.5rem]">
              You don't have any tasks yet.
            </p>
          ) : (
            <div className="flex w-full lg:p-[0_5rem_0_5rem] flex-col gap-[1rem] sm:p-0">
              <div className="grid lg:grid-cols-[repeat(2,1fr)] gap-[1rem] sm:grid-cols-[repeat(1,1fr)]">
                {task.task.task.map((task: any) => (
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
        {isSuccess && <PopupMessage message={message} type="success" />}
        {isError && <PopupMessage message={message} type="error" />}
      </div>
    </LayoutPages>
  );
};

export default Home;
