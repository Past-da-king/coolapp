
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FiSend, FiTrash2, FiEdit, FiPaperclip, FiImage, FiMic, FiStopCircle, FiFileText, FiFile, FiX } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const getFileIcon = (fileName: string, fileType: string) => {
  if (fileType.startsWith('image/')) return <FiImage />;
  if (fileType.startsWith('audio/')) return <FiMic />;
  if (fileType.includes('text') || fileName.endsWith('.txt') || fileName.endsWith('.md')) return <FiFileText />;
  return <FiFile />;
};

interface Message {
  _id?: string;
  role: string;
  parts: { text?: string; image?: string; document?: string; audio?: string; fileName?: string; }[];
  createdAt?: Date;
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ fileData: string; fileType: string; fileName: string }[]>([]);
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

  const addAttachedFile = useCallback((fileData: string, fileType: string, fileName: string) => {
    setAttachedFiles(prev => [...prev, { fileData, fileType, fileName }]);
  }, []);

  const removeAttachedFile = useCallback((index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        addAttachedFile(reader.result as string, file.type, file.name);
      };
      reader.readAsDataURL(file);
    });
  }, [addAttachedFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addAttachedFile(e.target?.result as string, file.type, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() && attachedFiles.length === 0) return;

    const userParts: { text?: string; image?: string; document?: string; audio?: string; fileName?: string }[] = [];
    if (message.trim()) {
      userParts.push({ text: message });
    }
    attachedFiles.forEach(file => {
      if (file.fileType.startsWith('image/')) {
        userParts.push({ image: file.fileData, fileName: file.fileName });
      } else if (file.fileType.startsWith('audio/')) {
        userParts.push({ audio: file.fileData, fileName: file.fileName });
      } else {
        userParts.push({ document: file.fileData, fileName: file.fileName });
      }
    });

    const userMessage: Message = { role: 'user', parts: userParts };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setAttachedFiles([]); // Clear attached files after sending

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, attachedFiles }),
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    let receivedText = '';
    const decoder = new TextDecoder();

    const modelPlaceholder: Message = { role: 'model', parts: [{ text: '' }] };
    setChatHistory(prev => [...prev.slice(0, -1), userMessage, modelPlaceholder]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedText += decoder.decode(value);
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { ...modelPlaceholder, parts: [{ text: receivedText }] };
        return newHistory;
      });
    }

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
        if (item.type.indexOf('image') !== -1 || item.type.indexOf('application/') !== -1 || item.type.indexOf('audio/') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (e) => {
              addAttachedFile(e.target?.result as string, item.type, 'pasted_file'); // Generic name for pasted files
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    }
  }, [addAttachedFile]);

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
          addAttachedFile(e.target?.result as string, 'audio/webm', 'voice_message.webm');
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
    <div className="relative flex h-screen text-[var(--foreground)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="relative p-4 border-b border-[var(--border-color)] flex items-center bg-[var(--card-background)] rounded-2xl card-shadow mx-4 mt-4">
            <h2 className="text-xl font-semibold text-gray-800">New Chat</h2>
            <button onClick={handleClearChat} className="absolute top-4 right-4 p-2 bg-gray-100 text-red-600 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <FiTrash2 /> Clear Chat
            </button>
        </header>
        <main {...getRootProps()} className="flex-grow p-6 overflow-y-auto bg-[var(--background)] relative">
          {chatHistory.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                {/* Placeholder for user avatar */}
                <span className="text-5xl text-gray-600">👋</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Hi!</h1>
              <p className="text-lg text-gray-600 mb-8">How can I help you?</p>
              <div className="grid grid-cols-2 gap-4 max-w-xl w-full">
                <div className="bg-[var(--card-background)] p-4 rounded-xl card-shadow text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <p className="font-semibold">Write a to-do list for a personal project or task</p>
                </div>
                <div className="bg-[var(--card-background)] p-4 rounded-xl card-shadow text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <p className="font-semibold">Generate an email to reply to a job offer</p>
                </div>
                <div className="bg-[var(--card-background)] p-4 rounded-xl card-shadow text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <p className="font-semibold">Summarise this article or text message in one paragraph</p>
                </div>
                <div className="bg-[var(--card-background)] p-4 rounded-xl card-shadow text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <p className="font-semibold">How does AI work in a technical capacity</p>
                </div>
              </div>
            </div>
          )}
          <input {...getInputProps()} />
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex items-start mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 text-lg font-bold">
                      {msg.role === 'user' ? 'U' : 'A'}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl card-shadow ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-[var(--card-background)] text-[var(--foreground)]'}`}>
                        {msg.parts.map((part, partIndex) => (
                            <div key={partIndex}>
                                {msg.role === 'user' && msg.parts.some(part => part.image || part.document || part.audio) && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {msg.parts.filter(part => part.image || part.document || part.audio).map((part, attachmentIndex) => (
                                            <div key={attachmentIndex} className="flex items-center p-2 bg-white rounded-xl card-shadow text-sm text-gray-700">
                                                {part.image && <img src={part.image} alt={part.fileName || "attached image"} className="h-8 w-8 object-cover rounded-lg mr-2"/>}
                                                {part.document && <span className="h-5 w-5 mr-2 text-gray-500">{getFileIcon(part.fileName || '', part.document.split(';')[0].split(':')[1])}</span>}
                                                {part.audio && <span className="h-5 w-5 mr-2 text-gray-500">{getFileIcon(part.fileName || '', part.audio.split(';')[0].split(':')[1])}</span>}
                                                <span>{part.fileName || "Attached File"}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {part.text && <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>}
                                {msg.role !== 'user' && part.image && <img src={part.image} alt={part.fileName || "attached image"} className="mt-2 rounded-xl max-w-xs"/>}
                                {msg.role !== 'user' && part.document && (
                                    <div className="flex items-center mt-2">
                                        <FiFileText className="h-5 w-5 mr-2 text-gray-500"/>
                                        <p className="text-sm text-gray-500">{part.fileName || "Attached Document"}</p>
                                    </div>
                                )}
                                {msg.role !== 'user' && part.audio && (
                                    <div className="flex items-center mt-2">
                                        <FiMic className="h-5 w-5 mr-2 text-gray-500"/>
                                        <p className="text-sm text-gray-500">{part.fileName || "Voice Message"}</p>
                                        <audio controls src={part.audio} className="ml-2"/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {msg.role === 'user' && !editingMessageId && (
                        <button onClick={(e) => { e.stopPropagation(); handleEditMessage(msg._id!, msg.parts[0].text || ''); }} className="self-center text-gray-500 hover:text-gray-400">
                        <FiEdit />
                        </button>
                    )}
                </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
        <footer className="p-6 bg-[var(--card-background)] border-t border-[var(--border-color)] rounded-2xl card-shadow mx-4 mb-4">
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-2 border border-[var(--border-color)] rounded-xl bg-gray-50">
              {attachedFiles.map((file, index) => (
                <div key={index} className="relative flex items-center p-2 bg-white rounded-xl card-shadow text-sm text-gray-700">
                  {file.fileType.startsWith('image/') ? (
                    <img src={file.fileData} alt="preview" className="h-10 w-10 object-cover rounded-lg mr-2"/>
                  ) : (
                    <span className="h-5 w-5 mr-2 text-gray-500">{getFileIcon(file.fileName, file.fileType)}</span>
                  )}
                  <span>{file.fileName}</span>
                  <button onClick={() => removeAttachedFile(index)} className="ml-2 text-red-400 hover:text-red-500 transition-colors duration-200">
                    <FiX size={14}/>
                  </button>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <FiPaperclip />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            {!isRecording ? (
              <button type="button" onClick={startRecording} className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <FiMic />
              </button>
            ) : (
              <button type="button" onClick={stopRecording} className="p-3 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200">
                <FiStopCircle />
              </button>
            )}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-3 border border-[var(--border-color)] rounded-full mx-4 bg-gray-50 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Ask me anything..."
            />
            <button type="submit" className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200">
              <FiSend />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
