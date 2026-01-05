import React, { useState } from 'react';
import { Play, Plus, Trash2, SkipForward, SkipBack } from 'lucide-react';
import VisualizerLayout from '../Shared/VisualizerLayout';

export default function GraphVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [startNode, setStartNode] = useState('');
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);

  // Execution state
  const [isAnimating, setIsAnimating] = useState(false);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [variables, setVariables] = useState({});
  const [executionLog, setExecutionLog] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [message, setMessage] = useState('');

  const addNode = () => {
    const newNode = String.fromCharCode(65 + nodes.length);
    if (nodes.length < 8) {
      const angle = (nodes.length * 2 * Math.PI) / 8;
      setNodes([...nodes, { id: newNode, x: 300 + 150 * Math.cos(angle), y: 200 + 150 * Math.sin(angle) }]);
    }
  };

  const addEdge = (from, to) => {
    if (from !== to && !edges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))) {
      setEdges([...edges, { from, to }]);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Generate execution steps for BFS
  const generateBFSSteps = (start) => {
    const steps = [];
    const queue = [start];
    const vis = [];

    steps.push({
      line: 0,
      description: `Starting BFS from node ${start}`,
      visited: [],
      current: null,
      variables: { startNode: start, queueSize: 1 },
      message: `Initializing BFS traversal from node ${start}`
    });

    steps.push({
      line: 1,
      description: `Initializing queue with start node ${start}`,
      visited: [],
      current: null,
      variables: { queue: [start], queueSize: 1 },
      message: `Queue: [${start}]`
    });

    while (queue.length > 0) {
      const node = queue.shift();

      if (vis.includes(node)) {
        steps.push({
          line: 2,
          description: `Node ${node} already visited, skipping`,
          visited: [...vis],
          current: node,
          variables: { node, alreadyVisited: true, queueSize: queue.length },
          message: `Node ${node} was already visited`
        });
        continue;
      }

      steps.push({
        line: 3,
        description: `Dequeuing and visiting node ${node}`,
        visited: [...vis],
        current: node,
        variables: { node, queueSize: queue.length },
        message: `Visiting node ${node}`
      });

      vis.push(node);

      steps.push({
        line: 4,
        description: `Marked node ${node} as visited`,
        visited: [...vis],
        current: node,
        variables: { node, visitedCount: vis.length, queueSize: queue.length },
        message: `Visited: ${vis.join(', ')}`
      });

      const neighbors = edges
        .filter(e => e.from === node || e.to === node)
        .map(e => e.from === node ? e.to : e.from)
        .filter(n => !vis.includes(n));

      if (neighbors.length > 0) {
        steps.push({
          line: 5,
          description: `Found ${neighbors.length} unvisited neighbor(s): ${neighbors.join(', ')}`,
          visited: [...vis],
          current: node,
          variables: { node, neighbors: neighbors.join(', '), queueSize: queue.length },
          message: `Adding neighbors to queue: ${neighbors.join(', ')}`
        });

        queue.push(...neighbors);

        steps.push({
          line: 6,
          description: `Added neighbors to queue`,
          visited: [...vis],
          current: node,
          variables: { node, queueSize: queue.length, queue: queue.join(', ') },
          message: `Queue updated: [${queue.join(', ')}]`
        });
      } else {
        steps.push({
          line: 7,
          description: `No unvisited neighbors for node ${node}`,
          visited: [...vis],
          current: node,
          variables: { node, neighbors: 'none', queueSize: queue.length },
          message: `No new neighbors to explore`
        });
      }
    }

    steps.push({
      line: 8,
      description: `BFS traversal complete`,
      visited: [...vis],
      current: null,
      variables: { totalVisited: vis.length, complete: true },
      message: `BFS complete! Visited ${vis.length} node(s)`
    });

    return steps;
  };

  // Generate execution steps for DFS
  const generateDFSSteps = (start) => {
    const steps = [];
    const vis = [];

    steps.push({
      line: 0,
      description: `Starting DFS from node ${start}`,
      visited: [],
      current: null,
      variables: { startNode: start },
      message: `Initializing DFS traversal from node ${start}`
    });

    const dfsHelper = (node, depth = 0) => {
      if (vis.includes(node)) {
        steps.push({
          line: 1,
          description: `Node ${node} already visited, backtracking`,
          visited: [...vis],
          current: node,
          variables: { node, depth, alreadyVisited: true },
          message: `Node ${node} already visited`
        });
        return;
      }

      steps.push({
        line: 2,
        description: `Visiting node ${node} at depth ${depth}`,
        visited: [...vis],
        current: node,
        variables: { node, depth },
        message: `Exploring node ${node}`
      });

      vis.push(node);

      steps.push({
        line: 3,
        description: `Marked node ${node} as visited`,
        visited: [...vis],
        current: node,
        variables: { node, depth, visitedCount: vis.length },
        message: `Visited: ${vis.join(', ')}`
      });

      const neighbors = edges
        .filter(e => e.from === node || e.to === node)
        .map(e => e.from === node ? e.to : e.from)
        .filter(n => !vis.includes(n));

      if (neighbors.length > 0) {
        steps.push({
          line: 4,
          description: `Found ${neighbors.length} unvisited neighbor(s): ${neighbors.join(', ')}`,
          visited: [...vis],
          current: node,
          variables: { node, depth, neighbors: neighbors.join(', ') },
          message: `Exploring neighbors: ${neighbors.join(', ')}`
        });

        for (const neighbor of neighbors) {
          steps.push({
            line: 5,
            description: `Recursively exploring neighbor ${neighbor}`,
            visited: [...vis],
            current: node,
            variables: { node, depth, nextNode: neighbor },
            message: `Going deeper to node ${neighbor}`
          });

          dfsHelper(neighbor, depth + 1);

          steps.push({
            line: 6,
            description: `Returned from exploring ${neighbor}, back to ${node}`,
            visited: [...vis],
            current: node,
            variables: { node, depth, returnedFrom: neighbor },
            message: `Backtracking to node ${node}`
          });
        }
      } else {
        steps.push({
          line: 7,
          description: `No unvisited neighbors for node ${node}`,
          visited: [...vis],
          current: node,
          variables: { node, depth, neighbors: 'none' },
          message: `Dead end at node ${node}, backtracking`
        });
      }
    };

    dfsHelper(start);

    steps.push({
      line: 8,
      description: `DFS traversal complete`,
      visited: [...vis],
      current: null,
      variables: { totalVisited: vis.length, complete: true },
      message: `DFS complete! Visited ${vis.length} node(s)`
    });

    return steps;
  };

  const executeTraversal = async () => {
    if (!startNode || !nodes.find(n => n.id === startNode)) {
      setMessage('Please select a valid start node');
      return;
    }

    let steps = [];

    if (algorithm === 'bfs') {
      steps = generateBFSSteps(startNode);
    } else if (algorithm === 'dfs') {
      steps = generateDFSSteps(startNode);
    }

    setIsAnimating(true);
    setCurrentStep(-1);
    setExecutionLog([]);
    setExecutionSteps(steps);
    setVisited([]);
    setCurrent(null);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setVisited(steps[i].visited);
      setCurrent(steps[i].current);
      setCurrentCodeLine(steps[i].line);
      setVariables(steps[i].variables);
      setMessage(steps[i].message);
      setExecutionLog(prev => [...prev, steps[i].description]);

      await sleep(animationSpeed);
    }

    setIsAnimating(false);
    setCurrent(null);
    setCurrentCodeLine(-1);
  };

  const stepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const step = executionSteps[nextStep];
      setVisited(step.visited);
      setCurrent(step.current);
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
      setVisited(step.visited);
      setCurrent(step.current);
      setCurrentCodeLine(step.line);
      setVariables(step.variables);
      setMessage(step.message);
      setExecutionLog(prev => prev.slice(0, -1));
    }
  };

  const resetGraph = () => {
    setNodes([]);
    setEdges([]);
    setVisited([]);
    setCurrent(null);
    setExecutionSteps([]);
    setCurrentStep(-1);
    setMessage('');
    setExecutionLog([]);
  };

  const codeLines = {
    bfs: [
      'function BFS(start):',
      '    queue = [start]',
      '    if node in visited:',
      '        skip node',
      '    visit current node',
      '    mark node as visited',
      '    get unvisited neighbors',
      '    add neighbors to queue',
      '    return visited nodes'
    ],
    dfs: [
      'function DFS(node):',
      '    if node visited:',
      '        return',
      '    visit current node',
      '    mark node as visited',
      '    get unvisited neighbors',
      '    for each neighbor:',
      '        DFS(neighbor)',
      '    return visited nodes'
    ]
  };

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic}>
      {/* Control Panel */}
      <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex gap-2">
            <button
              onClick={addNode}
              disabled={nodes.length >= 8 || isAnimating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Add Node
            </button>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
              disabled={isAnimating}
            >
              <option value="bfs">BFS (Breadth First Search)</option>
              <option value="dfs">DFS (Depth First Search)</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Start Node</label>
            <input
              type="text"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value.toUpperCase())}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
              placeholder="A, B, C..."
              maxLength={1}
              disabled={isAnimating}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-300 mb-2">Speed</label>
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className="w-full bg-slate-700 text-white rounded px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value={1600}>0.5x (Slow)</option>
              <option value={800}>1x (Normal)</option>
              <option value={400}>2x (Fast)</option>
              <option value={200}>4x (Very Fast)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={executeTraversal}
              disabled={isAnimating || !startNode || nodes.length === 0}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Play size={18} />
              Run
            </button>

            <button
              onClick={resetGraph}
              disabled={isAnimating}
              className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Trash2 size={18} />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Graph Visualization */}
        <div className="xl:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Graph Visualization</h2>
            </div>

            {/* Edge Connection UI */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
              <p className="text-sm text-slate-400 mb-2">Click two nodes to connect them:</p>
              <div className="flex gap-2 flex-wrap">
                {nodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => {
                      const selected = document.querySelector('.node-selected');
                      if (selected && selected.textContent !== node.id) {
                        addEdge(selected.textContent, node.id);
                        selected.classList.remove('node-selected', 'bg-yellow-600');
                        selected.classList.add('bg-slate-600');
                      } else {
                        document.querySelectorAll('.node-btn').forEach(btn => {
                          btn.classList.remove('node-selected', 'bg-yellow-600');
                          btn.classList.add('bg-slate-600');
                        });
                        const btn = document.getElementById(`node-btn-${node.id}`);
                        btn.classList.add('node-selected', 'bg-yellow-600');
                        btn.classList.remove('bg-slate-600');
                      }
                    }}
                    id={`node-btn-${node.id}`}
                    className="node-btn bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded transition-colors"
                    disabled={isAnimating}
                  >
                    {node.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Graph Canvas */}
            <div className="bg-slate-900 p-4">
              <svg width="600" height="400" className="w-full border border-slate-700 rounded">
                {edges.map((edge, idx) => {
                  const fromNode = nodes.find(n => n.id === edge.from);
                  const toNode = nodes.find(n => n.id === edge.to);
                  return (
                    <line
                      key={idx}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                  );
                })}
                {nodes.map(node => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="25"
                      fill={current === node.id ? '#f59e0b' : visited.includes(node.id) ? '#10b981' : '#3b82f6'}
                      stroke="#60a5fa"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dy=".3em"
                      fill="white"
                      fontSize="18"
                      fontWeight="bold"
                    >
                      {node.id}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Graph Info */}
            <div className="bg-slate-900 px-4 py-3 border-t border-slate-700 flex gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Nodes:</span>
                <span className="text-white font-semibold">{nodes.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Edges:</span>
                <span className="text-white font-semibold">{edges.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-slate-400">Unvisited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-slate-400">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-slate-400">Visited</span>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mt-4 rounded-lg p-4 border bg-blue-900 bg-opacity-50 border-blue-500 text-blue-200">
              {message}
            </div>
          )}

          {/* Visited Order Display */}
          {visited.length > 0 && (
            <div className="mt-4 bg-slate-800 rounded-lg border border-slate-700 p-4">
              <div className="text-sm text-slate-300">
                <strong>Traversal Order:</strong> {visited.join(' → ')}
              </div>
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
    </VisualizerLayout>
  );
}
