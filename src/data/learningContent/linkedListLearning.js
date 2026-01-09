// ============= src/data/learningContent/linkedListLearning.js =============
// Comprehensive learning content for Linked List Data Structure

export const linkedListLearningContent = {
  introduction: {
    title: "What is a Linked List?",
    content: `A Linked List is a linear data structure where elements (called nodes) are stored in non-contiguous memory locations. Each node contains data and a reference (pointer) to the next node in the sequence.

**Key Properties:**
• Dynamic size - grows and shrinks at runtime
• Non-contiguous memory allocation
• Efficient insertion and deletion (O(1) when position is known)
• Sequential access - must traverse from head
• No random access like arrays (O(n) to access element at index)
• Extra memory for storing pointers

**What Makes Linked Lists Special?**
Unlike arrays with fixed size and contiguous memory, linked lists use dynamic memory allocation. Each element (node) points to the next, forming a chain. This makes insertion and deletion extremely efficient at known positions, but sacrifices random access capability.

**Why Use Linked Lists?**
• Dynamic memory allocation - no need to specify size upfront
• Efficient O(1) insertion/deletion at beginning or known positions
• No memory waste from pre-allocation
• Foundation for implementing stacks, queues, and graphs
• Useful when size changes frequently`,

    visualExample: {
      description: "Singly Linked List Structure",
      diagram: `
    HEAD
     |
     v
┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
│ 10 │  ──┼───>│ 20 │  ──┼───>│ 30 │  ──┼───>│ 40 │ NULL│
└────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘
  Node 1         Node 2         Node 3         Node 4

Each node contains:
• Data: The actual value (10, 20, 30, 40)
• Next: Pointer/reference to the next node
• Last node points to NULL (end of list)

Memory layout (non-contiguous):
Node 1: Memory address 1000
Node 2: Memory address 2050  (not adjacent!)
Node 3: Memory address 1500
Node 4: Memory address 3000

Compare with Array (contiguous):
[10][20][30][40]
└────────────────┘
  Adjacent memory
      `
    },

    nodeStructure: {
      title: "Node Structure",
      content: `**Basic Node Definition:**
\`\`\`javascript
class Node {
    constructor(data) {
        this.data = data;      // The value stored
        this.next = null;      // Reference to next node
    }
}
\`\`\`

**Node Components:**
• **Data Field**: Stores the actual value (integer, string, object, etc.)
• **Next Pointer**: Reference to the next node in the list
• **Null Terminator**: Last node's next pointer is null

**Memory Visualization:**
Each node is an independent object in memory:

Node object at address 1000:
┌──────────────┐
│ data: 10     │
│ next: 2050 ──┼──> Points to next node
└──────────────┘

Node object at address 2050:
┌──────────────┐
│ data: 20     │
│ next: 1500 ──┼──> Points to next node
└──────────────┘`
    }
  },

  fundamentals: {
    title: "Linked List Fundamentals",
    sections: [
      {
        subtitle: "1. Head and Tail Pointers",
        content: `**Head Pointer:**
• Points to the first node in the list
• Entry point for all operations
• If head is null, list is empty
• Critical for traversal - all operations start here

**Tail Pointer (Optional):**
• Points to the last node in the list
• Makes append operation O(1) instead of O(n)
• Useful for queue implementation
• Must be maintained during insertions/deletions

**Empty List:**
\`\`\`
head = null
tail = null
\`\`\`

**Single Node:**
\`\`\`
head -> [10 | null]
tail -> [10 | null]
(both point to same node)
\`\`\`

**Multiple Nodes:**
\`\`\`
head -> [10 | next] -> [20 | next] -> [30 | null] <- tail
\`\`\``,

        example: `Linked List with head and tail:

    head                                      tail
     |                                         |
     v                                         v
┌────┬────┐    ┌────┬────┐    ┌────┬────┐
│ 10 │  ──┼───>│ 20 │  ──┼───>│ 30 │ NULL│
└────┴────┘    └────┴────┘    └────┴────┘

Operations:
• Insert at head: O(1) - just update head pointer
• Insert at tail: O(1) with tail pointer, O(n) without
• Delete at head: O(1) - move head to next node
• Delete at tail: O(n) - need to find second-to-last node`
      },

      {
        subtitle: "2. Traversal",
        content: `**Traversal Process:**
Traversal means visiting each node from head to tail sequentially.

**Why Traversal is Necessary:**
• No random access like arrays (can't jump to arr[5])
• Must follow next pointers from head
• O(n) time complexity to reach any specific node
• Required for search, display, and many operations

**Traversal Steps:**
1. Start at head node
2. Process current node's data
3. Move to next node (current = current.next)
4. Repeat until reaching null
5. Null indicates end of list

**Key Points:**
• Always check for null before accessing node
• Save next pointer before deleting current node
• Traversal modifies pointer variable, not the list itself`,

        pseudocode: `function traverse(head):
    current = head

    while current is not null:
        print(current.data)      // Process node
        current = current.next   // Move to next

    print("End of list")

// Time Complexity: O(n) where n = number of nodes
// Space Complexity: O(1) - only uses current pointer`,

        example: `Traversal example:
List: 10 -> 20 -> 30 -> null

Step 1: current = head (points to 10)
        Print: 10

Step 2: current = current.next (points to 20)
        Print: 20

Step 3: current = current.next (points to 30)
        Print: 30

Step 4: current = current.next (null)
        Exit loop

Output: 10, 20, 30

Common traversal mistake:
❌ while current.next != null:  // Misses last node!
✓ while current != null:        // Correct`
      },

      {
        subtitle: "3. Memory Management",
        content: `**Dynamic Memory Allocation:**
• Nodes created at runtime using new/malloc
• Memory allocated on demand
• No need to specify size upfront
• Grows and shrinks as needed

**Advantages over Arrays:**
• No wasted pre-allocated space
• No resizing overhead (like dynamic arrays)
• Can grow until system memory is exhausted
• Efficient memory utilization

**Disadvantages:**
• Extra memory for pointers (4-8 bytes per node)
• Non-contiguous = poor cache locality
• Memory fragmentation possible
• No memory layout optimization

**Memory Comparison:**

Array storing 4 integers (contiguous):
[10][20][30][40]
Memory: 4 × 4 bytes = 16 bytes

Linked List storing 4 integers (non-contiguous):
[10|next][20|next][30|next][40|null]
Memory: 4 × (4 + 8) bytes = 48 bytes
(3x more memory due to pointers!)`,

        memoryLayout: `Array memory layout (contiguous):
Address  Value
1000:    10
1004:    20
1008:    30
1012:    40
└── All adjacent, cache-friendly

Linked List memory layout (scattered):
Address  Data  Next
1000:    10    2500  <- Node 1 (head)
2500:    20    1800  <- Node 2
1800:    30    3200  <- Node 3
3200:    40    null  <- Node 4
└── Scattered across memory, cache-unfriendly

**Cache Performance:**
• Array: Loading one element loads nearby elements (spatial locality)
• Linked List: Each node access may be a cache miss
• Result: Arrays 2-10x faster for sequential access despite same O(n)`
      }
    ]
  },

  types: {
    title: "Types of Linked Lists",

    sections: [
      {
        type: "Singly Linked List",
        description: `**Definition:**
Each node has one pointer to the next node. Traversal is unidirectional (forward only).

**Structure:**
\`\`\`javascript
class Node {
    data: any
    next: Node
}
\`\`\`

**Characteristics:**
• One direction traversal (head to tail)
• Cannot traverse backward
• Less memory per node (one pointer)
• Simpler implementation
• Most common type`,

        visualization: `Singly Linked List:

head
 |
 v
[10|·]-->[20|·]-->[30|·]-->[40|null]

Forward traversal: ✓ Possible
Backward traversal: ❌ Not possible

Operations:
• Insert at head: O(1)
• Insert at tail: O(n) without tail pointer, O(1) with tail
• Delete at head: O(1)
• Delete at tail: O(n) - must find previous node
• Search: O(n)
• Access by index: O(n)`,

        useCases: `Use Singly Linked List when:
✓ Only forward traversal needed
✓ Memory is constrained
✓ Implementing stack (LIFO)
✓ Implementing queue with tail pointer
✓ Simple undo functionality
✓ Polynomial representation

Examples:
• Browser forward history
• Music playlist (next song)
• Image carousel (next image)
• Undo stack (most recent first)`
      },

      {
        type: "Doubly Linked List",
        description: `**Definition:**
Each node has two pointers: one to the next node and one to the previous node. Bidirectional traversal.

**Structure:**
\`\`\`javascript
class Node {
    data: any
    next: Node
    prev: Node
}
\`\`\`

**Characteristics:**
• Bidirectional traversal (forward and backward)
• Can traverse backward without recursion
• More memory per node (two pointers)
• Easier deletion (no need to track previous)
• More complex implementation`,

        visualization: `Doubly Linked List:

      head                                    tail
       |                                       |
       v                                       v
null<-[·|10|·]<-->[·|20|·]<-->[·|30|·]<-->[·|40|·]->null
      prev data next

Each node has:
• data: The value
• next: Pointer to next node
• prev: Pointer to previous node

Forward traversal: ✓ Possible (using next)
Backward traversal: ✓ Possible (using prev)

Operations:
• Insert at head: O(1)
• Insert at tail: O(1) with tail pointer
• Delete at head: O(1)
• Delete at tail: O(1) with tail pointer
• Delete given node: O(1) - no need to find previous!
• Search: O(n) but can search from both ends`,

        advantages: `**Advantages over Singly Linked List:**

1. **Bidirectional Traversal:**
   • Can move forward and backward
   • Useful for navigation (prev/next buttons)
   • Can traverse from nearest end

2. **Easier Deletion:**
   • Delete node in O(1) when node reference is given
   • No need to traverse to find previous node
   • Example: Remove item from cache (node reference known)

3. **Easier Implementation of Some Operations:**
   • Insert before given node: O(1) vs O(n)
   • Reverse traversal: O(n) vs requiring recursion
   • Deque (double-ended queue) implementation

**Disadvantages:**
• Extra memory for prev pointer (50% more pointers)
• More complex maintenance (update both next and prev)
• Slightly slower operations due to extra pointer updates`,

        useCases: `Use Doubly Linked List when:
✓ Need bidirectional traversal
✓ Implementing deque (double-ended queue)
✓ Browser navigation (back/forward)
✓ LRU cache implementation
✓ Undo/redo functionality
✓ Music player (prev/next song)

Real-world examples:
• Browser back/forward navigation
• Photo gallery (prev/next)
• Text editor undo/redo
• Navigation history in apps
• Card deck in games`
      },

      {
        type: "Circular Linked List",
        description: `**Definition:**
Last node points back to the head (or first node) instead of null, forming a circle.

**Types:**
1. **Circular Singly Linked List:** Last node's next points to head
2. **Circular Doubly Linked List:** Last node's next points to head, head's prev points to last

**Characteristics:**
• No null terminator - no "end" of list
• Can start traversal from any node
• Useful for round-robin scheduling
• Needs careful handling to avoid infinite loops
• Requires a stop condition (count or sentinel node)`,

        visualization: `Circular Singly Linked List:

    head
     |
     v
┌──>[10|·]-->[20|·]-->[30|·]-->[40|·]
│    ^                            |
│    └────────────────────────────┘
└─── Circular connection

No null pointer! Last node points to head.

Traversal with stop condition:
function traverse(head):
    if head is null:
        return

    current = head
    do:
        print(current.data)
        current = current.next
    while current != head  // Stop when back to head

Circular Doubly Linked List:

     head
      |
      v
┌───>[·|10|·]<-->[·|20|·]<-->[·|30|·]<───┐
│     ^                            |      │
│     └────────────────────────────┘      │
└──────────────────────────────────────────┘
   Both directions are circular!`,

        advantages: `**Advantages:**
• No null checks needed during traversal
• Any node can be starting point
• Useful for round-robin algorithms
• Efficient for cyclic operations
• No need for special "end" handling

**Disadvantages:**
• Risk of infinite loops if not handled carefully
• More complex termination conditions
• Slightly more complex insertion/deletion
• Debugging is harder (no clear end)`,

        useCases: `Use Circular Linked List when:
✓ Round-robin scheduling (CPU, tasks)
✓ Multiplayer games (turn-based)
✓ Circular buffer implementation
✓ Josephus problem
✓ Playlist repeat mode

Real-world examples:
• Operating system process scheduling
• Multiplayer turn management
• Music playlist on repeat
• Round-robin tournament scheduling
• Circular buffer for streaming data

Classic problem - Josephus Problem:
N people in circle, eliminate every kth person
Perfect use case for circular linked list!`
      }
    ],

    comparisonTable: `**Comparison Table:**

Feature              Singly    Doubly    Circular
───────────────────────────────────────────────────────────
Pointers per node    1         2         1 or 2
Memory overhead      Low       High      Low/High
Forward traversal    Yes       Yes       Yes
Backward traversal   No        Yes       No (singly)
Insert at head       O(1)      O(1)      O(1)
Insert at tail       O(n)/O(1) O(1)      O(1)
Delete given node    O(n)      O(1)      O(n)/O(1)
Find previous        O(n)      O(1)      O(n)
End detection        null      null      head
Implementation       Simple    Complex   Moderate

Memory per node (64-bit system):
• Singly: data + 1 pointer = 8-16 bytes
• Doubly: data + 2 pointers = 16-24 bytes
• Circular: Same as base type + complexity`
  },

  operations: {
    title: "Linked List Operations",

    sections: [
      {
        operation: "Insert at Head (Beginning)",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Insert at Head Works:**
1. Create a new node with given data
2. Set new node's next to current head
3. Update head to point to new node
4. If list was empty, new node is also tail

**Why O(1)?**
• Only updates head pointer
• No traversal needed
• Fixed number of operations
• Independent of list size`,

        pseudocode: `function insertAtHead(head, data):
    // Create new node
    newNode = new Node(data)

    // Point new node to current head
    newNode.next = head

    // Update head to new node
    head = newNode

    return head  // Return new head

// Time: O(1) - constant operations
// Space: O(1) - one new node`,

        visualExample: `Insert 5 at head of list: 10 -> 20 -> 30

Step 1: Create new node
        ┌────┬────┐
        │ 5  │ ?  │
        └────┴────┘

Step 2: Point new node to current head
        ┌────┬────┐
        │ 5  │  ──┼───> [10]-> 20 -> 30
        └────┴────┘

Step 3: Update head pointer
  head
   |
   v
┌────┬────┐    ┌────┬────┐
│ 5  │  ──┼───>│ 10 │  ──┼───> 20 -> 30
└────┴────┘    └────┴────┘

Result: 5 -> 10 -> 20 -> 30

Edge case - Empty list:
head = null
Insert 5:
head -> [5 | null]`,

        code: `// JavaScript implementation
insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;

    // If list was empty, new node is also tail
    if (this.tail === null) {
        this.tail = newNode;
    }

    this.size++;
}

// Common mistake: Not handling empty list for tail
❌ Always update head only
✓ Update tail when list is empty`
      },

      {
        operation: "Insert at Tail (End)",
        timeComplexity: "O(n) without tail pointer, O(1) with tail pointer",
        spaceComplexity: "O(1)",

        description: `**How Insert at Tail Works:**

**Without Tail Pointer (O(n)):**
1. Traverse to last node (while current.next != null)
2. Create new node
3. Set last node's next to new node

**With Tail Pointer (O(1)):**
1. Create new node
2. Set current tail's next to new node
3. Update tail to new node

**Trade-off:**
• Without tail: O(n) insert, no extra memory
• With tail: O(1) insert, extra pointer to maintain`,

        pseudocode: `// Without tail pointer (O(n))
function insertAtTail(head, data):
    newNode = new Node(data)

    if head is null:
        return newNode  // New node becomes head

    // Traverse to last node
    current = head
    while current.next is not null:
        current = current.next

    // Insert at end
    current.next = newNode
    return head

// Time: O(n) - must traverse entire list
// Space: O(1)

// With tail pointer (O(1))
function insertAtTailOptimized(head, tail, data):
    newNode = new Node(data)

    if head is null:
        head = newNode
        tail = newNode
    else:
        tail.next = newNode
        tail = newNode

    return (head, tail)

// Time: O(1) - direct access to tail
// Space: O(1)`,

        visualExample: `Insert 40 at tail: 10 -> 20 -> 30

Method 1: Without tail pointer (O(n))
Step 1: Traverse to last node
        current
           |
           v
10 -> 20 -> 30 (current.next = null, found last!)

Step 2: Create and link new node
10 -> 20 -> 30 -> [40|null]

Method 2: With tail pointer (O(1))
                     tail
                      |
                      v
10 -> 20 -> 30 -> [40|null]
                   ^
                   |
              Update tail

Result: 10 -> 20 -> 30 -> 40

Comparison for 1000 nodes:
• Without tail: 1000 steps to reach end
• With tail: 1 step (direct access)`,

        comparison: `Queue implementation comparison:

Without tail pointer:
• enqueue (insert at tail): O(n) - poor!
• dequeue (remove at head): O(1)
• Total for n operations: O(n²) - terrible!

With tail pointer:
• enqueue (insert at tail): O(1) - great!
• dequeue (remove at head): O(1)
• Total for n operations: O(n) - optimal!

Conclusion: Always use tail pointer for queue!`
      },

      {
        operation: "Insert at Position",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",

        description: `**How Insert at Position Works:**
1. Traverse to node before desired position (position - 1)
2. Create new node
3. Set new node's next to current node's next
4. Set current node's next to new node

**Key Points:**
• Position is 0-indexed or 1-indexed (be consistent!)
• Requires traversal to position O(n)
• Special cases: position 0 (head), position n (tail)
• Must validate position is within bounds`,

        pseudocode: `function insertAtPosition(head, data, position):
    // Special case: insert at head (position 0)
    if position == 0:
        return insertAtHead(head, data)

    // Traverse to node before position
    current = head
    for i from 0 to position - 2:
        if current is null:
            throw "Position out of bounds"
        current = current.next

    if current is null:
        throw "Position out of bounds"

    // Insert new node
    newNode = new Node(data)
    newNode.next = current.next
    current.next = newNode

    return head

// Time: O(n) - worst case traverse to end
// Space: O(1) - one new node`,

        visualExample: `Insert 25 at position 2 in list: 10 -> 20 -> 30 -> 40

Position:  0    1    2    3
List:     10   20   30   40

Step 1: Traverse to position 1 (before position 2)
        current
           |
           v
        10 -> 20 -> 30 -> 40

Step 2: Create new node [25]

Step 3: Link new node
        10 -> 20 -> 25 -> 30 -> 40
                     ^
                    new

Detailed steps:
        current
           |
           v
        10 -> 20 -----> 30 -> 40
               |         ^
               |         |
               +-> 25 ---+
                   new

Result: 10 -> 20 -> 25 -> 30 -> 40
Position: 0    1    2    3    4

Important: Order matters!
✓ newNode.next = current.next  (link new to next)
✓ current.next = newNode        (link current to new)

❌ current.next = newNode        (link current to new first)
❌ newNode.next = current.next   (loses reference!)`,

        edgeCases: `Edge cases to handle:

1. Insert at head (position 0):
   Use insertAtHead()

2. Insert at tail (position = size):
   Use insertAtTail()

3. Empty list (head = null):
   Only position 0 is valid

4. Position out of bounds:
   Throw error or return false

5. Negative position:
   Throw error or return false

Example validation:
function insertAtPosition(head, data, pos):
    if pos < 0:
        throw "Position cannot be negative"

    if head is null and pos > 0:
        throw "List is empty"

    // ... rest of implementation`
      },

      {
        operation: "Delete at Head",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Delete at Head Works:**
1. Check if list is empty
2. Save reference to head (for return value)
3. Update head to head.next
4. Clear old head's next pointer (optional, for garbage collection)
5. Return deleted data

**Why O(1)?**
• Only updates head pointer
• No traversal needed
• Fixed number of operations`,

        pseudocode: `function deleteAtHead(head):
    // Check if list is empty
    if head is null:
        throw "Cannot delete from empty list"

    // Save data to return
    deletedData = head.data

    // Move head to next node
    head = head.next

    // If list is now empty, update tail
    if head is null:
        tail = null

    return deletedData

// Time: O(1) - constant operations
// Space: O(1) - no extra space`,

        visualExample: `Delete head from list: 10 -> 20 -> 30 -> 40

Step 1: Original list
head
 |
 v
[10]-> 20 -> 30 -> 40

Step 2: Move head to next node
       head
        |
        v
[10]   20 -> 30 -> 40
 X  (orphaned, garbage collected)

Step 3: Result
head
 |
 v
20 -> 30 -> 40

Deleted: 10
Result: 20 -> 30 -> 40

Edge case - Single node:
head -> [10|null]

After deletion:
head -> null (empty list)
tail -> null

Edge case - Empty list:
head -> null
Attempting to delete throws error!`,

        implementation: `// JavaScript implementation
deleteAtHead() {
    if (this.head === null) {
        throw new Error("Cannot delete from empty list");
    }

    const deletedData = this.head.data;
    this.head = this.head.next;

    // Update tail if list becomes empty
    if (this.head === null) {
        this.tail = null;
    }

    this.size--;
    return deletedData;
}

// Memory note: In garbage-collected languages (Java, JS, Python),
// orphaned nodes are automatically freed.
// In C/C++, must manually call free()/delete.`
      },

      {
        operation: "Delete at Tail",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",

        description: `**How Delete at Tail Works:**
1. Traverse to second-to-last node
2. Save last node's data
3. Set second-to-last node's next to null
4. Update tail pointer to second-to-last node
5. Return deleted data

**Why O(n)?**
• Must traverse entire list to find second-to-last node
• Even with tail pointer, need previous node
• Singly linked list has no backward traversal
• Doubly linked list can do this in O(1)!

**Key Challenge:**
The tail pointer alone isn't enough. We need the node BEFORE tail, which requires traversal in singly linked list.`,

        pseudocode: `function deleteAtTail(head):
    // Empty list
    if head is null:
        throw "Cannot delete from empty list"

    // Single node (head is also tail)
    if head.next is null:
        deletedData = head.data
        head = null
        tail = null
        return deletedData

    // Traverse to second-to-last node
    current = head
    while current.next.next is not null:
        current = current.next

    // Delete last node
    deletedData = current.next.data
    current.next = null
    tail = current

    return deletedData

// Time: O(n) - must traverse to second-to-last
// Space: O(1) - only pointer variables`,

        visualExample: `Delete tail from list: 10 -> 20 -> 30 -> 40

Step 1: Find second-to-last node
                     current
                        |
                        v
        10 -> 20 -> 30 -> 40
                          ^
                         tail

Stop when: current.next.next == null

Step 2: Delete last node
        10 -> 20 -> 30 -> [40]
                     |     X
                     +-> null

Step 3: Update tail
        10 -> 20 -> 30
                     ^
                    tail

Result: 10 -> 20 -> 30
Deleted: 40

Traversal steps:
List length 4: 3 steps to second-to-last
List length 1000: 999 steps to second-to-last
O(n) complexity`,

        improvement: `**Doubly Linked List Improvement:**

Singly Linked List (O(n)):
head -> [10]-> [20]-> [30]-> [40]<- tail
Must traverse from head to find previous

Doubly Linked List (O(1)):
        [10]<->[20]<->[30]<->[40]<- tail
                       ^      |
                       +------+
                     tail.prev

Simply use tail.prev to access second-to-last!

Function for doubly linked list:
function deleteAtTailDoubly(tail):
    if tail is null:
        return null

    deletedData = tail.data

    if tail.prev is null:  // Single node
        head = null
        tail = null
    else:
        tail = tail.prev
        tail.next = null

    return deletedData

// Time: O(1) - direct access via tail.prev
// Space: O(1)`
      },

      {
        operation: "Delete by Value",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",

        description: `**How Delete by Value Works:**
1. Traverse list to find node with target value
2. Keep track of previous node
3. When found, link previous node to next node
4. Handle special case: deleting head

**Why O(n)?**
• Must search for value (average n/2 comparisons)
• Worst case: value is at tail or not found
• Must traverse to find the node`,

        pseudocode: `function deleteByValue(head, target):
    // Empty list
    if head is null:
        return null

    // Deleting head
    if head.data == target:
        return head.next

    // Search for target
    prev = head
    current = head.next

    while current is not null:
        if current.data == target:
            // Found! Link previous to next
            prev.next = current.next

            // Update tail if deleting last node
            if current.next is null:
                tail = prev

            return head  // Return unchanged head

        prev = current
        current = current.next

    // Value not found
    return head

// Time: O(n) - worst case traverse entire list
// Space: O(1) - only pointer variables`,

        visualExample: `Delete value 30 from list: 10 -> 20 -> 30 -> 40

Step 1: Traverse to find 30
        prev    current
         |         |
         v         v
        10 -> 20 -> 30 -> 40

Step 2: When found, bypass node
        prev         current
         |             |
         v             v
        10 -> 20 ----> 30 -> 40
               |       X    ^
               +-----------+

Step 3: Result
        10 -> 20 -> 40

Deleted: 30

Special case - Delete head (10):
head    current
 |         |
 v         v
10 -> 20 -> 30 -> 40

No previous node! Simply:
head = head.next

Result: 20 -> 30 -> 40

Special case - Value not found:
Search for 50 in: 10 -> 20 -> 30 -> 40
Traverse entire list, current becomes null
Return original list unchanged`,

        implementation: `// JavaScript implementation
deleteByValue(target) {
    if (this.head === null) {
        return false;
    }

    // Deleting head
    if (this.head.data === target) {
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.size--;
        return true;
    }

    // Search for target
    let prev = this.head;
    let current = this.head.next;

    while (current !== null) {
        if (current.data === target) {
            prev.next = current.next;

            // Update tail if deleting last node
            if (current.next === null) {
                this.tail = prev;
            }

            this.size--;
            return true;
        }

        prev = current;
        current = current.next;
    }

    return false;  // Not found
}

// Tip: Return boolean to indicate success/failure
// Alternative: Return deleted node or null`
      },

      {
        operation: "Search / Find",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",

        description: `**How Search Works:**
1. Start at head
2. Compare current node's data with target
3. If match, return true/node/index
4. If not match, move to next node
5. If reach null, target not found

**Why O(n)?**
• Must check each node sequentially
• No random access or binary search
• Even if list is sorted, still O(n)
• Average case: n/2 comparisons`,

        pseudocode: `function search(head, target):
    current = head
    index = 0

    while current is not null:
        if current.data == target:
            return index  // Found at index

        current = current.next
        index++

    return -1  // Not found

// Alternative: Return node instead of index
function findNode(head, target):
    current = head

    while current is not null:
        if current.data == target:
            return current  // Return node reference
        current = current.next

    return null

// Time: O(n) - worst case check all nodes
// Space: O(1) - only tracking variables`,

        example: `Search for 30 in list: 10 -> 20 -> 30 -> 40

Step 1: current = 10, index = 0
        10 != 30, continue

Step 2: current = 20, index = 1
        20 != 30, continue

Step 3: current = 30, index = 2
        30 == 30, return 2 ✓

Comparisons: 3
Result: Found at index 2

Search for 50 (not in list):
Step 1: 10 != 50, continue
Step 2: 20 != 50, continue
Step 3: 30 != 50, continue
Step 4: 40 != 50, continue
Step 5: null reached

Comparisons: 4
Result: Not found, return -1

Comparison with array:
Unsorted array: O(n) - same as linked list
Sorted array: O(log n) with binary search
Linked list: O(n) even if sorted! (no random access)`
      }
    ],

    operationSummary: `**Operation Complexity Summary:**

Operation                 Singly LL    Doubly LL    Array
─────────────────────────────────────────────────────────────
Insert at head            O(1)         O(1)         O(n)
Insert at tail            O(n)/O(1)*   O(1)         O(1)**
Insert at position        O(n)         O(n)         O(n)
Delete at head            O(1)         O(1)         O(n)
Delete at tail            O(n)         O(1)         O(1)
Delete by value           O(n)         O(n)         O(n)
Search by value           O(n)         O(n)         O(n)
Access by index           O(n)         O(n)         O(1)

* O(1) with tail pointer, O(n) without
** Amortized O(1) for dynamic arrays

**Memory:**
Singly LL: n × (data + 1 pointer)
Doubly LL: n × (data + 2 pointers)
Array: n × data (contiguous)

**When to Use:**
• Linked List: Frequent insertions/deletions, unknown size
• Array: Frequent random access, known size, cache-friendly`
  },

  complexity: {
    title: "Complexity Analysis",

    timeComplexity: {
      subtitle: "Time Complexity Details",

      operations: {
        insertion: {
          title: "Insertion Complexity",
          content: `**At Head: O(1)**
• Create node: O(1)
• Update pointers: O(1)
• Total: O(1) - constant time
• Independent of list size

**At Tail:**
• Without tail pointer: O(n)
  - Traverse to end: O(n)
  - Insert: O(1)
  - Total: O(n)

• With tail pointer: O(1)
  - Direct access to tail: O(1)
  - Insert: O(1)
  - Total: O(1)

**At Position k: O(k)**
• Traverse to position k-1: O(k)
• Insert: O(1)
• Total: O(k)
• Worst case (k=n): O(n)
• Average case: O(n/2) = O(n)`,

          example: `For list with 1000 nodes:

Insert at head:
Operations: 2 (create, link)
Time: constant

Insert at tail (no tail pointer):
Operations: 1000 (traverse) + 2 (link)
Time: 1002 steps

Insert at tail (with tail pointer):
Operations: 2 (create, link)
Time: constant

Insert at position 500:
Operations: 500 (traverse) + 2 (link)
Time: 502 steps`
        },

        deletion: {
          title: "Deletion Complexity",
          content: `**At Head: O(1)**
• Update head: O(1)
• No traversal needed
• Always constant time

**At Tail: O(n)**
• Must find second-to-last node: O(n)
• Update pointers: O(1)
• Total: O(n)
• Cannot be improved in singly linked list
• Doubly linked list can do O(1)

**By Value: O(n)**
• Search for value: O(n) worst case
• Delete: O(1)
• Total: O(n)
• Must traverse to find value

**At Position k: O(k)**
• Traverse to position k-1: O(k)
• Delete: O(1)
• Total: O(k)`,

          comparison: `Deletion comparison:

Singly Linked List:
• Delete head: O(1)
• Delete tail: O(n) - need previous
• Delete middle: O(n) - need to find

Doubly Linked List:
• Delete head: O(1)
• Delete tail: O(1) - have prev pointer
• Delete middle: O(n) to find, O(1) to delete

Array:
• Delete head: O(n) - shift all elements
• Delete tail: O(1)
• Delete middle: O(n) - shift elements`
        },

        access: {
          title: "Access/Search Complexity",
          content: `**Access by Index: O(n)**
• Must traverse from head
• No direct access like arrays
• For index k: O(k) traversal
• Worst case (last element): O(n)

**Search by Value: O(n)**
• Linear search only
• No random access for binary search
• Must check each node sequentially
• Average case: O(n/2) = O(n)
• Worst case: O(n)

**Why Can't We Use Binary Search?**
Even if sorted, linked list requires O(n) to access middle element!

Binary search requires:
1. Access middle element: O(1) in array, O(n) in linked list
2. Recursively search half: T(n/2)

Recurrence for linked list:
T(n) = O(n) + T(n/2) = O(n)
Still O(n)! Binary search doesn't help.`,

          example: `Access performance (1000 nodes):

Array:
• Access index 500: 1 operation
• Access index 999: 1 operation
• Any index: O(1)

Linked List:
• Access index 500: 500 operations
• Access index 999: 999 operations
• Average: ~500 operations

Search performance (sorted, 1000 nodes):
Array (binary search): ~10 comparisons
Linked List (linear): ~500 comparisons average

Linked lists are not suitable for frequent random access!`
        }
      }
    },

    spaceComplexity: {
      subtitle: "Space Complexity Analysis",

      content: `**Storage Space: O(n)**

Singly Linked List:
• Per node: data + next pointer
• Total: n × (sizeof(data) + sizeof(pointer))
• Example: n integers = n × (4 + 8) = 12n bytes

Doubly Linked List:
• Per node: data + next + prev pointers
• Total: n × (sizeof(data) + 2 × sizeof(pointer))
• Example: n integers = n × (4 + 16) = 20n bytes

Array:
• Per element: data only
• Total: n × sizeof(data)
• Example: n integers = n × 4 = 4n bytes

**Comparison for 1000 integers:**
• Array: 4KB
• Singly Linked List: 12KB (3x)
• Doubly Linked List: 20KB (5x)`,

      auxiliarySpace: `**Auxiliary Space for Operations:**

Iterative operations: O(1)
• Insertion: O(1)
• Deletion: O(1)
• Search: O(1)
• Only use pointer variables

Recursive operations: O(n)
• Recursive traversal: O(n) stack space
• Recursive reverse: O(n) stack space
• Each recursive call adds to stack

Example - Recursive vs Iterative:

Recursive traverse: O(n) space
function traverse(node):
    if node is null:
        return
    print(node.data)
    traverse(node.next)  // n recursive calls

Iterative traverse: O(1) space
function traverse(node):
    while node is not null:
        print(node.data)
        node = node.next  // Only one pointer`,

      memoryOverhead: `**Memory Overhead Analysis:**

For n = 1,000,000 elements (integers):

Array:
• Data: 4MB
• Overhead: ~0MB (just data)
• Total: 4MB

Singly Linked List:
• Data: 4MB
• Pointers: 8MB (64-bit system)
• Overhead: 8MB (200% overhead!)
• Total: 12MB

Doubly Linked List:
• Data: 4MB
• Pointers: 16MB
• Overhead: 16MB (400% overhead!)
• Total: 20MB

**Trade-off:**
• Linked lists use 3-5x more memory
• But: No wasted pre-allocated space
• But: Dynamic size, efficient insert/delete
• Arrays: Memory efficient but fixed size

**When Memory Matters:**
• Embedded systems: Prefer arrays (less memory)
• Large datasets: Consider memory overhead
• Frequent insertions: Linked list worth it
• Static data: Arrays more efficient`
    }
  },

  applications: {
    title: "Real-World Applications of Linked Lists",

    useCases: [
      {
        application: "Implementing Stack and Queue",
        description: `Linked lists are perfect for implementing stacks and queues due to efficient insertion/deletion.

**Stack using Linked List:**
• Push: Insert at head - O(1)
• Pop: Delete at head - O(1)
• Peek: Access head - O(1)
• No size limit (dynamic)

**Queue using Linked List:**
• Enqueue: Insert at tail - O(1) with tail pointer
• Dequeue: Delete at head - O(1)
• Front: Access head - O(1)
• No size limit (dynamic)

**Advantages over Array:**
• No overflow (dynamic size)
• No need to shift elements
• No wasted space from pre-allocation`,

        implementation: `Stack implementation:
class Stack {
    constructor() {
        this.head = null;
    }

    push(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    pop() {
        if (this.head === null) throw "Empty";
        const data = this.head.data;
        this.head = this.head.next;
        return data;
    }

    peek() {
        if (this.head === null) throw "Empty";
        return this.head.data;
    }
}

Queue implementation:
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(data) {
        const newNode = new Node(data);
        if (this.tail) {
            this.tail.next = newNode;
        } else {
            this.head = newNode;
        }
        this.tail = newNode;
    }

    dequeue() {
        if (this.head === null) throw "Empty";
        const data = this.head.data;
        this.head = this.head.next;
        if (this.head === null) this.tail = null;
        return data;
    }
}

All operations: O(1)!`
      },

      {
        application: "Undo/Redo Functionality",
        description: `Linked lists are ideal for implementing undo/redo in text editors, graphic applications, and IDEs.

**Why Linked Lists?**
• Dynamic history size
• Efficient insertion/deletion
• No need to shift elements
• Can implement with doubly linked list

**Undo Implementation:**
• Each action stored as node
• Current position tracked
• Undo: Move to previous node
• Redo: Move to next node
• New action: Insert after current, delete rest`,

        example: `Text editor undo/redo:

Initial state: ""
Type "Hello": "Hello"
Type " World": "Hello World"
Type "!": "Hello World!"

History as doubly linked list:
null <- [""] <-> ["Hello"] <-> ["Hello World"] <-> ["Hello World!"] -> null
                                                            ^
                                                        current

Undo (Ctrl+Z):
Move to previous: "Hello World"
null <- [""] <-> ["Hello"] <-> ["Hello World"] <-> ["Hello World!"] -> null
                                        ^
                                    current

Redo (Ctrl+Y):
Move to next: "Hello World!"

New action after undo:
Current: "Hello World"
Type "...": "Hello World..."
null <- [""] <-> ["Hello"] <-> ["Hello World"] <-> ["Hello World..."] -> null
                                                            ^
                                                        current
(Old "Hello World!" deleted)

Doubly linked list allows O(1) undo/redo!`
      },

      {
        application: "Music/Video Playlist",
        description: `Media players use linked lists (often circular doubly linked) for playlist management.

**Features:**
• Next song/video: Move to next node - O(1)
• Previous song/video: Move to prev node (doubly) - O(1)
• Repeat mode: Circular linked list
• Add to playlist: Insert at tail - O(1)
• Remove from playlist: Delete node - O(1)
• Shuffle: Reorder nodes

**Circular Doubly Linked List:**
Perfect for continuous playback with repeat`,

        implementation: `Playlist implementation:

class Song {
    constructor(title) {
        this.title = title;
        this.next = null;
        this.prev = null;
    }
}

class Playlist {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    addSong(title) {
        const song = new Song(title);
        if (!this.head) {
            this.head = song;
            this.tail = song;
            this.current = song;
            // Circular
            song.next = song;
            song.prev = song;
        } else {
            song.prev = this.tail;
            song.next = this.head;
            this.tail.next = song;
            this.head.prev = song;
            this.tail = song;
        }
    }

    nextSong() {
        if (this.current) {
            this.current = this.current.next;
            return this.current.title;
        }
    }

    previousSong() {
        if (this.current) {
            this.current = this.current.prev;
            return this.current.title;
        }
    }
}

// All operations O(1)!
playlist.addSong("Song A");
playlist.addSong("Song B");
playlist.addSong("Song C");

playlist.nextSong();      // Song B
playlist.nextSong();      // Song C
playlist.nextSong();      // Song A (circular!)
playlist.previousSong();  // Song C`
      },

      {
        application: "Browser History (Back/Forward)",
        description: `Web browsers use doubly linked lists to implement navigation history.

**Navigation:**
• Visit page: Insert new page, delete forward history
• Back button: Move to previous node
• Forward button: Move to next node
• Current page: Tracked with pointer

**Doubly Linked List:**
Allows efficient bidirectional navigation`,

        example: `Browser history:

Visit google.com:
[google.com]
     ^
  current

Visit youtube.com:
[google.com] <-> [youtube.com]
                       ^
                    current

Visit twitter.com:
[google.com] <-> [youtube.com] <-> [twitter.com]
                                         ^
                                      current

Back button (←):
[google.com] <-> [youtube.com] <-> [twitter.com]
                       ^
                    current

Back button (←):
[google.com] <-> [youtube.com] <-> [twitter.com]
      ^
   current

Forward button (→):
[google.com] <-> [youtube.com] <-> [twitter.com]
                       ^
                    current

Visit reddit.com (deletes forward history):
[google.com] <-> [youtube.com] <-> [reddit.com]
                                         ^
                                      current
(twitter.com deleted!)

All operations: O(1) with doubly linked list`
      },

      {
        application: "Image Viewer (Next/Previous)",
        description: `Image galleries and photo viewers use linked lists for navigation.

**Features:**
• Next image: Move to next node
• Previous image: Move to prev node
• Slideshow: Traverse list automatically
• Add/remove images: Dynamic operations
• Circular mode: Loop back to first image

**Circular Doubly Linked List:**
Seamless navigation in both directions`,

        implementation: `Image viewer:

class ImageViewer {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    addImage(path) {
        const node = new Node(path);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.current = node;
            // Circular
            node.next = node;
            node.prev = node;
        } else {
            node.prev = this.tail;
            node.next = this.head;
            this.tail.next = node;
            this.head.prev = node;
            this.tail = node;
        }
    }

    nextImage() {
        if (this.current) {
            this.current = this.current.next;
            return this.current.data;
        }
    }

    previousImage() {
        if (this.current) {
            this.current = this.current.prev;
            return this.current.data;
        }
    }

    deleteCurrentImage() {
        if (!this.current) return;

        if (this.current === this.current.next) {
            // Single image
            this.head = null;
            this.tail = null;
            this.current = null;
        } else {
            const prev = this.current.prev;
            const next = this.current.next;
            prev.next = next;
            next.prev = prev;
            this.current = next;

            if (this.current === this.head) {
                this.head = next;
            }
        }
    }
}`
      },

      {
        application: "LRU Cache Implementation",
        description: `Least Recently Used (LRU) cache uses doubly linked list + hash map for O(1) operations.

**Data Structure:**
• Doubly linked list: Maintains order (most recent to least recent)
• Hash map: Quick access to nodes

**Operations:**
• Get: Move accessed node to front (most recent) - O(1)
• Put: Add to front, remove from tail if full - O(1)

**Why Doubly Linked List?**
• Move node to front: O(1) with prev/next pointers
• Remove node (LRU): O(1) at tail
• Hash map provides O(1) access to any node`,

        implementation: `LRU Cache implementation:

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();  // key -> node
        this.head = new Node();  // dummy head
        this.tail = new Node();  // dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) return -1;

        const node = this.map.get(key);
        // Move to front (most recently used)
        this.removeNode(node);
        this.addToFront(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            // Update existing
            const node = this.map.get(key);
            node.value = value;
            this.removeNode(node);
            this.addToFront(node);
        } else {
            // Add new
            const node = new Node(key, value);
            this.map.set(key, node);
            this.addToFront(node);

            // Check capacity
            if (this.map.size > this.capacity) {
                // Remove LRU (tail)
                const lru = this.tail.prev;
                this.removeNode(lru);
                this.map.delete(lru.key);
            }
        }
    }

    addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

// All operations O(1)!
// Used in:
// • CPU cache
// • Database buffer pool
// • Web page cache
// • CDN caching`
      }
    ],

    summary: `**When to Use Linked Lists:**

✓ Frequent insertions/deletions at beginning
✓ Unknown or dynamic size
✓ No need for random access
✓ Implementing stack or queue
✓ Undo/redo functionality
✓ Music/video playlists
✓ Browser history
✓ LRU cache

**When NOT to Use Linked Lists:**

❌ Need random access (use array)
❌ Need fast search (use hash table or BST)
❌ Memory constrained (arrays more efficient)
❌ Need cache-friendly access (arrays better)
❌ Small, fixed-size data (arrays simpler)`
  },

  interviewProblems: {
    title: "Common Linked List Interview Problems",

    problems: [
      {
        title: "1. Reverse a Linked List",
        difficulty: "Easy-Medium",
        description: "Reverse the direction of a singly linked list. Example: 1->2->3->4 becomes 4->3->2->1",

        approach: `**Iterative Approach (Recommended):**
• Use three pointers: prev, current, next
• Traverse list, reversing next pointers
• Time: O(n), Space: O(1)

**Recursive Approach:**
• Base case: null or single node
• Recursively reverse rest of list
• Fix pointers on return
• Time: O(n), Space: O(n) for recursion stack

**Key Insight:**
Must save next pointer before reversing, otherwise lose reference!`,

        solution: `// Iterative approach (preferred)
function reverseList(head):
    prev = null
    current = head

    while current is not null:
        // Save next node
        next = current.next

        // Reverse pointer
        current.next = prev

        // Move forward
        prev = current
        current = next

    return prev  // New head

// Time: O(n), Space: O(1)

// Recursive approach
function reverseListRecursive(head):
    // Base cases
    if head is null or head.next is null:
        return head

    // Reverse rest of list
    newHead = reverseListRecursive(head.next)

    // Fix pointers
    head.next.next = head  // Next node points back to head
    head.next = null       // Old next becomes null

    return newHead

// Time: O(n), Space: O(n) for recursion`,

        visualExample: `Original: 1 -> 2 -> 3 -> 4 -> null

Iterative reversal step by step:

Initial:
prev = null, current = 1
1 -> 2 -> 3 -> 4 -> null

Step 1: Reverse 1
null <- 1    2 -> 3 -> 4 -> null
        ^    ^
       prev  current

Step 2: Reverse 2
null <- 1 <- 2    3 -> 4 -> null
             ^    ^
            prev  current

Step 3: Reverse 3
null <- 1 <- 2 <- 3    4 -> null
                  ^    ^
                 prev  current

Step 4: Reverse 4
null <- 1 <- 2 <- 3 <- 4
                       ^
                      prev (new head)

Result: 4 -> 3 -> 2 -> 1 -> null`
      },

      {
        title: "2. Detect Cycle in Linked List",
        difficulty: "Easy",
        description: "Determine if a linked list has a cycle (a node points back to a previous node)",

        approach: `**Floyd's Cycle Detection (Tortoise and Hare):**
• Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
• If there's a cycle, fast will eventually catch up to slow
• If fast reaches null, no cycle exists
• Time: O(n), Space: O(1)

**Hash Set Approach:**
• Store visited nodes in set
• If we visit a node twice, cycle exists
• Time: O(n), Space: O(n)

**Key Insight:**
If there's a cycle, fast pointer will lap slow pointer like runners on a track!`,

        solution: `// Floyd's Cycle Detection (optimal)
function hasCycle(head):
    if head is null or head.next is null:
        return false

    slow = head
    fast = head

    while fast is not null and fast.next is not null:
        slow = slow.next           // Move 1 step
        fast = fast.next.next      // Move 2 steps

        if slow == fast:           // Pointers meet
            return true            // Cycle detected!

    return false  // Fast reached end, no cycle

// Time: O(n), Space: O(1)

// Hash set approach
function hasCycleHashSet(head):
    seen = new Set()
    current = head

    while current is not null:
        if seen.has(current):
            return true  // Visited before, cycle!

        seen.add(current)
        current = current.next

    return false

// Time: O(n), Space: O(n)`,

        visualExample: `List with cycle:

1 -> 2 -> 3 -> 4
          ^    |
          |    v
          6 <- 5

Tortoise and Hare simulation:

Start:
slow = 1, fast = 1

After 1 iteration:
slow = 2, fast = 3

After 2 iterations:
slow = 3, fast = 5

After 3 iterations:
slow = 4, fast = 3

After 4 iterations:
slow = 5, fast = 5  ← Meet! Cycle detected!

Why it works:
• In cycle, fast catches up to slow
• Fast gains 1 position per iteration
• Eventually they must meet

List without cycle:
1 -> 2 -> 3 -> 4 -> null

fast reaches null, no cycle!`
      },

      {
        title: "3. Find Middle of Linked List",
        difficulty: "Easy",
        description: "Find the middle node of a linked list. For even length, return second middle node.",

        approach: `**Two Pointer Approach (Tortoise and Hare):**
• Use slow (1 step) and fast (2 steps) pointers
• When fast reaches end, slow is at middle
• Time: O(n), Space: O(1)

**Two Pass Approach:**
• First pass: Count length
• Second pass: Traverse to middle (length/2)
• Time: O(n), Space: O(1)
• Less efficient (two passes)

**Key Insight:**
When fast moves 2x speed of slow, slow is at middle when fast reaches end!`,

        solution: `// Two pointer approach (optimal)
function findMiddle(head):
    if head is null:
        return null

    slow = head
    fast = head

    while fast is not null and fast.next is not null:
        slow = slow.next
        fast = fast.next.next

    return slow  // Slow is at middle

// Time: O(n), Space: O(1)

// Two pass approach
function findMiddleTwoPass(head):
    // Count length
    length = 0
    current = head
    while current is not null:
        length++
        current = current.next

    // Find middle
    middle = length / 2
    current = head
    for i from 0 to middle - 1:
        current = current.next

    return current

// Time: O(n), Space: O(1)`,

        visualExample: `Odd length list: 1 -> 2 -> 3 -> 4 -> 5

Start:
slow = 1, fast = 1

Iteration 1:
slow = 2, fast = 3

Iteration 2:
slow = 3, fast = 5

Iteration 3:
fast.next = null, stop
slow = 3  ← Middle!

Even length list: 1 -> 2 -> 3 -> 4

Start:
slow = 1, fast = 1

Iteration 1:
slow = 2, fast = 3

Iteration 2:
slow = 3, fast = null (end)
slow = 3  ← Second middle!

Result: For even length, returns second middle node`
      },

      {
        title: "4. Merge Two Sorted Linked Lists",
        difficulty: "Easy",
        description: "Merge two sorted linked lists into one sorted list. Example: [1,2,4] + [1,3,4] = [1,1,2,3,4,4]",

        approach: `**Iterative Approach with Dummy Node:**
• Create dummy node as starting point
• Compare nodes from both lists
• Attach smaller node to result
• Move pointer of list with smaller node
• Time: O(n + m), Space: O(1)

**Recursive Approach:**
• Base cases: one list is null
• Choose smaller node as head
• Recursively merge rest
• Time: O(n + m), Space: O(n + m) for recursion

**Key Insight:**
Dummy node simplifies edge cases (no need to track head separately)`,

        solution: `// Iterative with dummy node (preferred)
function mergeTwoLists(l1, l2):
    // Create dummy node
    dummy = new Node(0)
    current = dummy

    while l1 is not null and l2 is not null:
        if l1.data <= l2.data:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next

    // Attach remaining nodes
    if l1 is not null:
        current.next = l1
    if l2 is not null:
        current.next = l2

    return dummy.next  // Skip dummy

// Time: O(n + m), Space: O(1)

// Recursive approach
function mergeTwoListsRecursive(l1, l2):
    // Base cases
    if l1 is null:
        return l2
    if l2 is null:
        return l1

    // Choose smaller and recurse
    if l1.data <= l2.data:
        l1.next = mergeTwoListsRecursive(l1.next, l2)
        return l1
    else:
        l2.next = mergeTwoListsRecursive(l1, l2.next)
        return l2

// Time: O(n + m), Space: O(n + m)`,

        visualExample: `Merge: l1 = 1 -> 2 -> 4, l2 = 1 -> 3 -> 4

Step 1: Compare 1 and 1
dummy -> 1(l1)
l1 = 2, l2 = 1

Step 2: Compare 2 and 1
dummy -> 1(l1) -> 1(l2)
l1 = 2, l2 = 3

Step 3: Compare 2 and 3
dummy -> 1 -> 1 -> 2(l1)
l1 = 4, l2 = 3

Step 4: Compare 4 and 3
dummy -> 1 -> 1 -> 2 -> 3(l2)
l1 = 4, l2 = 4

Step 5: Compare 4 and 4
dummy -> 1 -> 1 -> 2 -> 3 -> 4(l1)
l1 = null, l2 = 4

Step 6: Attach remaining
dummy -> 1 -> 1 -> 2 -> 3 -> 4 -> 4(l2)

Result: 1 -> 1 -> 2 -> 3 -> 4 -> 4`
      },

      {
        title: "5. Remove Nth Node From End",
        difficulty: "Medium",
        description: "Remove the nth node from the end of the list. Example: Remove 2nd from end of 1->2->3->4->5 gives 1->2->3->5",

        approach: `**Two Pointer Approach (One Pass):**
• Use two pointers: fast and slow
• Move fast n steps ahead
• Move both pointers until fast reaches end
• Slow will be at (n-1)th node from end
• Delete slow.next
• Time: O(n), Space: O(1)

**Two Pass Approach:**
• First pass: Count length L
• Second pass: Remove (L - n)th node from start
• Time: O(n), Space: O(1)
• Less elegant

**Key Insight:**
Maintain n-node gap between fast and slow pointers!`,

        solution: `// Two pointer approach (optimal)
function removeNthFromEnd(head, n):
    dummy = new Node(0)
    dummy.next = head
    fast = dummy
    slow = dummy

    // Move fast n+1 steps ahead
    for i from 0 to n:
        fast = fast.next

    // Move both until fast reaches end
    while fast is not null:
        fast = fast.next
        slow = slow.next

    // Remove nth node
    slow.next = slow.next.next

    return dummy.next

// Time: O(n), Space: O(1)

// Two pass approach
function removeNthFromEndTwoPass(head, n):
    // Count length
    length = 0
    current = head
    while current is not null:
        length++
        current = current.next

    // Find (length - n)th node
    if length == n:
        return head.next  // Remove head

    current = head
    for i from 0 to (length - n - 2):
        current = current.next

    // Remove node
    current.next = current.next.next
    return head

// Time: O(n), Space: O(1)`,

        visualExample: `Remove 2nd node from end of: 1 -> 2 -> 3 -> 4 -> 5
(Remove node 4)

Two pointer approach:

Step 1: Move fast n+1=3 steps ahead
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
  ^                ^
 slow            fast

Step 2: Move both until fast reaches end
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
                  ^              ^
                slow            fast

Step 3: Remove slow.next
dummy -> 1 -> 2 -> 3 -> 5
                  ^
                slow

Result: 1 -> 2 -> 3 -> 5

Why dummy node?
Handles edge case: removing head (nth = length)

Example: Remove 5th from end of 1->2->3->4->5
(Remove head)

Without dummy:
Need special case to handle head removal

With dummy:
Works same as any other node!`
      },

      {
        title: "6. Palindrome Linked List",
        difficulty: "Medium",
        description: "Check if a linked list is a palindrome. Example: 1->2->2->1 is palindrome, 1->2->3 is not",

        approach: `**Reverse Second Half Approach:**
1. Find middle using slow/fast pointers
2. Reverse second half
3. Compare first half and reversed second half
4. Time: O(n), Space: O(1)

**Stack Approach:**
1. Push all elements to stack
2. Traverse again, comparing with stack.pop()
3. Time: O(n), Space: O(n)

**Key Insight:**
Palindrome means first half = reverse of second half!`,

        solution: `// Reverse second half (optimal)
function isPalindrome(head):
    if head is null or head.next is null:
        return true

    // Find middle
    slow = head
    fast = head
    while fast.next is not null and fast.next.next is not null:
        slow = slow.next
        fast = fast.next.next

    // Reverse second half
    secondHalf = reverseList(slow.next)

    // Compare
    firstHalf = head
    while secondHalf is not null:
        if firstHalf.data != secondHalf.data:
            return false
        firstHalf = firstHalf.next
        secondHalf = secondHalf.next

    return true

function reverseList(head):
    prev = null
    while head is not null:
        next = head.next
        head.next = prev
        prev = head
        head = next
    return prev

// Time: O(n), Space: O(1)

// Stack approach
function isPalindromeStack(head):
    stack = []
    current = head

    // Push all to stack
    while current is not null:
        stack.push(current.data)
        current = current.next

    // Compare
    current = head
    while current is not null:
        if current.data != stack.pop():
            return false
        current = current.next

    return true

// Time: O(n), Space: O(n)`,

        visualExample: `Check: 1 -> 2 -> 3 -> 2 -> 1

Step 1: Find middle
slow = 3, fast = 1 (end)

Step 2: Reverse second half (3 -> 2 -> 1)
First half: 1 -> 2 -> 3
Second half: 1 -> 2 (reversed)

Step 3: Compare
1 == 1 ✓
2 == 2 ✓
Stop (second half exhausted)

Result: Palindrome!

Check: 1 -> 2 -> 3

Step 1: Find middle (2)
First half: 1 -> 2
Second half: 3

Step 2: Reverse second half
Second half: 3

Step 3: Compare
1 == 3 ❌

Result: Not palindrome!

Odd vs Even length:
Odd (1->2->3->2->1): middle = 3, skip it
Even (1->2->2->1): middle = 2, include it

Works for both cases!`
      }
    ],

    additionalProblems: [
      {
        title: "7. Intersection of Two Linked Lists",
        difficulty: "Easy",
        hint: "Use two pointers, traverse both lists. When reaching end, switch to other list's head."
      },
      {
        title: "8. Add Two Numbers (Linked Lists)",
        difficulty: "Medium",
        hint: "Simulate addition with carry. Create new list for result."
      },
      {
        title: "9. Copy List with Random Pointer",
        difficulty: "Medium",
        hint: "Use hash map to store old->new mapping, or interweave new nodes."
      },
      {
        title: "10. Flatten Multilevel Doubly Linked List",
        difficulty: "Medium",
        hint: "Use DFS or stack to handle child pointers."
      },
      {
        title: "11. Sort Linked List",
        difficulty: "Medium",
        hint: "Use merge sort (divide using slow/fast pointers, merge recursively)."
      },
      {
        title: "12. Reorder List (L0→Ln→L1→Ln-1...)",
        difficulty: "Medium",
        hint: "Find middle, reverse second half, merge alternatively."
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Common Pitfalls",

    tips: [
      {
        category: "Implementation Best Practices",
        points: [
          "**Always Check for Null:**",
          "• Check head is not null before operations",
          "• Check current.next before accessing",
          "• Prevents null pointer exceptions",
          "",
          "**Use Dummy Node:**",
          "• Simplifies edge cases (empty list, deleting head)",
          "• No need for special head handling",
          "• Return dummy.next as final head",
          "",
          "**Save Next Pointer:**",
          "• Before modifying current.next, save it",
          "• Essential for reversal and deletion",
          "• Example: next = current.next BEFORE current.next = prev",
          "",
          "**Update Tail Pointer:**",
          "• When inserting at tail, update tail pointer",
          "• When deleting tail, find and update new tail",
          "• When deleting head of single-node list, set tail = null",
          "",
          "**Handle Edge Cases:**",
          "• Empty list (head = null)",
          "• Single node (head.next = null)",
          "• Deleting head",
          "• Deleting tail",
          "• Position out of bounds"
        ]
      },

      {
        category: "Common Mistakes to Avoid",
        points: [
          "❌ **Losing References:**",
          "• Forgetting to save next pointer before modification",
          "• Example: current.next = something (loses original next!)",
          "• Always: next = current.next FIRST",
          "",
          "❌ **Infinite Loops:**",
          "• In circular lists, forgetting stop condition",
          "• Using while(current) instead of while(current != head)",
          "• Not checking for null in traversal",
          "",
          "❌ **Memory Leaks (C/C++):**",
          "• Not freeing deleted nodes",
          "• Losing references to nodes (orphaned nodes)",
          "• Always call free() or delete before removing reference",
          "",
          "❌ **Wrong Comparison:**",
          "• Comparing node.data instead of node reference",
          "• Example: if (current == head) vs if (current.data == head.data)",
          "• Use == for reference, not value (in cycle detection)",
          "",
          "❌ **Off-by-One Errors:**",
          "• Traversing to wrong position",
          "• Example: for i=0 to position (should be position-1)",
          "• Drawing diagrams helps catch these!"
        ]
      },

      {
        category: "Performance Optimization",
        points: [
          "**Cache Tail Pointer:**",
          "• Reduces O(n) tail insertion to O(1)",
          "• Essential for queue implementation",
          "• Trade-off: Extra pointer to maintain",
          "",
          "**Use Doubly Linked List When:**",
          "• Need backward traversal",
          "• Frequent deletion of arbitrary nodes",
          "• Implementing deque or LRU cache",
          "• Worth 2x memory overhead",
          "",
          "**Consider Array When:**",
          "• Size is known and fixed",
          "• Need frequent random access",
          "• Memory overhead is concern",
          "• Cache locality matters",
          "",
          "**Avoid Linked List When:**",
          "• Need O(1) random access (use array)",
          "• Need fast search (use hash table or BST)",
          "• Data fits in small fixed size (use array)",
          "• Cache performance critical"
        ]
      },

      {
        category: "Debugging Techniques",
        points: [
          "**Visualize the List:**",
          "• Draw diagrams on paper",
          "• Trace pointer changes step by step",
          "• Visual debugging is most effective",
          "",
          "**Print the List:**",
          "• Implement toString() or printList()",
          "• Print before and after operations",
          "• Helps catch lost references",
          "",
          "**Use Debugger:**",
          "• Step through operations",
          "• Watch pointer values",
          "• Check for null before operations",
          "",
          "**Test Edge Cases:**",
          "• Empty list",
          "• Single node",
          "• Two nodes",
          "• Large list (100+ nodes)",
          "• All nodes same value",
          "",
          "**Validate Invariants:**",
          "• Check head and tail are correct",
          "• Verify size matches actual count",
          "• Ensure no cycles (unless intended)",
          "• Check all nodes reachable from head"
        ]
      }
    ]
  },

  comparison: {
    title: "Linked List vs Array Comparison",

    table: `**Comprehensive Comparison:**

Feature                 Array          Linked List
────────────────────────────────────────────────────────────
Access by index         O(1) ✓         O(n) ❌
Search                  O(n)           O(n)
Insert at beginning     O(n) ❌        O(1) ✓
Insert at end           O(1)* ✓        O(1)** ✓
Insert at position      O(n)           O(n)
Delete at beginning     O(n) ❌        O(1) ✓
Delete at end           O(1) ✓         O(n)*** ❌
Delete at position      O(n)           O(n)
Size                    Fixed/Dynamic  Dynamic ✓
Memory layout           Contiguous ✓   Scattered ❌
Memory overhead         Low ✓          High ❌
Cache performance       Excellent ✓    Poor ❌
Random access           Yes ✓          No ❌

* Amortized O(1) for dynamic arrays
** O(1) with tail pointer, O(n) without
*** O(1) for doubly linked list`,

    scenarios: `**When to Use Array:**
✓ Frequent random access (accessing by index)
✓ Small, fixed, or rarely changing size
✓ Need cache-friendly performance
✓ Simple iteration
✓ Binary search on sorted data

Examples:
• Storing coordinates: arr[i]
• Lookup table with indices
• Matrix operations
• Image pixel data (row-major order)

**When to Use Linked List:**
✓ Frequent insertions/deletions at beginning
✓ Unknown size that changes frequently
✓ Implementing stack or queue
✓ No random access needed
✓ Memory fragmentation not an issue

Examples:
• Undo/redo functionality
• Music playlists
• Browser history
• Task schedulers
• LRU cache`,

    performanceAnalysis: `**Performance Analysis (1 million elements):**

Operation              Array          Linked List
──────────────────────────────────────────────────────
Access element i       ~1 ns          ~1 µs (1000x slower!)
Search value           ~500K ops      ~500K ops (same)
Insert at head         ~1ms           ~1 ns (1M times faster!)
Insert at tail         ~1 ns          ~1 ns (with tail ptr)
Delete at head         ~1ms           ~1 ns (1M times faster!)
Sequential traverse    ~1ms ✓         ~10ms ❌ (cache misses)

Memory (storing ints):
Array:      4MB (just data)
Singly LL:  12MB (data + pointers)
Doubly LL:  20MB (data + 2 pointers)

**Takeaway:**
• Array dominates for access and sequential operations
• Linked list dominates for insert/delete at head
• Choose based on most frequent operation!`
  }
};
