"use client";

import { User } from "@prisma/client";
import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import * as style from "@dicebear/fun-emoji";

import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  // const genAvatar = useMemo(() => {
  //   return createAvatar(style, {
  //     size: 24,
  //     scale: 50,
  //     radius: 0,
  //     backgroundType: ["gradientLinear", "solid"],
  //     backgroundColor: [
  //       "059ff2",
  //       "71cf62",
  //       "d84be5",
  //       "d9915b",
  //       "f6d594",
  //       "fcbc34",
  //     ],
  //     clip: true,
  //     randomizeIds: true,
  //     eyes: [
  //       "closed",
  //       "closed2",
  //       "cute",
  //       "glasses",
  //       "love",
  //       "shades",
  //       "stars",
  //       "wink",
  //       "wink2",
  //     ],
  //     mouth: [
  //       "cute",
  //       "faceMask",
  //       "kissHeart",
  //       "lilSmile",
  //       "shy",
  //       "smileTeeth",
  //       "tongueOut",
  //       "wideSmile",
  //     ],
  //   }).toDataUriSync();
  // }, []);

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 drop-shadow-md">
        <Image
          fill
          src={user?.image || "/images/placeholder.png"}
          alt="Avatar"
        />
      </div>

      <span className="absolute block rounded-full  bg-green-500 ring-2  ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
    </div>
  );
};

export default Avatar;
