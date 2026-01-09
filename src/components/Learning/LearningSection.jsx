import { useState } from 'react';
import {
  BookOpen, Code, Lightbulb, Target, TrendingUp,
  CheckCircle, AlertCircle, ChevronDown, ChevronUp,
  Clock, Zap, Database, MessageSquare
} from 'lucide-react';

export default function LearningSection({ learningContent }) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Define all possible sections with their metadata
  const allSections = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen },
    { id: 'fundamentals', label: 'Fundamentals', icon: Lightbulb },
    { id: 'operations', label: 'Operations', icon: Code },
    { id: 'algorithms', label: 'Algorithms', icon: Code },
    { id: 'traversals', label: 'Traversals', icon: TrendingUp },
    { id: 'types', label: 'Types', icon: Target },
    { id: 'implementation', label: 'Implementation', icon: Code },
    { id: 'approaches', label: 'Approaches', icon: Lightbulb },
    { id: 'balanceFactorAndHeight', label: 'Balance & Height', icon: TrendingUp },
    { id: 'rotations', label: 'Rotations', icon: Target },
    { id: 'collisionResolution', label: 'Collision Resolution', icon: AlertCircle },
    { id: 'hashFunctions', label: 'Hash Functions', icon: Code },
    { id: 'heapSort', label: 'Heap Sort', icon: TrendingUp },
    { id: 'traversalComparison', label: 'Traversal Comparison', icon: Zap },
    { id: 'recognizingDPProblems', label: 'Recognizing DP', icon: Lightbulb },
    { id: 'classicProblems', label: 'Classic Problems', icon: Target },
    { id: 'dpPatterns', label: 'DP Patterns', icon: CheckCircle },
    { id: 'advancedTopics', label: 'Advanced Topics', icon: Database },
    { id: 'complexity', label: 'Complexity', icon: Clock },
    { id: 'applications', label: 'Applications', icon: Database },
    { id: 'commonProblems', label: 'Practice', icon: Target },
    { id: 'interviewProblems', label: 'Interview Problems', icon: Target },
    { id: 'bestPractices', label: 'Best Practices', icon: CheckCircle },
    { id: 'comparison', label: 'Comparison', icon: Zap }
  ];

  // Filter sections to only show those that exist in the current learning content
  const sections = allSections.filter(section => learningContent[section.id]);

  const renderIntroduction = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="text-blue-400" size={28} />
          {learningContent.introduction.title}
        </h2>
        <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
          {learningContent.introduction.content}
        </div>
      </div>

      {learningContent.introduction.visualExample && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <Code className="text-green-400" size={20} />
            Visual Example
          </h3>
          <p className="text-slate-300 mb-4">{learningContent.introduction.visualExample.description}</p>
          <pre className="bg-slate-950 rounded p-4 text-green-400 font-mono text-sm overflow-x-auto">
            {learningContent.introduction.visualExample.tree}
          </pre>
        </div>
      )}
    </div>
  );

  const renderFundamentals = () => {
    const sectionData = learningContent[activeSection] || learningContent.fundamentals;
    if (!sectionData) return null;

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-yellow-400" size={28} />
          {sectionData.title || 'Fundamentals'}
        </h2>

        {(sectionData.sections || []).map((section, idx) => (
        <div key={idx} className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
          <button
            onClick={() => toggleCard(`fund-${idx}`)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white">{section.subtitle || section.concept || section.name || section.title || 'Section'}</h3>
            {expandedCards[`fund-${idx}`] ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
          </button>

          {expandedCards[`fund-${idx}`] && (
            <div className="px-6 pb-6 space-y-4">
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                {section.content || section.explanation || section.description || ''}
              </div>

              {(section.example || section.diagram) && (
                <div className="bg-slate-950 rounded p-4 border-l-4 border-blue-500">
                  <pre className="text-sm text-blue-300 font-mono whitespace-pre-wrap">
                    {section.example || section.diagram}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
    );
  };

  const renderOperations = () => {
    const sectionData = learningContent[activeSection] || learningContent.operations;
    if (!sectionData) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Code className="text-green-400" size={28} />
          {sectionData.title || 'Operations'}
        </h2>

        {(sectionData.sections || []).map((op, idx) => (
        <div key={idx} className="bg-slate-800 rounded-lg border border-slate-600 p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{op.operation || op.name || op.algorithm || op.title || 'Operation'}</h3>
            <div className="text-right">
              <div className="text-xs text-slate-400">Time</div>
              <div className="text-sm font-mono text-green-400">{op.timeComplexity}</div>
              <div className="text-xs text-slate-400 mt-1">Space</div>
              <div className="text-sm font-mono text-blue-400">{op.spaceComplexity}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
              {op.description}
            </div>

            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-2 flex items-center gap-2">
                <Code size={16} className="text-purple-400" />
                Pseudocode
              </h4>
              <pre className="bg-slate-950 rounded p-4 text-purple-300 font-mono text-sm overflow-x-auto">
                {op.pseudocode}
              </pre>
            </div>

            {op.iterativeVersion && (
              <div>
                <h4 className="text-md font-semibold text-slate-200 mb-2">Iterative Version</h4>
                <pre className="bg-slate-950 rounded p-4 text-cyan-300 font-mono text-sm overflow-x-auto">
                  {op.iterativeVersion}
                </pre>
              </div>
            )}

            {op.example && (
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded p-4 border-l-4 border-blue-400">
                <h4 className="text-md font-semibold text-blue-300 mb-2">Example</h4>
                <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
                  {op.example}
                </pre>
              </div>
            )}

            {op.detailedExample && (
              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded p-4 border-l-4 border-green-400">
                <h4 className="text-md font-semibold text-green-300 mb-2">Detailed Example</h4>
                <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
                  {op.detailedExample}
                </pre>
              </div>
            )}

            {op.commonMistakes && (
              <div className="bg-red-900/20 rounded p-4 border-l-4 border-red-500">
                <h4 className="text-md font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Common Mistakes
                </h4>
                <pre className="text-sm text-slate-200 whitespace-pre-wrap">
                  {op.commonMistakes}
                </pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    );
  };

  const renderTraversals = () => {
    if (!learningContent.traversals) return null;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-6 border border-purple-700">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <TrendingUp className="text-purple-400" size={28} />
            {learningContent.traversals.title}
          </h2>
          <p className="text-slate-200">{learningContent.traversals.description}</p>
        </div>

        {learningContent.traversals.sections?.map((trav, idx) => (
        <div key={idx} className="bg-slate-800 rounded-lg border border-slate-600 p-6">
          <h3 className="text-xl font-bold text-white mb-3">{trav.name}</h3>

          <div className="space-y-4">
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
              {trav.description}
            </div>

            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-2">Pseudocode</h4>
              <pre className="bg-slate-950 rounded p-4 text-purple-300 font-mono text-sm overflow-x-auto">
                {trav.pseudocode}
              </pre>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded p-4 border-l-4 border-cyan-400">
              <h4 className="text-md font-semibold text-cyan-300 mb-2">Example</h4>
              <pre className="text-sm text-slate-200 whitespace-pre-wrap font-mono">
                {trav.example}
              </pre>
            </div>

            <div className="bg-slate-700 rounded p-3">
              <div className="text-sm font-semibold text-slate-300 mb-1">Use Cases:</div>
              <div className="text-sm text-slate-400">{trav.application}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
  };

  const renderComplexity = () => {
    const complexityData = learningContent.complexity;
    if (!complexityData) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="text-orange-400" size={28} />
          {complexityData.title || 'Complexity Analysis'}
        </h2>

        {/* Complexity comparison table (for sorting/algorithms) */}
        {complexityData.comparison && complexityData.comparison.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Algorithm</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Best</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Average</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Worst</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Space</th>
                  <th className="px-4 py-3 text-left text-slate-200 font-semibold">Stable</th>
                </tr>
              </thead>
              <tbody>
                {complexityData.comparison.map((item, idx) => (
                  <tr key={idx} className="border-t border-slate-700 hover:bg-slate-750">
                    <td className="px-4 py-3 font-semibold text-white">{item.algorithm}</td>
                    <td className="px-4 py-3 font-mono text-sm text-green-300">{item.best}</td>
                    <td className="px-4 py-3 font-mono text-sm text-blue-300">{item.average}</td>
                    <td className="px-4 py-3 font-mono text-sm text-red-300">{item.worst}</td>
                    <td className="px-4 py-3 font-mono text-sm text-purple-300">{item.space}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{item.stable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Explanation text */}
        {complexityData.explanation && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.explanation}
            </pre>
          </div>
        )}

        {/* Analysis text */}
        {complexityData.analysis && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.analysis}
            </pre>
          </div>
        )}

        {/* Operations Table */}
        {complexityData.operationsTable && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            {typeof complexityData.operationsTable === 'string' ? (
              <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                {complexityData.operationsTable}
              </pre>
            ) : (
              <>
                {complexityData.operationsTable.title && (
                  <h3 className="text-xl font-bold text-white mb-2">{complexityData.operationsTable.title}</h3>
                )}
                {complexityData.operationsTable.description && (
                  <p className="text-slate-400 mb-4">{complexityData.operationsTable.description}</p>
                )}
                {complexityData.operationsTable.headers && complexityData.operationsTable.rows && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-700">
                          {complexityData.operationsTable.headers.map((header, idx) => (
                            <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-white border border-slate-600">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {complexityData.operationsTable.rows.map((row, ridx) => (
                          <tr key={ridx} className="bg-slate-800 hover:bg-slate-700 transition">
                            {row.map((cell, cidx) => (
                              <td key={cidx} className="px-4 py-3 text-sm text-slate-300 border border-slate-600">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Detailed Analysis */}
        {complexityData.detailedAnalysis && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.detailedAnalysis}
            </pre>
          </div>
        )}

        {/* Representation Complexity (Graph) */}
        {complexityData.representationComplexity && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Representation Complexity</h3>
            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">
              {complexityData.representationComplexity}
            </pre>
          </div>
        )}

        {/* Algorithm Complexity (Graph) */}
        {complexityData.algorithmComplexity && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Algorithm Complexity</h3>
            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">
              {complexityData.algorithmComplexity}
            </pre>
          </div>
        )}

        {/* Time Analysis */}
        {complexityData.timeAnalysis && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Time Analysis</h3>
            <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.timeAnalysis}
            </pre>
          </div>
        )}

        {/* Space Analysis */}
        {complexityData.spaceAnalysis && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Space Analysis</h3>
            <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.spaceAnalysis}
            </pre>
          </div>
        )}

        {/* Graph Density */}
        {complexityData.graphDensity && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Graph Density Impact</h3>
            <pre className="text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.graphDensity}
            </pre>
          </div>
        )}

        {/* Time Complexity (BST-style) */}
        {complexityData.timeComplexity && complexityData.timeComplexity.balanced && complexityData.timeComplexity.worstCase && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/30 rounded-lg p-6 border border-green-600">
              <h3 className="text-xl font-bold text-green-300 mb-4">{complexityData.timeComplexity.balanced.title}</h3>
              <div className="space-y-2">
                {Object.entries(complexityData.timeComplexity.balanced.operations || {}).map(([op, complexity]) => (
                  <div key={op} className="flex justify-between items-center">
                    <span className="text-slate-300">{op}</span>
                    <code className="bg-green-950 px-3 py-1 rounded text-green-300 font-mono text-sm">{complexity}</code>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-300 whitespace-pre-wrap">
                {complexityData.timeComplexity.balanced.explanation}
              </p>
            </div>

            <div className="bg-red-900/30 rounded-lg p-6 border border-red-600">
              <h3 className="text-xl font-bold text-red-300 mb-4">{complexityData.timeComplexity.worstCase.title}</h3>
              <div className="space-y-2">
                {Object.entries(complexityData.timeComplexity.worstCase.operations || {}).map(([op, complexity]) => (
                  <div key={op} className="flex justify-between items-center">
                    <span className="text-slate-300">{op}</span>
                    <code className="bg-red-950 px-3 py-1 rounded text-red-300 font-mono text-sm">{complexity}</code>
                  </div>
                ))}
              </div>
              <pre className="mt-4 text-sm text-slate-300 whitespace-pre-wrap">
                {complexityData.timeComplexity.worstCase.explanation}
              </pre>
            </div>
          </div>
        )}

        {/* Space Complexity */}
        {complexityData.spaceComplexity && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4">Space Complexity</h3>

            {/* Queue-style: description + arrayBased + linkedListBased */}
            {complexityData.spaceComplexity.description && (
              <p className="text-slate-400 mb-4">{complexityData.spaceComplexity.description}</p>
            )}

            {(complexityData.spaceComplexity.arrayBased || complexityData.spaceComplexity.linkedListBased) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complexityData.spaceComplexity.arrayBased && (
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">{complexityData.spaceComplexity.arrayBased.title}</h4>
                    <code className="block bg-blue-950 px-3 py-2 rounded text-blue-300 font-mono text-lg mb-2">
                      {complexityData.spaceComplexity.arrayBased.space}
                    </code>
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                      {complexityData.spaceComplexity.arrayBased.explanation}
                    </pre>
                  </div>
                )}
                {complexityData.spaceComplexity.linkedListBased && (
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">{complexityData.spaceComplexity.linkedListBased.title}</h4>
                    <code className="block bg-purple-950 px-3 py-2 rounded text-purple-300 font-mono text-lg mb-2">
                      {complexityData.spaceComplexity.linkedListBased.space}
                    </code>
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                      {complexityData.spaceComplexity.linkedListBased.explanation}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* BST-style: storage + recursion */}
            {(complexityData.spaceComplexity.storage || complexityData.spaceComplexity.recursion) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complexityData.spaceComplexity.storage && (
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">{complexityData.spaceComplexity.storage.title}</h4>
                    <code className="block bg-blue-950 px-3 py-2 rounded text-blue-300 font-mono text-lg mb-2">
                      {complexityData.spaceComplexity.storage.value}
                    </code>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">
                      {complexityData.spaceComplexity.storage.explanation}
                    </p>
                  </div>
                )}
                {complexityData.spaceComplexity.recursion && (
                  <div>
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">{complexityData.spaceComplexity.recursion.title}</h4>
                    <div className="flex gap-2 mb-2">
                      <code className="bg-green-950 px-3 py-2 rounded text-green-300 font-mono text-sm">
                        {complexityData.spaceComplexity.recursion.balanced}
                      </code>
                      <code className="bg-red-950 px-3 py-2 rounded text-red-300 font-mono text-sm">
                        {complexityData.spaceComplexity.recursion.worstCase}
                      </code>
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">
                      {complexityData.spaceComplexity.recursion.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderApplications = () => {
    const appData = learningContent.applications;
    if (!appData) return null;

    const appList = appData.useCases || appData.examples || [];

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Database className="text-cyan-400" size={28} />
          {appData.title || 'Applications'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appList.map((app, idx) => (
          <div key={idx} className="bg-slate-800 rounded-lg p-5 border border-slate-600 hover:border-cyan-500 transition-colors">
            <h3 className="text-lg font-bold text-cyan-300 mb-2">{app.application}</h3>
            <p className="text-slate-300 text-sm mb-3 whitespace-pre-wrap leading-relaxed">
              {app.description}
            </p>
            {app.example && (
              <div className="bg-cyan-900/20 rounded px-3 py-2 border-l-4 border-cyan-500">
                <div className="text-xs text-cyan-400 font-semibold mb-1">Example:</div>
                <div className="text-sm text-slate-200">{app.example}</div>
              </div>
            )}
            {app.algorithm && (
              <div className="bg-blue-900/20 rounded px-3 py-2 border-l-4 border-blue-500 mt-2">
                <div className="text-xs text-blue-400 font-semibold mb-1">Algorithm:</div>
                <div className="text-sm text-slate-200">{app.algorithm}</div>
              </div>
            )}
            {app.details && (
              <div className="bg-slate-900 rounded px-3 py-2 mt-2">
                <div className="text-xs text-slate-400 font-mono whitespace-pre-wrap">{app.details}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    );
  };

  const renderProblems = () => {
    const problemData = learningContent[activeSection] || learningContent.commonProblems || learningContent.interviewProblems;
    if (!problemData) return null;

    const problemList = problemData.problems || [];

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="text-red-400" size={28} />
          {problemData.title || 'Interview Problems'}
        </h2>

        {problemList.map((problem, idx) => (
        <div key={idx} className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
          <button
            onClick={() => toggleCard(`problem-${idx}`)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                problem.difficulty === 'Easy' ? 'bg-green-900/50 text-green-300' :
                problem.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' :
                'bg-red-900/50 text-red-300'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            {expandedCards[`problem-${idx}`] ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
          </button>

          {expandedCards[`problem-${idx}`] && (
            <div className="px-6 pb-6 space-y-4">
              <p className="text-slate-300">{problem.description}</p>

              <div className="bg-blue-900/20 rounded p-4 border-l-4 border-blue-400">
                <h4 className="text-md font-semibold text-blue-300 mb-2">Approach</h4>
                <p className="text-slate-200 whitespace-pre-wrap text-sm">{problem.approach}</p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-slate-200 mb-2">Solution</h4>
                <pre className="bg-slate-950 rounded p-4 text-green-300 font-mono text-sm overflow-x-auto">
                  {problem.solution}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    );
  };

  const renderBestPractices = () => {
    const practicesData = learningContent.bestPractices;
    if (!practicesData) return null;

    const tipsList = practicesData.tips || practicesData.practices || [];

    return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-400" size={28} />
        {practicesData.title || 'Best Practices'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tipsList.map((tip, idx) => (
          <div key={idx} className="bg-slate-800 rounded-lg p-5 border border-slate-600">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <MessageSquare className="text-blue-400" size={20} />
              {tip.category}
            </h3>
            <ul className="space-y-2">
              {(tip.points || tip.practices || []).map((point, pidx) => (
                <li key={pidx} className="text-slate-300 text-sm flex items-start gap-2">
                  {point.startsWith('✓') ? (
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                  ) : point.startsWith('❌') ? (
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
                  ) : (
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                  )}
                  <span>{point.replace(/^[✓❌]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    );
  };

  const renderComparison = () => {
    const comparisonData = learningContent.comparison;
    if (!comparisonData) return null;

    return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Zap className="text-yellow-400" size={28} />
        {comparisonData.title || 'Comparison'}
      </h2>

      {/* Display comparison table or comparison content */}
      {comparisonData.comparison && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <pre className="text-slate-300 whitespace-pre-wrap font-sans">{comparisonData.comparison}</pre>
        </div>
      )}

      {comparisonData.table && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">{comparisonData.table}</pre>
        </div>
      )}

      {comparisonData.comparisons && comparisonData.comparisons.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-slate-800 rounded-lg overflow-hidden">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-slate-200 font-semibold">{comparisonData.comparisons[0].structure || comparisonData.comparisons[0].algorithm || 'Item'}</th>
                <th className="px-4 py-3 text-left text-slate-200 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.comparisons.map((comp, idx) => (
                <tr key={idx} className="border-t border-slate-700 hover:bg-slate-750">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">{comp.structure || comp.algorithm || comp.scenario || 'Item'}</div>
                    {comp.notes && <div className="text-xs text-slate-400 mt-1">{comp.notes}</div>}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">
                    {comp.difference || comp.description || comp.recommendation || comp.reason || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {comparisonData.decisionMatrix && comparisonData.decisionMatrix.length > 0 && (
        <div className="space-y-3">
          {comparisonData.decisionMatrix.map((item, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-5 border border-slate-600">
              <h3 className="text-lg font-bold text-cyan-300 mb-2">{item.scenario}</h3>
              <div className="mb-2"><span className="text-green-400 font-semibold">Recommendation:</span> <span className="text-white">{item.recommendation}</span></div>
              <div className="text-slate-300 text-sm">{item.reason}</div>
            </div>
          ))}
        </div>
      )}

      {comparisonData.whenToUseBST && (
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6 border border-purple-700">
          <h3 className="text-xl font-bold text-white mb-3">When to Use?</h3>
          <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">
            {comparisonData.whenToUseBST}
          </pre>
        </div>
      )}
    </div>
    );
  };

  const renderSection = () => {
    const sectionData = learningContent[activeSection];
    if (!sectionData) return renderIntroduction();

    switch (activeSection) {
      case 'introduction': return renderIntroduction();
      case 'fundamentals': return renderFundamentals();
      case 'operations': return renderOperations();
      case 'algorithms': return renderOperations(); // Algorithms have similar structure to operations
      case 'types': return renderFundamentals(); // Types have similar structure to fundamentals
      case 'implementation': return renderFundamentals(); // Implementation similar to fundamentals
      case 'approaches': return renderFundamentals(); // Approaches similar to fundamentals
      case 'balanceFactorAndHeight': return renderFundamentals();
      case 'rotations': return renderOperations(); // Rotations similar to operations
      case 'collisionResolution': return renderFundamentals();
      case 'hashFunctions': return renderFundamentals();
      case 'heapSort': return renderOperations();
      case 'traversals': return renderTraversals();
      case 'traversalComparison': return renderFundamentals();
      case 'recognizingDPProblems': return renderFundamentals();
      case 'classicProblems': return renderOperations();
      case 'dpPatterns': return renderFundamentals();
      case 'advancedTopics': return renderFundamentals();
      case 'complexity': return renderComplexity();
      case 'applications': return renderApplications();
      case 'commonProblems': return renderProblems();
      case 'interviewProblems': return renderProblems(); // Same as commonProblems
      case 'bestPractices': return renderBestPractices();
      case 'comparison': return renderComparison();
      default: return renderIntroduction();
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-slate-700 px-6 py-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-blue-400" size={36} />
            Complete Learning Guide
          </h1>
          <p className="text-slate-300 text-lg">Master the concepts with comprehensive theory and examples</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-5 py-3 rounded-lg flex items-center gap-2.5 transition-all font-medium ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <Icon size={20} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 shadow-2xl">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
