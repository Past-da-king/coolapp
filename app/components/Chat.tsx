
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FiSend, FiTrash2, FiEdit, FiPaperclip, FiImage, FiMenu, FiX, FiMic, FiStopCircle } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';

interface Message {
  _id?: string;
  role: string;
  parts: { text?: string; image?: string; document?: string; audio?: string }[];
  createdAt?: Date;
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const fetchChatHistory = async () => {
      const res = await fetch('/api/chat/history');
      const data = await res.json();
      setChatHistory(data.history);
    };
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const base64File = reader.result;
        handleSendMessage(new Event('submit') as any, base64File as string, file.type);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64File = e.target?.result as string;
        handleSendMessage(new Event('submit') as any, base64File, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>, fileData?: string, fileType?: string) => {
    e.preventDefault();
    if (!message.trim() && !fileData) return;

    const userParts: { text?: string; image?: string; document?: string; audio?: string }[] = [];
    if (message.trim()) {
      userParts.push({ text: message });
    }
    if (fileData) {
      if (fileType?.startsWith('image/')) {
        userParts.push({ image: fileData });
      } else if (fileType?.startsWith('audio/')) {
        userParts.push({ audio: fileData });
      } else {
        userParts.push({ document: fileData });
      }
    }

    const userMessage: Message = { role: 'user', parts: userParts };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, fileData, fileType }),
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    let receivedText = '';
    const decoder = new TextDecoder();

    // Optimistically add a placeholder for the model's response
    const modelPlaceholder: Message = { role: 'model', parts: [{ text: '' }] };
    setChatHistory(prev => [...prev.slice(0, -1), userMessage, modelPlaceholder]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedText += decoder.decode(value);
      // Update the last message in chatHistory with the streamed content
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { ...modelPlaceholder, parts: [{ text: receivedText }] };
        return newHistory;
      });
    }

    // Update the database with the full response
    await fetch('/api/chat/save-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, modelResponse: { parts: [{ text: receivedText }], role: 'model' } }),
    });
  };

  const handleClearChat = async () => {
    await fetch('/api/chat/clear', { method: 'POST' });
    setChatHistory([]);
  };

  const handleEditMessage = (id: string, text: string) => {
    setEditingMessageId(id);
    setEditedMessage(text);
  };

  const handleUpdateMessage = async (id: string) => {
    await fetch(`/api/chat/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, newText: editedMessage }),
    });

    setChatHistory(chatHistory.map(msg => 
      msg._id === id ? { ...msg, parts: [{ text: editedMessage }] } : msg
    ));

    setEditingMessageId(null);
    setEditedMessage('');
  };

  const handlePaste = useCallback(async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const image = e.target?.result as string;
              handleSendMessage(new Event('submit') as any, image, item.type);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    }
  }, [handleSendMessage]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = (e) => {
          const audioData = e.target?.result as string;
          handleSendMessage(new Event('submit') as any, audioData, 'audio/webm');
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className={`bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${!sidebarOpen && 'hidden'}`}>Gemini Chat</h1>
        </div>
        <div className={`flex-grow p-4 ${!sidebarOpen && 'hidden'}`}>
          <button onClick={handleClearChat} className="w-full flex items-center justify-center p-2 bg-red-600 text-white rounded hover:bg-red-700">
            <FiTrash2 className="mr-2" /> Clear Chat
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-700 flex items-center bg-gray-800">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-full hover:bg-gray-700">
                {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <h2 className="text-xl font-semibold ml-4">Conversation</h2>
        </header>
        <main {...getRootProps()} className="flex-grow p-6 overflow-y-auto bg-gray-900">
          <input {...getInputProps()} />
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex items-start mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                    <div className={`px-4 py-3 rounded-lg shadow-md ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
                        {editingMessageId === msg._id ? (
                        <input 
                            type="text"
                            value={editedMessage}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            onBlur={() => handleUpdateMessage(msg._id!)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateMessage(msg._id!)}
                            className="bg-transparent text-white p-0 m-0 border-0 focus:ring-0"
                        />
                        ) : (
                        <p>{msg.parts[0].text}</p>
                        )}
                        {msg.parts[0].image && <img src={msg.parts[0].image} alt="pasted content" className="mt-2 rounded-lg"/>}
                        {msg.parts[0].document && <p className="text-sm text-gray-400">Document attached</p>}
                        {msg.parts[0].audio && <audio controls src={msg.parts[0].audio} className="mt-2"/>}
                    </div>
                    {msg.role === 'user' && !editingMessageId && (
                        <button onClick={(e) => { e.stopPropagation(); handleEditMessage(msg._id!, msg.parts[0].text); }} className="self-center text-gray-500 hover:text-gray-400">
                        <FiEdit />
                        </button>
                    )}
                </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
        <footer className="p-6 bg-gray-800 border-t border-gray-700">
          <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center">
            <button type="button" className="p-3 text-gray-500 hover:text-gray-400 rounded-full hover:bg-gray-700">
              <FiImage />
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-500 hover:text-gray-400 rounded-full hover:bg-gray-700">
              <FiPaperclip />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            {!isRecording ? (
              <button type="button" onClick={startRecording} className="p-3 text-gray-500 hover:text-gray-400 rounded-full hover:bg-gray-700">
                <FiMic />
              </button>
            ) : (
              <button type="button" onClick={stopRecording} className="p-3 text-red-500 hover:text-red-400 rounded-full hover:bg-gray-700">
                <FiStopCircle />
              </button>
            )}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-3 border border-gray-600 rounded-full mx-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button type="submit" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FiSend />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
