'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { IoAttachOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineWeb } from "react-icons/md";
import ChatWindow from './chat/ChatWindow';
import ChatInput from './input/ChatInput';

interface Message {
  _id?: string;
  role: string;
  parts: { text?: string; image?: string; document?: string; audio?: string; fileName?: string; }[];
  createdAt?: Date;
}

export default function HomeChat() {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<{ fileData: string; fileType: string; fileName: string }[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch('/api/chat/history');
      if (response.ok) {
        const data = await response.json();
        setChatHistory(data.history);
      } else {
        console.error('Failed to fetch chat history');
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: message.trim() }],
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, attachedFiles }),
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let modelResponseText = '';

        const modelMessage: Message = {
          role: 'model',
          parts: [{ text: '' }],
        };

        setChatHistory((prev) => [...prev, modelMessage]);

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;
          modelResponseText += decoder.decode(value);
          setChatHistory((prev) => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = {
              ...modelMessage,
              parts: [{ text: modelResponseText }],
            };
            return newHistory;
          });
        }

        // Save messages to DB after full response is received
        await fetch('/api/chat/save-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userMessage, modelResponse: { role: 'model', parts: [{ text: modelResponseText }] } }),
        });

      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setAttachedFiles([]);
  };

  const handleEditMessage = (id: string, text: string) => {
    setEditingMessageId(id);
    setEditedMessage(text);
  };

  const handleUpdateMessage = async (id: string) => {
    try {
      const response = await fetch('/api/chat/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updatedText: editedMessage }),
      });

      if (response.ok) {
        fetchChatHistory();
        setEditingMessageId(null);
        setEditedMessage('');
      } else {
        console.error('Failed to update message');
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setAttachedFiles((prev) => [
              ...prev,
              { fileData: e.target.result as string, fileType: file.type, fileName: file.name },
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAttachedFiles((prev) => [
            ...prev,
            { fileData: e.target.result as string, fileType: file.type, fileName: file.name },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col h-full justify-between">
      {chatHistory.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            Hi there, <span className="text-purple-600">John</span>
          </h1>
          <h2 className="text-5xl font-bold mb-8">
            What would like to know?
          </h2>
          <p className="text-gray-600 mb-12">
            Use one of the most common prompts below or use your own to begin
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mb-12">
            <div className="bg-gray-100 p-4 rounded-lg text-left flex flex-col justify-between min-h-[120px]">
              <p className="font-semibold">Write a to-do list for a personal project or task</p>
              <div className="flex justify-end text-gray-500">
                {/* Icon placeholder */}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-left flex flex-col justify-between min-h-[120px]">
              <p className="font-semibold">Generate an email to reply to a job offer</p>
              <div className="flex justify-end text-gray-500">
                {/* Icon placeholder */}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-left flex flex-col justify-between min-h-[120px]">
              <p className="font-semibold">Summarise this article or text for me in one paragraph</p>
              <div className="flex justify-end text-gray-500">
                {/* Icon placeholder */}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-left flex flex-col justify-between min-h-[120px]">
              <p className="font-semibold">How does AI work in a technical capacity</p>
              <div className="flex justify-end text-gray-500">
                {/* Icon placeholder */}
              </div>
            </div>
          </div>

          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-12">
            <FiRefreshCw className="mr-2" /> Refresh Prompts
          </button>
        </div>
      ) : (
        <ChatWindow
          chatHistory={chatHistory}
          editingMessageId={editingMessageId}
          editedMessage={editedMessage}
          handleEditMessage={handleEditMessage}
          handleUpdateMessage={handleUpdateMessage}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        />
      )}

      <div className="w-full max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-md p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600">Ask whatever you want....</p>
          <div className="flex items-center text-gray-600">
            <MdOutlineWeb className="mr-1" /> All Web
          </div>
        </div>
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          attachedFiles={attachedFiles}
          removeAttachedFile={removeAttachedFile}
          handleFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>
    </div>
  );
}