"use client";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import MessageInput from "./MessageInput ";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className="bg-gray-50 mb-3">
      <div className="py-3 px-4 bg-white flex items-center gap-2 lg:w-[95%] w-full m-auto shadow-md rounded-lg">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="aeuv67kl"
        >
          <HiPhoto
            size={34}
            className="text-[#005fe6] hover:text-[#006aff] cursor-pointer"
          />
        </CldUploadButton>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 w-full"
        >
          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Write a message"
          />
          <button
            type="submit"
            className="rounded-full p-3 bg-blue-600 cursor-pointer hover:bg-blue-500 transition"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
