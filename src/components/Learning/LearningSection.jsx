import { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Code, Lightbulb, Target, TrendingUp,
  CheckCircle, AlertCircle, ChevronDown,
  Clock, Zap, Database, MessageSquare, Sparkles,
  Play, Copy, Check, Terminal, Cpu, GitBranch
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 1000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// Interactive Code Block Component
const InteractiveCodeBlock = ({ code, language = 'pseudocode', title }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative group rounded-xl overflow-hidden transition-all duration-300 ${isHovered ? 'code-glow' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 dark:bg-slate-950 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-green-400" />
          <span className="text-xs font-mono text-slate-400">{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code Content */}
      <pre className="bg-slate-950 p-4 font-mono text-sm overflow-x-auto">
        <code className="text-emerald-400 leading-relaxed whitespace-pre-wrap">
          {code}
        </code>
      </pre>
      {/* Glow Effect */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      </div>
    </div>
  );
};

// Animated Progress Bar for Complexity
const ComplexityBar = ({ label, value, maxValue = 100, color = 'blue', delay = 0 }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="mb-3 animate-fadeIn" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{value}</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-animated bg-gradient-to-r ${color === 'green' ? 'from-green-400 to-emerald-500' :
            color === 'yellow' ? 'from-yellow-400 to-amber-500' :
              color === 'red' ? 'from-red-400 to-rose-500' :
                'from-blue-400 to-indigo-500'
            }`}
          style={{ '--progress-width': `${percentage}%`, width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Interactive Tip Card
const TipCard = ({ icon: Icon, title, children, variant = 'info' }) => {
  const variants = {
    info: 'from-blue-500/20 to-indigo-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400',
    success: 'from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-600 dark:text-green-400',
    warning: 'from-amber-500/20 to-yellow-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400',
    danger: 'from-red-500/20 to-rose-500/20 border-red-500/50 text-red-600 dark:text-red-400',
  };

  return (
    <div className={`relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${variants[variant]} border backdrop-blur-sm interactive-card`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-white/30 dark:bg-slate-900/30`}>
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">{children}</p>
        </div>
      </div>
      {/* Decorative Element */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/20 dark:bg-white/5" />
    </div>
  );
};

export default function LearningSection({ learningContent }) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedCards, setExpandedCards] = useState({});
  const [sectionsViewed, setSectionsViewed] = useState(['introduction']);

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (!sectionsViewed.includes(sectionId)) {
      setSectionsViewed(prev => [...prev, sectionId]);
    }
  };

  // Define all possible sections with their metadata
  const allSections = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen },
    { id: 'fundamentals', label: 'Fundamentals', icon: Lightbulb },
    { id: 'operations', label: 'Operations', icon: Code },
    { id: 'algorithms', label: 'Algorithms', icon: Cpu },
    { id: 'traversals', label: 'Traversals', icon: GitBranch },
    { id: 'types', label: 'Types', icon: Target },
    { id: 'implementation', label: 'Implementation', icon: Terminal },
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
  const progressPercentage = Math.round((sectionsViewed.length / sections.length) * 100);

  const renderIntroduction = () => (
    <div className="space-y-6 section-reveal">
      {/* Main Introduction Card */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 glass-card interactive-card">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg glow-blue">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              {learningContent.introduction.title}
            </h2>
          </div>
          <div className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed text-lg">
            {learningContent.introduction.content}
          </div>
        </div>
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TipCard icon={Sparkles} title="Key Concept" variant="info">
          Understanding the fundamentals is crucial for mastering advanced applications.
        </TipCard>
        <TipCard icon={Zap} title="Performance Tip" variant="success">
          Practice with visualizations to build strong intuition.
        </TipCard>
        <TipCard icon={Target} title="Learning Goal" variant="warning">
          Focus on patterns rather than memorizing solutions.
        </TipCard>
      </div>

      {/* Visual Example */}
      {learningContent.introduction.visualExample && (
        <div className="rounded-2xl overflow-hidden glass-card">
          <div className="px-6 py-4 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <Play size={18} className="text-green-500" />
              Visual Example
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{learningContent.introduction.visualExample.description}</p>
          </div>
          <InteractiveCodeBlock
            code={learningContent.introduction.visualExample.tree}
            title="Structure Visualization"
          />
        </div>
      )}
    </div>
  );

  const renderFundamentals = () => {
    const sectionData = learningContent[activeSection] || learningContent.fundamentals;
    if (!sectionData) return null;

    return (
      <div className="space-y-4 section-reveal">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
            <Lightbulb size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {sectionData.title || 'Fundamentals'}
          </h2>
        </div>

        {/* Expandable Cards */}
        {(sectionData.sections || []).map((section, idx) => (
          <div
            key={idx}
            className="glass-card rounded-xl overflow-hidden interactive-card animate-fadeIn"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <button
              onClick={() => toggleCard(`fund-${idx}`)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white text-left">
                  {section.subtitle || section.concept || section.name || section.title || 'Section'}
                </h3>
              </div>
              <div className={`p-2 rounded-full bg-slate-100 dark:bg-slate-800 transition-transform duration-300 ${expandedCards[`fund-${idx}`] ? 'rotate-180' : ''}`}>
                <ChevronDown size={18} className="text-slate-500" />
              </div>
            </button>

            {expandedCards[`fund-${idx}`] && (
              <div className="px-6 pb-6 space-y-4 animate-slideUp">
                <div className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed pl-11">
                  {section.content || section.explanation || section.description || ''}
                </div>

                {(section.example || section.diagram) && (
                  <div className="ml-11">
                    <InteractiveCodeBlock
                      code={section.example || section.diagram}
                      title="Example"
                    />
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
      <div className="space-y-6 section-reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-lg glow-blue">
            <Code size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {sectionData.title || 'Operations'}
          </h2>
        </div>

        {(sectionData.sections || []).map((op, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl overflow-hidden interactive-card animate-fadeIn"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* Operation Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {op.operation || op.name || op.algorithm || op.title || 'Operation'}
                  </h3>
                </div>

                {/* Complexity Badges */}
                <div className="flex gap-3">
                  {op.timeComplexity && (
                    <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Time</span>
                      <span className="font-mono text-sm font-bold text-green-600 dark:text-green-400">{op.timeComplexity}</span>
                    </div>
                  )}
                  {op.spaceComplexity && (
                    <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">Space</span>
                      <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{op.spaceComplexity}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Description */}
              <div className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {op.description}
              </div>

              {/* Pseudocode */}
              {op.pseudocode && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal size={16} className="text-purple-500" />
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200">Pseudocode</h4>
                  </div>
                  <InteractiveCodeBlock code={op.pseudocode} title="Algorithm" />
                </div>
              )}

              {/* Iterative Version */}
              {op.iterativeVersion && (
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Iterative Version</h4>
                  <InteractiveCodeBlock code={op.iterativeVersion} title="Iterative Implementation" />
                </div>
              )}

              {/* Example */}
              {op.example && (
                <TipCard icon={Play} title="Example" variant="info">
                  <pre className="mt-2 text-sm font-mono whitespace-pre-wrap">{op.example}</pre>
                </TipCard>
              )}

              {/* Detailed Example */}
              {op.detailedExample && (
                <TipCard icon={Lightbulb} title="Detailed Example" variant="success">
                  <pre className="mt-2 text-sm font-mono whitespace-pre-wrap">{op.detailedExample}</pre>
                </TipCard>
              )}

              {/* Common Mistakes */}
              {op.commonMistakes && (
                <TipCard icon={AlertCircle} title="Common Mistakes" variant="danger">
                  <pre className="mt-2 text-sm whitespace-pre-wrap">{op.commonMistakes}</pre>
                </TipCard>
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
      <div className="space-y-6 section-reveal">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={28} />
              <h2 className="text-2xl md:text-3xl font-bold">{learningContent.traversals.title}</h2>
            </div>
            <p className="text-purple-100">{learningContent.traversals.description}</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10" />
        </div>

        {/* Traversal Cards */}
        {learningContent.traversals.sections?.map((trav, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl overflow-hidden interactive-card animate-fadeIn"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <GitBranch className="text-purple-500" size={20} />
                {trav.name}
              </h3>

              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {trav.description}
                </p>

                {trav.pseudocode && (
                  <InteractiveCodeBlock code={trav.pseudocode} title="Pseudocode" />
                )}

                {trav.example && (
                  <TipCard icon={Play} title="Example Trace" variant="info">
                    <pre className="mt-2 text-sm font-mono whitespace-pre-wrap">{trav.example}</pre>
                  </TipCard>
                )}

                {trav.application && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <Target size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-purple-700 dark:text-purple-300 text-sm">Use Cases: </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{trav.application}</span>
                    </div>
                  </div>
                )}
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
      <div className="space-y-6 section-reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg">
            <Clock size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {complexityData.title || 'Complexity Analysis'}
          </h2>
        </div>

        {/* Complexity Comparison Table */}
        {complexityData.comparison && complexityData.comparison.length > 0 && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
                  <tr>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Algorithm</th>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Best</th>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Average</th>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Worst</th>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Space</th>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Stable</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityData.comparison.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors animate-fadeIn"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{item.algorithm}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">{item.best}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">{item.average}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">{item.worst}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">{item.space}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.stable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Explanation / Analysis */}
        {(complexityData.explanation || complexityData.analysis) && (
          <div className="glass-card rounded-2xl p-6">
            <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {complexityData.explanation || complexityData.analysis}
            </pre>
          </div>
        )}

        {/* Operations Table */}
        {complexityData.operationsTable && (
          <div className="glass-card rounded-2xl p-6">
            {typeof complexityData.operationsTable === 'string' ? (
              <InteractiveCodeBlock code={complexityData.operationsTable} title="Operations Complexity" />
            ) : (
              <>
                {complexityData.operationsTable.title && (
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{complexityData.operationsTable.title}</h3>
                )}
                {complexityData.operationsTable.description && (
                  <p className="text-slate-500 dark:text-slate-400 mb-4">{complexityData.operationsTable.description}</p>
                )}
                {complexityData.operationsTable.headers && complexityData.operationsTable.rows && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          {complexityData.operationsTable.headers.map((header, idx) => (
                            <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {complexityData.operationsTable.rows.map((row, ridx) => (
                          <tr key={ridx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            {row.map((cell, cidx) => (
                              <td key={cidx} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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

        {/* Time Complexity Cards */}
        {complexityData.timeComplexity && complexityData.timeComplexity.balanced && complexityData.timeComplexity.worstCase && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">{complexityData.timeComplexity.balanced.title}</h3>
              <div className="space-y-3">
                {Object.entries(complexityData.timeComplexity.balanced.operations || {}).map(([op, complexity], idx) => (
                  <ComplexityBar key={op} label={op} value={20} maxValue={100} color="green" delay={idx * 100} />
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {complexityData.timeComplexity.balanced.explanation}
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">{complexityData.timeComplexity.worstCase.title}</h3>
              <div className="space-y-3">
                {Object.entries(complexityData.timeComplexity.worstCase.operations || {}).map(([op, complexity], idx) => (
                  <ComplexityBar key={op} label={op} value={80} maxValue={100} color="red" delay={idx * 100} />
                ))}
              </div>
              <pre className="mt-4 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {complexityData.timeComplexity.worstCase.explanation}
              </pre>
            </div>
          </div>
        )}

        {/* Additional Analysis Sections */}
        {complexityData.detailedAnalysis && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Detailed Analysis</h3>
            <pre className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{complexityData.detailedAnalysis}</pre>
          </div>
        )}

        {complexityData.timeAnalysis && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Time Analysis</h3>
            <pre className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{complexityData.timeAnalysis}</pre>
          </div>
        )}

        {complexityData.spaceAnalysis && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Space Analysis</h3>
            <pre className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{complexityData.spaceAnalysis}</pre>
          </div>
        )}

        {/* Space Complexity */}
        {complexityData.spaceComplexity && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Space Complexity</h3>

            {complexityData.spaceComplexity.description && (
              <p className="text-slate-500 dark:text-slate-400 mb-4">{complexityData.spaceComplexity.description}</p>
            )}

            {(complexityData.spaceComplexity.arrayBased || complexityData.spaceComplexity.linkedListBased) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {complexityData.spaceComplexity.arrayBased && (
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{complexityData.spaceComplexity.arrayBased.title}</h4>
                    <code className="block px-3 py-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-lg mb-2">
                      {complexityData.spaceComplexity.arrayBased.space}
                    </code>
                    <pre className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{complexityData.spaceComplexity.arrayBased.explanation}</pre>
                  </div>
                )}
                {complexityData.spaceComplexity.linkedListBased && (
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">{complexityData.spaceComplexity.linkedListBased.title}</h4>
                    <code className="block px-3 py-2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-lg mb-2">
                      {complexityData.spaceComplexity.linkedListBased.space}
                    </code>
                    <pre className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{complexityData.spaceComplexity.linkedListBased.explanation}</pre>
                  </div>
                )}
              </div>
            )}

            {(complexityData.spaceComplexity.storage || complexityData.spaceComplexity.recursion) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {complexityData.spaceComplexity.storage && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{complexityData.spaceComplexity.storage.title}</h4>
                    <code className="block px-3 py-2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-lg mb-2">
                      {complexityData.spaceComplexity.storage.value}
                    </code>
                    <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{complexityData.spaceComplexity.storage.explanation}</p>
                  </div>
                )}
                {complexityData.spaceComplexity.recursion && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">{complexityData.spaceComplexity.recursion.title}</h4>
                    <div className="flex gap-2 mb-2">
                      <code className="px-3 py-2 rounded bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-mono text-sm">
                        {complexityData.spaceComplexity.recursion.balanced}
                      </code>
                      <code className="px-3 py-2 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-mono text-sm">
                        {complexityData.spaceComplexity.recursion.worstCase}
                      </code>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{complexityData.spaceComplexity.recursion.explanation}</p>
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
      <div className="space-y-6 section-reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg">
            <Database size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {appData.title || 'Applications'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appList.map((app, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 interactive-card animate-fadeIn group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{app.application}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 whitespace-pre-wrap leading-relaxed">
                {app.description}
              </p>
              {app.example && (
                <div className="p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500">
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-1">Example</div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">{app.example}</div>
                </div>
              )}
              {app.algorithm && (
                <div className="mt-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Algorithm</div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">{app.algorithm}</div>
                </div>
              )}
              {app.details && (
                <div className="mt-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <div className="text-xs text-slate-500 font-mono whitespace-pre-wrap">{app.details}</div>
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

    const getDifficultyClass = (difficulty) => {
      switch (difficulty) {
        case 'Easy': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 badge-easy';
        case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 badge-medium';
        case 'Hard': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 badge-hard';
        default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
      }
    };

    return (
      <div className="space-y-4 section-reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 text-white shadow-lg">
            <Target size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {problemData.title || 'Practice Problems'}
          </h2>
        </div>

        {problemList.map((problem, idx) => (
          <div
            key={idx}
            className="glass-card rounded-xl overflow-hidden interactive-card animate-fadeIn"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <button
              onClick={() => toggleCard(`problem-${idx}`)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-slate-800 dark:text-white">{problem.title}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyClass(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className={`p-2 rounded-full bg-slate-100 dark:bg-slate-800 transition-transform duration-300 ${expandedCards[`problem-${idx}`] ? 'rotate-180' : ''}`}>
                <ChevronDown size={18} className="text-slate-500" />
              </div>
            </button>

            {expandedCards[`problem-${idx}`] && (
              <div className="px-6 pb-6 space-y-4 animate-slideUp">
                <p className="text-slate-600 dark:text-slate-300">{problem.description}</p>

                <TipCard icon={Lightbulb} title="Approach" variant="info">
                  <p className="whitespace-pre-wrap text-sm">{problem.approach}</p>
                </TipCard>

                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                    <Code size={16} className="text-green-500" />
                    Solution
                  </h4>
                  <InteractiveCodeBlock code={problem.solution} title="Solution Code" />
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
      <div className="space-y-6 section-reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg">
            <CheckCircle size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {practicesData.title || 'Best Practices'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tipsList.map((tip, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 interactive-card animate-fadeIn"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={20} />
                {tip.category}
              </h3>
              <ul className="space-y-3">
                {(tip.points || tip.practices || []).map((point, pidx) => (
                  <li key={pidx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm">
                    {point.startsWith('✓') ? (
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    ) : point.startsWith('❌') ? (
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                    ) : (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
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
      <div className="space-y-6 section-reveal">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg">
            <Zap size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {comparisonData.title || 'Comparison'}
          </h2>
        </div>

        {/* Text Comparisons */}
        {comparisonData.comparison && (
          <div className="glass-card rounded-2xl p-6">
            <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans">{comparisonData.comparison}</pre>
          </div>
        )}

        {comparisonData.table && (
          <div className="glass-card rounded-2xl p-6">
            <InteractiveCodeBlock code={comparisonData.table} title="Comparison Table" />
          </div>
        )}

        {/* Comparisons List */}
        {comparisonData.comparisons && comparisonData.comparisons.length > 0 && (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
                  <tr>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Item</th>
                    <th className="px-4 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.comparisons.map((comp, idx) => (
                    <tr key={idx} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-800 dark:text-white">{comp.structure || comp.algorithm || comp.scenario || 'Item'}</div>
                        {comp.notes && <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{comp.notes}</div>}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {comp.difference || comp.description || comp.recommendation || comp.reason || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Decision Matrix */}
        {comparisonData.decisionMatrix && comparisonData.decisionMatrix.length > 0 && (
          <div className="space-y-3">
            {comparisonData.decisionMatrix.map((item, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 interactive-card">
                <h3 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">{item.scenario}</h3>
                <div className="mb-2">
                  <span className="text-green-500 font-semibold">Recommendation: </span>
                  <span className="text-slate-700 dark:text-white">{item.recommendation}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">{item.reason}</div>
              </div>
            ))}
          </div>
        )}

        {/* When to Use */}
        {comparisonData.whenToUseBST && (
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3">When to Use?</h3>
              <pre className="text-purple-100 whitespace-pre-wrap leading-relaxed">{comparisonData.whenToUseBST}</pre>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10" />
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
      case 'algorithms': return renderOperations();
      case 'types': return renderFundamentals();
      case 'implementation': return renderFundamentals();
      case 'approaches': return renderFundamentals();
      case 'balanceFactorAndHeight': return renderFundamentals();
      case 'rotations': return renderOperations();
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
      case 'interviewProblems': return renderProblems();
      case 'bestPractices': return renderBestPractices();
      case 'comparison': return renderComparison();
      default: return renderIntroduction();
    }
  };

  return (
    <div className="tech-bg">
      {/* Header Section with Progress */}
      <div className="relative overflow-hidden animated-gradient border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 lg:px-8 py-8 md:py-10 mb-6 md:mb-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-2 md:gap-3">
                <BookOpen className="text-white/90" size={32} />
                Complete Learning Guide
              </h1>
              <p className="text-white/80 text-sm md:text-base lg:text-lg">Master the concepts with interactive theory and examples</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
              <div className="text-right">
                <div className="text-xs text-white/70">Progress</div>
                <div className="text-lg font-bold text-white"><AnimatedCounter end={progressPercentage} suffix="%" /></div>
              </div>
              <div className="w-16 h-16">
                <svg className="transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15" fill="none" stroke="white" strokeWidth="3"
                    strokeDasharray={`${progressPercentage} 100`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-6 md:mb-8">
          <div className="flex md:flex-wrap gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            {sections.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const isViewed = sectionsViewed.includes(section.id);

              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`relative flex-shrink-0 px-4 md:px-5 py-2.5 md:py-3 rounded-xl flex items-center gap-2 md:gap-2.5 transition-all font-medium text-sm md:text-base ripple-effect focus-ring ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg glow-blue'
                    : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  <Icon size={18} className={`md:w-5 md:h-5 ${isActive ? '' : 'icon-pulse'}`} />
                  <span className="whitespace-nowrap">{section.label}</span>
                  {isViewed && !isActive && (
                    <CheckCircle size={14} className="text-green-500" />
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div key={activeSection} className="glass-card rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
