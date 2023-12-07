import React, { useEffect, useState } from "react";
import LayoutPages from "@/components/layout";
import TaskList from "@/components/molecule/ListTask";
import Container from "@/components/organism/Container";

const Home = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleTaskClick = (task: any) => {
    console.log(task);
  };

  const handleFavoriteToggle = (id: any) => {
    console.log(id);
  };

  const handleUnfavoriteToggle = (id: any) => {
    console.log(id);
  };

  const handleRemoveTask = (id: any) => {
    console.log(id);
  };

  let importantTask = [
    {
      id: 1,
      title: "Physics Assignment",
      desc: "Do exercises at page 11 of Halliway Book",
      date: "01-01-2022",
      hours: "12:00 PM",
    },
  ];

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
            Favorite Contact
          </h1>
          {importantTask.length === 0 ? (
            <p className="lg:text-[1.25rem] font-[500] text-black mb-[1rem] text-center sm:text-[1.5rem]">
              You don't have any favorite contact yet.
            </p>
          ) : (
            <div className="flex w-full lg:p-[0_5rem_0_5rem] flex-col gap-[1rem] sm:p-0">
              <div className="grid lg:grid-cols-[repeat(2,1fr)] gap-[1rem] sm:grid-cols-[repeat(1,1fr)]">
                {importantTask.map((task) => (
                  <TaskList
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    desc={task.desc}
                    date={task.date}
                    hours={task.hours}
                    isFavorite={importantTask.some(
                      (impTask) => impTask.id === task.id
                    )}
                    onFavoriteToggle={() => handleFavoriteToggle(task.id)}
                    onUnfavoriteToggle={() => handleUnfavoriteToggle(task.id)}
                    onRemoveContact={() => handleRemoveTask(task.id)}
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
    </LayoutPages>
  );
};

export default Home;
