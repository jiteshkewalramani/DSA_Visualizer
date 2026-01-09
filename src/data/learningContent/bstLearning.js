// ============= src/data/learningContent/bstLearning.js =============
// Comprehensive learning content for Binary Search Tree

export const bstLearningContent = {
  introduction: {
    title: "What is a Binary Search Tree?",
    content: `A Binary Search Tree (BST) is a node-based binary tree data structure with the following properties:

**Key Properties:**
• Each node has at most two children (left and right)
• For any node N:
  - All values in the left subtree < N's value
  - All values in the right subtree > N's value
• Both left and right subtrees are also Binary Search Trees
• No duplicate values (in standard implementation)

**Why Use BST?**
BSTs combine the advantages of:
• Arrays: Fast search when sorted
• Linked Lists: Dynamic size and easy insertion/deletion
• They maintain sorted order while allowing O(log n) operations in balanced cases`,

    visualExample: {
      description: "Example BST with values: 50, 30, 70, 20, 40, 60, 80",
      tree: `
           50
          /  \\
        30    70
       / \\   / \\
      20 40 60 80

Notice how:
• All left children (20, 30, 40, 60) < their parents
• All right children (40, 60, 70, 80) > their parents
• In-order traversal gives sorted sequence: 20, 30, 40, 50, 60, 70, 80
      `
    }
  },

  fundamentals: {
    title: "BST Fundamentals",
    sections: [
      {
        subtitle: "1. Node Structure",
        content: `Each node in a BST contains:

**Node Components:**
\`\`\`
class Node {
    value: any        // The data stored
    left: Node        // Reference to left child
    right: Node       // Reference to right child
}
\`\`\`

**Memory Representation:**
• Unlike arrays, nodes can be scattered in memory
• Connections maintained through pointers/references
• Dynamic allocation - grows/shrinks as needed`,

        example: `Example Node Creation:
Node(50) → { value: 50, left: null, right: null }

After inserting 30:
Node(50) → { value: 50, left: Node(30), right: null }
Node(30) → { value: 30, left: null, right: null }`
      },

      {
        subtitle: "2. BST Property (Invariant)",
        content: `The BST property MUST be maintained at all times:

**For every node N:**
• left subtree values < N.value < right subtree values

**Why This Matters:**
• Enables binary search-like operations
• Allows O(log n) search in balanced trees
• Makes in-order traversal produce sorted output

**Common Mistakes:**
❌ Comparing only with immediate children
✓ All descendants must satisfy the property

Example of INVALID BST:
     10
    /  \\
   5    15
       /  \\
      6   20

This violates BST property because:
• 6 is in the right subtree of 10
• But 6 < 10 (should be > 10)`,

        example: `Valid BST Check:
For node with value 10:
• All values in left subtree must be < 10
• All values in right subtree must be > 10
• This applies recursively to all subtrees`
      },

      {
        subtitle: "3. Height and Balance",
        content: `**Height of BST:**
• Height = longest path from root to leaf
• Minimum height = log₂(n) [perfectly balanced]
• Maximum height = n [skewed/degenerate tree]

**Balanced vs Unbalanced:**

Balanced BST (height ≈ log n):
       50
      /  \\
    30    70
   / \\   / \\
  20 40 60 80

Unbalanced/Skewed (height = n):
  10
    \\
     20
       \\
        30
          \\
           40

**Impact on Performance:**
• Balanced: O(log n) operations
• Skewed: O(n) operations - as bad as linear search!
• Self-balancing trees (AVL, Red-Black) maintain O(log n)`,

        example: `Height Calculation:
Height of node = 1 + max(height(left), height(right))
Height of null = -1 (or 0, depending on definition)

For balanced tree of n nodes:
Best case height = ⌊log₂(n)⌋
e.g., 7 nodes → height = 2 (levels: 0, 1, 2)`
      }
    ]
  },

  operations: {
    title: "Core BST Operations",
    sections: [
      {
        operation: "Search",
        timeComplexity: "O(h) where h = height | O(log n) average, O(n) worst",
        spaceComplexity: "O(h) for recursion | O(1) for iterative",

        description: `**How Search Works:**
1. Start at root
2. Compare target with current node
3. If equal → found!
4. If target < current → search left subtree
5. If target > current → search right subtree
6. If null reached → not found

**Why It's Efficient:**
• Eliminates half the tree at each step (like binary search)
• No need to visit every node
• Leverages BST property`,

        pseudocode: `function search(node, target):
    // Base cases
    if node is null:
        return false        // Not found

    if node.value == target:
        return true         // Found!

    // Recursive cases
    if target < node.value:
        return search(node.left, target)   // Search left
    else:
        return search(node.right, target)  // Search right`,

        iterativeVersion: `function searchIterative(root, target):
    current = root

    while current is not null:
        if current.value == target:
            return true
        else if target < current.value:
            current = current.left
        else:
            current = current.right

    return false`,

        example: `Search for 40 in:
       50
      /  \\
    30    70
   / \\
  20 40

Steps:
1. Start at 50: 40 < 50 → go left
2. At 30: 40 > 30 → go right
3. At 40: 40 == 40 → FOUND!

Total comparisons: 3 (vs 5 if linear search)`
      },

      {
        operation: "Insertion",
        timeComplexity: "O(h) where h = height | O(log n) average, O(n) worst",
        spaceComplexity: "O(h) for recursion | O(1) for iterative",

        description: `**How Insertion Works:**
1. Search for the position (like search operation)
2. When you reach null, that's where the new node goes
3. Create new node and attach it
4. Maintain BST property

**Key Points:**
• Always inserts at a leaf position
• Never inserts in the middle
• Path taken during search determines insertion point
• No rebalancing in basic BST (unlike AVL)`,

        pseudocode: `function insert(node, value):
    // Base case: empty spot found
    if node is null:
        return new Node(value)

    // Recursive cases
    if value < node.value:
        node.left = insert(node.left, value)
    else if value > node.value:
        node.right = insert(node.right, value)
    // Note: if value == node.value, we don't insert (no duplicates)

    return node`,

        example: `Insert 35 into:
       50
      /  \\
    30    70
   / \\
  20 40

Steps:
1. 35 < 50 → go left to 30
2. 35 > 30 → go right to 40
3. 35 < 40 → go left
4. Reached null → insert here!

Result:
       50
      /  \\
    30    70
   / \\
  20 40
    /
   35`,

        commonMistakes: `❌ DON'T insert in middle of tree
❌ DON'T forget to maintain BST property
❌ DON'T allow duplicates (standard implementation)
✓ Always insert at leaf position
✓ Update parent's left/right reference
✓ Handle edge case of empty tree`
      },

      {
        operation: "Deletion",
        timeComplexity: "O(h) where h = height | O(log n) average, O(n) worst",
        spaceComplexity: "O(h) for recursion",

        description: `**Deletion is Complex - 3 Cases:**

**Case 1: Node has no children (leaf)**
• Simply remove it
• Update parent's reference to null
• Easiest case

**Case 2: Node has one child**
• Replace node with its child
• Child takes node's position in tree
• Maintains BST property

**Case 3: Node has two children**
• Most complex case
• Find inorder successor (smallest in right subtree)
  OR inorder predecessor (largest in left subtree)
• Replace node's value with successor's value
• Delete the successor (which falls into Case 1 or 2)`,

        pseudocode: `function delete(node, value):
    if node is null:
        return null

    // Find the node to delete
    if value < node.value:
        node.left = delete(node.left, value)
    else if value > node.value:
        node.right = delete(node.right, value)
    else:
        // Node found! Handle 3 cases:

        // Case 1: No children (leaf)
        if node.left is null and node.right is null:
            return null

        // Case 2: One child
        if node.left is null:
            return node.right
        if node.right is null:
            return node.left

        // Case 3: Two children
        // Find inorder successor (min in right subtree)
        successor = findMin(node.right)
        node.value = successor.value
        node.right = delete(node.right, successor.value)

    return node

function findMin(node):
    while node.left is not null:
        node = node.left
    return node`,

        detailedExample: `Delete 30 from:
       50
      /  \\
    30    70
   / \\   / \\
  20 40 60 80

Node 30 has TWO children (20 and 40)
→ Use Case 3

Steps:
1. Find inorder successor of 30:
   - Smallest in right subtree of 30
   - Go right to 40, then leftmost
   - Successor = 40

2. Replace 30's value with 40:
       50
      /  \\
    40    70
   / \\   / \\
  20 40 60 80

3. Delete the duplicate 40 (now a leaf):
       50
      /  \\
    40    70
   /     / \\
  20    60 80

Final Result - BST property maintained!`
      }
    ]
  },

  traversals: {
    title: "Tree Traversals",
    description: "Ways to visit all nodes in a BST",

    sections: [
      {
        name: "In-Order Traversal (Left-Root-Right)",
        description: `**Most Important for BST!**
• Visits nodes in sorted order
• Left subtree → Root → Right subtree
• Use: Get sorted sequence, validate BST`,

        pseudocode: `function inorder(node):
    if node is null:
        return

    inorder(node.left)      // Visit left subtree
    print(node.value)        // Visit root
    inorder(node.right)      // Visit right subtree`,

        example: `Tree:       50
           /  \\
         30    70
        / \\   / \\
       20 40 60 80

In-order: 20 → 30 → 40 → 50 → 60 → 70 → 80
         (Sorted ascending!)`,

        application: "Finding kth smallest element, validating BST, creating sorted array"
      },

      {
        name: "Pre-Order Traversal (Root-Left-Right)",
        description: `**Good for Copying Tree**
• Root → Left subtree → Right subtree
• Use: Create copy, serialize tree, prefix expression`,

        pseudocode: `function preorder(node):
    if node is null:
        return

    print(node.value)        // Visit root first
    preorder(node.left)      // Visit left subtree
    preorder(node.right)     // Visit right subtree`,

        example: `Tree:       50
           /  \\
         30    70
        / \\   / \\
       20 40 60 80

Pre-order: 50 → 30 → 20 → 40 → 70 → 60 → 80`,

        application: "Serializing tree, creating a copy, prefix notation"
      },

      {
        name: "Post-Order Traversal (Left-Right-Root)",
        description: `**Good for Deletion**
• Left subtree → Right subtree → Root
• Use: Delete tree, calculate tree height, postfix expression`,

        pseudocode: `function postorder(node):
    if node is null:
        return

    postorder(node.left)     // Visit left subtree
    postorder(node.right)    // Visit right subtree
    print(node.value)        // Visit root last`,

        example: `Tree:       50
           /  \\
         30    70
        / \\   / \\
       20 40 60 80

Post-order: 20 → 40 → 30 → 60 → 80 → 70 → 50`,

        application: "Deleting tree, calculating size/height, postfix notation"
      },

      {
        name: "Level-Order Traversal (BFS)",
        description: `**Breadth-First Search**
• Visit nodes level by level
• Uses Queue data structure
• Use: Level-by-level printing, finding shortest path`,

        pseudocode: `function levelorder(root):
    if root is null:
        return

    queue = new Queue()
    queue.enqueue(root)

    while queue is not empty:
        node = queue.dequeue()
        print(node.value)

        if node.left is not null:
            queue.enqueue(node.left)
        if node.right is not null:
            queue.enqueue(node.right)`,

        example: `Tree:       50
           /  \\
         30    70
        / \\   / \\
       20 40 60 80

Level-order: 50 → 30 → 70 → 20 → 40 → 60 → 80
            (Level 0) (Level 1)  (Level 2)`,

        application: "Level-order printing, finding level of node, serialize by level"
      }
    ]
  },

  complexity: {
    title: "Time & Space Complexity Analysis",

    timeComplexity: {
      description: "All operations depend on tree height",

      balanced: {
        title: "Balanced BST (Height = log n)",
        operations: {
          "Search": "O(log n)",
          "Insert": "O(log n)",
          "Delete": "O(log n)",
          "Find Min/Max": "O(log n)",
          "Traversal": "O(n)"
        },
        explanation: `In a balanced tree:
• Height h ≈ log₂(n)
• Each comparison eliminates ~half remaining nodes
• Similar to binary search on sorted array`
      },

      worstCase: {
        title: "Skewed BST (Height = n)",
        operations: {
          "Search": "O(n)",
          "Insert": "O(n)",
          "Delete": "O(n)",
          "Find Min/Max": "O(n)",
          "Traversal": "O(n)"
        },
        explanation: `In a skewed tree:
• Height h = n (like a linked list)
• Must traverse all nodes in worst case
• Example: Inserting sorted data into BST

Insertion order: 1, 2, 3, 4, 5
Results in:  1
              \\
               2
                \\
                 3
                  \\
                   4
                    \\
                     5`
      }
    },

    spaceComplexity: {
      description: "Space used by the algorithm",

      storage: {
        title: "Storage Space",
        value: "O(n)",
        explanation: `Each node stores:
• Value: O(1)
• Left pointer: O(1)
• Right pointer: O(1)
• Total for n nodes: O(n)`
      },

      recursion: {
        title: "Recursion Stack Space",
        balanced: "O(log n)",
        worstCase: "O(n)",
        explanation: `Recursive calls use call stack:
• Depth of recursion = height of tree
• Balanced: O(log n) stack frames
• Skewed: O(n) stack frames

Iterative versions use O(1) extra space`
      }
    }
  },

  applications: {
    title: "Real-World Applications",

    useCases: [
      {
        application: "Database Indexing",
        description: `Databases use BST variants (B-trees, B+ trees) for indexing:
• Fast lookup of records by key
• Maintains sorted order for range queries
• Efficient insertion/deletion of records`,
        example: "Finding all users with age between 25 and 35"
      },

      {
        application: "File Systems",
        description: `Operating systems use tree structures for file organization:
• Directory hierarchy
• Quick file lookup by name
• Sorted file listings`,
        example: "Linux directory structure, Windows Explorer"
      },

      {
        application: "Expression Trees",
        description: `Compilers use BSTs to represent expressions:
• Parse mathematical expressions
• Evaluate expressions efficiently
• Generate machine code`,
        example: "Expression: (3 + 5) * 2 → Parse tree"
      },

      {
        application: "Auto-complete / Spell Check",
        description: `Trie (prefix tree - a BST variant):
• Store dictionary words
• Quick prefix matching
• Suggest completions`,
        example: "Google search suggestions, IDE autocomplete"
      },

      {
        application: "Priority Queues (Heap)",
        description: `Binary heap (complete binary tree):
• Implement priority queues
• Task scheduling
• Dijkstra's algorithm`,
        example: "CPU process scheduling, event simulators"
      },

      {
        application: "Symbol Tables",
        description: `Programming language implementations:
• Variable name lookup
• Function/method resolution
• Scope management`,
        example: "Compiler symbol tables, interpreter environments"
      }
    ]
  },

  commonProblems: {
    title: "Common Interview Problems",

    problems: [
      {
        title: "1. Validate BST",
        difficulty: "Medium",
        description: "Check if a binary tree is a valid BST",
        approach: `Key insight: Use range constraints

For each node, maintain valid range:
• Left subtree: (-∞, node.value)
• Right subtree: (node.value, +∞)

Common mistake: Only checking immediate children`,

        solution: `function isValidBST(node, min=-∞, max=+∞):
    if node is null:
        return true

    // Check current node
    if node.value <= min or node.value >= max:
        return false

    // Check subtrees with updated ranges
    return isValidBST(node.left, min, node.value) and
           isValidBST(node.right, node.value, max)`
      },

      {
        title: "2. Lowest Common Ancestor",
        difficulty: "Medium",
        description: "Find LCA of two nodes in BST",
        approach: `Leverage BST property:
• If both nodes < current → LCA is in left
• If both nodes > current → LCA is in right
• Otherwise → current is LCA`,

        solution: `function findLCA(root, p, q):
    if root is null:
        return null

    // Both nodes in left subtree
    if p < root.value and q < root.value:
        return findLCA(root.left, p, q)

    // Both nodes in right subtree
    if p > root.value and q > root.value:
        return findLCA(root.right, p, q)

    // Split point - root is LCA
    return root`
      },

      {
        title: "3. Kth Smallest Element",
        difficulty: "Medium",
        description: "Find kth smallest element in BST",
        approach: `Use in-order traversal:
• In-order gives sorted sequence
• The kth element in traversal is kth smallest`,

        solution: `function kthSmallest(root, k):
    count = 0
    result = null

    function inorder(node):
        if node is null or result is not null:
            return

        inorder(node.left)

        count++
        if count == k:
            result = node.value
            return

        inorder(node.right)

    inorder(root)
    return result`
      },

      {
        title: "4. Convert Sorted Array to BST",
        difficulty: "Easy",
        description: "Create balanced BST from sorted array",
        approach: `Use middle element as root:
• Middle element ensures balance
• Recursively build left and right subtrees
• Results in minimum height tree`,

        solution: `function sortedArrayToBST(arr, start, end):
    if start > end:
        return null

    mid = (start + end) // 2
    root = new Node(arr[mid])

    root.left = sortedArrayToBST(arr, start, mid-1)
    root.right = sortedArrayToBST(arr, mid+1, end)

    return root`
      },

      {
        title: "5. BST Iterator",
        difficulty: "Medium",
        description: "Implement iterator with next() and hasNext() in O(1)",
        approach: `Use stack to simulate in-order traversal:
• Push all left children to stack
• next() pops stack, pushes right child's left children
• hasNext() checks if stack is empty`,

        solution: `class BSTIterator:
    function constructor(root):
        stack = []
        pushLeft(root)

    function pushLeft(node):
        while node is not null:
            stack.push(node)
            node = node.left

    function next():
        node = stack.pop()
        pushLeft(node.right)
        return node.value

    function hasNext():
        return stack is not empty`
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Tips",

    tips: [
      {
        category: "Implementation",
        points: [
          "Always maintain BST property during modifications",
          "Handle edge cases: empty tree, single node, duplicates",
          "Consider iterative solutions to avoid stack overflow",
          "Use helper functions for cleaner code",
          "Document assumptions (e.g., no duplicates allowed)"
        ]
      },

      {
        category: "Optimization",
        points: [
          "For frequent searches: keep tree balanced (use AVL/Red-Black)",
          "For sorted insertions: shuffle data first or use self-balancing tree",
          "Cache frequently accessed nodes",
          "Use iterative traversals for better performance",
          "Consider threaded BST for constant space traversal"
        ]
      },

      {
        category: "Testing",
        points: [
          "Test with empty tree",
          "Test with single node",
          "Test with balanced and skewed trees",
          "Test boundary values (min, max)",
          "Test duplicate handling",
          "Verify BST property after each operation"
        ]
      },

      {
        category: "Common Pitfalls",
        points: [
          "❌ Comparing only immediate children for BST validation",
          "❌ Forgetting to update parent pointers during deletion",
          "❌ Not handling null nodes in recursion",
          "❌ Inserting sorted data (creates skewed tree)",
          "❌ Using wrong traversal for the task",
          "✓ Always validate BST property",
          "✓ Use appropriate data structure for the use case",
          "✓ Consider self-balancing trees for production"
        ]
      }
    ]
  },

  comparison: {
    title: "BST vs Other Data Structures",

    comparisons: [
      {
        structure: "Array (Unsorted)",
        search: "O(n)",
        insert: "O(1)",
        delete: "O(n)",
        sorted: "No",
        notes: "Fast insert, slow search/delete"
      },

      {
        structure: "Array (Sorted)",
        search: "O(log n) binary search",
        insert: "O(n) shifting required",
        delete: "O(n) shifting required",
        sorted: "Yes",
        notes: "Fast search, slow insert/delete"
      },

      {
        structure: "Linked List",
        search: "O(n)",
        insert: "O(1) at head",
        delete: "O(n) search + O(1) delete",
        sorted: "Can be, but still O(n) search",
        notes: "Dynamic size, but linear search"
      },

      {
        structure: "Hash Table",
        search: "O(1) average",
        insert: "O(1) average",
        delete: "O(1) average",
        sorted: "No - unordered",
        notes: "Fastest for lookup, but no ordering"
      },

      {
        structure: "BST (Balanced)",
        search: "O(log n)",
        insert: "O(log n)",
        delete: "O(log n)",
        sorted: "Yes - in-order traversal",
        notes: "Good balance of all operations + sorted order"
      },

      {
        structure: "BST (Skewed)",
        search: "O(n)",
        insert: "O(n)",
        delete: "O(n)",
        sorted: "Yes",
        notes: "Degenerates to linked list performance"
      }
    ],

    whenToUseBST: `**Use BST when you need:**
• Sorted data with fast insertions/deletions
• Range queries (find all values between x and y)
• Find next/previous elements
• Maintain relative ordering

**Don't use BST when:**
• Only need fast lookup (use Hash Table)
• Data arrives in sorted order (use AVL/Red-Black Tree)
• Need guaranteed O(log n) (use self-balancing variants)
• Memory is very limited (arrays more cache-friendly)`
  }
};
