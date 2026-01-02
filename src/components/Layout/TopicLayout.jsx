import React from 'react';
import BSTVisualizer from '../Visualizers/BSTVisualizer';
import SortingVisualizer from '../Visualizers/SortingVisualizer';
import StackVisualizer from '../Visualizers/StackVisualizer';
import QueueVisualizer from '../Visualizers/QueueVisualizer';
import LinkedListVisualizer from '../Visualizers/LinkedListVisualizer';
import GraphVisualizer from '../Visualizers/GraphVisualizer';
import HeapVisualizer from '../Visualizers/HeapVisualizer';
import HashTableVisualizer from '../Visualizers/HashTableVisualizer';
import AVLTreeVisualizer from '../Visualizers/AVLTreeVisualizer';
import DPVisualizer from '../Visualizers/DPVisualizer';

export default function TopicLayout({ topic, setCurrentTopic }) {
  const renderVisualizer = () => {
    switch (topic.id) {
      case 'bst': return <BSTVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'sorting': return <SortingVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'stack': return <StackVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'queue': return <QueueVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'linkedlist': return <LinkedListVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'graph': return <GraphVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'heap': return <HeapVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'hashtable': return <HashTableVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'avl': return <AVLTreeVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      case 'dp': return <DPVisualizer pseudoCode={topic.pseudoCode} topic={topic} setCurrentTopic={setCurrentTopic} />;
      default: return null;
    }
  };

  return (
    <>
      {renderVisualizer()}
    </>
  );
}
