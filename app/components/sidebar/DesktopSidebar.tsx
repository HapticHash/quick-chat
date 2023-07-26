"use client";

import DesktopItem from "./DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import Image from "next/image";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ currentUser }, "TEST");

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-0 lg:overflow-y-auto  lg:bg-white lg:border-r-[2px] lg:border-[#f8f8f8] lg:pb-4 lg:pt-4 lg:flex lg:flex-col justify-between">
        <Image
          src="/images/logo.png"
          alt="Logo"
          height={50}
          width={50}
          className="mx-auto w-auto"
        />
        <nav className="mt-4 flex flex-col justify-between">
          <ul
            role="list"
            className="flex flex-col items-center space-y-2 w-full"
          >
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          ></div>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            className="cursor-pointer hover:opacity-75 transition"
            onClick={() => setIsOpen(true)}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
