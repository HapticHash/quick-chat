"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { BsCheck2All } from "react-icons/bs";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 py-2 px-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx(
    "flex flex-col gap-2 max-w-[80%] md:max-w-[70%]",
    isOwn && "items-end"
  );
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-blue-600 text-white" : "bg-gray-200 text-black",
    data.image ? "rounded-lg p-0" : "rounded-lg py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1 px-3">
          <div className="text-sm font-semibold text-gray-600">
            {data.sender.name}
          </div>
          <div className="text-xs">{format(new Date(data.createdAt), "p")}</div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-105 transition translate ease-in-out duration-700"
            />
          ) : (
            <div className="px-2 py-1">{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-medium text-green-600 flex gap-2">
            <BsCheck2All size={20} />
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
