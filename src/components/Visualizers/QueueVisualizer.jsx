import React, { useState } from 'react';
import { RotateCcw, Play, SkipForward, SkipBack } from 'lucide-react';
import VisualizerLayout from '../Shared/VisualizerLayout';

export default function QueueVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('enqueue');

  // Execution state
  const [isAnimating, setIsAnimating] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [variables, setVariables] = useState({});
  const [executionLog, setExecutionLog] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Generate execution steps for enqueue operation
  const generateEnqueueSteps = (value) => {
    const steps = [];

    steps.push({
      line: 0,
      description: `Starting enqueue operation with value: ${value}`,
      highlightIndex: null,
      variables: { value, size: queue.length },
      message: `Enqueueing ${value} to queue`
    });

    steps.push({
      line: 1,
      description: `Checking if value is valid`,
      highlightIndex: null,
      variables: { value, isEmpty: !value.trim() },
      message: value.trim() ? `Value "${value}" is valid` : 'Value is empty'
    });

    if (value.trim()) {
      steps.push({
        line: 2,
        description: `Adding ${value} to rear of queue`,
        highlightIndex: queue.length,
        variables: { value, newSize: queue.length + 1, position: 'rear' },
        message: `Placed ${value} at rear of queue`,
        isComplete: true
      });
    }

    return steps;
  };

  // Generate execution steps for dequeue operation
  const generateDequeueSteps = () => {
    const steps = [];

    steps.push({
      line: 0,
      description: `Starting dequeue operation`,
      highlightIndex: null,
      variables: { size: queue.length },
      message: `Attempting to dequeue from queue`
    });

    if (queue.length === 0) {
      steps.push({
        line: 1,
        description: `Queue is empty, cannot dequeue`,
        highlightIndex: null,
        variables: { size: 0, result: 'underflow' },
        message: `Error: Queue underflow - cannot dequeue from empty queue`,
        isComplete: true
      });
    } else {
      const frontValue = queue[0];
      steps.push({
        line: 2,
        description: `Accessing front element: ${frontValue}`,
        highlightIndex: 0,
        variables: { frontValue, size: queue.length },
        message: `Front element is ${frontValue}`
      });

      steps.push({
        line: 3,
        description: `Removing ${frontValue} from front`,
        highlightIndex: 0,
        variables: { dequeuedValue: frontValue, newSize: queue.length - 1 },
        message: `Dequeued ${frontValue} from queue`,
        isComplete: true
      });
    }

    return steps;
  };

  const executeOperation = async () => {
    let steps = [];

    if (operation === 'enqueue') {
      if (!inputValue.trim()) {
        setMessage('Please enter a value');
        return;
      }
      steps = generateEnqueueSteps(inputValue);
    } else if (operation === 'dequeue') {
      steps = generateDequeueSteps();
    }

    setIsAnimating(true);
    setCurrentStep(-1);
    setExecutionLog([]);
    setExecutionSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setHighlightedIndex(steps[i].highlightIndex);
      setCurrentCodeLine(steps[i].line);
      setVariables(steps[i].variables);
      setMessage(steps[i].message);
      setExecutionLog(prev => [...prev, steps[i].description]);

      await sleep(animationSpeed);
    }

    // Actually perform the operation
    if (operation === 'enqueue' && inputValue.trim()) {
      setQueue([...queue, inputValue]);
      setInputValue('');
    } else if (operation === 'dequeue' && queue.length > 0) {
      setQueue(queue.slice(1));
    }

    setIsAnimating(false);
    setHighlightedIndex(null);
    setCurrentCodeLine(-1);
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const step = executionSteps[nextStep];
      setHighlightedIndex(step.highlightIndex);
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
      setHighlightedIndex(step.highlightIndex);
      setCurrentCodeLine(step.line);
      setVariables(step.variables);
      setMessage(step.message);
      setExecutionLog(prev => prev.slice(0, -1));
    }
  };

  const codeLines = {
    enqueue: [
      'function enqueue(value):',
      '    if value is empty:',
      '        return error',
      '    queue.addRear(value)',
      '    size = size + 1'
    ],
    dequeue: [
      'function dequeue():',
      '    if queue is empty:',
      '        return error',
      '    value = queue.front()',
      '    queue.removeFront()',
      '    size = size - 1',
      '    return value'
    ]
  };

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic}>
      {/* Control Panel */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Value</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAnimating && operation === 'enqueue' && executeOperation()}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter value..."
              disabled={isAnimating || operation !== 'enqueue'}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Operation</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
              disabled={isAnimating}
            >
              <option value="enqueue">Enqueue</option>
              <option value="dequeue">Dequeue</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Speed</label>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value={2000}>0.5x (Slow)</option>
              <option value={1000}>1x (Normal)</option>
              <option value={500}>2x (Fast)</option>
              <option value={250}>4x (Very Fast)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={executeOperation}
              disabled={isAnimating || (operation === 'enqueue' && !inputValue)}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Play size={18} />
              Execute
            </button>

            <button
              onClick={() => setQueue([])}
              disabled={isAnimating}
              className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={18} />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Queue Visualization */}
        <div className="xl:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Queue Visualization</h2>
            </div>
            <div className="bg-slate-900 p-6 min-h-[400px]">
              <div className="flex items-center gap-3 overflow-x-auto pb-4">
                <div className="text-slate-500 text-sm font-semibold whitespace-nowrap">FRONT →</div>
                {queue.length === 0 ? (
                  <div className="text-slate-500 text-center flex-1">
                    Queue is empty (FIFO - First In First Out)
                  </div>
                ) : (
                  queue.map((item, idx) => (
                    <div
                      key={idx}
                      className={`min-w-[120px] text-center py-4 px-4 rounded-lg shadow-lg border-2 font-semibold transition-all ${
                        highlightedIndex === idx
                          ? 'bg-gradient-to-r from-orange-600 to-orange-500 border-yellow-400 scale-105 animate-pulse'
                          : 'bg-gradient-to-r from-purple-600 to-purple-500 border-purple-400'
                      } text-white`}
                    >
                      <div className="text-xs text-purple-100 mb-1">
                        {idx === 0 ? 'FRONT' : idx === queue.length - 1 ? 'REAR' : `Index ${idx}`}
                      </div>
                      <div className="text-lg">{item}</div>
                    </div>
                  ))
                )}
                <div className="text-slate-500 text-sm font-semibold whitespace-nowrap">← REAR</div>
              </div>
            </div>

            {/* Queue Info */}
            <div className="bg-slate-900 px-4 py-3 border-t border-slate-700 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Size:</span>
                <span className="text-white font-semibold">{queue.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Front:</span>
                <span className="text-white font-semibold">
                  {queue.length > 0 ? queue[0] : 'None'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Rear:</span>
                <span className="text-white font-semibold">
                  {queue.length > 0 ? queue[queue.length - 1] : 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 rounded-lg p-4 border ${
              message.includes('Error') || message.includes('empty')
                ? 'bg-red-900 bg-opacity-50 border-red-500 text-red-200'
                : message.includes('Dequeued') || message.includes('Enqueued')
                ? 'bg-green-900 bg-opacity-50 border-green-500 text-green-200'
                : 'bg-blue-900 bg-opacity-50 border-blue-500 text-blue-200'
            }`}>
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
              {codeLines[operation].map((line, idx) => (
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
                  {executionLog.map((log, idx) => (
                    <div key={idx} className="text-xs text-slate-300 font-mono bg-slate-900 px-2 py-1 rounded">
                      <span className="text-slate-500 mr-2">{idx + 1}.</span>
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
    </VisualizerLayout>
  );
}
