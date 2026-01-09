import React, { useState } from 'react';
import { ChevronRight, Code, BookOpen } from 'lucide-react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';
import LearningSection from '../Learning/LearningSection';
import { linkedListLearningContent } from '../../data/learningContent/linkedListLearning';

export default function LinkedListVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  // Tab state - default to learning/theory tab
  const [activeTab, setActiveTab] = useState('learning');

  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('addHead');

  const addHead = () => {
    if (!inputValue.trim()) return;
    setList([inputValue, ...list]);
    setMessage(`Added ${inputValue} at head`);
    setInputValue('');
  };

  const addTail = () => {
    if (!inputValue.trim()) return;
    setList([...list, inputValue]);
    setMessage(`Added ${inputValue} at tail`);
    setInputValue('');
  };

  const removeHead = () => {
    if (list.length === 0) {
      setMessage('List is empty!');
      return;
    }
    setMessage(`Removed ${list[0]} from head`);
    setList(list.slice(1));
  };

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic} hideConceptsButton={true}>
      {/* Tab Navigation */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 mb-6 overflow-hidden">
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('learning')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
              activeTab === 'learning'
                ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen size={18} />
            Learn Theory
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
              activeTab === 'visualizer'
                ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Code size={18} />
            Interactive Visualizer
          </button>
        </div>
      </div>

      {/* Visualizer Tab */}
      {activeTab === 'visualizer' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2 flex-wrap">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Enter value..."
          />
          <button onClick={addHead} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Add Head
          </button>
          <button onClick={addTail} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add Tail
          </button>
          <button onClick={removeHead} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Remove
          </button>
          <button onClick={() => setList([])} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
            Clear
          </button>
        </div>
        {message && <div className="mb-4 bg-blue-900 bg-opacity-50 border border-blue-500 rounded p-2 text-blue-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg p-6 min-h-[400px]">
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {list.length === 0 ? (
              <div className="text-slate-500 text-center w-full">Linked List is empty</div>
            ) : (
              list.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-4 rounded-lg shadow-lg border-2 border-teal-400 min-w-[100px] text-center font-semibold">
                      {item}
                    </div>
                    {idx < list.length - 1 && (
                      <ChevronRight className="text-slate-500" size={24} />
                    )}
                  </div>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-400">
          <strong>Length:</strong> {list.length}
        </div>
      </div>
      <div>
        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="addHead">Add Head Operation</option>
            <option value="addTail">Add Tail Operation</option>
            <option value="remove">Remove Operation</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
        </>
      )}

      {/* Learning Tab */}
      {activeTab === 'learning' && (
        <LearningSection learningContent={linkedListLearningContent} />
      )}
    </VisualizerLayout>
  );
}