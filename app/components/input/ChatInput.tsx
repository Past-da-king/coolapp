'use client';

import { useRef } from 'react';
import { FiSend, FiPaperclip, FiImage, FiMic, FiStopCircle, FiX, FiFileText, FiArrowRight } from 'react-icons/fi';
import { IoAttachOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineWeb } from "react-icons/md";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  attachedFiles: { fileData: string; fileType: string; fileName: string }[];
  removeAttachedFile: (index: number) => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

export default function ChatInput({
  message,
  setMessage,
  handleSendMessage,
  attachedFiles,
  removeAttachedFile,
  handleFileSelect,
  fileInputRef,
  isRecording,
  startRecording,
  stopRecording,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSendMessage} className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 bg-transparent outline-none"
        placeholder="Ask whatever you want...."
      />
      <div className="flex items-center space-x-4 text-gray-500">
        <IoAttachOutline size={20} className="cursor-pointer" />
        <LuImagePlus size={20} className="cursor-pointer" />
        <span className="text-sm">0/1000</span>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded-full">
          <FiArrowRight size={20} />
        </button>
      </div>
    </form>
  );
}
