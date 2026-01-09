import React, { useState } from 'react';
import { Plus, Search, Trash2, Code, BookOpen } from 'lucide-react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';
import LearningSection from '../Learning/LearningSection';
import { hashTableLearningContent } from '../../data/learningContent/hashTableLearning';

export default function HashTableVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  // Tab state - default to learning/theory tab
  const [activeTab, setActiveTab] = useState('learning');

  const [table, setTable] = useState(Array(10).fill(null).map(() => []));
  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('insert');

  const hashFunction = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % table.length;
    }
    return hash;
  };

  const insert = () => {
    if (!inputKey.trim() || !inputValue.trim()) return;
    
    const index = hashFunction(inputKey);
    const newTable = table.map(bucket => [...bucket]);
    
    const existingIdx = newTable[index].findIndex(item => item.key === inputKey);
    if (existingIdx !== -1) {
      newTable[index][existingIdx] = { key: inputKey, value: inputValue };
      setMessage(`Updated "${inputKey}" at index ${index}`);
    } else {
      newTable[index].push({ key: inputKey, value: inputValue });
      setMessage(`Inserted "${inputKey}" at index ${index}${newTable[index].length > 1 ? ' (collision!)' : ''}`);
    }
    
    setTable(newTable);
    setInputKey('');
    setInputValue('');
  };

  const search = () => {
    if (!inputKey.trim()) return;
    
    const index = hashFunction(inputKey);
    const bucket = table[index];
    const item = bucket.find(item => item.key === inputKey);
    
    if (item) {
      setMessage(`Found "${inputKey}" = "${item.value}" at index ${index}`);
    } else {
      setMessage(`Key "${inputKey}" not found`);
    }
  };

  const remove = () => {
    if (!inputKey.trim()) return;
    
    const index = hashFunction(inputKey);
    const newTable = table.map(bucket => [...bucket]);
    const initialLength = newTable[index].length;
    
    newTable[index] = newTable[index].filter(item => item.key !== inputKey);
    
    if (newTable[index].length < initialLength) {
      setMessage(`Removed "${inputKey}" from index ${index}`);
      setTable(newTable);
    } else {
      setMessage(`Key "${inputKey}" not found`);
    }
    
    setInputKey('');
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
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Key..."
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Value..."
          />
          <button onClick={insert} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            <Plus size={18} />
          </button>
          <button onClick={search} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <Search size={18} />
          </button>
          <button onClick={remove} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            <Trash2 size={18} />
          </button>
        </div>
        {message && <div className="mb-4 bg-amber-900 bg-opacity-50 border border-amber-500 rounded p-2 text-amber-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg p-4 space-y-2 max-h-[400px] overflow-y-auto">
          {table.map((bucket, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-12 text-slate-400 font-mono text-sm font-semibold">[{idx}]</div>
              <div className="flex-1 bg-slate-800 rounded p-2 min-h-[40px] flex items-center gap-2 flex-wrap">
                {bucket.length === 0 ? (
                  <span className="text-slate-600 text-sm">empty</span>
                ) : (
                  bucket.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-1 rounded text-sm">
                      {item.key}: {item.value}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="insert">Insert Operation</option>
            <option value="search">Search Operation</option>
            <option value="hashFunction">Hash Function</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
        </>
      )}

      {/* Learning Tab */}
      {activeTab === 'learning' && (
        <LearningSection learningContent={hashTableLearningContent} />
      )}
    </VisualizerLayout>
  );
}
