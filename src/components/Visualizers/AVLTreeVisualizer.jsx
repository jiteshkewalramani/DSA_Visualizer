import React, { useState } from 'react';
import { Plus, Trash2, Code, BookOpen } from 'lucide-react';
import { AVLTree, copyTree, calculateTreePositions } from '../../utils/dataStructures';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';
import LearningSection from '../Learning/LearningSection';
import { avlTreeLearningContent } from '../../data/learningContent/avlTreeLearning';

export default function AVLTreeVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  // Tab state - default to learning/theory tab
  const [activeTab, setActiveTab] = useState('learning');

  const [avl, setAvl] = useState(new AVLTree());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [operation, setOperation] = useState('insert');

  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    
    const newAvl = new AVLTree();
    newAvl.root = copyTree(avl.root, AVLTree.AVLNode);
    newAvl.insert(value);
    setAvl(newAvl);
    setMessage(`Inserted ${value} - Tree auto-balanced!`);
    setInputValue('');
  };

  const renderNode = (node) => {
    if (!node) return null;
    const balance = avl.getBalance(node);
    return (
      <g key={`${node.value}-${node.x}-${node.y}`}>
        {node.left && (
          <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="#64748b" strokeWidth="2" />
        )}
        {node.right && (
          <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="#64748b" strokeWidth="2" />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r="22"
          fill={Math.abs(balance) > 1 ? '#ef4444' : '#10b981'}
          stroke="#60a5fa"
          strokeWidth="2"
        />
        <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">
          {node.value}
        </text>
        <text x={node.x} y={node.y + 35} textAnchor="middle" fill="#94a3b8" fontSize="10">
          h:{node.height} b:{balance}
        </text>
        {node.left && renderNode(node.left)}
        {node.right && renderNode(node.right)}
      </g>
    );
  };

  const renderTree = () => {
    if (!avl.root) return null;
    calculateTreePositions(avl.root, 300, 40, 120);
    return renderNode(avl.root);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 flex gap-2">
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
          <button onClick={() => setAvl(new AVLTree())} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
            <Trash2 size={18} />
          </button>
        </div>
        {message && <div className="mb-4 bg-green-900 bg-opacity-50 border border-green-500 rounded p-2 text-green-200 text-sm">{message}</div>}
        <div className="bg-slate-900 rounded-lg">
          <svg width="600" height="350" className="w-full">
            {avl.root ? renderTree() : (
              <text x="300" y="175" textAnchor="middle" fill="#64748b" fontSize="16">
                Insert values - AVL tree auto-balances!
              </text>
            )}
          </svg>
        </div>
        <div className="mt-4 text-sm text-slate-400">
          <strong>Legend:</strong> h=height, b=balance | <strong className="text-green-400">Green</strong>=balanced | <strong className="text-red-400">Red</strong>=unbalanced
        </div>
      </div>
      <div>
        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-slate-700 text-white rounded px-3 py-2"
          >
            <option value="insert">Insert with Balancing</option>
            <option value="rotate">Rotation Operations</option>
          </select>
        </div>
        <PseudoCodePanel title={`${operation === 'insert' ? 'Insert' : 'Rotation'} Pseudo Code`} code={pseudoCode[operation]} />
      </div>
    </div>
      )}

      {/* Learning Tab */}
      {activeTab === 'learning' && (
        <LearningSection learningContent={avlTreeLearningContent} />
      )}
    </VisualizerLayout>
  );
}