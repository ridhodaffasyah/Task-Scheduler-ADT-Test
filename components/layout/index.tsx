import React from "react";
import Image from "next/image";
import Button from "../atom/Button";
import Navbar from "../molecule/Navbar";
import { LayoutProps } from "@/utils/interface";
import { useSelector, useDispatch } from "react-redux";
import { setShowModalNotif } from "@/redux/slice/taskSlice";

const LayoutPages: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const showModalNotif = useSelector((state: any) => state.task.showModalNotif);

  const handleButtonExplore = () => {
    const element = document.getElementById("contact-list");
    if (element) {
      const yOffset = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const handleNotifClick = () => {
    dispatch(setShowModalNotif(!showModalNotif));
  };

  return (
    <main>
      <Navbar>
        <div className="flex items-center md:justify-start md:max-w-[30%] h-auto max-w-full justify-center">
          <Image src="/images/logo.png" alt="logo" width={220} height={30} />
        </div>
        <div className="flex justify-between items-center md:flex-row flex-col md:max-w-[12%] w-1/2">
          <div
            className="flex items-center justify-start max-w-[20%] h-auto hover:cursor-pointer"
            onClick={handleNotifClick}
          >
            <Image
              src="/images/notification-deactive.png"
              alt="logo"
              width={30}
              height={30}
            />
          </div>
          <Button isExplore text="Explore" handleButton={handleButtonExplore} />
        </div>
      </Navbar>
      {children}
    </main>
  );
};

export default LayoutPages;
