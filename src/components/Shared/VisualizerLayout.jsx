import { useState } from 'react';
import { Info, ChevronRight, ChevronLeft } from 'lucide-react';

export default function VisualizerLayout({ topic, children, hideConceptsButton = false }) {
  const [showConcepts, setShowConcepts] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 px-8 py-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                {topic.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">{topic.name}</h1>
                <p className="text-slate-400 text-lg">{topic.description}</p>
              </div>
            </div>
            {!hideConceptsButton && (
              <button
                onClick={() => setShowConcepts(!showConcepts)}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg transition-colors shadow-md"
              >
                <Info size={18} />
                {showConcepts ? 'Hide' : 'Show'} Concepts
                {showConcepts ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Concepts Panel - Collapsible */}
      {showConcepts && (
        <div className="max-w-7xl mx-auto px-8 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 animate-[slideDown_0.3s_ease-out]">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="text-green-400" size={22} />
              Key Concepts & Complexity
            </h3>
            <div className="bg-slate-900 rounded-lg p-5 overflow-auto max-h-96">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                {topic.concept}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        {children}
      </div>
    </div>
  );
}
