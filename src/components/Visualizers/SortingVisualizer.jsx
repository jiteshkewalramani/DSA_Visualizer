import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, SkipForward, SkipBack, Code, BookOpen } from 'lucide-react';
import VisualizerLayout from '../Shared/VisualizerLayout';
import LearningSection from '../Learning/LearningSection';
import { sortingLearningContent } from '../../data/learningContent/sortingLearning';

export default function SortingVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  // Tab state - default to learning/theory tab
  const [activeTab, setActiveTab] = useState('learning');

  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');

  // Execution state
  const [isAnimating, setIsAnimating] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [variables, setVariables] = useState({});
  const [executionLog, setExecutionLog] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
    setExecutionSteps([]);
    setCurrentStep(-1);
    setMessage('');
    setExecutionLog([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Generate execution steps for Bubble Sort
  const generateBubbleSortSteps = (arr) => {
    const steps = [];
    const workingArray = [...arr];

    steps.push({
      line: 0,
      description: `Starting Bubble Sort with array of size ${workingArray.length}`,
      comparing: [],
      sorted: [],
      array: [...workingArray],
      variables: { n: workingArray.length, i: 0, j: 0 },
      message: 'Initializing Bubble Sort algorithm'
    });

    for (let i = 0; i < workingArray.length - 1; i++) {
      steps.push({
        line: 1,
        description: `Starting pass ${i + 1} of ${workingArray.length - 1}`,
        comparing: [],
        sorted: [...sorted],
        array: [...workingArray],
        variables: { n: workingArray.length, i, j: 0, pass: i + 1 },
        message: `Pass ${i + 1}: Bubbling largest element to position ${workingArray.length - 1 - i}`
      });

      for (let j = 0; j < workingArray.length - i - 1; j++) {
        steps.push({
          line: 2,
          description: `Comparing elements at indices ${j} and ${j + 1}: ${workingArray[j]} vs ${workingArray[j + 1]}`,
          comparing: [j, j + 1],
          sorted: [...sorted],
          array: [...workingArray],
          variables: { n: workingArray.length, i, j, value1: workingArray[j], value2: workingArray[j + 1] },
          message: `Comparing ${workingArray[j]} and ${workingArray[j + 1]}`
        });

        if (workingArray[j] > workingArray[j + 1]) {
          [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];

          steps.push({
            line: 3,
            description: `Swapping ${workingArray[j + 1]} and ${workingArray[j]} (out of order)`,
            comparing: [j, j + 1],
            sorted: [...sorted],
            array: [...workingArray],
            variables: { n: workingArray.length, i, j, swapped: true },
            message: `Swapped elements at positions ${j} and ${j + 1}`
          });
        } else {
          steps.push({
            line: 4,
            description: `No swap needed - elements in correct order`,
            comparing: [j, j + 1],
            sorted: [...sorted],
            array: [...workingArray],
            variables: { n: workingArray.length, i, j, swapped: false },
            message: 'Elements already in correct order'
          });
        }
      }

      const newSorted = [];
      for (let k = workingArray.length - 1; k >= workingArray.length - 1 - i; k--) {
        newSorted.push(k);
      }

      steps.push({
        line: 5,
        description: `Element at position ${workingArray.length - 1 - i} is now sorted`,
        comparing: [],
        sorted: newSorted,
        array: [...workingArray],
        variables: { n: workingArray.length, i, sortedCount: i + 1 },
        message: `Pass ${i + 1} complete - ${i + 1} element(s) sorted`
      });
    }

    const allSorted = workingArray.map((_, idx) => idx);
    steps.push({
      line: 6,
      description: 'Bubble Sort completed - array is fully sorted',
      comparing: [],
      sorted: allSorted,
      array: [...workingArray],
      variables: { n: workingArray.length, complete: true },
      message: 'Sorting complete!'
    });

    return steps;
  };

  // Generate execution steps for Quick Sort
  const generateQuickSortSteps = (arr) => {
    const steps = [];
    const workingArray = [...arr];

    steps.push({
      line: 0,
      description: `Starting Quick Sort with array of size ${workingArray.length}`,
      comparing: [],
      sorted: [],
      array: [...workingArray],
      variables: { n: workingArray.length },
      message: 'Initializing Quick Sort algorithm'
    });

    const quickSortHelper = (low, high, depth = 0) => {
      if (low < high) {
        steps.push({
          line: 1,
          description: `Partitioning subarray from index ${low} to ${high}`,
          comparing: [low, high],
          sorted: [...sorted],
          array: [...workingArray],
          variables: { low, high, depth, subArraySize: high - low + 1 },
          message: `Partitioning range [${low}, ${high}]`
        });

        const pivot = workingArray[high];
        let i = low - 1;

        steps.push({
          line: 2,
          description: `Pivot selected: ${pivot} at index ${high}`,
          comparing: [high],
          sorted: [...sorted],
          array: [...workingArray],
          variables: { low, high, pivot, pivotIndex: high },
          message: `Pivot: ${pivot}`
        });

        for (let j = low; j < high; j++) {
          steps.push({
            line: 3,
            description: `Comparing ${workingArray[j]} with pivot ${pivot}`,
            comparing: [j, high],
            sorted: [...sorted],
            array: [...workingArray],
            variables: { low, high, pivot, j, current: workingArray[j] },
            message: `Comparing ${workingArray[j]} with pivot ${pivot}`
          });

          if (workingArray[j] < pivot) {
            i++;
            if (i !== j) {
              [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];

              steps.push({
                line: 4,
                description: `Swapping ${workingArray[j]} and ${workingArray[i]} (element < pivot)`,
                comparing: [i, j],
                sorted: [...sorted],
                array: [...workingArray],
                variables: { low, high, pivot, i, j },
                message: `Moved ${workingArray[i]} to left partition`
              });
            }
          }
        }

        [workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]];
        const pi = i + 1;

        steps.push({
          line: 5,
          description: `Placing pivot ${pivot} at final position ${pi}`,
          comparing: [pi],
          sorted: [...sorted],
          array: [...workingArray],
          variables: { low, high, pivot, pivotFinalPos: pi },
          message: `Pivot ${pivot} placed at position ${pi}`
        });

        quickSortHelper(low, pi - 1, depth + 1);
        quickSortHelper(pi + 1, high, depth + 1);
      } else if (low === high) {
        steps.push({
          line: 6,
          description: `Single element at index ${low} - already sorted`,
          comparing: [],
          sorted: [...sorted],
          array: [...workingArray],
          variables: { low },
          message: `Single element subarray at position ${low}`
        });
      }
    };

    quickSortHelper(0, workingArray.length - 1);

    const allSorted = workingArray.map((_, idx) => idx);
    steps.push({
      line: 7,
      description: 'Quick Sort completed - array is fully sorted',
      comparing: [],
      sorted: allSorted,
      array: [...workingArray],
      variables: { n: workingArray.length, complete: true },
      message: 'Sorting complete!'
    });

    return steps;
  };

  const executeSort = async () => {
    let steps = [];

    if (algorithm === 'bubble') {
      steps = generateBubbleSortSteps(array);
    } else if (algorithm === 'quick') {
      steps = generateQuickSortSteps(array);
    }

    setIsAnimating(true);
    setCurrentStep(-1);
    setExecutionLog([]);
    setExecutionSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setComparing(steps[i].comparing);
      setSorted(steps[i].sorted);
      setArray(steps[i].array);
      setCurrentCodeLine(steps[i].line);
      setVariables(steps[i].variables);
      setMessage(steps[i].message);
      setExecutionLog(prev => [...prev, steps[i].description]);

      await sleep(animationSpeed);
    }

    setIsAnimating(false);
    setComparing([]);
    setCurrentCodeLine(-1);
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const step = executionSteps[nextStep];
      setComparing(step.comparing);
      setSorted(step.sorted);
      setArray(step.array);
      setCurrentCodeLine(step.line);
      setVariables(step.variables);
      setMessage(step.message);
      setExecutionLog(prev => [...prev, step.description]);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      const step = executionSteps[prevStep];
      setComparing(step.comparing);
      setSorted(step.sorted);
      setArray(step.array);
      setCurrentCodeLine(step.line);
      setVariables(step.variables);
      setMessage(step.message);
      setExecutionLog(prev => prev.slice(0, -1));
    }
  };

  const codeLines = {
    bubble: [
      'function bubbleSort(arr):',
      '    for i = 0 to n-1:',
      '        for j = 0 to n-i-1:',
      '            if arr[j] > arr[j+1]:',
      '                swap(arr[j], arr[j+1])',
      '        mark arr[n-1-i] as sorted',
      '    return arr'
    ],
    quick: [
      'function quickSort(arr, low, high):',
      '    if low < high:',
      '        pivot = arr[high]',
      '        for j = low to high-1:',
      '            if arr[j] < pivot:',
      '                swap to left partition',
      '        place pivot at final position',
      '        quickSort(arr, low, pi-1)',
      '        quickSort(arr, pi+1, high)'
    ]
  };

  const maxValue = Math.max(...array, 1);

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
          {/* Control Panel */}
          <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
              disabled={isAnimating}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Speed</label>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value={500}>0.5x (Slow)</option>
              <option value={250}>1x (Normal)</option>
              <option value={125}>2x (Fast)</option>
              <option value={50}>4x (Very Fast)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={executeSort}
              disabled={isAnimating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Play size={18} />
              Sort
            </button>

            <button
              onClick={generateArray}
              disabled={isAnimating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={18} />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Array Visualization */}
        <div className="xl:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Array Visualization</h2>
            </div>
            <div className="bg-slate-900 p-8 flex items-end justify-center gap-4" style={{ height: '450px' }}>
              {array.map((value, idx) => (
                <div
                  key={idx}
                  className="transition-all duration-200 flex flex-col items-center justify-end"
                  style={{ width: '70px' }}
                >
                  <div
                    className="text-lg font-bold mb-2 px-2 py-1 rounded"
                    style={{
                      color: 'white',
                      backgroundColor: sorted.includes(idx)
                        ? '#10b981'
                        : comparing.includes(idx)
                        ? '#f59e0b'
                        : '#3b82f6'
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className="w-full rounded-lg shadow-lg flex flex-col items-center justify-between py-3"
                    style={{
                      height: `${(value / maxValue) * 320}px`,
                      minHeight: '40px',
                      background: sorted.includes(idx)
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : comparing.includes(idx)
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      border: comparing.includes(idx) ? '2px solid #fbbf24' : '2px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-white text-sm font-semibold bg-black bg-opacity-20 px-2 py-1 rounded">
                      [{idx}]
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Array Info */}
            <div className="bg-slate-900 px-4 py-3 border-t border-slate-700 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Size:</span>
                <span className="text-white font-semibold">{array.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-slate-400">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-slate-400">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-slate-400">Sorted</span>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mt-4 rounded-lg p-4 border bg-blue-900 bg-opacity-50 border-blue-500 text-blue-200">
              {message}
            </div>
          )}
        </div>

        {/* Code Execution Panel */}
        <div className="xl:col-span-1 space-y-6">
          {/* Code Display */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Code Execution</h2>
            </div>
            <div className="bg-slate-950 p-4 font-mono text-sm overflow-x-auto">
              {codeLines[algorithm].map((line, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-1 rounded transition-all ${
                    currentCodeLine === idx
                      ? 'bg-orange-500 bg-opacity-30 border-l-4 border-orange-500 text-orange-200'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-slate-500 mr-3 select-none">{idx + 1}</span>
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Variables Display */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Variables</h2>
            </div>
            <div className="p-4">
              {Object.keys(variables).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(variables).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
                      <span className="text-slate-400 font-mono text-sm">{key}:</span>
                      <span className="text-blue-400 font-mono text-sm font-semibold">
                        {typeof value === 'boolean' ? value.toString() : value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">No active variables</p>
              )}
            </div>
          </div>

          {/* Execution Log */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Execution Log</h2>
            </div>
            <div className="p-4 max-h-48 overflow-y-auto">
              {executionLog.length > 0 ? (
                <div className="space-y-1">
                  {executionLog.slice(-10).map((log, idx) => (
                    <div key={idx} className="text-xs text-slate-300 font-mono bg-slate-900 px-2 py-1 rounded">
                      <span className="text-slate-500 mr-2">{executionLog.length - 10 + idx + 1}.</span>
                      {log}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">No execution logs</p>
              )}
            </div>
          </div>

          {/* Step Controls */}
          {executionSteps.length > 0 && (
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-300">
                  Step {currentStep + 1} of {executionSteps.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={stepBackward}
                    disabled={currentStep <= 0}
                    className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                    title="Previous Step"
                  >
                    <SkipBack size={16} />
                  </button>
                  <button
                    onClick={stepForward}
                    disabled={currentStep >= executionSteps.length - 1}
                    className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                    title="Next Step"
                  >
                    <SkipForward size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / executionSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
        </>
      )}

      {/* Learning Tab */}
      {activeTab === 'learning' && (
        <LearningSection learningContent={sortingLearningContent} />
      )}
    </VisualizerLayout>
  );
}
