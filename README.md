# DSA_Visualizer

Interactive Data Structures & Algorithms visualizer built with React + Tailwind.  
Provides visual demos, pseudo-code panels, and interactive controls for common DS & algorithms.

## Quick start
- Install: `npm install`
- Start dev server: `npm start`
- Build for production: `npm run build`
- Deploy (GitHub Pages): `npm run deploy` (uses `gh-pages` and the `homepage` field in [package.json](package.json))

## Project structure (important files)
- [package.json](package.json) — scripts & deps
- [tailwind.config.js](tailwind.config.js) — Tailwind setup
- [postcss.config.js](postcss.config.js)

src/
- [src/App.js](src/App.js) — app entry and routing to topics
- [src/index.js](src/index.js) — React entry
- [src/index.css](src/index.css) — global styles (Tailwind imports)
- [src/data/topicsData.js](src/data/topicsData.js) — topics and pseudo-code (exports `topics`)
- [src/utils/dataStructures.js](src/utils/dataStructures.js) — data structures & helpers (e.g. [`TreeNode`](src/utils/dataStructures.js), [`BST`](src/utils/dataStructures.js), [`AVLNode`](src/utils/dataStructures.js), [`AVLTree`](src/utils/dataStructures.js), [`copyTree`](src/utils/dataStructures.js), [`calculateTreePositions`](src/utils/dataStructures.js))
- Layout
  - [src/components/Layout/HomePage.jsx](src/components/Layout/HomePage.jsx)
  - [src/components/Layout/TopicLayout.jsx](src/components/Layout/TopicLayout.jsx) — topic page that renders visualizers
- Visualizers (each receives `pseudoCode` from topic)
  - [`BSTVisualizer`](src/components/Visualizers/BSTVisualizer.jsx)
  - [`AVLTreeVisualizer`](src/components/Visualizers/AVLTreeVisualizer.jsx)
  - [`SortingVisualizer`](src/components/Visualizers/SortingVisualizer.jsx)
  - [`StackVisualizer`](src/components/Visualizers/StackVisualizer.jsx)
  - [`QueueVisualizer`](src/components/Visualizers/QueueVisualizer.jsx)
  - [`LinkedListVisualizer`](src/components/Visualizers/LinkedListVisualizer.jsx)
  - [`GraphVisualizer`](src/components/Visualizers/GraphVisualizer.jsx)
  - [`HeapVisualizer`](src/components/Visualizers/HeapVisualizer.jsx)
  - [`HashTableVisualizer`](src/components/Visualizers/HashTableVisualizer.jsx)
  - [`DPVisualizer`](src/components/Visualizers/DPVisualizer.jsx)
- Shared UI
  - [src/components/Shared/PseudoCodePanel.jsx](src/components/Shared/PseudoCodePanel.jsx)
  - [src/components/Shared/ConceptPanel.jsx](src/components/Shared/ConceptPanel.jsx)

Tests
- [src/App.test.js](src/App.test.js), [src/setupTests.js](src/setupTests.js)

Public
- [public/index.html](public/index.html), manifest and static assets
- Build output in `build/` after `npm run build`

## Notes & conventions
- Visualizers are mostly self-contained React components that operate on local state and display a pseudo-code panel (see [PseudoCodePanel](src/components/Shared/PseudoCodePanel.jsx)).
- Tree layouts use `calculateTreePositions` in [dataStructures.js](src/utils/dataStructures.js).
- The app deploys to GitHub Pages using the `homepage` in [package.json](package.json) and `gh-pages`.

## Contributing
- Open an issue or PR.
- Keep components focused and import pseudo-code from [src/data/topicsData.js](src/data/topicsData.js).
- Follow existing styling and utility patterns (Tailwind).

## License
MIT — see [LICENSE](LICENSE)