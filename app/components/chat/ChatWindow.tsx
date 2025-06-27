'use client';

import { useRef, useEffect } from 'react';
import { FiEdit, FiFileText, FiMic } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  _id?: string;
  role: string;
  parts: { text?: string; image?: string; document?: string; audio?: string; fileName?: string; }[];
  createdAt?: Date;
}

interface ChatWindowProps {
  chatHistory: Message[];
  editingMessageId: string | null;
  editedMessage: string;
  handleEditMessage: (id: string, text: string) => void;
  handleUpdateMessage: (id: string) => void;
  getRootProps: () => any;
  getInputProps: () => any;
}

export default function ChatWindow({
  chatHistory,
  editingMessageId,
  editedMessage,
  handleEditMessage,
  handleUpdateMessage,
  getRootProps,
  getInputProps,
}: ChatWindowProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <main {...getRootProps()} className="flex-grow p-6 overflow-y-auto">
      <input {...getInputProps()} />
      {chatHistory.map((msg, index) => (
        <div key={index} className={`flex mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden shadow-sm">
              {msg.role === 'user' ? (
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=User" alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=Thabo" alt="Thabo Avatar" className="w-full h-full object-cover" />
              )}
            </div>
            {/* Message Bubble */}
            <div className={`px-5 py-3 rounded-2xl shadow-md max-w-xl transition-all duration-200 ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
              {msg.parts.map((part, partIndex) => (
                <div key={partIndex} className="space-y-2">
                  {part.text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>}
                  {part.image && <img src={part.image} alt={part.fileName || "attached image"} className="mt-2 rounded-lg max-w-full h-auto shadow-sm"/>}
                  {part.document && (
                    <div className="flex items-center mt-2 p-2 bg-gray-100 rounded-lg text-gray-700 shadow-sm">
                      <FiFileText className="h-5 w-5 mr-2 flex-shrink-0"/>
                      <span className="text-sm font-medium truncate">{part.fileName || "Attached Document"}</span>
                    </div>
                  )}
                  {part.audio && (
                    <div className="flex items-center mt-2 p-2 bg-gray-100 rounded-lg text-gray-700 shadow-sm">
                      <FiMic className="h-5 w-5 mr-2 flex-shrink-0"/>
                      <span className="text-sm font-medium truncate">{part.fileName || "Voice Message"}</span>
                      <audio controls src={part.audio} className="ml-auto"/>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Edit Button */}
            {msg.role === 'user' && !editingMessageId && (
              <button onClick={(e) => { e.stopPropagation(); handleEditMessage(msg._id!, msg.parts[0].text || ''); }} className="self-center text-gray-400 hover:text-gray-600 ml-2 transition-colors duration-200">
                <FiEdit size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </main>
  );
}