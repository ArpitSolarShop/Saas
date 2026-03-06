'use client';

import { useState } from 'react';

// Mock Data
const CONVERSATIONS = [
  { id: 1, channel: 'whatsapp', contactName: 'John Doe', lastMessage: 'Can you send the invoice?', time: '10:42 AM', unread: 2 },
  { id: 2, channel: 'email', contactName: 'Acme Corp', lastMessage: 'Project specs attached.', time: 'Yesterday', unread: 0 },
  { id: 3, channel: 'sms', contactName: 'Jane Smith', lastMessage: 'Confirmed for 3PM.', time: 'Mon', unread: 0 },
  { id: 4, channel: 'instagram', contactName: '@coolbrand', lastMessage: 'Love the new features!', time: 'last week', unread: 5 },
];

export default function MessagingInterface() {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);

  return (
    <div className="flex h-[calc(100vh-120px)] border rounded-xl overflow-hidden bg-white/50 backdrop-blur-md shadow-sm">

      {/* Sidebar - Threads */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Unified Inbox</h2>
          <input
            type="search"
            placeholder="Search messages..."
            className="w-full mt-3 p-2 text-sm border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 border-b cursor-pointer transition-colors hover:bg-slate-50 ${activeChat.id === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-slate-800">{chat.contactName}</span>
                <span className="text-xs text-slate-500">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span className="truncate pr-2">{chat.lastMessage}</span>
                {chat.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">{chat.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/50">
        {/* Chat Header */}
        <div className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10">
          <div>
            <h3 className="font-bold text-lg">{activeChat.contactName}</h3>
            <p className="text-xs text-slate-500 capitalize flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${activeChat.channel === 'whatsapp' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
              Via {activeChat.channel}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm bg-white border rounded shadow-sm hover:bg-slate-50 transition-colors">Resolve</button>
            <button className="px-3 py-1.5 text-sm bg-slate-800 text-white border rounded shadow-sm hover:bg-slate-700 transition-colors">Assign</button>
          </div>
        </div>

        {/* Chat Bubbles */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex justify-start">
            <div className="bg-white border rounded-2xl rounded-tl-sm p-4 max-w-[70%] shadow-sm">
              <p className="text-slate-800">Hi, I have a question about my recent order #10294. Can you check the status?</p>
              <span className="text-[10px] text-slate-400 mt-2 block">10:41 AM</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-4 max-w-[70%] shadow-sm">
              <p>Hello! Let me check that for you right now.</p>
              <span className="text-[10px] text-blue-200 mt-2 block text-right">10:42 AM</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-4 max-w-[70%] shadow-sm">
              <p>{activeChat.lastMessage}</p>
              <span className="text-[10px] text-blue-200 mt-2 block text-right">{activeChat.time}</span>
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2 bg-slate-50 border rounded-xl p-2 px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <button className="text-slate-400 hover:text-blue-600 transition-colors">📎</button>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent p-2 outline-none text-slate-800"
            />
            <button className="text-slate-400 hover:text-blue-600 transition-colors">🤖</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Send</button>
          </div>
        </div>
      </div>

    </div>
  );
}
