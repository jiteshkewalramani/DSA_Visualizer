import React, { useState } from 'react';
import { RotateCcw, Play, SkipForward, SkipBack } from 'lucide-react';
import { BST, copyTree, calculateTreePositions } from '../../utils/dataStructures';
import VisualizerLayout from '../Shared/VisualizerLayout';

export default function BSTVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  const [bst, setBst] = useState(new BST());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('insert');

  // Execution state
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [variables, setVariables] = useState({});
  const [executionLog, setExecutionLog] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(1000); // milliseconds

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Generate execution steps for insert operation
  const generateInsertSteps = (value) => {
    const steps = [];
    let currentNode = bst.root;
    let path = [];

    steps.push({
      line: 0,
      description: `Starting insertion of value ${value}`,
      highlightNode: null,
      variables: { value, current: 'root' },
      message: `Inserting ${value} into BST`
    });

    if (!currentNode) {
      steps.push({
        line: 1,
        description: `Tree is empty, creating root node`,
        highlightNode: null,
        variables: { value, current: 'null' },
        message: `Creating new root node with value ${value}`
      });
      return steps;
    }

    while (currentNode) {
      path.push(currentNode.value);

      steps.push({
        line: 3,
        description: `Comparing ${value} with current node ${currentNode.value}`,
        highlightNode: currentNode.value,
        variables: { value, current: currentNode.value, comparison: value === currentNode.value ? '==' : (value < currentNode.value ? '<' : '>') },
        message: `Current node: ${currentNode.value}, Value: ${value}`
      });

      if (value === currentNode.value) {
        steps.push({
          line: 4,
          description: `Value ${value} already exists`,
          highlightNode: currentNode.value,
          variables: { value, current: currentNode.value },
          message: `Duplicate value found, insertion skipped`,
          isComplete: true
        });
        break;
      } else if (value < currentNode.value) {
        steps.push({
          line: 5,
          description: `${value} < ${currentNode.value}, go to left subtree`,
          highlightNode: currentNode.value,
          variables: { value, current: currentNode.value, direction: 'left' },
          message: `Traversing left: ${value} < ${currentNode.value}`
        });

        if (!currentNode.left) {
          steps.push({
            line: 1,
            description: `Left child is null, insert here`,
            highlightNode: currentNode.value,
            variables: { value, parent: currentNode.value, position: 'left' },
            message: `Inserting ${value} as left child of ${currentNode.value}`,
            isComplete: true
          });
          break;
        }
        currentNode = currentNode.left;
      } else {
        steps.push({
          line: 7,
          description: `${value} > ${currentNode.value}, go to right subtree`,
          highlightNode: currentNode.value,
          variables: { value, current: currentNode.value, direction: 'right' },
          message: `Traversing right: ${value} > ${currentNode.value}`
        });

        if (!currentNode.right) {
          steps.push({
            line: 1,
            description: `Right child is null, insert here`,
            highlightNode: currentNode.value,
            variables: { value, parent: currentNode.value, position: 'right' },
            message: `Inserting ${value} as right child of ${currentNode.value}`,
            isComplete: true
          });
          break;
        }
        currentNode = currentNode.right;
      }
    }

    return steps;
  };

  // Generate execution steps for search operation
  const generateSearchSteps = (value) => {
    const steps = [];
    let currentNode = bst.root;

    steps.push({
      line: 0,
      description: `Starting search for value ${value}`,
      highlightNode: null,
      variables: { value, current: 'root' },
      message: `Searching for ${value} in BST`
    });

    if (!currentNode) {
      steps.push({
        line: 1,
        description: `Tree is empty`,
        highlightNode: null,
        variables: { value, current: 'null', result: 'not found' },
        message: `Value ${value} not found - tree is empty`,
        isComplete: true
      });
      return steps;
    }

    while (currentNode) {
      steps.push({
        line: 3,
        description: `Checking node ${currentNode.value}`,
        highlightNode: currentNode.value,
        variables: { value, current: currentNode.value, comparison: value === currentNode.value ? '==' : (value < currentNode.value ? '<' : '>') },
        message: `Comparing ${value} with ${currentNode.value}`
      });

      if (value === currentNode.value) {
        steps.push({
          line: 4,
          description: `Found ${value}!`,
          highlightNode: currentNode.value,
          variables: { value, current: currentNode.value, result: 'found' },
          message: `Success! Found ${value} in the tree`,
          isComplete: true
        });
        return steps;
      } else if (value < currentNode.value) {
        steps.push({
          line: 5,
          description: `${value} < ${currentNode.value}, search left`,
          highlightNode: currentNode.value,
          variables: { value, current: currentNode.value, direction: 'left' },
          message: `Going left: ${value} < ${currentNode.value}`
        });
        currentNode = currentNode.left;
      } else {
        steps.push({
          line: 7,
          description: `${value} > ${currentNode.value}, search right`,
          highlightNode: currentNode.value,
          variables: { value, current: currentNode.value, direction: 'right' },
          message: `Going right: ${value} > ${currentNode.value}`
        });
        currentNode = currentNode.right;
      }

      if (!currentNode) {
        steps.push({
          line: 1,
          description: `Reached null, value not found`,
          highlightNode: null,
          variables: { value, current: 'null', result: 'not found' },
          message: `Value ${value} not found in the tree`,
          isComplete: true
        });
      }
    }

    return steps;
  };

  const executeOperation = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    setIsAnimating(true);
    setIsPaused(false);
    setCurrentStep(-1);
    setExecutionLog([]);

    const steps = operation === 'insert' ? generateInsertSteps(value) : generateSearchSteps(value);
    setExecutionSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      while (isPaused) {
        await sleep(100);
      }

      setCurrentStep(i);
      setHighlightedNode(steps[i].highlightNode);
      setCurrentCodeLine(steps[i].line);
      setVariables(steps[i].variables);
      setMessage(steps[i].message);
      setExecutionLog(prev => [...prev, steps[i].description]);

      await sleep(animationSpeed);
    }

    // Actually perform the insertion if it's an insert operation
    if (operation === 'insert') {
      const newBst = new BST();
      newBst.root = copyTree(bst.root);
      newBst.insert(value);
      setBst(newBst);
    }

    setIsAnimating(false);
    setHighlightedNode(null);
    setCurrentCodeLine(-1);
    setInputValue('');
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const step = executionSteps[nextStep];
      setHighlightedNode(step.highlightNode);
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
      setHighlightedNode(step.highlightNode);
      setCurrentCodeLine(step.line);
      setVariables(step.variables);
      setMessage(step.message);
      setExecutionLog(prev => prev.slice(0, -1));
    }
  };

  const renderNode = (node) => {
    if (!node) return null;

    const isHighlighted = highlightedNode === node.value;
    const nodeColor = isHighlighted ? '#f59e0b' : '#3b82f6';
    const strokeColor = isHighlighted ? '#fbbf24' : '#60a5fa';

    return (
      <g key={`${node.value}-${node.x}-${node.y}`}>
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#64748b"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#64748b"
            strokeWidth="2"
          />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r="24"
          fill={nodeColor}
          stroke={strokeColor}
          strokeWidth={isHighlighted ? "3" : "2"}
          className={isHighlighted ? "animate-pulse" : ""}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dy=".3em"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          {node.value}
        </text>
        {node.left && renderNode(node.left)}
        {node.right && renderNode(node.right)}
      </g>
    );
  };

  const renderTree = () => {
    if (!bst.root) return null;
    calculateTreePositions(bst.root, 300, 40, 120);
    return renderNode(bst.root);
  };

  const codeLines = operation === 'insert'
    ? [
      'function insert(node, value):',
      '    if node is null:',
      '        return new Node(value)',
      '    if value == node.value:',
      '        return node  // duplicate',
      '    if value < node.value:',
      '        node.left = insert(node.left, value)',
      '    else:',
      '        node.right = insert(node.right, value)',
      '    return node'
    ]
    : [
      'function search(node, value):',
      '    if node is null:',
      '        return false',
      '    if value == node.value:',
      '        return true',
      '    if value < node.value:',
      '        return search(node.left, value)',
      '    else:',
      '        return search(node.right, value)'
    ];

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic}>
      {/* Control Panel */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Value</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAnimating && executeOperation()}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter value..."
              disabled={isAnimating}
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
              <option value="insert">Insert</option>
              <option value="search">Search</option>
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
              disabled={isAnimating || !inputValue}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Play size={18} />
              Execute
            </button>

            <button
              onClick={() => setBst(new BST())}
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
        {/* Tree Visualization */}
        <div className="xl:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Tree Visualization</h2>
            </div>
            <div className="bg-slate-900 p-6">
              <svg width="100%" height="400" viewBox="0 0 600 400" className="w-full">
                {bst.root ? renderTree() : (
                  <text x="300" y="200" textAnchor="middle" fill="#64748b" fontSize="16">
                    Insert values to build the tree
                  </text>
                )}
              </svg>
            </div>

            {/* Legend */}
            <div className="bg-slate-900 px-4 py-3 border-t border-slate-700 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-400"></div>
                <span className="text-slate-300">Normal Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-yellow-400"></div>
                <span className="text-slate-300">Active Node</span>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 rounded-lg p-4 border ${
              message.includes('Success') || message.includes('Inserted')
                ? 'bg-green-900 bg-opacity-50 border-green-500 text-green-200'
                : message.includes('not found') || message.includes('empty')
                ? 'bg-red-900 bg-opacity-50 border-red-500 text-red-200'
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
              {codeLines.map((line, idx) => (
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
                        {typeof value === 'object' ? JSON.stringify(value) : value}
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
