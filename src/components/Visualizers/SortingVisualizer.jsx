import React, { useState, useEffect } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';

export default function SortingVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(50);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
      }
      setSorted(prev => [...prev, arr.length - 1 - i]);
    }
    setSorted(arr.map((_, i) => i));
    setComparing([]);
    setSorting(false);
  };

  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setSorted(arr.map((_, i) => i));
    setComparing([]);
    setSorting(false);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setComparing([j, high]);
      await sleep(50);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    return i + 1;
  };

  const startSort = () => {
    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'quick') quickSort();
  };

  const maxValue = Math.max(...array, 1);

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2 flex-wrap">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-slate-700 text-white rounded px-3 py-2"
            disabled={sorting}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
          <button onClick={startSort} disabled={sorting} className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Play size={18} /> Sort
          </button>
          <button onClick={generateArray} disabled={sorting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded">
            <RefreshCw size={18} />
          </button>
        </div>
        <div className="bg-slate-900 rounded-lg p-4 flex items-end justify-center gap-1" style={{ height: '400px' }}>
          {array.map((value, idx) => (
            <div
              key={idx}
              className="transition-all duration-100"
              style={{
                height: `${(value / maxValue) * 320}px`,
                width: `${100 / array.length}%`,
                backgroundColor: sorted.includes(idx) ? '#10b981' : comparing.includes(idx) ? '#f59e0b' : '#3b82f6',
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <PseudoCodePanel title={`${algorithm === 'bubble' ? 'Bubble' : 'Quick'} Sort Pseudo Code`} code={pseudoCode[algorithm]} />
      </div>
    </div>
    </VisualizerLayout>
  );
}