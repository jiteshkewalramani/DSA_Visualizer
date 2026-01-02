import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';

export default function HeapVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [heapType, setHeapType] = useState('min');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('insert');

  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newHeap = [...heap, value];
    heapifyUp(newHeap, newHeap.length - 1);
    setHeap(newHeap);
    setMessage(`Inserted ${value}`);
    setInputValue('');
  };

  const extractRoot = () => {
    if (heap.length === 0) {
      setMessage('Heap is empty!');
      return;
    }
    
    const root = heap[0];
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    
    if (newHeap.length > 0) {
      heapifyDown(newHeap, 0);
    }
    
    setHeap(newHeap);
    setMessage(`Extracted ${root}`);
  };

  const heapifyUp = (arr, idx) => {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const shouldSwap = heapType === 'min' 
        ? arr[idx] < arr[parentIdx]
        : arr[idx] > arr[parentIdx];
      
      if (shouldSwap) {
        [arr[idx], arr[parentIdx]] = [arr[parentIdx], arr[idx]];
        idx = parentIdx;
      } else {
        break;
      }
    }
  };

  const heapifyDown = (arr, idx) => {
    while (true) {
      let targetIdx = idx;
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      
      if (leftIdx < arr.length) {
        const shouldSwap = heapType === 'min'
          ? arr[leftIdx] < arr[targetIdx]
          : arr[leftIdx] > arr[targetIdx];
        if (shouldSwap) targetIdx = leftIdx;
      }
      
      if (rightIdx < arr.length) {
        const shouldSwap = heapType === 'min'
          ? arr[rightIdx] < arr[targetIdx]
          : arr[rightIdx] > arr[targetIdx];
        if (shouldSwap) targetIdx = rightIdx;
      }
      
      if (targetIdx !== idx) {
        [arr[idx], arr[targetIdx]] = [arr[targetIdx], arr[idx]];
        idx = targetIdx;
      } else {
        break;
      }
    }
  };

  const renderHeapTree = () => {
    if (heap.length === 0) return null;
    
    const renderNode = (idx, level, position, maxPosition) => {
      if (idx >= heap.length) return null;
      
      const x = 300 + (position - maxPosition / 2) * (400 / Math.pow(2, level));
      const y = 50 + level * 70;
      
      return (
        <g key={idx}>
          {2 * idx + 1 < heap.length && (
            <line
              x1={x}
              y1={y}
              x2={300 + (position * 2 - maxPosition / 2) * (400 / Math.pow(2, level + 1))}
              y2={y + 70}
              stroke="#64748b"
              strokeWidth="2"
            />
          )}
          {2 * idx + 2 < heap.length && (
            <line
              x1={x}
              y1={y}
              x2={300 + (position * 2 + 1 - maxPosition / 2) * (400 / Math.pow(2, level + 1))}
              y2={y + 70}
              stroke="#64748b"
              strokeWidth="2"
            />
          )}
          <circle
            cx={x}
            cy={y}
            r="22"
            fill={idx === 0 ? '#f59e0b' : '#8b5cf6'}
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dy=".3em"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {heap[idx]}
          </text>
          {renderNode(2 * idx + 1, level + 1, position * 2, Math.pow(2, level + 1))}
          {renderNode(2 * idx + 2, level + 1, position * 2 + 1, Math.pow(2, level + 1))}
        </g>
      );
    };
    
    return renderNode(0, 0, 0, 1);
  };

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2 flex-wrap">
          <select
            value={heapType}
            onChange={(e) => { setHeapType(e.target.value); setHeap([]); }}
            className="bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="min">Min Heap</option>
            <option value="max">Max Heap</option>
          </select>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && insert()}
            className="flex-1 bg-slate-700 text-white rounded px-3 py-2"
            placeholder="Enter value..."
          />
          <button onClick={insert} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            <Plus size={18} />
          </button>
          <button onClick={extractRoot} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            Extract
          </button>
          <button onClick={() => setHeap([])} className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded">
            <Trash2 size={18} />
          </button>
        </div>
        {message && <div className="mb-4 bg-purple-900 bg-opacity-50 border border-purple-500 rounded p-2 text-purple-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg">
          <svg width="600" height="350" className="w-full">
            {heap.length > 0 ? renderHeapTree() : (
              <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="16">
                Insert values to build the heap
              </text>
            )}
          </svg>
        </div>
        <div className="mt-4 text-sm text-slate-400">
          <strong>Array:</strong> [{heap.join(', ')}]
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
            <option value="extract">Extract Operation</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
    </VisualizerLayout>
  );
}
