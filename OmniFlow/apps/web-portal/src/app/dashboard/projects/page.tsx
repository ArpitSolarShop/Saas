'use client';

import { useState } from 'react';

const MOCK_TASKS = {
  todo: [
    { id: 'T-101', title: 'Design Landing Page', tags: ['Design', 'High'], due: 'Mar 12' },
    { id: 'T-102', title: 'Setup Stripe Webhooks', tags: ['Backend', 'Medium'], due: 'Mar 15' },
  ],
  inProgress: [
    { id: 'T-103', title: 'Build CRM Dashboard', tags: ['Frontend', 'Critical'], due: 'Mar 10' },
  ],
  review: [
    { id: 'T-104', title: 'Auth API Tests', tags: ['QA', 'High'], due: 'Mar 08' },
  ],
  done: [
    { id: 'T-105', title: 'Database Schema', tags: ['Database', 'Low'], due: 'Mar 01' },
  ]
};

export default function ProjectsDashboard() {
  const [activeView, setActiveView] = useState('kanban');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">Projects & Tasks</h1>
          <p className="text-sm text-slate-500">Manage sprints, track milestones, and visualize workflows.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
            <button
              onClick={() => setActiveView('kanban')}
              className={`px-4 py-1.5 rounded-md transition-all ${activeView === 'kanban' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500 hover:text-slate-800'}`}
            >Kanban</button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-4 py-1.5 rounded-md transition-all ${activeView === 'list' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500 hover:text-slate-800'}`}
            >List</button>
          </div>
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm ml-2">Filters</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700 font-medium shadow-sm">+ New Task</button>
        </div>
      </div>

      {activeView === 'kanban' && (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max h-full">

            {/* Column: To Do */}
            <div className="w-80 flex flex-col bg-slate-50/50 rounded-xl rounded-t-sm border-t-4 border-t-slate-300">
              <div className="p-3 border-b flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-700">To Do</h3>
                <span className="bg-white px-2 py-0.5 rounded text-xs text-slate-500 font-mono shadow-sm border">{MOCK_TASKS.todo.length}</span>
              </div>
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {MOCK_TASKS.todo.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            {/* Column: In Progress */}
            <div className="w-80 flex flex-col bg-blue-50/30 rounded-xl rounded-t-sm border-t-4 border-t-blue-400">
              <div className="p-3 border-b flex justify-between items-center bg-blue-50/50">
                <h3 className="font-semibold text-blue-800">In Progress</h3>
                <span className="bg-white px-2 py-0.5 rounded text-xs text-blue-600 font-mono shadow-sm border border-blue-100">{MOCK_TASKS.inProgress.length}</span>
              </div>
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {MOCK_TASKS.inProgress.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            {/* Column: In Review */}
            <div className="w-80 flex flex-col bg-amber-50/30 rounded-xl rounded-t-sm border-t-4 border-t-amber-400">
              <div className="p-3 border-b flex justify-between items-center bg-amber-50/50">
                <h3 className="font-semibold text-amber-800">In Review</h3>
                <span className="bg-white px-2 py-0.5 rounded text-xs text-amber-600 font-mono shadow-sm border border-amber-100">{MOCK_TASKS.review.length}</span>
              </div>
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {MOCK_TASKS.review.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

            {/* Column: Done */}
            <div className="w-80 flex flex-col bg-emerald-50/30 rounded-xl rounded-t-sm border-t-4 border-t-emerald-400">
              <div className="p-3 border-b flex justify-between items-center bg-emerald-50/50">
                <h3 className="font-semibold text-emerald-800">Done</h3>
                <span className="bg-white px-2 py-0.5 rounded text-xs text-emerald-600 font-mono shadow-sm border border-emerald-100">{MOCK_TASKS.done.length}</span>
              </div>
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                {MOCK_TASKS.done.map(task => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeView === 'list' && (
        <div className="border rounded-xl bg-white shadow-sm p-12 text-center">
          <p className="text-4xl mb-4">📝</p>
          <h3 className="text-lg font-bold text-slate-800">List View Mode</h3>
          <p className="text-slate-500 text-sm mt-2">Data grid view is rendering behind the Kanban.</p>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task }: { task: any }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono text-slate-400 group-hover:text-purple-500 transition-colors">{task.id}</span>
        <button className="text-slate-300 hover:text-slate-600">⋮</button>
      </div>
      <h4 className="font-semibold text-slate-800 text-sm mb-3 leading-tight">{task.title}</h4>
      <div className="flex justify-between items-end">
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag: string) => (
            <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tag === 'Critical' ? 'bg-red-100 text-red-700' : tag === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <span className="text-[10px]">🕒</span> {task.due}
        </span>
      </div>
    </div>
  )
}
