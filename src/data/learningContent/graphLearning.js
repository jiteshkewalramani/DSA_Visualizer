export const graphLearningContent = {
  introduction: {
    title: "What are Graphs?",
    content: `Graphs are non-linear data structures consisting of vertices (nodes) and edges (connections between nodes). They are one of the most versatile data structures, used to represent complex relationships and networks in countless real-world applications.

**Core Components:**
• Vertices (Nodes) - fundamental units representing entities
• Edges (Links) - connections between vertices representing relationships
• Weight - optional value associated with edges (for weighted graphs)
• Direction - edges can be directed (one-way) or undirected (two-way)

**Why Graphs Matter:**
• Model complex relationships in social networks, maps, networks
• Enable efficient pathfinding and navigation algorithms
• Power recommendation systems and search engines
• Solve dependency resolution and scheduling problems
• Fundamental to AI, machine learning, and data science
• Used in transportation, telecommunications, and biology

**Graph Types:**

**Directed vs Undirected:**
• Directed Graph (Digraph): Edges have direction (A → B means only A to B)
  Example: Twitter following, web page links, one-way streets
• Undirected Graph: Edges are bidirectional (A — B means both ways)
  Example: Facebook friendship, road networks (two-way streets)

**Weighted vs Unweighted:**
• Weighted Graph: Edges have associated costs/weights
  Example: Distance between cities, cost of connections, time to travel
• Unweighted Graph: All edges are equal
  Example: Simple friendships, binary connections

**Special Graph Types:**
• Cyclic Graph: Contains at least one cycle (path back to starting vertex)
• Acyclic Graph: No cycles exist (DAG - Directed Acyclic Graph)
• Connected Graph: Path exists between every pair of vertices
• Disconnected Graph: Has isolated components
• Complete Graph: Every vertex connected to every other vertex
• Bipartite Graph: Vertices divided into two sets with edges only between sets`,

    visualExample: {
      undirected: {
        vertices: ["A", "B", "C", "D"],
        edges: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
        description: "Undirected graph - edges have no direction"
      },
      directed: {
        vertices: ["A", "B", "C", "D"],
        edges: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
        description: "Directed graph - edges have specific direction (A→B)"
      },
      weighted: {
        vertices: ["A", "B", "C"],
        edges: [
          { from: "A", to: "B", weight: 5 },
          { from: "B", to: "C", weight: 3 },
          { from: "A", to: "C", weight: 8 }
        ],
        description: "Weighted graph - edges have associated costs"
      }
    },

    terminology: `**Key Graph Terminology:**

• **Degree**: Number of edges connected to a vertex
  - In-degree: Number of incoming edges (directed graphs)
  - Out-degree: Number of outgoing edges (directed graphs)

• **Path**: Sequence of vertices connected by edges
  Example: A → B → C → D

• **Cycle**: Path that starts and ends at same vertex
  Example: A → B → C → A

• **Connected Component**: Maximal subgraph where all vertices are reachable

• **Strongly Connected**: Every vertex reachable from every other (directed)

• **Tree**: Connected acyclic undirected graph

• **Forest**: Collection of disjoint trees

• **Dense Graph**: Many edges (E ≈ V²)

• **Sparse Graph**: Few edges (E ≈ V)`
  },

  fundamentals: {
    title: "Graph Representations",
    content: `Choosing the right graph representation is crucial for performance. Each representation has trade-offs between space efficiency and operation speed.`,

    representations: [
      {
        name: "Adjacency Matrix",
        description: `**What is it?**
A 2D array of size V × V (where V is number of vertices) where matrix[i][j] represents the edge from vertex i to vertex j.

**Structure:**
• For unweighted graphs: matrix[i][j] = 1 if edge exists, 0 otherwise
• For weighted graphs: matrix[i][j] = weight if edge exists, ∞ (or 0) otherwise
• For undirected graphs: matrix is symmetric (matrix[i][j] = matrix[j][i])

**Visual Example:**
Vertices: {0, 1, 2, 3}
Edges: 0-1, 0-2, 1-2, 2-3

Adjacency Matrix:
    0  1  2  3
0 [ 0  1  1  0 ]
1 [ 1  0  1  0 ]
2 [ 1  1  0  1 ]
3 [ 0  0  1  0 ]`,

        implementation: `// Adjacency Matrix Implementation
class GraphMatrix {
    constructor(vertices) {
        this.V = vertices;
        this.matrix = Array(vertices).fill(0)
            .map(() => Array(vertices).fill(0));
    }

    addEdge(u, v, weight = 1) {
        this.matrix[u][v] = weight;
        // For undirected graph
        // this.matrix[v][u] = weight;
    }

    removeEdge(u, v) {
        this.matrix[u][v] = 0;
        // this.matrix[v][u] = 0; // undirected
    }

    hasEdge(u, v) {
        return this.matrix[u][v] !== 0;
    }

    getNeighbors(v) {
        const neighbors = [];
        for (let i = 0; i < this.V; i++) {
            if (this.matrix[v][i] !== 0) {
                neighbors.push(i);
            }
        }
        return neighbors;
    }
}`,

        spaceComplexity: "O(V²)",
        timeComplexity: {
          addEdge: "O(1)",
          removeEdge: "O(1)",
          checkEdge: "O(1)",
          getNeighbors: "O(V)",
          getAllEdges: "O(V²)"
        },

        advantages: [
          "O(1) edge lookup - very fast to check if edge exists",
          "O(1) edge addition and removal",
          "Simple and intuitive implementation",
          "Good for dense graphs (many edges)",
          "Easy to implement edge weight updates",
          "Efficient for algorithms that need frequent edge queries"
        ],

        disadvantages: [
          "O(V²) space - wasteful for sparse graphs",
          "O(V) time to get all neighbors of a vertex",
          "Iterating all edges takes O(V²) even if few edges exist",
          "Adding/removing vertices is expensive (resize matrix)",
          "Not suitable for graphs with millions of vertices"
        ],

        bestFor: "Dense graphs, frequent edge existence queries, fixed vertex count, small graphs"
      },

      {
        name: "Adjacency List",
        description: `**What is it?**
An array of lists/arrays where index represents a vertex and the list contains all neighbors of that vertex.

**Structure:**
• Array/Map of size V where each element is a list
• list[i] contains all vertices adjacent to vertex i
• For weighted graphs, store pairs (neighbor, weight)
• Most commonly used representation for sparse graphs

**Visual Example:**
Vertices: {0, 1, 2, 3}
Edges: 0-1, 0-2, 1-2, 2-3

Adjacency List:
0 → [1, 2]
1 → [0, 2]
2 → [0, 1, 3]
3 → [2]

For weighted graph:
0 → [(1, 5), (2, 3)]
1 → [(0, 5), (2, 2)]
2 → [(0, 3), (1, 2), (3, 7)]
3 → [(2, 7)]`,

        implementation: `// Adjacency List Implementation
class GraphList {
    constructor(vertices) {
        this.V = vertices;
        this.adjList = new Map();

        // Initialize empty lists for each vertex
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }

    addEdge(u, v, weight = 1) {
        // For weighted graph, store as {node, weight}
        this.adjList.get(u).push({ node: v, weight });

        // For undirected graph, add reverse edge
        // this.adjList.get(v).push({ node: u, weight });
    }

    removeEdge(u, v) {
        this.adjList.set(u,
            this.adjList.get(u).filter(edge => edge.node !== v)
        );
    }

    hasEdge(u, v) {
        return this.adjList.get(u)
            .some(edge => edge.node === v);
    }

    getNeighbors(v) {
        return this.adjList.get(v);
    }

    // Get degree of vertex
    getDegree(v) {
        return this.adjList.get(v).length;
    }
}`,

        spaceComplexity: "O(V + E)",
        timeComplexity: {
          addEdge: "O(1)",
          removeEdge: "O(degree)",
          checkEdge: "O(degree)",
          getNeighbors: "O(1)",
          getAllEdges: "O(V + E)"
        },

        advantages: [
          "O(V + E) space - efficient for sparse graphs",
          "O(1) to get all neighbors (just return the list)",
          "Easy to iterate over all neighbors",
          "Space scales with actual number of edges",
          "Easy to add/remove vertices",
          "Standard choice for most graph algorithms",
          "Cache-friendly for traversals"
        ],

        disadvantages: [
          "O(degree) to check if edge exists",
          "O(degree) to remove an edge",
          "Slightly more complex implementation than matrix",
          "Not as efficient for dense graphs",
          "Finding specific edge requires linear search"
        ],

        bestFor: "Sparse graphs, most real-world graphs, graph traversals, social networks, web graphs"
      },

      {
        name: "Edge List",
        description: `**What is it?**
A simple list/array of all edges in the graph. Each edge is represented as a pair (or triple for weighted graphs).

**Structure:**
• Array of edge objects/tuples
• Each edge: (u, v) for unweighted or (u, v, weight) for weighted
• No direct vertex-to-neighbors mapping
• Simplest representation but limited functionality

**Visual Example:**
Vertices: {0, 1, 2, 3}
Edges: 0-1, 0-2, 1-2, 2-3

Edge List:
[(0, 1), (0, 2), (1, 2), (2, 3)]

For weighted graph:
[(0, 1, 5), (0, 2, 3), (1, 2, 2), (2, 3, 7)]`,

        implementation: `// Edge List Implementation
class GraphEdgeList {
    constructor(vertices) {
        this.V = vertices;
        this.edges = [];
    }

    addEdge(u, v, weight = 1) {
        this.edges.push({ from: u, to: v, weight });

        // For undirected graph
        // this.edges.push({ from: v, to: u, weight });
    }

    removeEdge(u, v) {
        this.edges = this.edges.filter(
            edge => !(edge.from === u && edge.to === v)
        );
    }

    hasEdge(u, v) {
        return this.edges.some(
            edge => edge.from === u && edge.to === v
        );
    }

    getNeighbors(v) {
        return this.edges
            .filter(edge => edge.from === v)
            .map(edge => edge.to);
    }

    getAllEdges() {
        return this.edges;
    }

    // Useful for sorting edges (Kruskal's algorithm)
    sortEdgesByWeight() {
        this.edges.sort((a, b) => a.weight - b.weight);
    }
}`,

        spaceComplexity: "O(E)",
        timeComplexity: {
          addEdge: "O(1)",
          removeEdge: "O(E)",
          checkEdge: "O(E)",
          getNeighbors: "O(E)",
          getAllEdges: "O(1)"
        },

        advantages: [
          "O(E) space - most compact representation",
          "Simple and intuitive",
          "O(1) to add edge (just append)",
          "Easy to iterate through all edges",
          "Perfect for edge-centric algorithms (Kruskal's MST)",
          "Easy to sort edges by weight"
        ],

        disadvantages: [
          "O(E) to find neighbors of a vertex",
          "O(E) to check if specific edge exists",
          "O(E) to remove an edge",
          "Inefficient for traversal algorithms",
          "Not suitable for most graph algorithms"
        ],

        bestFor: "Kruskal's algorithm, edge-centric operations, when you primarily iterate through edges"
      }
    ],

    comparisonTable: {
      title: "Representation Comparison",
      data: [
        {
          operation: "Space",
          matrix: "O(V²)",
          list: "O(V + E)",
          edgeList: "O(E)"
        },
        {
          operation: "Add Edge",
          matrix: "O(1)",
          list: "O(1)",
          edgeList: "O(1)"
        },
        {
          operation: "Remove Edge",
          matrix: "O(1)",
          list: "O(degree)",
          edgeList: "O(E)"
        },
        {
          operation: "Check Edge",
          matrix: "O(1)",
          list: "O(degree)",
          edgeList: "O(E)"
        },
        {
          operation: "Get Neighbors",
          matrix: "O(V)",
          list: "O(1)",
          edgeList: "O(E)"
        },
        {
          operation: "Iterate All Edges",
          matrix: "O(V²)",
          list: "O(V + E)",
          edgeList: "O(E)"
        }
      ]
    },

    selectionGuide: `**How to Choose:**

**Use Adjacency Matrix when:**
• Dense graph (E ≈ V²)
• Need O(1) edge lookup
• Graph is small (few hundred vertices)
• Frequent edge existence queries
• Fixed number of vertices

**Use Adjacency List when:**
• Sparse graph (E << V²)
• Need to iterate neighbors frequently
• Graph traversal (BFS, DFS)
• Most real-world graphs
• Dynamic graph (vertices added/removed)

**Use Edge List when:**
• Implementing Kruskal's algorithm
• Need to sort edges by weight
• Edge-centric operations
• Simple edge iteration
• Minimum spanning tree algorithms`
  },

  algorithms: {
    title: "Graph Traversal Algorithms",
    sections: [
      {
        name: "Breadth-First Search (BFS)",
        description: `**What is BFS?**
Breadth-First Search explores a graph level by level, visiting all neighbors of a vertex before moving to the next level. It uses a queue (FIFO) data structure to maintain the order of exploration.

**How BFS Works:**
1. Start from a source vertex and mark it visited
2. Add source to queue
3. While queue is not empty:
   - Dequeue a vertex
   - Visit all unvisited neighbors
   - Mark neighbors as visited and enqueue them
4. Process continues level by level (all nodes at distance k before k+1)

**Key Characteristics:**
• Explores nodes in order of distance from source
• Uses Queue data structure (FIFO - First In First Out)
• Guarantees shortest path in unweighted graphs
• Level-order exploration
• Visits all vertices at distance k before distance k+1

**Visual Process:**
Starting from vertex 0 in graph:
    0
   /|\\
  1 2 3
  |   |
  4   5

Level 0: Visit 0 (start) → Queue: []
Level 1: Visit 1, 2, 3 → Queue: []
Level 2: Visit 4, 5 → Queue: []

Order: 0 → 1 → 2 → 3 → 4 → 5

**Step-by-Step Example:**
Graph: 0-1, 0-2, 1-3, 1-4, 2-5
Starting from vertex 0:

Step 1: Visit 0, Queue = [0]
Step 2: Dequeue 0, enqueue neighbors 1, 2
        Visited: {0}, Queue = [1, 2]
Step 3: Dequeue 1, enqueue neighbors 3, 4
        Visited: {0, 1}, Queue = [2, 3, 4]
Step 4: Dequeue 2, enqueue neighbor 5
        Visited: {0, 1, 2}, Queue = [3, 4, 5]
Step 5: Dequeue 3 (no new neighbors)
        Visited: {0, 1, 2, 3}, Queue = [4, 5]
Step 6: Dequeue 4 (no new neighbors)
        Visited: {0, 1, 2, 3, 4}, Queue = [5]
Step 7: Dequeue 5 (no new neighbors)
        Visited: {0, 1, 2, 3, 4, 5}, Queue = []

Final Order: 0 → 1 → 2 → 3 → 4 → 5`,

        pseudocode: `function BFS(graph, start):
    // Initialize
    visited = new Set()
    queue = new Queue()
    result = []

    // Start with source vertex
    visited.add(start)
    queue.enqueue(start)

    // Process until queue is empty
    while queue is not empty:
        // Get next vertex
        vertex = queue.dequeue()
        result.push(vertex)

        // Visit all unvisited neighbors
        for each neighbor of vertex:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)

    return result

// With distance tracking
function BFS_with_distance(graph, start):
    visited = new Set()
    queue = new Queue()
    distance = new Map()

    visited.add(start)
    queue.enqueue(start)
    distance.set(start, 0)

    while queue is not empty:
        vertex = queue.dequeue()

        for each neighbor of vertex:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
                distance.set(neighbor, distance.get(vertex) + 1)

    return distance`,

        implementation: `// JavaScript Implementation
class Graph {
    constructor(vertices) {
        this.V = vertices;
        this.adjList = new Map();
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }

    addEdge(u, v) {
        this.adjList.get(u).push(v);
        this.adjList.get(v).push(u); // for undirected
    }

    BFS(start) {
        const visited = new Set();
        const queue = [];
        const result = [];

        // Start from source
        visited.add(start);
        queue.push(start);

        while (queue.length > 0) {
            // Dequeue vertex
            const vertex = queue.shift();
            result.push(vertex);

            // Visit all neighbors
            for (const neighbor of this.adjList.get(vertex)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    // BFS to find shortest path
    shortestPath(start, end) {
        const visited = new Set();
        const queue = [[start]]; // Store paths

        if (start === end) return [start];

        visited.add(start);

        while (queue.length > 0) {
            const path = queue.shift();
            const vertex = path[path.length - 1];

            for (const neighbor of this.adjList.get(vertex)) {
                if (neighbor === end) {
                    return [...path, neighbor];
                }

                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([...path, neighbor]);
                }
            }
        }

        return null; // No path found
    }
}`,

        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",

        complexityExplanation: `**Time Complexity: O(V + E)**
• Visit each vertex once: O(V)
• Explore each edge once (undirected) or twice (directed): O(E)
• Queue operations (enqueue/dequeue): O(1) per operation
• Total: O(V + E)

**Space Complexity: O(V)**
• Visited set: O(V) to store all vertices
• Queue: O(V) in worst case (all vertices in queue)
• Adjacency List: O(V + E) but not counted as auxiliary space
• Total auxiliary space: O(V)`,

        advantages: [
          "Finds shortest path in unweighted graphs",
          "Complete - finds solution if one exists",
          "Level-order traversal useful for many problems",
          "Good for finding closest/nearest nodes",
          "Optimal for problems requiring minimum steps/hops",
          "Easy to find distance from source to all vertices"
        ],

        disadvantages: [
          "Uses more memory than DFS (queue can be large)",
          "Not suitable for weighted graphs (shortest path)",
          "May explore unnecessary nodes in some scenarios",
          "Cannot handle infinite graphs effectively"
        ],

        useCases: [
          "Shortest path in unweighted graphs",
          "Finding connected components",
          "Level-order traversal",
          "Social network (find connections within k hops)",
          "Web crawler (crawl nearby pages first)",
          "GPS navigation (find shortest route)",
          "Peer-to-peer networks",
          "Broadcasting in networks",
          "Finding all nodes at distance k",
          "Detecting cycles in undirected graphs"
        ]
      },

      {
        name: "Depth-First Search (DFS)",
        description: `**What is DFS?**
Depth-First Search explores a graph by going as deep as possible along each branch before backtracking. It uses a stack (LIFO) data structure, either explicitly or through recursion.

**How DFS Works:**
1. Start from a source vertex and mark it visited
2. Explore one unvisited neighbor
3. Recursively visit that neighbor's unvisited neighbors
4. When no unvisited neighbors exist, backtrack
5. Continue until all reachable vertices are visited

**Key Characteristics:**
• Explores as far as possible before backtracking
• Uses Stack data structure (LIFO - Last In First Out)
• Can be implemented recursively (implicit stack) or iteratively
• Goes deep into graph before exploring siblings
• Natural for recursive problems

**Visual Process:**
Starting from vertex 0 in graph:
    0
   /|\\
  1 2 3
  |   |
  4   5

Recursive DFS path:
0 → 1 → 4 (backtrack to 1) → (backtrack to 0) → 2 (backtrack to 0) → 3 → 5

Order: 0 → 1 → 4 → 2 → 3 → 5

**Step-by-Step Example:**
Graph: 0-1, 0-2, 1-3, 1-4, 2-5
Starting from vertex 0:

Step 1: Visit 0, mark visited
Step 2: Go to neighbor 1, mark visited
Step 3: Go to neighbor 3 of 1, mark visited
Step 4: No unvisited neighbors of 3, backtrack to 1
Step 5: Go to neighbor 4 of 1, mark visited
Step 6: No unvisited neighbors of 4, backtrack to 1
Step 7: No more unvisited neighbors of 1, backtrack to 0
Step 8: Go to neighbor 2 of 0, mark visited
Step 9: Go to neighbor 5 of 2, mark visited
Step 10: Backtrack to 2, then to 0
Step 11: All vertices visited

Final Order: 0 → 1 → 3 → 4 → 2 → 5

**Recursion Tree:**
                  0
                 / \\
                1   2
               / \\   \\
              3   4   5`,

        pseudocode: `// Recursive DFS (most common)
function DFS_recursive(graph, vertex, visited, result):
    // Mark current vertex as visited
    visited.add(vertex)
    result.push(vertex)

    // Recursively visit all unvisited neighbors
    for each neighbor of vertex:
        if neighbor not in visited:
            DFS_recursive(graph, neighbor, visited, result)

// Wrapper function
function DFS(graph, start):
    visited = new Set()
    result = []
    DFS_recursive(graph, start, visited, result)
    return result


// Iterative DFS (using explicit stack)
function DFS_iterative(graph, start):
    visited = new Set()
    stack = new Stack()
    result = []

    stack.push(start)

    while stack is not empty:
        vertex = stack.pop()

        if vertex not in visited:
            visited.add(vertex)
            result.push(vertex)

            // Push all unvisited neighbors
            for each neighbor of vertex (in reverse order):
                if neighbor not in visited:
                    stack.push(neighbor)

    return result


// DFS with pre-order and post-order processing
function DFS_with_order(graph, vertex, visited, pre, post, time):
    visited.add(vertex)
    time++
    pre[vertex] = time  // Pre-order time

    for each neighbor of vertex:
        if neighbor not in visited:
            DFS_with_order(graph, neighbor, visited, pre, post, time)

    time++
    post[vertex] = time  // Post-order time`,

        implementation: `// JavaScript Implementation
class Graph {
    constructor(vertices) {
        this.V = vertices;
        this.adjList = new Map();
        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }

    addEdge(u, v) {
        this.adjList.get(u).push(v);
        this.adjList.get(v).push(u); // for undirected
    }

    // Recursive DFS
    DFS(start) {
        const visited = new Set();
        const result = [];

        this.DFSHelper(start, visited, result);

        return result;
    }

    DFSHelper(vertex, visited, result) {
        // Mark vertex as visited
        visited.add(vertex);
        result.push(vertex);

        // Recursively visit neighbors
        for (const neighbor of this.adjList.get(vertex)) {
            if (!visited.has(neighbor)) {
                this.DFSHelper(neighbor, visited, result);
            }
        }
    }

    // Iterative DFS
    DFS_iterative(start) {
        const visited = new Set();
        const stack = [start];
        const result = [];

        while (stack.length > 0) {
            const vertex = stack.pop();

            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);

                // Add neighbors to stack (reverse order for same result as recursive)
                const neighbors = this.adjList.get(vertex);
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }

        return result;
    }

    // DFS for detecting cycles
    hasCycle() {
        const visited = new Set();
        const recStack = new Set(); // Recursion stack

        for (let vertex of this.adjList.keys()) {
            if (!visited.has(vertex)) {
                if (this.hasCycleHelper(vertex, visited, recStack)) {
                    return true;
                }
            }
        }
        return false;
    }

    hasCycleHelper(vertex, visited, recStack) {
        visited.add(vertex);
        recStack.add(vertex);

        for (const neighbor of this.adjList.get(vertex)) {
            if (!visited.has(neighbor)) {
                if (this.hasCycleHelper(neighbor, visited, recStack)) {
                    return true;
                }
            } else if (recStack.has(neighbor)) {
                return true; // Back edge found - cycle exists
            }
        }

        recStack.delete(vertex);
        return false;
    }

    // Topological Sort (using DFS)
    topologicalSort() {
        const visited = new Set();
        const stack = [];

        for (let vertex of this.adjList.keys()) {
            if (!visited.has(vertex)) {
                this.topologicalSortHelper(vertex, visited, stack);
            }
        }

        return stack.reverse();
    }

    topologicalSortHelper(vertex, visited, stack) {
        visited.add(vertex);

        for (const neighbor of this.adjList.get(vertex)) {
            if (!visited.has(neighbor)) {
                this.topologicalSortHelper(neighbor, visited, stack);
            }
        }

        stack.push(vertex); // Add after visiting all neighbors
    }
}`,

        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",

        complexityExplanation: `**Time Complexity: O(V + E)**
• Visit each vertex once: O(V)
• Explore each edge once: O(E)
• Recursive calls: O(V) total
• Total: O(V + E)

**Space Complexity: O(V)**
• Visited set: O(V)
• Recursion stack: O(V) in worst case (linear graph)
• Iterative stack: O(V) in worst case
• Total auxiliary space: O(V)

**Note:** For a graph with height h:
• Recursion depth: O(h)
• Best case (balanced): O(log V)
• Worst case (linear): O(V)`,

        advantages: [
          "Uses less memory than BFS (stack depth vs queue width)",
          "Natural for recursive problems",
          "Better for detecting cycles",
          "Essential for topological sorting",
          "Useful for pathfinding in mazes/puzzles",
          "Can easily implement backtracking",
          "Works well for decision trees"
        ],

        disadvantages: [
          "May not find shortest path",
          "Can get stuck in infinite depth (with cycles)",
          "Stack overflow risk with deep recursion",
          "May explore unnecessary paths",
          "Not optimal for finding nearest neighbors"
        ],

        useCases: [
          "Detecting cycles in graphs",
          "Topological sorting (DAGs)",
          "Finding strongly connected components",
          "Solving mazes and puzzles",
          "Finding articulation points and bridges",
          "Pathfinding in game AI",
          "Dependency resolution",
          "Generating connected components",
          "Finding paths in decision trees",
          "Backtracking problems"
        ]
      }
    ]
  },

  traversalComparison: {
    title: "BFS vs DFS: Comparison",
    content: `Understanding when to use BFS versus DFS is crucial for solving graph problems efficiently.`,

    comparisonTable: [
      {
        aspect: "Data Structure",
        bfs: "Queue (FIFO)",
        dfs: "Stack (LIFO) / Recursion"
      },
      {
        aspect: "Exploration Strategy",
        bfs: "Level by level (breadth-wise)",
        dfs: "Deep first (depth-wise)"
      },
      {
        aspect: "Memory Usage",
        bfs: "O(w) where w is max width",
        dfs: "O(h) where h is max height"
      },
      {
        aspect: "Shortest Path",
        bfs: "Guarantees shortest path (unweighted)",
        dfs: "Does not guarantee shortest path"
      },
      {
        aspect: "Completeness",
        bfs: "Complete - always finds solution",
        dfs: "May get stuck in infinite branch"
      },
      {
        aspect: "Optimality",
        bfs: "Optimal for unweighted graphs",
        dfs: "Not optimal"
      },
      {
        aspect: "Implementation",
        bfs: "Iterative (usually)",
        dfs: "Recursive (usually) or Iterative"
      },
      {
        aspect: "Use Case Focus",
        bfs: "Finding shortest path, nearest nodes",
        dfs: "Cycle detection, topological sort"
      }
    ],

    whenToUseBFS: {
      title: "Use BFS When:",
      scenarios: [
        {
          scenario: "Finding shortest path",
          reason: "BFS guarantees minimum number of edges in unweighted graphs",
          example: "Finding shortest route between two cities with equal road costs"
        },
        {
          scenario: "Level-order traversal",
          reason: "BFS naturally explores level by level",
          example: "Finding all friends at exactly 2 hops away in social network"
        },
        {
          scenario: "Finding closest/nearest nodes",
          reason: "BFS finds nodes in order of distance from source",
          example: "Finding nearest hospital, store, or gas station"
        },
        {
          scenario: "Graph is wide but not deep",
          reason: "BFS uses less memory when graph is wide",
          example: "Tree with many children but shallow depth"
        },
        {
          scenario: "Need to find all paths at distance k",
          reason: "BFS naturally groups nodes by distance",
          example: "Finding all nodes reachable in k steps"
        },
        {
          scenario: "Broadcasting in networks",
          reason: "BFS models how information spreads level by level",
          example: "Message propagation in P2P networks"
        }
      ]
    },

    whenToUseDFS: {
      title: "Use DFS When:",
      scenarios: [
        {
          scenario: "Detecting cycles",
          reason: "DFS with recursion stack easily detects back edges",
          example: "Checking if course prerequisites form a cycle"
        },
        {
          scenario: "Topological sorting",
          reason: "DFS post-order gives topological order for DAGs",
          example: "Build order for tasks with dependencies"
        },
        {
          scenario: "Finding connected components",
          reason: "DFS explores entire component before moving to next",
          example: "Finding islands, clusters, or groups"
        },
        {
          scenario: "Pathfinding in mazes",
          reason: "DFS explores deep paths, good for exhaustive search",
          example: "Solving mazes, puzzles, or decision trees"
        },
        {
          scenario: "Graph is deep but not wide",
          reason: "DFS uses less memory when graph is deep",
          example: "Decision trees, game trees"
        },
        {
          scenario: "Need to explore all paths",
          reason: "DFS with backtracking explores all possibilities",
          example: "Finding all possible solutions to a puzzle"
        },
        {
          scenario: "Memory is limited",
          reason: "DFS generally uses less memory than BFS",
          example: "Embedded systems with memory constraints"
        }
      ]
    },

    visualComparison: `**Visual Example:**

Graph:
       1
      /|\\
     2 3 4
    /|   |\\
   5 6   7 8

**BFS from 1:**
Level 0: [1]
Level 1: [2, 3, 4]
Level 2: [5, 6, 7, 8]
Order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
(Explores all neighbors before going deeper)

**DFS from 1:**
Path: 1 → 2 → 5 (backtrack) → 6 (backtrack to 2, then 1)
      → 3 (backtrack to 1) → 4 → 7 (backtrack) → 8
Order: 1 → 2 → 5 → 6 → 3 → 4 → 7 → 8
(Goes as deep as possible before exploring siblings)`,

    decisionTree: `**Decision Tree for Choosing:**

Need shortest path in unweighted graph?
  YES → Use BFS
  NO ↓

Need to detect cycles or topological sort?
  YES → Use DFS
  NO ↓

Graph is very wide (high branching factor)?
  YES → Use DFS (less memory)
  NO ↓

Graph is very deep?
  YES → Use BFS (less memory)
  NO ↓

Need level-order or distance-based processing?
  YES → Use BFS
  NO ↓

Need to explore all paths or backtracking?
  YES → Use DFS
  NO ↓

Default: Use BFS (more commonly applicable)`
  },

  complexity: {
    title: "Complexity Analysis",

    representationComplexity: {
      title: "Graph Representation Complexity",
      table: [
        {
          representation: "Adjacency Matrix",
          space: "O(V²)",
          addVertex: "O(V²)",
          addEdge: "O(1)",
          removeVertex: "O(V²)",
          removeEdge: "O(1)",
          checkEdge: "O(1)",
          getNeighbors: "O(V)",
          bestFor: "Dense graphs, frequent edge queries"
        },
        {
          representation: "Adjacency List",
          space: "O(V + E)",
          addVertex: "O(1)",
          addEdge: "O(1)",
          removeVertex: "O(V + E)",
          removeEdge: "O(E)",
          checkEdge: "O(degree)",
          getNeighbors: "O(degree)",
          bestFor: "Sparse graphs, traversals"
        },
        {
          representation: "Edge List",
          space: "O(E)",
          addVertex: "O(1)",
          addEdge: "O(1)",
          removeVertex: "O(E)",
          removeEdge: "O(E)",
          checkEdge: "O(E)",
          getNeighbors: "O(E)",
          bestFor: "Edge-centric algorithms"
        }
      ]
    },

    algorithmComplexity: {
      title: "Graph Algorithm Complexity",
      table: [
        {
          algorithm: "BFS",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          notes: "Queue + visited set"
        },
        {
          algorithm: "DFS",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          notes: "Recursion stack or explicit stack"
        },
        {
          algorithm: "Dijkstra (Binary Heap)",
          timeComplexity: "O((V + E) log V)",
          spaceComplexity: "O(V)",
          notes: "Shortest path in weighted graphs"
        },
        {
          algorithm: "Dijkstra (Fibonacci Heap)",
          timeComplexity: "O(E + V log V)",
          spaceComplexity: "O(V)",
          notes: "Theoretical best"
        },
        {
          algorithm: "Bellman-Ford",
          timeComplexity: "O(V × E)",
          spaceComplexity: "O(V)",
          notes: "Handles negative weights"
        },
        {
          algorithm: "Floyd-Warshall",
          timeComplexity: "O(V³)",
          spaceComplexity: "O(V²)",
          notes: "All-pairs shortest path"
        },
        {
          algorithm: "Prim's MST",
          timeComplexity: "O(E log V)",
          spaceComplexity: "O(V)",
          notes: "Minimum spanning tree"
        },
        {
          algorithm: "Kruskal's MST",
          timeComplexity: "O(E log E)",
          spaceComplexity: "O(V)",
          notes: "Sort edges + Union-Find"
        },
        {
          algorithm: "Topological Sort",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          notes: "DFS-based or Kahn's algorithm"
        },
        {
          algorithm: "Strongly Connected Components",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          notes: "Kosaraju's or Tarjan's"
        }
      ]
    },

    spaceAnalysis: `**Space Complexity Analysis:**

**Adjacency List - O(V + E):**
• Array of V lists: O(V)
• Total edges stored: O(E) for directed, O(2E) for undirected
• Most space-efficient for sparse graphs

**Adjacency Matrix - O(V²):**
• V × V matrix always uses V² space
• Wasteful when E << V²
• Only efficient when E ≈ V² (dense graphs)

**Algorithm Space:**
• Visited set: O(V) - track visited vertices
• Queue (BFS): O(V) worst case
• Stack (DFS): O(h) where h is height, worst case O(V)
• Distance array: O(V)
• Parent/path tracking: O(V)`,

    timeAnalysis: `**Time Complexity Analysis:**

**Traversal (BFS/DFS) - O(V + E):**
• Visit each vertex once: O(V)
• Examine each edge once (directed) or twice (undirected): O(E)
• Total: O(V + E)
• With adjacency list: O(V + E)
• With adjacency matrix: O(V²) - must check all cells

**Why V + E?**
• Sparse graph (E ≈ V): O(V + V) = O(V)
• Dense graph (E ≈ V²): O(V + V²) = O(V²)
• Best representation depends on graph density

**Common Pitfalls:**
• Using adjacency matrix for sparse graph: O(V²) instead of O(V + E)
• Not tracking visited vertices: infinite loops
• Wrong data structure: stack vs queue changes algorithm`,

    graphDensity: `**Graph Density Analysis:**

**Sparse Graph:** E = O(V) or E << V²
• Most real-world graphs are sparse
• Examples: Social networks, web graphs, road networks
• Use: Adjacency List
• Complexity: O(V + E) ≈ O(V)

**Dense Graph:** E = O(V²) or E ≈ V²
• Rare in practice
• Examples: Complete graphs, small fully-connected networks
• Use: Adjacency Matrix (sometimes)
• Complexity: O(V + E) ≈ O(V²)

**Threshold:**
• E > V²/2 → Consider adjacency matrix
• E < V²/2 → Use adjacency list
• In practice: Almost always use adjacency list`
  },

  applications: {
    title: "Real-World Applications",
    examples: [
      {
        application: "Social Networks",
        description: `**Use Case:** Friend connections, followers, friend recommendations

**Graph Structure:**
• Vertices: Users/accounts
• Edges: Friendships, follows, connections
• Type: Directed (Twitter) or Undirected (Facebook)

**Applications:**
• Find mutual friends (intersection of neighbor lists)
• Suggest friends (BFS to find friends of friends)
• Calculate degrees of separation
• Find influencers (high in-degree vertices)
• Detect communities (connected components)
• Recommend connections (graph analysis)

**Example:** Facebook's "People You May Know"
• Uses BFS to find friends at distance 2-3
• Considers mutual connections
• Analyzes common interests (edge weights)`,

        algorithms: "BFS for friend suggestions, DFS for group detection, PageRank for influence"
      },

      {
        application: "Maps and Navigation",
        description: `**Use Case:** GPS navigation, route planning, traffic optimization

**Graph Structure:**
• Vertices: Intersections, locations, cities
• Edges: Roads, highways, paths
• Weights: Distance, time, traffic, fuel cost
• Type: Directed (one-way streets) or Undirected

**Applications:**
• Find shortest route between locations
• Calculate fastest path considering traffic
• Alternative route suggestions
• Estimate arrival time
• Optimize delivery routes
• Public transit planning

**Example:** Google Maps
• Uses Dijkstra's or A* algorithm
• Considers real-time traffic (dynamic weights)
• Multi-criteria optimization (time, distance, tolls)`,

        algorithms: "Dijkstra for shortest path, A* for heuristic search, BFS for nearby places"
      },

      {
        application: "Web Crawling and Search",
        description: `**Use Case:** Search engines, web indexing, page ranking

**Graph Structure:**
• Vertices: Web pages, documents
• Edges: Hyperlinks between pages
• Type: Directed graph
• Scale: Billions of vertices

**Applications:**
• Crawl and index web pages
• Rank page importance (PageRank)
• Find related content
• Detect broken links
• Identify web communities
• Discover new content

**Example:** Google Search
• BFS/DFS to crawl pages
• PageRank algorithm for ranking
• Link analysis for relevance`,

        algorithms: "BFS for crawling, PageRank for ranking, DFS for site structure"
      },

      {
        application: "Dependency Resolution",
        description: `**Use Case:** Package managers, build systems, task scheduling

**Graph Structure:**
• Vertices: Packages, modules, tasks
• Edges: Dependencies (A requires B)
• Type: Directed Acyclic Graph (DAG)

**Applications:**
• Determine build order
• Resolve package dependencies
• Detect circular dependencies (cycle detection)
• Install packages in correct order
• Schedule tasks with prerequisites
• Course prerequisite checking

**Example:** npm, pip, Maven
• Topological sort for install order
• Cycle detection for circular dependencies
• DFS for dependency tree`,

        algorithms: "Topological sort for ordering, DFS for cycle detection"
      },

      {
        application: "Network Routing",
        description: `**Use Case:** Internet routing, data packet transmission

**Graph Structure:**
• Vertices: Routers, switches, nodes
• Edges: Network connections, cables
• Weights: Bandwidth, latency, cost
• Type: Directed or Undirected

**Applications:**
• Find optimal packet routes
• Load balancing across paths
• Fault tolerance (alternative paths)
• Network topology optimization
• Minimize latency
• Maximize throughput

**Example:** Internet Protocol (IP) routing
• Dijkstra's algorithm for shortest path
• BGP (Border Gateway Protocol)
• Dynamic routing based on network conditions`,

        algorithms: "Dijkstra for routing, BFS for broadcast, Minimum spanning tree for network design"
      },

      {
        application: "Recommendation Systems",
        description: `**Use Case:** Product recommendations, content suggestions

**Graph Structure:**
• Vertices: Users, products, content items
• Edges: User-item interactions, similarities
• Type: Bipartite or general graph
• Weights: Ratings, preferences, similarity scores

**Applications:**
• Recommend products based on similar users
• Suggest content based on viewing history
• Collaborative filtering
• Find related items
• Discover communities of interest
• Personalized feeds

**Example:** Netflix, Amazon recommendations
• Graph-based collaborative filtering
• Random walk algorithms
• Community detection for user clustering`,

        algorithms: "BFS for similar items, PageRank variants, Graph neural networks"
      },

      {
        application: "Circuit Design and Networks",
        description: `**Use Case:** Electronic circuits, network design, VLSI

**Graph Structure:**
• Vertices: Components, gates, nodes
• Edges: Connections, wires
• Type: Directed for signal flow

**Applications:**
• Optimize circuit layout
• Minimize wire length
• Detect signal paths
• Timing analysis
• Power optimization
• Fault detection

**Example:** CPU design
• Topological sort for signal timing
• Minimum spanning tree for wiring
• DFS for path analysis`,

        algorithms: "Topological sort, MST for layout, DFS for connectivity"
      },

      {
        application: "Bioinformatics",
        description: `**Use Case:** Protein interaction, gene networks, phylogenetic trees

**Graph Structure:**
• Vertices: Proteins, genes, species
• Edges: Interactions, relationships
• Weights: Interaction strength, similarity

**Applications:**
• Protein-protein interaction networks
• Gene regulatory networks
• Drug discovery
• Evolutionary relationships
• Disease pathway analysis
• Sequence alignment

**Example:** Protein interaction networks
• Find functional modules (communities)
• Identify key proteins (centrality)
• Predict protein function`,

        algorithms: "DFS for pathways, Community detection, Shortest path for relationships"
      }
    ]
  },

  interviewProblems: {
    title: "Common Interview Problems",
    problems: [
      {
        title: "Number of Islands",
        difficulty: "Medium",
        description: `Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.`,

        example: `Input:
[
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
]
Output: 3

Explanation:
Island 1: (0,0), (0,1), (1,0), (1,1)
Island 2: (2,2)
Island 3: (3,3), (3,4)`,

        approach: `**Approach 1: DFS**
1. Iterate through each cell in grid
2. When '1' is found, increment island count
3. DFS to mark all connected '1's as visited
4. Continue until all cells processed

**Approach 2: BFS**
1. Same idea but use queue for level-order traversal
2. Mark connected cells as visited using BFS`,

        solution: `// DFS Solution
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        // Base cases
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (grid[r][c] === '0') return;

        // Mark as visited
        grid[r][c] = '0';

        // Explore all 4 directions
        dfs(r + 1, c); // down
        dfs(r - 1, c); // up
        dfs(r, c + 1); // right
        dfs(r, c - 1); // left
    }

    // Iterate through grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c); // Mark entire island
            }
        }
    }

    return count;
}

// BFS Solution
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function bfs(r, c) {
        const queue = [[r, c]];
        grid[r][c] = '0';

        const directions = [[1,0], [-1,0], [0,1], [0,-1]];

        while (queue.length > 0) {
            const [row, col] = queue.shift();

            for (const [dr, dc] of directions) {
                const newR = row + dr;
                const newC = col + dc;

                if (newR >= 0 && newR < rows &&
                    newC >= 0 && newC < cols &&
                    grid[newR][newC] === '1') {
                    grid[newR][newC] = '0';
                    queue.push([newR, newC]);
                }
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                bfs(r, c);
            }
        }
    }

    return count;
}`,

        complexity: `Time: O(M × N) where M, N are grid dimensions
Space: O(M × N) worst case for recursion/queue`,

        hints: [
          "Think of each cell as a graph vertex",
          "Connected cells form a component",
          "Each DFS/BFS call explores one island",
          "Mark visited cells to avoid recounting"
        ]
      },

      {
        title: "Course Schedule (Detect Cycle in Directed Graph)",
        difficulty: "Medium",
        description: `Given numCourses and a list of prerequisite pairs, determine if you can finish all courses. For example, [0,1] means you must take course 1 before course 0.`,

        example: `Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: Take course 0, then course 1

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: Circular dependency - impossible`,

        approach: `**Key Insight:** This is cycle detection in directed graph

**Approach 1: DFS with Recursion Stack**
1. Build adjacency list from prerequisites
2. Use DFS with recursion stack to detect cycles
3. If back edge found (vertex in recursion stack), cycle exists
4. Track visited vertices to avoid reprocessing

**Approach 2: BFS (Kahn's Algorithm)**
1. Calculate in-degree for each vertex
2. Start with vertices having in-degree 0
3. Process vertices and reduce in-degree of neighbors
4. If all vertices processed, no cycle exists`,

        solution: `// DFS Solution with Recursion Stack
function canFinish(numCourses, prerequisites) {
    // Build adjacency list
    const graph = new Array(numCourses).fill(0)
        .map(() => []);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    const visited = new Set();
    const recStack = new Set(); // Recursion stack

    function hasCycle(course) {
        // If in recursion stack, cycle detected
        if (recStack.has(course)) return true;
        // Already processed this path
        if (visited.has(course)) return false;

        // Mark as visiting
        visited.add(course);
        recStack.add(course);

        // Check all neighbors
        for (const neighbor of graph[course]) {
            if (hasCycle(neighbor)) return true;
        }

        // Remove from recursion stack
        recStack.delete(course);
        return false;
    }

    // Check each course
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }

    return true;
}

// BFS Solution (Kahn's Algorithm)
function canFinishBFS(numCourses, prerequisites) {
    const graph = new Array(numCourses).fill(0).map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    // Build graph and calculate in-degrees
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    // Queue with courses having no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let processed = 0;

    while (queue.length > 0) {
        const course = queue.shift();
        processed++;

        // Reduce in-degree of neighbors
        for (const neighbor of graph[course]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If all courses processed, no cycle
    return processed === numCourses;
}`,

        complexity: `Time: O(V + E) where V = courses, E = prerequisites
Space: O(V + E) for adjacency list and visited sets`,

        hints: [
          "Model as directed graph: course → prerequisite",
          "Cycle means impossible to complete",
          "Use recursion stack, not just visited set",
          "Alternative: Topological sort (Kahn's algorithm)"
        ]
      },

      {
        title: "Shortest Path in Unweighted Graph",
        difficulty: "Easy/Medium",
        description: `Find the shortest path between two nodes in an unweighted graph. Return the path length or the actual path.`,

        example: `Graph: 0-1, 1-2, 2-3, 0-3, 1-4
Find shortest path from 0 to 4:

Path: 0 → 1 → 4
Length: 2`,

        approach: `**Key Insight:** Use BFS for shortest path in unweighted graphs

**Approach:**
1. Start BFS from source vertex
2. Track distance from source
3. Track parent for path reconstruction
4. Stop when target is reached
5. Reconstruct path using parent pointers`,

        solution: `function shortestPath(graph, start, end) {
    if (start === end) return [start];

    const visited = new Set([start]);
    const queue = [[start]];

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        for (const neighbor of graph[node]) {
            if (neighbor === end) {
                return [...path, neighbor];
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([...path, neighbor]);
            }
        }
    }

    return null; // No path found
}

// Alternative: Return only distance
function shortestDistance(graph, start, end) {
    if (start === end) return 0;

    const visited = new Set([start]);
    const queue = [[start, 0]]; // [node, distance]

    while (queue.length > 0) {
        const [node, dist] = queue.shift();

        for (const neighbor of graph[node]) {
            if (neighbor === end) {
                return dist + 1;
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }

    return -1; // No path
}

// With parent tracking for path reconstruction
function shortestPathWithParent(graph, start, end) {
    if (start === end) return [start];

    const visited = new Set([start]);
    const parent = new Map();
    const queue = [start];

    parent.set(start, null);

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === end) {
            // Reconstruct path
            const path = [];
            let current = end;
            while (current !== null) {
                path.unshift(current);
                current = parent.get(current);
            }
            return path;
        }

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent.set(neighbor, node);
                queue.push(neighbor);
            }
        }
    }

    return null;
}`,

        complexity: `Time: O(V + E)
Space: O(V) for visited set and queue`,

        hints: [
          "BFS guarantees shortest path in unweighted graphs",
          "Track parent for path reconstruction",
          "Stop early when target is reached",
          "Use distance array if needed for all vertices"
        ]
      },

      {
        title: "Connected Components",
        difficulty: "Medium",
        description: `Find the number of connected components in an undirected graph. A connected component is a maximal set of vertices where each pair is connected by a path.`,

        example: `Graph vertices: {0, 1, 2, 3, 4, 5}
Edges: 0-1, 1-2, 3-4

Components:
1. {0, 1, 2}
2. {3, 4}
3. {5}

Output: 3`,

        approach: `**Approach 1: DFS**
1. Initialize component count to 0
2. For each unvisited vertex:
   - Increment component count
   - DFS to mark all connected vertices
3. Return component count

**Approach 2: BFS**
Same idea but use BFS for traversal

**Approach 3: Union-Find**
Use disjoint set union for dynamic connectivity`,

        solution: `// DFS Solution
function countComponents(n, edges) {
    // Build adjacency list
    const graph = new Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Set();
    let components = 0;

    function dfs(node) {
        visited.add(node);
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            components++;
            dfs(i);
        }
    }

    return components;
}

// BFS Solution
function countComponentsBFS(n, edges) {
    const graph = new Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Set();
    let components = 0;

    function bfs(start) {
        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const node = queue.shift();
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            components++;
            bfs(i);
        }
    }

    return components;
}

// Union-Find Solution
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.components = n;
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return;

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        this.components--;
    }

    getComponents() {
        return this.components;
    }
}

function countComponentsUF(n, edges) {
    const uf = new UnionFind(n);
    for (const [u, v] of edges) {
        uf.union(u, v);
    }
    return uf.getComponents();
}`,

        complexity: `DFS/BFS: Time O(V + E), Space O(V)
Union-Find: Time O(E × α(V)), Space O(V) where α is inverse Ackermann`,

        hints: [
          "Each DFS/BFS explores one component",
          "Count how many times you start a new search",
          "Union-Find is efficient for dynamic graphs",
          "Isolated vertices are individual components"
        ]
      },

      {
        title: "Bipartite Graph",
        difficulty: "Medium",
        description: `Determine if a graph is bipartite. A graph is bipartite if its vertices can be divided into two sets such that every edge connects vertices from different sets.`,

        example: `Graph: 0-1, 1-2, 2-3, 3-0
Output: true
Explanation: Set1 = {0, 2}, Set2 = {1, 3}

Graph: 0-1, 1-2, 2-0
Output: false
Explanation: Odd cycle exists`,

        approach: `**Key Insight:** Graph is bipartite if and only if it has no odd-length cycles

**Approach: Graph Coloring with BFS/DFS**
1. Try to color graph with 2 colors
2. Start with any vertex, color it with color 0
3. Color all neighbors with opposite color
4. If neighbor already has same color, not bipartite
5. Repeat for all components (disconnected graph)`,

        solution: `// BFS Solution
function isBipartite(graph) {
    const n = graph.length;
    const colors = new Array(n).fill(-1);

    function bfs(start) {
        const queue = [start];
        colors[start] = 0;

        while (queue.length > 0) {
            const node = queue.shift();
            const currentColor = colors[node];

            for (const neighbor of graph[node]) {
                if (colors[neighbor] === -1) {
                    // Not colored yet
                    colors[neighbor] = 1 - currentColor;
                    queue.push(neighbor);
                } else if (colors[neighbor] === currentColor) {
                    // Same color - not bipartite
                    return false;
                }
            }
        }

        return true;
    }

    // Check all components
    for (let i = 0; i < n; i++) {
        if (colors[i] === -1) {
            if (!bfs(i)) return false;
        }
    }

    return true;
}

// DFS Solution
function isBipartiteDFS(graph) {
    const n = graph.length;
    const colors = new Array(n).fill(-1);

    function dfs(node, color) {
        colors[node] = color;

        for (const neighbor of graph[node]) {
            if (colors[neighbor] === -1) {
                if (!dfs(neighbor, 1 - color)) {
                    return false;
                }
            } else if (colors[neighbor] === color) {
                return false;
            }
        }

        return true;
    }

    for (let i = 0; i < n; i++) {
        if (colors[i] === -1) {
            if (!dfs(i, 0)) return false;
        }
    }

    return true;
}

// Alternative: Return the two sets
function getBipartiteSets(graph) {
    const n = graph.length;
    const colors = new Array(n).fill(-1);

    function bfs(start) {
        const queue = [start];
        colors[start] = 0;

        while (queue.length > 0) {
            const node = queue.shift();

            for (const neighbor of graph[node]) {
                if (colors[neighbor] === -1) {
                    colors[neighbor] = 1 - colors[node];
                    queue.push(neighbor);
                } else if (colors[neighbor] === colors[node]) {
                    return false;
                }
            }
        }
        return true;
    }

    for (let i = 0; i < n; i++) {
        if (colors[i] === -1) {
            if (!bfs(i)) return null;
        }
    }

    const set1 = [], set2 = [];
    for (let i = 0; i < n; i++) {
        if (colors[i] === 0) set1.push(i);
        else set2.push(i);
    }

    return [set1, set2];
}`,

        complexity: `Time: O(V + E)
Space: O(V) for colors array and queue/stack`,

        hints: [
          "Use 2-coloring approach",
          "If odd cycle exists, not bipartite",
          "BFS or DFS both work",
          "Handle disconnected components",
          "Color array serves as both visited and color tracker"
        ]
      },

      {
        title: "Clone Graph",
        difficulty: "Medium",
        description: `Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.`,

        example: `Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: 4 nodes form a square`,

        approach: `**Approach: DFS/BFS with HashMap**
1. Use map to track original → clone mapping
2. For each node:
   - Create clone if not exists
   - Recursively clone all neighbors
   - Add cloned neighbors to clone's neighbor list
3. Return cloned root`,

        solution: `// DFS Solution
function cloneGraph(node) {
    if (!node) return null;

    const cloneMap = new Map();

    function dfs(node) {
        // If already cloned, return clone
        if (cloneMap.has(node)) {
            return cloneMap.get(node);
        }

        // Create clone
        const clone = new Node(node.val);
        cloneMap.set(node, clone);

        // Clone all neighbors
        for (const neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

// BFS Solution
function cloneGraphBFS(node) {
    if (!node) return null;

    const cloneMap = new Map();
    const queue = [node];

    // Clone the root
    cloneMap.set(node, new Node(node.val));

    while (queue.length > 0) {
        const current = queue.shift();

        for (const neighbor of current.neighbors) {
            if (!cloneMap.has(neighbor)) {
                // Clone neighbor
                cloneMap.set(neighbor, new Node(neighbor.val));
                queue.push(neighbor);
            }

            // Add cloned neighbor to current clone
            cloneMap.get(current).neighbors.push(
                cloneMap.get(neighbor)
            );
        }
    }

    return cloneMap.get(node);
}`,

        complexity: `Time: O(V + E) - visit each node and edge once
Space: O(V) - map stores all nodes`,

        hints: [
          "Use map to avoid infinite loops",
          "Clone node before neighbors",
          "Both DFS and BFS work",
          "Map tracks original to clone mapping"
        ]
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Tips",
    tips: [
      {
        category: "Choosing Graph Representation",
        practices: [
          "Use adjacency list for sparse graphs (most real-world cases)",
          "Use adjacency matrix only for dense graphs or when O(1) edge lookup is critical",
          "Consider edge list for Kruskal's algorithm or when primarily iterating edges",
          "For large graphs, consider compressed representations",
          "Store edge weights in adjacency list as {node, weight} pairs",
          "Use Map/Dictionary for non-integer vertex labels"
        ]
      },

      {
        category: "Visited Tracking",
        practices: [
          "Always use visited set to avoid infinite loops in cyclic graphs",
          "For DFS cycle detection, use separate recursion stack",
          "Clear visited set between components in disconnected graphs",
          "Consider using colors (white/gray/black) for complex DFS",
          "In-place marking (changing graph) saves space but modifies input",
          "Track visited state in separate data structure when graph is immutable"
        ]
      },

      {
        category: "Handling Disconnected Graphs",
        practices: [
          "Always iterate through all vertices, not just from one start",
          "Initialize traversal for each unvisited vertex",
          "Count components by counting number of DFS/BFS initiations",
          "Consider Union-Find for dynamic connectivity",
          "Handle isolated vertices (degree = 0) correctly",
          "Test with completely disconnected graph (all single vertices)"
        ]
      },

      {
        category: "Implementation Tips",
        practices: [
          "Validate input: check for null, empty graph, invalid edges",
          "Handle edge cases: single node, no edges, self-loops",
          "Use meaningful variable names (vertex, neighbor, not i, j)",
          "Extract helper functions (DFS/BFS) for reusability",
          "Add early termination when target is found",
          "Use appropriate data structures (Set for O(1) lookup, Array for iteration)"
        ]
      },

      {
        category: "Algorithm Selection",
        practices: [
          "Use BFS for shortest path in unweighted graphs",
          "Use DFS for cycle detection and topological sorting",
          "Use Dijkstra for weighted shortest path (non-negative weights)",
          "Use Bellman-Ford when negative weights exist",
          "Use Union-Find for dynamic connectivity queries",
          "Use topological sort for dependency problems (DAGs)"
        ]
      },

      {
        category: "Memory Optimization",
        practices: [
          "Use adjacency list over matrix for sparse graphs (huge space savings)",
          "Avoid storing duplicate edges in undirected graphs",
          "Use iterative DFS instead of recursive to avoid stack overflow",
          "Clear unnecessary data structures after use",
          "Consider streaming algorithms for very large graphs",
          "Use bit vectors for visited tracking when vertex count is large"
        ]
      },

      {
        category: "Common Pitfalls to Avoid",
        practices: [
          "Forgetting to mark vertices as visited (infinite loop)",
          "Not handling disconnected components",
          "Using wrong traversal (BFS vs DFS) for the problem",
          "Modifying graph during traversal (unless intended)",
          "Integer overflow with distance/path length calculations",
          "Not checking for cycles in directed vs undirected graphs differently",
          "Assuming graph is connected or acyclic without verification"
        ]
      },

      {
        category: "Testing Strategy",
        practices: [
          "Test with empty graph (0 vertices)",
          "Test with single vertex, single edge",
          "Test with disconnected components",
          "Test with cycles and acyclic graphs separately",
          "Test with self-loops and multiple edges",
          "Test with both directed and undirected graphs",
          "Use both small hand-traced examples and large random graphs",
          "Verify time complexity with performance testing"
        ]
      },

      {
        category: "Debugging Tips",
        practices: [
          "Visualize small graphs on paper",
          "Print traversal order to verify correctness",
          "Check visited set at each step",
          "Verify graph construction (adjacency list) before algorithm",
          "Use debugger to step through recursion",
          "Add assertions for invariants",
          "Test components separately (graph building, traversal, etc.)"
        ]
      }
    ],

    codeTemplate: `// Standard Graph Template
class Graph {
    constructor(vertices, isDirected = false) {
        this.V = vertices;
        this.isDirected = isDirected;
        this.adjList = new Map();

        for (let i = 0; i < vertices; i++) {
            this.adjList.set(i, []);
        }
    }

    addEdge(u, v, weight = 1) {
        this.adjList.get(u).push({ node: v, weight });
        if (!this.isDirected) {
            this.adjList.get(v).push({ node: u, weight });
        }
    }

    // BFS Template
    bfs(start, target = null) {
        const visited = new Set();
        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const vertex = queue.shift();

            // Process vertex
            if (vertex === target) return true;

            for (const { node, weight } of this.adjList.get(vertex)) {
                if (!visited.has(node)) {
                    visited.add(node);
                    queue.push(node);
                }
            }
        }

        return false;
    }

    // DFS Template (Recursive)
    dfs(start, visited = new Set()) {
        visited.add(start);

        // Process vertex

        for (const { node, weight } of this.adjList.get(start)) {
            if (!visited.has(node)) {
                this.dfs(node, visited);
            }
        }
    }

    // Handle Disconnected Graphs
    processAllComponents(callback) {
        const visited = new Set();
        let componentCount = 0;

        for (let v of this.adjList.keys()) {
            if (!visited.has(v)) {
                componentCount++;
                callback(v, visited);
            }
        }

        return componentCount;
    }
}`
  },

  advancedTopics: {
    title: "Advanced Graph Algorithms",
    content: `Beyond basic traversals, there are many specialized graph algorithms for specific problems.`,

    algorithms: [
      {
        name: "Dijkstra's Algorithm",
        description: `**Purpose:** Find shortest path from source to all vertices in weighted graph with non-negative weights.

**How it Works:**
1. Initialize distances: source = 0, others = infinity
2. Use min-heap (priority queue) to process vertices by distance
3. For each vertex, relax all outgoing edges
4. Update distances if shorter path found
5. Continue until all vertices processed

**Key Concept:** Greedy approach - always process closest unprocessed vertex`,

        pseudocode: `function dijkstra(graph, source):
    distance = array of infinity, size V
    distance[source] = 0
    pq = priority queue (min-heap)
    pq.insert(source, 0)

    while pq is not empty:
        u = pq.extractMin()

        for each neighbor v of u:
            newDist = distance[u] + weight(u, v)
            if newDist < distance[v]:
                distance[v] = newDist
                pq.insert(v, newDist)

    return distance`,

        timeComplexity: "O((V + E) log V) with binary heap, O(V²) with array",
        spaceComplexity: "O(V)",

        useCases: [
          "GPS navigation and routing",
          "Network routing protocols",
          "Shortest path in road networks",
          "Flight route optimization"
        ],

        limitations: [
          "Cannot handle negative edge weights",
          "Less efficient for graphs with negative weights (use Bellman-Ford)",
          "Not suitable for finding all-pairs shortest paths (use Floyd-Warshall)"
        ]
      },

      {
        name: "Bellman-Ford Algorithm",
        description: `**Purpose:** Find shortest paths from source to all vertices, handles negative weights and detects negative cycles.

**How it Works:**
1. Initialize distances: source = 0, others = infinity
2. Relax all edges V-1 times
3. On each iteration, update distances if shorter path found
4. After V-1 iterations, check for negative cycles
5. If distance updates in Vth iteration, negative cycle exists

**Key Concept:** Dynamic programming approach - consider paths with increasing number of edges`,

        pseudocode: `function bellmanFord(graph, source):
    distance = array of infinity, size V
    distance[source] = 0

    // Relax edges V-1 times
    for i from 1 to V-1:
        for each edge (u, v) with weight w:
            if distance[u] + w < distance[v]:
                distance[v] = distance[u] + w

    // Check for negative cycles
    for each edge (u, v) with weight w:
        if distance[u] + w < distance[v]:
            return "Negative cycle detected"

    return distance`,

        timeComplexity: "O(V × E)",
        spaceComplexity: "O(V)",

        useCases: [
          "Currency arbitrage detection",
          "Graphs with negative weights",
          "Detecting negative cycles",
          "Routing with penalty costs"
        ],

        advantages: [
          "Handles negative edge weights",
          "Detects negative cycles",
          "Simpler implementation than Dijkstra",
          "Works with distributed systems"
        ]
      },

      {
        name: "Floyd-Warshall Algorithm",
        description: `**Purpose:** Find shortest paths between all pairs of vertices.

**How it Works:**
1. Initialize distance matrix with edge weights
2. For each intermediate vertex k:
   - For each pair (i, j):
     - Check if path i → k → j is shorter than direct path i → j
     - Update distance if shorter path found
3. Result is all-pairs shortest path matrix

**Key Concept:** Dynamic programming - consider all possible intermediate vertices`,

        pseudocode: `function floydWarshall(graph):
    dist = V × V matrix

    // Initialize
    for i from 0 to V-1:
        for j from 0 to V-1:
            if i == j:
                dist[i][j] = 0
            else if edge (i,j) exists:
                dist[i][j] = weight(i, j)
            else:
                dist[i][j] = infinity

    // Try all intermediate vertices
    for k from 0 to V-1:
        for i from 0 to V-1:
            for j from 0 to V-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist`,

        timeComplexity: "O(V³)",
        spaceComplexity: "O(V²)",

        useCases: [
          "All-pairs shortest paths",
          "Transitive closure",
          "Finding graph diameter",
          "Network analysis"
        ],

        limitations: [
          "O(V³) time - slow for large graphs",
          "O(V²) space - high memory usage",
          "Not suitable for sparse graphs"
        ]
      },

      {
        name: "Prim's Algorithm (Minimum Spanning Tree)",
        description: `**Purpose:** Find minimum spanning tree of weighted undirected graph.

**Minimum Spanning Tree:** Tree connecting all vertices with minimum total edge weight.

**How it Works:**
1. Start with arbitrary vertex
2. Grow tree by adding cheapest edge connecting tree to non-tree vertex
3. Use priority queue to find minimum weight edge
4. Repeat until all vertices included
5. Result is MST with V-1 edges

**Key Concept:** Greedy approach - always add cheapest edge that grows the tree`,

        pseudocode: `function prim(graph):
    inMST = array of false, size V
    key = array of infinity, size V
    parent = array of -1, size V
    pq = priority queue

    key[0] = 0
    pq.insert(0, 0)

    while pq is not empty:
        u = pq.extractMin()
        inMST[u] = true

        for each neighbor v of u:
            weight = weight(u, v)
            if not inMST[v] and weight < key[v]:
                key[v] = weight
                parent[v] = u
                pq.insert(v, key[v])

    return parent  // MST edges`,

        timeComplexity: "O(E log V) with binary heap",
        spaceComplexity: "O(V)",

        useCases: [
          "Network design (minimize cable cost)",
          "Circuit design",
          "Clustering",
          "Approximation algorithms"
        ]
      },

      {
        name: "Kruskal's Algorithm (Minimum Spanning Tree)",
        description: `**Purpose:** Find minimum spanning tree using edge-centric approach.

**How it Works:**
1. Sort all edges by weight (ascending)
2. Initialize each vertex as separate tree (Union-Find)
3. For each edge in sorted order:
   - If edge connects different trees, add to MST
   - Union the two trees
4. Stop when V-1 edges added
5. Result is minimum spanning tree

**Key Concept:** Greedy approach - add cheapest edges that don't create cycles`,

        pseudocode: `function kruskal(graph):
    edges = sort all edges by weight
    uf = UnionFind(V)
    mst = []

    for each edge (u, v, weight) in edges:
        if uf.find(u) != uf.find(v):
            mst.add(edge)
            uf.union(u, v)

            if mst.size == V - 1:
                break

    return mst`,

        timeComplexity: "O(E log E) or O(E log V)",
        spaceComplexity: "O(V) for Union-Find",

        useCases: [
          "Same as Prim's: network design, clustering",
          "Better for sparse graphs",
          "When edges are already sorted"
        ],

        comparison: `**Prim's vs Kruskal's:**

Prim's:
• Vertex-centric (grows tree from vertex)
• Better for dense graphs
• Uses priority queue
• O(E log V) with binary heap

Kruskal's:
• Edge-centric (sorts edges)
• Better for sparse graphs
• Uses Union-Find
• O(E log E) ≈ O(E log V)`
      },

      {
        name: "Topological Sort",
        description: `**Purpose:** Linear ordering of vertices in Directed Acyclic Graph (DAG) such that for every edge u → v, u comes before v.

**Applications:**
• Task scheduling with dependencies
• Build systems
• Course prerequisites
• Makefile dependencies

**Two Approaches:**

**1. DFS-based (Post-order)**
• Perform DFS
• Add vertex to result after visiting all neighbors (post-order)
• Reverse the result

**2. Kahn's Algorithm (BFS-based)**
• Calculate in-degree for all vertices
• Start with vertices having in-degree 0
• Remove vertex and reduce in-degree of neighbors
• Add neighbors with in-degree 0 to queue`,

        pseudocode: `// DFS Approach
function topologicalSortDFS(graph):
    visited = set()
    stack = []

    function dfs(v):
        visited.add(v)
        for each neighbor of v:
            if neighbor not in visited:
                dfs(neighbor)
        stack.push(v)  // Add after processing neighbors

    for each vertex v:
        if v not in visited:
            dfs(v)

    return stack.reverse()

// Kahn's Algorithm (BFS)
function topologicalSortBFS(graph):
    inDegree = calculate in-degrees
    queue = vertices with inDegree 0
    result = []

    while queue is not empty:
        v = queue.dequeue()
        result.add(v)

        for each neighbor of v:
            inDegree[neighbor]--
            if inDegree[neighbor] == 0:
                queue.enqueue(neighbor)

    if result.size != V:
        return "Cycle detected"

    return result`,

        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",

        useCases: [
          "Build order determination",
          "Course scheduling",
          "Dependency resolution",
          "Dead lock detection"
        ]
      }
    ],

    moreAdvancedTopics: [
      {
        name: "Strongly Connected Components",
        algorithms: "Kosaraju's Algorithm, Tarjan's Algorithm",
        complexity: "O(V + E)",
        description: "Find maximal subgraphs where every vertex is reachable from every other vertex (directed graphs)"
      },
      {
        name: "Articulation Points & Bridges",
        algorithms: "DFS-based with discovery time and low link values",
        complexity: "O(V + E)",
        description: "Find critical vertices/edges whose removal disconnects graph"
      },
      {
        name: "Maximum Flow",
        algorithms: "Ford-Fulkerson, Edmonds-Karp, Dinic's",
        complexity: "O(V × E²) to O(V² × E)",
        description: "Find maximum flow through a network from source to sink"
      },
      {
        name: "Minimum Cut",
        algorithms: "Max-Flow Min-Cut Theorem, Karger's",
        complexity: "Same as max flow",
        description: "Find minimum capacity cut separating source and sink"
      },
      {
        name: "Graph Coloring",
        algorithms: "Backtracking, Welsh-Powell",
        complexity: "NP-complete for general graphs",
        description: "Assign colors to vertices so adjacent vertices have different colors"
      },
      {
        name: "Hamiltonian Path/Cycle",
        algorithms: "Backtracking, Dynamic Programming",
        complexity: "NP-complete",
        description: "Path/cycle visiting each vertex exactly once"
      },
      {
        name: "Traveling Salesman Problem",
        algorithms: "Dynamic Programming, Approximation algorithms",
        complexity: "O(n² × 2ⁿ) with DP, NP-hard",
        description: "Find shortest tour visiting all cities"
      }
    ]
  }
};
