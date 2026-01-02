import React, { useState } from 'react';
import { ArrowLeft, Info, ChevronRight, ChevronLeft } from 'lucide-react';

export default function VisualizerLayout({ topic, setCurrentTopic, children }) {
  const [showConcepts, setShowConcepts] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <button
            onClick={() => setCurrentTopic('home')}
            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center text-2xl`}>
              {topic.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{topic.name}</h1>
              <p className="text-slate-400">{topic.description}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowConcepts(!showConcepts)}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Info size={18} />
          {showConcepts ? 'Hide' : 'Show'} Concepts
          {showConcepts ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Concepts Panel - Collapsible */}
      {showConcepts && (
        <div className="mb-6 bg-slate-800 rounded-lg p-4 border border-slate-700 animate-[slideDown_0.3s_ease-out]">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Info className="text-green-400" size={20} />
            Key Concepts & Complexity
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {topic.concept}
            </pre>
          </div>
        </div>
      )}

      {/* Main Content */}
      {children}
    </div>
  );
}
