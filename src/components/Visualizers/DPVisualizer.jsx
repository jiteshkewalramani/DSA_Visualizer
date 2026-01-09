import React, { useState } from 'react';
import { Play, Code, BookOpen } from 'lucide-react';
import PseudoCodePanel from '../Shared/PseudoCodePanel';
import VisualizerLayout from '../Shared/VisualizerLayout';
import LearningSection from '../Learning/LearningSection';
import { dpLearningContent } from '../../data/learningContent/dpLearning';

export default function DPVisualizer({ pseudoCode, topic, setCurrentTopic }) {
  // Tab state - default to learning/theory tab
  const [activeTab, setActiveTab] = useState('learning');

  const [problem, setProblem] = useState('fibonacci');
  const [n, setN] = useState(10);
  const [running, setRunning] = useState(false);
  const [dpTable, setDpTable] = useState([]);
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fibonacci = async () => {
    setRunning(true);
    const dp = Array(n + 1).fill(null);
    const stepLog = [];
    
    dp[0] = 0;
    dp[1] = 1;
    setDpTable([...dp]);
    await sleep(500);
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      stepLog.push(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
      setDpTable([...dp]);
      setSteps([...stepLog]);
      await sleep(300);
    }
    
    setResult(dp[n]);
    setRunning(false);
  };

  const coinChange = async () => {
    setRunning(true);
    const coins = [1, 2, 5];
    const dp = Array(n + 1).fill(Infinity);
    const stepLog = [];
    
    dp[0] = 0;
    setDpTable([...dp]);
    await sleep(500);
    
    for (let i = 1; i <= n; i++) {
      for (let coin of coins) {
        if (i >= coin && dp[i - coin] !== Infinity) {
          const newVal = dp[i - coin] + 1;
          if (newVal < dp[i]) {
            dp[i] = newVal;
            stepLog.push(`dp[${i}] = min(dp[${i}], dp[${i-coin}] + 1) = ${newVal} (coin: ${coin})`);
          }
        }
      }
      setDpTable([...dp]);
      setSteps([...stepLog]);
      await sleep(300);
    }
    
    setResult(dp[n] === Infinity ? 'Impossible' : dp[n]);
    setRunning(false);
  };

  const solve = () => {
    setDpTable([]);
    setSteps([]);
    setResult(null);
    if (problem === 'fibonacci') fibonacci();
    else if (problem === 'coinChange') coinChange();
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
          <select
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="bg-slate-700 text-white rounded px-3 py-2"
            disabled={running}
          >
            <option value="fibonacci">Fibonacci Number</option>
            <option value="coinChange">Coin Change (1,2,5)</option>
          </select>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
            className="bg-slate-700 text-white rounded px-3 py-2 w-24"
            placeholder="n"
            min="1"
            max="20"
            disabled={running}
          />
          <button onClick={solve} disabled={running} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Play size={18} /> Solve
          </button>
        </div>

        {result !== null && (
          <div className="mb-4 bg-green-900 bg-opacity-50 border border-green-500 rounded p-3 text-green-200">
            <strong>Result:</strong> {result}
          </div>
        )}

        <div className="bg-slate-900 rounded-lg p-4 mb-4">
          <h3 className="text-white font-semibold mb-2">DP Table:</h3>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {dpTable.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-slate-400 text-xs mb-1">[{idx}]</div>
                <div className={`w-12 h-12 flex items-center justify-center rounded font-semibold text-sm ${
                  val === null ? 'bg-slate-700 text-slate-500' : 
                  val === Infinity ? 'bg-red-900 text-red-200' :
                  'bg-blue-600 text-white'
                }`}>
                  {val === null ? '?' : val === Infinity ? '∞' : val}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 max-h-[200px] overflow-y-auto">
          <h3 className="text-white font-semibold mb-2">Computation Steps:</h3>
          {steps.length === 0 ? (
            <p className="text-slate-500 text-sm">Click Solve to see steps...</p>
          ) : (
            <div className="space-y-1">
              {steps.map((step, idx) => (
                <div key={idx} className="text-slate-300 text-sm font-mono">
                  {idx + 1}. {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <PseudoCodePanel title={`${problem === 'fibonacci' ? 'Fibonacci' : 'Coin Change'} Pseudo Code`} code={pseudoCode[problem]} />
      </div>
    </div>
        </>
      )}

      {/* Learning Tab */}
      {activeTab === 'learning' && (
        <LearningSection learningContent={dpLearningContent} />
      )}
    </VisualizerLayout>
  );
}