import React, { useState } from 'react';
import { Play, Plus, Trash2 } from 'lucide-react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';

export default function GraphVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [startNode, setStartNode] = useState('');
  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(null);
  const [running, setRunning] = useState(false);

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

  const bfs = async (start) => {
    setRunning(true);
    const queue = [start];
    const vis = [];
    
    while (queue.length > 0) {
      const node = queue.shift();
      if (vis.includes(node)) continue;
      
      setCurrent(node);
      await sleep(800);
      vis.push(node);
      setVisited([...vis]);
      
      const neighbors = edges
        .filter(e => e.from === node || e.to === node)
        .map(e => e.from === node ? e.to : e.from)
        .filter(n => !vis.includes(n));
      
      queue.push(...neighbors);
    }
    
    setCurrent(null);
    setRunning(false);
  };

  const dfs = async (start) => {
    setRunning(true);
    const vis = [];
    
    const dfsHelper = async (node) => {
      if (vis.includes(node)) return;
      
      setCurrent(node);
      await sleep(800);
      vis.push(node);
      setVisited([...vis]);
      
      const neighbors = edges
        .filter(e => e.from === node || e.to === node)
        .map(e => e.from === node ? e.to : e.from)
        .filter(n => !vis.includes(n));
      
      for (const neighbor of neighbors) {
        await dfsHelper(neighbor);
      }
    };
    
    await dfsHelper(start);
    setCurrent(null);
    setRunning(false);
  };

  const startTraversal = () => {
    if (!startNode || !nodes.find(n => n.id === startNode)) return;
    setVisited([]);
    setCurrent(null);
    if (algorithm === 'bfs') bfs(startNode);
    else if (algorithm === 'dfs') dfs(startNode);
  };

  return (
    <VisualizerLayout topic={topic} setCurrentTopic={setCurrentTopic}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2 flex-wrap">
          <button onClick={addNode} disabled={nodes.length >= 8} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Plus size={18} /> Add Node
          </button>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-slate-700 text-white rounded px-3 py-2"
            disabled={running}
          >
            <option value="bfs">BFS (Breadth First)</option>
            <option value="dfs">DFS (Depth First)</option>
          </select>
          <input
            type="text"
            value={startNode}
            onChange={(e) => setStartNode(e.target.value.toUpperCase())}
            className="bg-slate-700 text-white rounded px-3 py-2 w-20"
            placeholder="Start"
            maxLength={1}
          />
          <button onClick={startTraversal} disabled={running || !startNode} className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Play size={18} /> Run
          </button>
          <button onClick={() => { setNodes([]); setEdges([]); setVisited([]); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            <Trash2 size={18} />
          </button>
        </div>
        
        <div className="mb-4 bg-slate-900 rounded p-3">
          <p className="text-sm text-slate-400 mb-2">Click two nodes to connect:</p>
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
                className="node-btn bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded"
              >
                {node.id}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg">
          <svg width="600" height="400" className="w-full">
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
        <div className="mt-4 text-sm text-slate-400">
          <strong>Visited:</strong> {visited.join(' → ') || 'None'}
        </div>
      </div>
      <div>
        <PseudoCodePanel title={`${algorithm.toUpperCase()} Pseudo Code`} code={pseudoCode[algorithm]} />
      </div>
    </div>
    </VisualizerLayout>
  );
}