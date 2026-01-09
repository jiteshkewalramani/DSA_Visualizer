// ============= src/data/learningContent/heapLearning.js =============
// Comprehensive learning content for Heap Data Structure

export const heapLearningContent = {
  introduction: {
    title: "What is a Heap?",
    content: `A Heap is a specialized tree-based data structure that satisfies the heap property. It's a complete binary tree where nodes follow a specific ordering rule.

**Key Properties:**
• Complete Binary Tree: All levels are filled except possibly the last, which fills from left to right
• Heap Property: Defines relationship between parent and child nodes
• Two Types: Max Heap and Min Heap
• Efficiently stored in arrays (no explicit pointers needed)
• Fundamental for Priority Queues and Heap Sort

**Why Use Heap?**
Heaps provide:
• O(1) access to max/min element
• O(log n) insertion and deletion
• Efficient implementation of priority queues
• Foundation for heap sort algorithm
• Memory efficient (array-based storage)`,

    visualExample: {
      description: "Max Heap vs Min Heap comparison",
      maxHeap: `
Max Heap (parent >= children):
           90
          /  \\
        75    80
       / \\   / \\
      50 60 70 40
     / \\
    30 45

Properties:
• Root (90) is the maximum element
• Every parent >= its children
• 90 >= 75, 90 >= 80
• 75 >= 50, 75 >= 60
• Used when we need quick access to maximum`,

      minHeap: `
Min Heap (parent <= children):
           10
          /  \\
        20    15
       / \\   / \\
      30 40 25 50
     / \\
    60 70

Properties:
• Root (10) is the minimum element
• Every parent <= its children
• 10 <= 20, 10 <= 15
• 20 <= 30, 20 <= 40
• Used when we need quick access to minimum`
    },

    completeTree: {
      title: "Complete Binary Tree Property",
      description: `A complete binary tree is filled level by level:

Valid Complete Binary Tree:
       1
      / \\
     2   3
    / \\  /
   4  5 6

All levels filled from left to right.

Invalid (NOT complete):
       1
      / \\
     2   3
    /     \\
   4       5

Level 2 has gap - not filled left to right.

**Why Complete Tree?**
• Enables efficient array representation
• Guarantees O(log n) height
• No wasted space in array storage
• Parent-child relationships via simple formulas`
    }
  },

  fundamentals: {
    title: "Heap Fundamentals",
    sections: [
      {
        subtitle: "1. Heap Structure",
        content: `**Array Representation:**
Heaps are typically stored in arrays, not with explicit node pointers.

**Parent-Child Index Relationships:**
For any node at index i (0-based indexing):
• Parent index = ⌊(i - 1) / 2⌋
• Left child index = 2i + 1
• Right child index = 2i + 2

For 1-based indexing (sometimes used):
• Parent index = ⌊i / 2⌋
• Left child index = 2i
• Right child index = 2i + 1

**Memory Layout:**
\`\`\`
Array:  [90, 75, 80, 50, 60, 70, 40, 30, 45]
Index:   0   1   2   3   4   5   6   7   8

Tree View:
           90 (0)
          /      \\
      75 (1)    80 (2)
      /  \\      /  \\
   50(3) 60(4) 70(5) 40(6)
   /  \\
30(7) 45(8)
\`\`\``,

        example: `Finding relationships for index 4 (value 60):
• Parent: ⌊(4-1)/2⌋ = 1 → value 75
• Left child: 2(4)+1 = 9 → doesn't exist
• Right child: 2(4)+2 = 10 → doesn't exist

Finding relationships for index 1 (value 75):
• Parent: ⌊(1-1)/2⌋ = 0 → value 90
• Left child: 2(1)+1 = 3 → value 50
• Right child: 2(1)+2 = 4 → value 60`
      },

      {
        subtitle: "2. Heap Property (Invariant)",
        content: `The heap property MUST be maintained after every operation.

**Max Heap Property:**
• For every node i: heap[i] >= heap[2i+1] AND heap[i] >= heap[2i+2]
• Parent value >= all descendant values
• Largest element at root (index 0)

**Min Heap Property:**
• For every node i: heap[i] <= heap[2i+1] AND heap[i] <= heap[2i+2]
• Parent value <= all descendant values
• Smallest element at root (index 0)

**Important Notes:**
• No ordering between siblings (unlike BST)
• Only parent-child relationships matter
• Can have duplicates (unlike standard BST)
• Multiple valid heaps for same set of elements`,

        example: `Valid Max Heap: [90, 75, 80, 50, 60, 70, 40]
Check property:
• 90 >= 75 ✓  and  90 >= 80 ✓
• 75 >= 50 ✓  and  75 >= 60 ✓
• 80 >= 70 ✓  and  80 >= 40 ✓

Invalid (violates heap property):
[90, 75, 80, 95, 60, 70, 40]
         ^^
• 75 >= 95? ✗ VIOLATION!

Note: [90, 80, 75, 60, 50, 70, 40] is also valid!
Different structure, same elements, maintains property.`
      },

      {
        subtitle: "3. Complete Binary Tree Structure",
        content: `**Height of Heap:**
• For n elements: height = ⌊log₂(n)⌋
• Always balanced by definition
• No skewed heaps possible
• Minimum possible height for n nodes

**Level Capacity:**
• Level 0 (root): 1 node
• Level 1: 2 nodes
• Level 2: 4 nodes
• Level k: 2^k nodes
• Total nodes up to level k: 2^(k+1) - 1

**Array Efficiency:**
• No wasted space (contiguous storage)
• Cache-friendly (good locality of reference)
• No pointer overhead
• Simple index arithmetic`,

        example: `Heap with 10 elements:
Height = ⌊log₂(10)⌋ = 3

Level structure:
Level 0:        1 node   (1 total)
Level 1:        2 nodes  (3 total)
Level 2:        4 nodes  (7 total)
Level 3:        3 nodes  (10 total)

Array: [90, 75, 80, 50, 60, 70, 40, 30, 45, 20]
Indices: 0-9 (10 elements, no gaps)

Tree:
           90
          /  \\
        75    80
       / \\   / \\
      50 60 70 40
     / \\ /
    30 45 20`
      }
    ]
  },

  operations: {
    title: "Core Heap Operations",
    sections: [
      {
        operation: "Insert (with Heapify-Up)",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1) iterative | O(log n) recursive",

        description: `**How Insert Works:**
1. Add new element at the end of array (next available position)
2. This maintains complete binary tree property
3. May violate heap property
4. Fix by "bubbling up" (heapify-up/sift-up)

**Heapify-Up Process:**
• Compare new element with parent
• If heap property violated, swap with parent
• Repeat until heap property satisfied or reach root
• At most O(log n) swaps (height of tree)`,

        pseudocode: `function insert(heap, value):
    // Step 1: Add to end
    heap.append(value)
    index = heap.length - 1

    // Step 2: Heapify up
    heapifyUp(heap, index)

function heapifyUp(heap, index):
    while index > 0:
        parentIndex = (index - 1) / 2

        // For Max Heap
        if heap[index] > heap[parentIndex]:
            swap(heap[index], heap[parentIndex])
            index = parentIndex
        else:
            break  // Heap property satisfied

// For Min Heap, use < instead of >`,

        example: `Insert 85 into Max Heap: [90, 75, 80, 50, 60, 70, 40]

Step 1: Add to end
[90, 75, 80, 50, 60, 70, 40, 85]
                              ^^
           90
          /  \\
        75    80
       / \\   / \\
      50 60 70 40
     /
    85

Step 2: Compare with parent (50)
85 > 50? YES → Swap

[90, 75, 80, 85, 60, 70, 40, 50]
           90
          /  \\
        75    80
       / \\   / \\
      85 60 70 40
     /
    50

Step 3: Compare with parent (75)
85 > 75? YES → Swap

[90, 85, 80, 75, 60, 70, 40, 50]
           90
          /  \\
        85    80
       / \\   / \\
      75 60 70 40
     /
    50

Step 4: Compare with parent (90)
85 > 90? NO → STOP
Final heap property satisfied!`,

        visualization: `Heapify-Up Path:
Index:  7 → 3 → 1 → STOP
Value: 85   85   85
Swaps: 3 comparisons, 2 swaps
Height: log₂(8) = 3 levels`
      },

      {
        operation: "Extract Max/Min (with Heapify-Down)",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1) iterative | O(log n) recursive",

        description: `**How Extract Max/Min Works:**
1. Root contains max (max heap) or min (min heap)
2. Remove root and return its value
3. Move last element to root position
4. May violate heap property
5. Fix by "bubbling down" (heapify-down/sift-down)

**Heapify-Down Process:**
• Compare parent with both children
• Find larger child (max heap) or smaller child (min heap)
• If heap property violated, swap with appropriate child
• Repeat until heap property satisfied or reach leaf
• At most O(log n) swaps (height of tree)`,

        pseudocode: `function extractMax(heap):
    if heap.isEmpty():
        return null

    // Step 1: Save root value
    maxValue = heap[0]

    // Step 2: Move last element to root
    heap[0] = heap[heap.length - 1]
    heap.removeLastElement()

    // Step 3: Heapify down
    if heap.length > 0:
        heapifyDown(heap, 0)

    return maxValue

function heapifyDown(heap, index):
    size = heap.length

    while true:
        largest = index
        leftChild = 2 * index + 1
        rightChild = 2 * index + 2

        // Find largest among node and children (Max Heap)
        if leftChild < size and heap[leftChild] > heap[largest]:
            largest = leftChild

        if rightChild < size and heap[rightChild] > heap[largest]:
            largest = rightChild

        // If node is not largest, swap and continue
        if largest != index:
            swap(heap[index], heap[largest])
            index = largest
        else:
            break  // Heap property satisfied

// For Min Heap, find smallest instead of largest`,

        example: `Extract Max from: [90, 85, 80, 75, 60, 70, 40, 50]

Step 1: Remove root (90), save it
Return value: 90

Step 2: Move last element (50) to root
[50, 85, 80, 75, 60, 70, 40]
           50
          /  \\
        85    80
       / \\   / \\
      75 60 70 40

Step 3: Heapify down from root
Compare 50 with children 85 and 80
Largest child: 85
50 < 85? YES → Swap with 85

[85, 50, 80, 75, 60, 70, 40]
           85
          /  \\
        50    80
       / \\   / \\
      75 60 70 40

Step 4: Compare 50 with children 75 and 60
Largest child: 75
50 < 75? YES → Swap with 75

[85, 75, 80, 50, 60, 70, 40]
           85
          /  \\
        75    80
       / \\   / \\
      50 60 70 40

Step 5: Compare 50 with children (none)
No children → STOP
Heap property satisfied!

Final: [85, 75, 80, 50, 60, 70, 40]`,

        visualization: `Heapify-Down Path:
Index:  0 → 1 → 3 → STOP
Value: 50  50  50
Swaps: 85, 75
Total: 3 comparisons, 2 swaps`
      },

      {
        operation: "Peek (Get Max/Min)",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Peek Works:**
• Simply return root element (index 0)
• Don't remove it from heap
• Most efficient heap operation
• Useful for checking priority without removal`,

        pseudocode: `function peek(heap):
    if heap.isEmpty():
        return null
    return heap[0]  // Root element

function getMax(heap):  // For Max Heap
    return peek(heap)

function getMin(heap):  // For Min Heap
    return peek(heap)`,

        example: `Heap: [90, 85, 80, 75, 60, 70, 40, 50]

peek() → 90
Heap unchanged: [90, 85, 80, 75, 60, 70, 40, 50]

Use case: Check highest priority task without processing it`
      },

      {
        operation: "Build Heap (Heapify)",
        timeComplexity: "O(n) - surprisingly linear!",
        spaceComplexity: "O(1) for iterative (in-place)",

        description: `**How Build Heap Works:**
Convert unsorted array into valid heap efficiently.

**Two Approaches:**

**Approach 1: Repeated Insertion - O(n log n)**
• Start with empty heap
• Insert elements one by one
• Each insert: O(log n)
• Total: n × O(log n) = O(n log n)

**Approach 2: Bottom-Up Heapify - O(n) ⭐**
• Start with array as-is
• Work backwards from last non-leaf node
• Heapify-down each node
• Surprisingly O(n) - not O(n log n)!

**Why O(n) for bottom-up?**
• Most nodes are at bottom (leaves need no work)
• Only ~n/2 nodes need heapifying
• Average work per node is constant
• Mathematical proof: Σ(n/2^h × h) = O(n)`,

        pseudocode: `function buildHeap(array):
    n = array.length

    // Start from last non-leaf node
    // Last non-leaf = parent of last element
    startIndex = (n - 1) / 2

    // Heapify down all non-leaf nodes
    // Work backwards to root
    for i from startIndex down to 0:
        heapifyDown(array, i, n)

    return array

function heapifyDown(heap, index, heapSize):
    while true:
        largest = index
        leftChild = 2 * index + 1
        rightChild = 2 * index + 2

        if leftChild < heapSize and heap[leftChild] > heap[largest]:
            largest = leftChild

        if rightChild < heapSize and heap[rightChild] > heap[largest]:
            largest = rightChild

        if largest != index:
            swap(heap[index], heap[largest])
            index = largest
        else:
            break`,

        example: `Build Max Heap from: [50, 30, 20, 15, 10, 8, 16]

Initial array (not a heap):
         50
        /  \\
      30    20
     / \\   / \\
    15 10 8  16

Step 1: Find last non-leaf
Last element index: 6
Parent: ⌊(6-1)/2⌋ = 2
Start from index 2 (value 20)

Step 2: Heapify index 2 (20)
Children: 8, 16
Largest: 16
Swap 20 ↔ 16
[50, 30, 20, 15, 10, 8, 16] → [50, 30, 16, 15, 10, 8, 20]

Step 3: Heapify index 1 (30)
Children: 15, 10
Largest: 30 (no swap needed)

Step 4: Heapify index 0 (50)
Children: 30, 16
Largest: 50 (no swap needed)

Final Max Heap: [50, 30, 16, 15, 10, 8, 20]
         50
        /  \\
      30    16
     / \\   / \\
    15 10 8  20

Time: O(n) - not O(n log n)!`,

        complexityProof: `Why O(n) not O(n log n)?

Nodes at each level:
Level h | Nodes      | Max swaps | Work
0       | 1          | log n     | 1 × log n
1       | 2          | log n-1   | 2 × (log n-1)
2       | 4          | log n-2   | 4 × (log n-2)
...
log n   | n/2        | 0         | n/2 × 0 (leaves)

Total work: Σ(n/2^h × h) for h=0 to log n
= n × Σ(h/2^h)
= n × 2 (converging series)
= O(n)

Intuition: Most nodes (bottom) need little work,
few nodes (top) need lots of work.
The math works out to linear!`
      }
    ]
  },

  heapSort: {
    title: "Heap Sort Algorithm",

    description: `Heap Sort is a comparison-based sorting algorithm that uses a heap data structure.

**Algorithm Overview:**
1. Build a max heap from input array - O(n)
2. Repeatedly extract max and place at end - O(n log n)
3. Reduce heap size, maintain heap property

**Characteristics:**
• In-place sorting (O(1) extra space)
• Not stable (relative order not preserved)
• O(n log n) guaranteed worst case
• No best/worst case difference (always n log n)
• Not as fast as QuickSort in practice (cache issues)`,

    pseudocode: `function heapSort(array):
    n = array.length

    // Step 1: Build max heap - O(n)
    buildMaxHeap(array)

    // Step 2: Extract elements one by one - O(n log n)
    for i from n-1 down to 1:
        // Move current max to end
        swap(array[0], array[i])

        // Reduce heap size
        // Heapify root with reduced heap
        heapifyDown(array, 0, i)

    return array

function buildMaxHeap(array):
    n = array.length
    // Start from last non-leaf
    for i from (n-1)/2 down to 0:
        heapifyDown(array, i, n)

function heapifyDown(array, index, heapSize):
    while true:
        largest = index
        left = 2 * index + 1
        right = 2 * index + 2

        if left < heapSize and array[left] > array[largest]:
            largest = left

        if right < heapSize and array[right] > array[largest]:
            largest = right

        if largest != index:
            swap(array[index], array[largest])
            index = largest
        else:
            break`,

    example: `Sort array: [4, 10, 3, 5, 1]

Step 1: Build Max Heap
[4, 10, 3, 5, 1] → [10, 5, 3, 4, 1]
         10
        /  \\
       5    3
      / \\
     4   1

Step 2: Extract and heapify repeatedly

Iteration 1:
• Swap 10 (root) with 1 (last)
  [1, 5, 3, 4, 10]
         sorted ↑
• Heapify root in heap of size 4
  [5, 4, 3, 1 | 10]
       5
      / \\
     4   3
    /
   1

Iteration 2:
• Swap 5 with 1
  [1, 4, 3, 5, 10]
      sorted ↑
• Heapify root in heap of size 3
  [4, 1, 3 | 5, 10]
       4
      / \\
     1   3

Iteration 3:
• Swap 4 with 3
  [3, 1, 4, 5, 10]
   sorted ↑
• Heapify root in heap of size 2
  [3, 1 | 4, 5, 10]
       3
      /
     1

Iteration 4:
• Swap 3 with 1
  [1, 3, 4, 5, 10]
sorted ↑

Final Sorted: [1, 3, 4, 5, 10]`,

    complexity: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        explanation: `All cases O(n log n):
• Build heap: O(n)
• n-1 deletions, each O(log n)
• Total: O(n) + O(n log n) = O(n log n)
• No best case optimization (unlike QuickSort)`
      },

      space: {
        value: "O(1)",
        explanation: `In-place sorting:
• Uses input array as heap
• Only O(1) extra variables
• No recursion stack (iterative heapify)
• Better than MergeSort O(n) space`
      }
    },

    comparison: `Heap Sort vs Other Sorts:

QuickSort:
• Average: O(n log n) but faster in practice
• Worst: O(n²) - Heap Sort is better
• Cache-friendly - Heap Sort is not

Merge Sort:
• Always O(n log n) like Heap Sort
• Stable - Heap Sort is not
• O(n) space - Heap Sort is O(1)

Insertion Sort:
• O(n²) - Heap Sort much better for large n
• Stable - Heap Sort is not
• Better for small arrays

**When to use Heap Sort?**
✓ Guaranteed O(n log n) needed
✓ Space is limited (O(1) needed)
✓ Stability not required
✗ Not when cache performance critical
✗ Not when stability needed`
  },

  complexity: {
    title: "Time & Space Complexity Analysis",

    timeComplexity: {
      description: "Heap operations are efficient due to balanced tree structure",

      operations: {
        "Insert (Heapify-Up)": {
          complexity: "O(log n)",
          explanation: `At most log n levels to bubble up:
• Insert at bottom (level log n)
• May swap up to root (level 0)
• Each level: O(1) comparison and swap
• Total: O(log n) swaps`
        },

        "Extract Max/Min (Heapify-Down)": {
          complexity: "O(log n)",
          explanation: `At most log n levels to bubble down:
• Start at root (level 0)
• May swap down to leaf (level log n)
• Each level: O(1) comparisons and swap
• Total: O(log n) swaps`
        },

        "Peek (Get Max/Min)": {
          complexity: "O(1)",
          explanation: `Direct array access:
• Root always at index 0
• No comparisons needed
• Single array access`
        },

        "Build Heap": {
          complexity: "O(n)",
          explanation: `Bottom-up heapify:
• Not O(n log n) as might be expected!
• Most nodes at bottom need little work
• Mathematical proof: Σ(n/2^h × h) = O(n)
• More efficient than n insertions`
        },

        "Search": {
          complexity: "O(n)",
          explanation: `No efficient search in heap:
• Heap not designed for search
• No ordering between siblings
• Must check all nodes potentially
• Use BST or Hash Table for search`
        },

        "Delete Arbitrary Element": {
          complexity: "O(n) to find + O(log n) to delete = O(n)",
          explanation: `Two phases:
• Find element: O(n) linear search
• Delete: O(log n) heapify
• Total: O(n)
• Can optimize with index map to O(log n)`
        },

        "Heap Sort": {
          complexity: "O(n log n)",
          explanation: `Two phases:
• Build heap: O(n)
• n extractions: n × O(log n) = O(n log n)
• Total: O(n) + O(n log n) = O(n log n)`
        }
      }
    },

    spaceComplexity: {
      description: "Heap is memory efficient",

      storage: {
        title: "Storage Space",
        value: "O(n)",
        explanation: `Array storage:
• n elements in array
• No pointer overhead (vs tree nodes)
• Compact, contiguous memory
• Cache-friendly storage`
      },

      auxiliary: {
        title: "Auxiliary Space for Operations",
        iterative: "O(1)",
        recursive: "O(log n)",
        explanation: `Iterative implementations:
• Only constant variables needed
• No recursion stack
• O(1) auxiliary space

Recursive implementations:
• Stack depth = tree height = log n
• Each frame: O(1) space
• Total: O(log n) stack space`
      }
    },

    comparisonWithOthers: `Operation Time Complexity Comparison:

Data Structure | Insert  | Delete  | Get Max | Search | Build
---------------|---------|---------|---------|--------|-------
Max Heap       | O(log n)| O(log n)| O(1)    | O(n)   | O(n)
BST (balanced) | O(log n)| O(log n)| O(n)    | O(log n)| O(n log n)
Sorted Array   | O(n)    | O(n)    | O(1)    | O(log n)| O(n log n)
Unsorted Array | O(1)    | O(n)    | O(n)    | O(n)   | O(1)
Linked List    | O(1)    | O(n)    | O(n)    | O(n)   | O(1)

**Heap Advantages:**
• O(1) access to max/min (better than BST)
• O(log n) insert/delete (better than sorted array)
• O(n) build (better than sorted array)
• Space efficient (array-based)

**Heap Disadvantages:**
• O(n) search (worse than BST, sorted array)
• No efficient arbitrary delete without index
• Not cache-friendly for heap sort`
  },

  applications: {
    title: "Real-World Applications",

    useCases: [
      {
        application: "Priority Queue",
        description: `Most common use of heaps - efficiently manage prioritized tasks:
• Always access highest (or lowest) priority item in O(1)
• Add new items in O(log n)
• Remove highest priority in O(log n)

**Implementation:**
• Min Heap: Lower values = higher priority
• Max Heap: Higher values = higher priority
• Perfect for task scheduling, event simulation`,

        example: `Hospital Emergency Room:
• Priority = severity (1=critical, 10=minor)
• Use Min Heap (lowest number first)

Operations:
1. Patient arrives (severity 3) → insert(3) - O(log n)
2. Doctor ready → extractMin() - O(log n)
   Gets most critical patient
3. Check next severity → peek() - O(1)
   Don't remove, just check

Min Heap: [1, 2, 3, 5, 4, 6, 7]
Next patient: 1 (most critical)`,

        code: `class PriorityQueue {
    constructor() {
        this.heap = []
    }

    enqueue(value, priority) {
        this.heap.push({value, priority})
        this.heapifyUp(this.heap.length - 1)
    }

    dequeue() {
        if (this.isEmpty()) return null
        const max = this.heap[0]
        const last = this.heap.pop()
        if (this.heap.length > 0) {
            this.heap[0] = last
            this.heapifyDown(0)
        }
        return max.value
    }

    peek() {
        return this.isEmpty() ? null : this.heap[0].value
    }
}`
      },

      {
        application: "Heap Sort",
        description: `Efficient comparison-based sorting algorithm:
• Guaranteed O(n log n) time complexity
• O(1) space (in-place sorting)
• No worst-case O(n²) like QuickSort

**Process:**
1. Build max heap from array - O(n)
2. Repeatedly extract max to end - O(n log n)

**Use Cases:**
• When space is limited
• When predictable performance needed
• Systems programming (kernel, embedded)`,

        example: `Sort [5, 3, 8, 1, 9, 2]:

Step 1: Build heap
[9, 5, 8, 1, 3, 2]

Step 2-7: Extract max repeatedly
[2, 5, 8, 1, 3 | 9]
[3, 5, 2, 1 | 8, 9]
[1, 5, 2 | 3, 8, 9]
[2, 1 | 5, 3, 8, 9]
[1 | 2, 5, 3, 8, 9]
[1, 2, 3, 5, 8, 9] ← Sorted!`
      },

      {
        application: "Finding K Largest/Smallest Elements",
        description: `Efficiently find top K elements in large dataset:

**K Largest Elements - Use Min Heap of size K:**
• Maintain heap with K largest elements seen
• If new element > heap min, replace min
• Time: O(n log k)
• Space: O(k)

**K Smallest Elements - Use Max Heap of size K:**
• Maintain heap with K smallest elements seen
• If new element < heap max, replace max
• Time: O(n log k)
• Space: O(k)

**Why Efficient?**
• Don't need to sort entire array O(n log n)
• Only maintain K elements
• Much faster when k << n`,

        example: `Find 3 largest in [5, 3, 8, 1, 9, 2, 7]:

Use Min Heap (size 3):
Process 5: [5]
Process 3: [3, 5]
Process 8: [3, 5, 8]
Process 1: 1 < 3, skip → [3, 5, 8]
Process 9: 9 > 3, replace → [5, 8, 9]
Process 2: 2 < 5, skip → [5, 8, 9]
Process 7: 7 > 5, replace → [7, 8, 9]

Result: [7, 8, 9]
Time: O(n log k) = O(7 log 3) ≈ 11 operations
vs Full sort: O(n log n) = O(7 log 7) ≈ 20 operations`,

        code: `function findKLargest(arr, k) {
    // Min heap of size k
    const heap = new MinHeap()

    for (const num of arr) {
        if (heap.size() < k) {
            heap.insert(num)
        } else if (num > heap.peek()) {
            heap.extractMin()
            heap.insert(num)
        }
    }

    return heap.toArray()
}

// Time: O(n log k), Space: O(k)`
      },

      {
        application: "Median Finding (Running Median)",
        description: `Find median in stream of numbers efficiently:

**Two-Heap Approach:**
• Max Heap (left side): smaller half of numbers
• Min Heap (right side): larger half of numbers
• Maintain: |size_diff| ≤ 1

**Median Calculation:**
• Equal sizes: average of both tops
• Different sizes: top of larger heap

**Time Complexity:**
• Insert: O(log n)
• Get median: O(1)
• Better than sorting after each insert: O(n log n)`,

        example: `Stream: 5, 15, 1, 3, 8

After 5:
MaxHeap: [5]  MinHeap: []
Median: 5

After 15:
MaxHeap: [5]  MinHeap: [15]
Median: (5+15)/2 = 10

After 1:
MaxHeap: [5, 1]  MinHeap: [15]
Median: 5

After 3:
MaxHeap: [5, 3, 1]  MinHeap: [15]
Rebalance → MaxHeap: [3, 1]  MinHeap: [5, 15]
Median: (3+5)/2 = 4

After 8:
MaxHeap: [3, 1]  MinHeap: [5, 8, 15]
Rebalance → MaxHeap: [3, 1, 5]  MinHeap: [8, 15]
Median: 5`,

        visualization: `Visual after processing [5, 15, 1, 3, 8]:

Lower half (MaxHeap)    Upper half (MinHeap)
        5                      8
       / \\                   / \\
      3   1                 15

Median = 5 (top of larger heap)
Total numbers: 5 (odd count)`
      },

      {
        application: "Task Scheduling / CPU Scheduling",
        description: `Operating systems use heaps for scheduling:

**Process Scheduling:**
• Priority-based scheduling
• Min Heap: process with lowest priority value runs first
• Dynamic priority updates

**Task Deadlines:**
• Sort tasks by deadline (earliest first)
• Min Heap on deadline timestamp
• Always process most urgent task

**Load Balancing:**
• Assign tasks to least loaded server
• Min Heap of server loads
• O(log n) to find and update least loaded`,

        example: `CPU Scheduling with priorities:
Tasks: [(id=1, pri=3), (id=2, pri=1), (id=3, pri=5), (id=4, pri=2)]

Min Heap (priority):
        1(pri=1)
       /       \\
    4(pri=2)  3(pri=5)
    /
 2(pri=3)

Execution order: 2 → 4 → 1 → 3
O(log n) to get next task
O(log n) to add new task`
      },

      {
        application: "Graph Algorithms (Dijkstra, Prim)",
        description: `Heaps optimize shortest path and MST algorithms:

**Dijkstra's Shortest Path:**
• Min Heap of (distance, vertex) pairs
• Always process nearest unvisited vertex
• Extract min: O(log V)
• Update distances: O(log V)
• Total: O((V + E) log V)
• Without heap: O(V²)

**Prim's Minimum Spanning Tree:**
• Min Heap of (edge weight, vertex) pairs
• Always add cheapest edge to tree
• Similar complexity improvement

**Why Heap?**
• Efficiently find minimum distance vertex
• Dynamic updates as distances change
• Much faster than linear search`,

        example: `Dijkstra from A in graph:
    A --4-- B
    |       |
    2       1
    |       |
    C --5-- D

Min Heap operations:
1. Start: heap = [(0,A)]
2. Extract (0,A), add neighbors:
   heap = [(2,C), (4,B)]
3. Extract (2,C), add neighbors:
   heap = [(4,B), (7,D)]
4. Extract (4,B), update D:
   heap = [(5,D)]
5. Extract (5,D), done

Shortest paths: A→A=0, A→C=2, A→B=4, A→D=5`
      },

      {
        application: "Memory Management",
        description: `Heaps (different from heap data structure!) use heap algorithms:

**Free Block Management:**
• Track available memory blocks
• Max Heap by block size
• Quick allocation of largest block
• O(log n) to find and allocate

**Garbage Collection:**
• Priority queue of objects by reference count
• Process least-referenced first
• Efficient memory reclamation

**Memory Pools:**
• Maintain pools by size
• Heap to find best-fit pool
• O(log n) allocation`,

        example: `Free Memory Blocks:
[(addr=100, size=64), (addr=200, size=128),
 (addr=300, size=32), (addr=400, size=256)]

Max Heap by size:
        256
       /   \\
     128    32
     /
   64

Allocate 100 bytes:
1. peek() → 256 block (O(1))
2. extract() → 256 block (O(log n))
3. Split: use 100, return 156
4. insert(156) back to heap (O(log n))`
      },

      {
        application: "Event-Driven Simulation",
        description: `Simulate systems with discrete events:

**Event Queue:**
• Events sorted by timestamp
• Min Heap on event time
• Always process earliest event next
• Add future events dynamically

**Use Cases:**
• Network simulation
• Traffic simulation
• Game engines
• Discrete event simulation

**Efficiency:**
• O(1) to check next event time
• O(log n) to get next event
• O(log n) to schedule new event
• Better than sorting all events: O(n log n)`,

        example: `Network Packet Simulation:
Events: [(t=5, "send"), (t=2, "receive"),
         (t=8, "timeout"), (t=2, "ack")]

Min Heap (by time):
         2("receive")
        /            \\
    2("ack")       8("timeout")
    /
 5("send")

Process order: receive@2, ack@2, send@5, timeout@8

Each processed event may add new events:
receive@2 → schedule ack@4
O(log n) per event`
      }
    ]
  },

  interviewProblems: {
    title: "Common Interview Problems",

    problems: [
      {
        title: "1. Kth Largest Element in Array",
        difficulty: "Medium",
        leetcode: "LeetCode #215",
        description: "Find the kth largest element in an unsorted array",

        approach: `**Two Approaches:**

**Approach 1: Min Heap of size K**
• Maintain min heap with K largest elements
• Time: O(n log k), Space: O(k)
• Better when k << n

**Approach 2: QuickSelect**
• Partition-based selection (like QuickSort)
• Time: O(n) average, O(n²) worst
• Space: O(1)

**When to use which?**
• k small & multiple queries → Min Heap
• Single query & k large → QuickSelect`,

        solution: `// Approach 1: Min Heap
function findKthLargest(nums, k) {
    const minHeap = new MinHeap()

    for (const num of nums) {
        minHeap.insert(num)

        // Keep only k largest
        if (minHeap.size() > k) {
            minHeap.extractMin()
        }
    }

    // Root of min heap is kth largest
    return minHeap.peek()
}

// Time: O(n log k)
// Space: O(k)

// Example: [3, 2, 1, 5, 6, 4], k=2
// Result: 5 (2nd largest)`,

        example: `Find 3rd largest in [7, 10, 4, 3, 20, 15]:

Min Heap (size 3):
Process 7:  [7]
Process 10: [7, 10]
Process 4:  [4, 7, 10]
Process 3:  3 < 4, skip → [4, 7, 10]
Process 20: 20 > 4, remove 4 → [7, 10, 20]
Process 15: 15 > 7, remove 7 → [10, 15, 20]

Min Heap: [10, 15, 20]
3rd largest = 10 (heap root)`
      },

      {
        title: "2. Merge K Sorted Lists",
        difficulty: "Hard",
        leetcode: "LeetCode #23",
        description: "Merge k sorted linked lists into one sorted list",

        approach: `**Heap Approach:**
• Min heap of size k (one element from each list)
• Always extract minimum
• Add next element from that list
• Continue until all lists exhausted

**Why Efficient?**
• Only k elements in heap at a time
• Each extraction/insertion: O(log k)
• Total n elements: O(n log k)
• Much better than merging pairwise: O(nk)`,

        solution: `function mergeKLists(lists) {
    const minHeap = new MinHeap()
    const dummy = new ListNode(0)
    let current = dummy

    // Add first node from each list
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            minHeap.insert({
                value: lists[i].val,
                node: lists[i],
                listIndex: i
            })
        }
    }

    // Extract min and add next from same list
    while (!minHeap.isEmpty()) {
        const { node, listIndex } = minHeap.extractMin()

        // Add to result
        current.next = node
        current = current.next

        // Add next from same list
        if (node.next) {
            minHeap.insert({
                value: node.next.val,
                node: node.next,
                listIndex: listIndex
            })
        }
    }

    return dummy.next
}

// Time: O(n log k) where n = total nodes, k = lists
// Space: O(k) for heap`,

        example: `Merge 3 lists:
L1: 1 → 4 → 5
L2: 1 → 3 → 4
L3: 2 → 6

Min Heap operations:
1. Init: heap = [(1,L1), (1,L2), (2,L3)]
2. Extract (1,L1), add 4: heap = [(1,L2), (2,L3), (4,L1)]
3. Extract (1,L2), add 3: heap = [(2,L3), (3,L2), (4,L1)]
4. Extract (2,L3), add 6: heap = [(3,L2), (4,L1), (6,L3)]
5. Extract (3,L2), add 4: heap = [(4,L1), (4,L2), (6,L3)]
6. Extract (4,L1), add 5: heap = [(4,L2), (5,L1), (6,L3)]
7. Extract (4,L2): heap = [(5,L1), (6,L3)]
8. Extract (5,L1): heap = [(6,L3)]
9. Extract (6,L3): heap = []

Result: 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6`
      },

      {
        title: "3. Top K Frequent Elements",
        difficulty: "Medium",
        leetcode: "LeetCode #347",
        description: "Find k most frequent elements in array",

        approach: `**Approach 1: Min Heap of size K**
• Count frequencies with hash map: O(n)
• Use min heap of size k on frequencies
• Keep k most frequent
• Time: O(n log k)

**Approach 2: Bucket Sort**
• Count frequencies: O(n)
• Create buckets by frequency
• Collect top k from buckets
• Time: O(n)
• Better when k large`,

        solution: `// Approach 1: Min Heap
function topKFrequent(nums, k) {
    // Count frequencies
    const freqMap = new Map()
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1)
    }

    // Min heap on frequencies
    const minHeap = new MinHeap((a, b) => a.freq - b.freq)

    for (const [num, freq] of freqMap) {
        minHeap.insert({ num, freq })

        if (minHeap.size() > k) {
            minHeap.extractMin()
        }
    }

    // Extract results
    return minHeap.toArray().map(item => item.num)
}

// Time: O(n log k)
// Space: O(n) for map + O(k) for heap

// Approach 2: Bucket Sort - O(n)
function topKFrequentBucket(nums, k) {
    const freqMap = new Map()
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1)
    }

    // Buckets indexed by frequency
    const buckets = Array(nums.length + 1).fill(null).map(() => [])
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num)
    }

    // Collect top k from highest frequency
    const result = []
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i])
    }

    return result.slice(0, k)
}`,

        example: `nums = [1, 1, 1, 2, 2, 3], k = 2

Step 1: Count frequencies
{1: 3, 2: 2, 3: 1}

Step 2: Build min heap (size 2)
Process (1, freq=3): heap = [(1,3)]
Process (2, freq=2): heap = [(2,2), (1,3)]
Process (3, freq=1): 1 < 2, remove (2,2), add (3,1)
                     heap = [(3,1), (1,3)]

Wait, wrong! Let's fix:
heap = [(2,2), (1,3)]
Process (3, freq=1): 1 < 2, skip
Final heap = [(2,2), (1,3)]

Result: [1, 2] (most frequent)`
      },

      {
        title: "4. Find Median from Data Stream",
        difficulty: "Hard",
        leetcode: "LeetCode #295",
        description: "Design data structure to find median from running stream",

        approach: `**Two-Heap Strategy:**
• Max Heap (left): smaller half of numbers
• Min Heap (right): larger half of numbers
• Balance: keep size difference ≤ 1

**Operations:**
• addNum(num): O(log n)
  - Add to appropriate heap
  - Rebalance if needed
• findMedian(): O(1)
  - If equal sizes: average of tops
  - If different: top of larger heap`,

        solution: `class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap()  // Left half (smaller)
        this.minHeap = new MinHeap()  // Right half (larger)
    }

    addNum(num) {
        // Add to max heap first
        if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
            this.maxHeap.insert(num)
        } else {
            this.minHeap.insert(num)
        }

        // Rebalance: size difference at most 1
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.insert(this.maxHeap.extractMax())
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.insert(this.minHeap.extractMin())
        }
    }

    findMedian() {
        if (this.maxHeap.size() === this.minHeap.size()) {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2
        } else {
            return this.maxHeap.peek()
        }
    }
}

// Time: addNum O(log n), findMedian O(1)
// Space: O(n)`,

        example: `Stream: [5, 15, 1, 3]

After 5:
maxHeap: [5]     minHeap: []
Median: 5

After 15:
maxHeap: [5]     minHeap: [15]
Median: (5+15)/2 = 10

After 1:
Add to maxHeap: [5, 1]
Rebalance: move 5 to minHeap
maxHeap: [1]     minHeap: [5, 15]
Balance again: move 5 back
maxHeap: [5, 1]  minHeap: [15]
Median: 5

After 3:
maxHeap: [5, 3, 1]  minHeap: [15]
Rebalance: move 5 to minHeap
maxHeap: [3, 1]     minHeap: [5, 15]
Median: (3+5)/2 = 4

Visualization:
Lower [3, 1] | Upper [5, 15]
Max=3        | Min=5
Median = (3+5)/2 = 4`
      },

      {
        title: "5. Reorganize String / Task Scheduler",
        difficulty: "Medium",
        leetcode: "LeetCode #767, #621",
        description: "Rearrange string so no two adjacent characters are same",

        approach: `**Greedy with Max Heap:**
• Count character frequencies
• Max heap on frequencies
• Always pick most frequent character
• Pick next most frequent as alternate
• Continue until heap empty

**Why It Works:**
• Most frequent first prevents blocking
• Alternating ensures no adjacency
• If impossible, detect early (freq > (n+1)/2)`,

        solution: `function reorganizeString(s) {
    // Count frequencies
    const freqMap = new Map()
    for (const char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1)
    }

    // Max heap on frequencies
    const maxHeap = new MaxHeap((a, b) => a.freq - b.freq)
    for (const [char, freq] of freqMap) {
        maxHeap.insert({ char, freq })
    }

    // Build result
    const result = []
    let prev = null  // Previously used character

    while (!maxHeap.isEmpty()) {
        // Get most frequent
        const current = maxHeap.extractMax()
        result.push(current.char)

        // Add back previous (with decremented freq)
        if (prev && prev.freq > 0) {
            maxHeap.insert(prev)
        }

        // Update current as previous
        current.freq--
        prev = current
    }

    // Check if valid reorganization
    return result.length === s.length ? result.join('') : ""
}

// Time: O(n log k) where k = unique characters
// Space: O(k)`,

        example: `Reorganize "aab":

Step 1: Count frequencies
{a: 2, b: 1}

Step 2: Build max heap
heap = [(a,2), (b,1)]

Step 3: Build result
1. Extract (a,2): result = "a", prev = (a,1)
   heap = [(b,1)]

2. Extract (b,1): result = "ab", add prev (a,1)
   heap = [(a,1)], prev = (b,0)

3. Extract (a,1): result = "aba", prev = (a,0)
   heap = []

Result: "aba" ✓ (no adjacent same)

Example of impossible: "aaab"
{a: 3, b: 1}
3 > (4+1)/2 → impossible!`
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Implementation Tips",

    tips: [
      {
        category: "Implementation",
        points: [
          "Use 0-based indexing: parent=(i-1)/2, left=2i+1, right=2i+2",
          "Always maintain heap property after insert/delete",
          "Check bounds before accessing children: leftChild < heapSize",
          "Use iterative heapify to avoid stack overflow on large heaps",
          "Implement both min and max heap with comparison function parameter",
          "Handle edge cases: empty heap, single element, duplicate values"
        ]
      },

      {
        category: "Index Calculations",
        points: [
          "Parent index: Math.floor((i - 1) / 2) or (i - 1) >> 1",
          "Left child: 2 * i + 1 or (i << 1) + 1",
          "Right child: 2 * i + 2 or (i << 1) + 2",
          "Last non-leaf: Math.floor((n - 1) / 2) or (n - 1) >> 1",
          "Use bit shifting for performance (optional): >> 1 instead of / 2",
          "Remember: leaf nodes are from n/2 to n-1"
        ],

        example: `// Generic parent/child functions
function parent(i) { return Math.floor((i - 1) / 2) }
function leftChild(i) { return 2 * i + 1 }
function rightChild(i) { return 2 * i + 2 }
function isLeaf(i, n) { return i >= Math.floor(n / 2) }

// Check bounds before access
if (leftChild(i) < heap.length) {
    // Safe to access left child
}`
      },

      {
        category: "Comparison Functions",
        points: [
          "Generic heap: accept comparator function",
          "Max heap comparator: (a, b) => a > b",
          "Min heap comparator: (a, b) => a < b",
          "Custom objects: compare by specific property",
          "Consistent comparison: use <= or >= (not both)",
          "Handle null/undefined values appropriately"
        ],

        example: `// Generic heap with comparator
class Heap {
    constructor(comparator = (a, b) => a > b) {
        this.heap = []
        this.comparator = comparator
    }

    shouldSwap(i, j) {
        return this.comparator(this.heap[i], this.heap[j])
    }
}

// Use cases:
const maxHeap = new Heap((a, b) => a > b)
const minHeap = new Heap((a, b) => a < b)
const taskHeap = new Heap((a, b) => a.priority > b.priority)`
      },

      {
        category: "Optimization",
        points: [
          "Build heap bottom-up O(n) instead of repeated insertion O(n log n)",
          "Use array swap instead of multiple assignments",
          "Iterative heapify preferred over recursive (no stack overhead)",
          "Cache array length in loops",
          "For priority queue: maintain index map for O(log n) arbitrary delete",
          "Use typed arrays for numeric heaps (better performance)"
        ],

        example: `// Efficient swap
function swap(heap, i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]]
}

// Cache length
function heapifyDown(heap, i) {
    const n = heap.length  // Cache once
    while (true) {
        // Use cached length
    }
}

// Index map for priority queue
class PriorityQueue {
    constructor() {
        this.heap = []
        this.indexMap = new Map()  // value → index
    }

    delete(value) {
        const i = this.indexMap.get(value)
        // Now O(log n) instead of O(n)
    }
}`
      },

      {
        category: "Testing",
        points: [
          "Test with empty heap",
          "Test with single element",
          "Test with duplicates",
          "Test with already sorted (ascending/descending)",
          "Verify heap property after each operation",
          "Test boundary indices (0, n-1, n/2)",
          "Stress test with large random data",
          "Test with custom objects and comparators"
        ],

        example: `// Verify heap property
function isValidHeap(heap, isMaxHeap = true) {
    for (let i = 0; i < Math.floor(heap.length / 2); i++) {
        const left = 2 * i + 1
        const right = 2 * i + 2

        if (isMaxHeap) {
            if (left < heap.length && heap[i] < heap[left]) return false
            if (right < heap.length && heap[i] < heap[right]) return false
        } else {
            if (left < heap.length && heap[i] > heap[left]) return false
            if (right < heap.length && heap[i] > heap[right]) return false
        }
    }
    return true
}

// Test cases
const tests = [
    [],                    // Empty
    [42],                  // Single
    [5, 5, 5],            // Duplicates
    [1, 2, 3, 4, 5],      // Ascending
    [5, 4, 3, 2, 1]       // Descending
]`
      },

      {
        category: "Common Pitfalls",
        points: [
          "Don't use heap for search operations - O(n), use BST or hash table",
          "Don't forget to update heap size after extract",
          "Don't access children without bounds check",
          "Don't mix 0-based and 1-based indexing formulas",
          "Don't assume heap is sorted (only root is min/max)",
          "Don't use heap when simple sort suffices (small data)",
          "Do maintain complete binary tree property",
          "Do use build heap O(n) for initialization, not repeated insert",
          "Do consider iterative implementation for production code"
        ]
      }
    ]
  },

  comparison: {
    title: "Heap vs Other Data Structures",

    comparisons: [
      {
        structure: "Heap (Max/Min)",
        getMax: "O(1)",
        insert: "O(log n)",
        delete: "O(log n)",
        search: "O(n)",
        buildFromArray: "O(n)",
        sorted: "No - only root is max/min",
        notes: "Best for priority queue, efficient max/min access"
      },

      {
        structure: "BST (Balanced)",
        getMax: "O(log n) - rightmost",
        insert: "O(log n)",
        delete: "O(log n)",
        search: "O(log n)",
        buildFromArray: "O(n log n)",
        sorted: "Yes - in-order traversal",
        notes: "Good for search, range queries, sorted traversal"
      },

      {
        structure: "Sorted Array",
        getMax: "O(1) - last element",
        insert: "O(n) - shifting",
        delete: "O(n) - shifting",
        search: "O(log n) - binary search",
        buildFromArray: "O(n log n) - sort",
        sorted: "Yes - always sorted",
        notes: "Good for static data, binary search"
      },

      {
        structure: "Unsorted Array",
        getMax: "O(n) - linear scan",
        insert: "O(1) - append",
        delete: "O(n) - find + shift",
        search: "O(n) - linear",
        buildFromArray: "O(1) - copy",
        sorted: "No",
        notes: "Fast insert, slow everything else"
      },

      {
        structure: "Hash Table",
        getMax: "O(n) - scan all",
        insert: "O(1) average",
        delete: "O(1) average",
        search: "O(1) average",
        buildFromArray: "O(n)",
        sorted: "No - unordered",
        notes: "Best for lookup by key, no ordering"
      },

      {
        structure: "Balanced BST (AVL, Red-Black)",
        getMax: "O(log n)",
        insert: "O(log n)",
        delete: "O(log n)",
        search: "O(log n)",
        buildFromArray: "O(n log n)",
        sorted: "Yes",
        notes: "Guaranteed balance, all operations O(log n)"
      }
    ],

    whenToUseHeap: `**Use Heap when you need:**
• Fast access to maximum or minimum element - O(1)
• Dynamic insertion with moderate efficiency - O(log n)
• Priority queue implementation
• Top K elements from large dataset - O(n log k)
• Median from data stream - two heaps
• Event scheduling by time/priority
• Graph algorithms (Dijkstra, Prim)
• Don't need to search for arbitrary elements

**Don't use Heap when:**
• Need fast search for arbitrary elements → Use BST or Hash Table
• Need sorted traversal → Use BST
• Need range queries → Use BST
• Data is static and small → Use sorted array
• Need fast arbitrary delete without index → Use BST with parent pointers`,

    heapVsBST: {
      title: "Detailed: Heap vs BST",
      content: `**Heap Advantages:**
✓ O(1) access to max/min (BST: O(log n))
✓ O(n) build from array (BST: O(n log n))
✓ Simple array implementation (BST: node pointers)
✓ Better memory locality (cache-friendly)
✓ No rebalancing needed (complete tree by definition)

**BST Advantages:**
✓ O(log n) search (Heap: O(n))
✓ Sorted traversal (Heap: no order except root)
✓ Range queries (Heap: not supported)
✓ Successor/predecessor (Heap: not efficient)
✓ All elements accessible efficiently (Heap: only root)

**Choose Heap for:**
• Priority queues
• Repeated max/min extraction
• Top K problems
• Scheduling algorithms

**Choose BST for:**
• Search operations
• Range queries
• Sorted data access
• All-round balanced performance`,

      example: `Scenario: Process tasks by priority

Heap approach:
insert(task, priority) → O(log n)
getHighestPriority()   → O(1)
processNext()          → O(log n)
✓ Perfect for this use case

BST approach:
insert(task, priority) → O(log n)
getHighestPriority()   → O(log n) (find rightmost)
processNext()          → O(log n)
✗ Slower for getting max, but can search efficiently`
    }
  }
};
