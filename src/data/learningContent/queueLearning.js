// ============= src/data/learningContent/queueLearning.js =============
// Comprehensive learning content for Queue Data Structure

export const queueLearningContent = {
  introduction: {
    title: "What is a Queue?",
    content: `A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, meaning the element that is added first will be removed first.

**Key Properties:**
• Elements are inserted at the rear (back/tail) - called enqueue
• Elements are removed from the front (head) - called dequeue
• Access is restricted to the front and rear only
• No random access to middle elements
• Maintains the order of insertion

**Why Use Queue?**
Queues are essential when you need to:
• Process elements in the order they arrive
• Manage shared resources (CPU scheduling, printer queue)
• Implement breadth-first search (BFS)
• Handle asynchronous data transfer (IO buffers)
• Model real-world waiting scenarios`,

    visualExample: {
      description: "Queue with enqueue and dequeue operations",
      diagram: `
Front                           Rear
  |                               |
  v                               v
┌───┬───┬───┬───┬───┐
│ 5 │ 8 │ 3 │ 9 │ 7 │
└───┴───┴───┴───┴───┘
  ^                   ^
  |                   |
Dequeue here      Enqueue here

Operations:
• enqueue(7): Add 7 at rear
• dequeue(): Remove 5 from front
• peek(): View 5 without removing

Real-world analogy:
• Line at a ticket counter - first person in line gets served first
• Printer queue - first document sent prints first
• Customer service - first caller gets attended first
      `
    }
  },

  fundamentals: {
    title: "Queue Fundamentals",
    sections: [
      {
        subtitle: "1. FIFO Principle (First-In-First-Out)",
        content: `The defining characteristic of a queue is FIFO ordering.

**FIFO in Action:**
\`\`\`
Sequence of operations:
1. enqueue(10)  → Queue: [10]
2. enqueue(20)  → Queue: [10, 20]
3. enqueue(30)  → Queue: [10, 20, 30]
4. dequeue()    → Returns 10, Queue: [20, 30]
5. dequeue()    → Returns 20, Queue: [30]
\`\`\`

**Key Points:**
• Order is preserved - elements come out in the same order they went in
• Like a line of people - no cutting in line allowed
• First element added is first element removed
• Opposite of Stack (which is LIFO - Last-In-First-Out)`,

        example: `Real-world FIFO examples:
• Restaurant waiting list - first to arrive, first to be seated
• Call center - first caller in queue gets next available agent
• Playlist - songs play in order they were added
• Task scheduling - jobs execute in order of arrival`
      },

      {
        subtitle: "2. Queue Structure & Components",
        content: `A queue maintains two key pointers/references:

**Queue Components:**
\`\`\`
┌─────────────────────────────┐
│      Queue Structure        │
├─────────────────────────────┤
│ front: pointer to head      │
│ rear: pointer to tail       │
│ size: number of elements    │
│ capacity: max size (array)  │
└─────────────────────────────┘
\`\`\`

**Front Pointer:**
• Points to the element that will be dequeued next
• Used for dequeue and peek operations
• Moves forward when element is removed

**Rear Pointer:**
• Points to the last element in queue
• Used for enqueue operation
• Moves forward when element is added

**Size/Capacity:**
• Size: Current number of elements
• Capacity: Maximum elements (for bounded queues)`,

        example: `Queue state diagram:
Initial: Empty queue
front = -1, rear = -1, size = 0
┌─┬─┬─┬─┬─┐
│ │ │ │ │ │
└─┴─┴─┴─┴─┘

After enqueue(5):
front = 0, rear = 0, size = 1
┌─┬─┬─┬─┬─┐
│5│ │ │ │ │
└─┴─┴─┴─┴─┘
 ^
 front, rear

After enqueue(10):
front = 0, rear = 1, size = 2
┌─┬──┬─┬─┬─┐
│5│10│ │ │ │
└─┴──┴─┴─┴─┘
 ^   ^
 front  rear`
      },

      {
        subtitle: "3. Types of Queues",
        content: `**1. Simple Queue (Linear Queue):**
• Basic FIFO structure
• Elements added at rear, removed from front
• Front and rear pointers move forward only
• Problem: Wasted space (array implementation)

**2. Circular Queue:**
• Rear wraps around to beginning when reaching end
• Efficient use of space in array implementation
• Front and rear use modulo arithmetic
• Most commonly used in practice

**3. Priority Queue:**
• Elements have associated priority
• Highest priority element dequeued first
• Not strictly FIFO - priority overrides order
• Implemented using heap data structure

**4. Double-Ended Queue (Deque):**
• Insertion and deletion at both ends
• Can work as both stack and queue
• More flexible than simple queue

**5. Blocking Queue:**
• Thread-safe queue for concurrent programming
• Blocks when full (enqueue) or empty (dequeue)
• Used in producer-consumer scenarios`,

        example: `Circular Queue advantage:
Linear Queue (wasted space):
After several enqueue/dequeue operations:
front = 3, rear = 4
┌─┬─┬─┬──┬──┐
│ │ │ │10│20│  (indices 0-2 wasted!)
└─┴─┴─┴──┴──┘
       ^  ^
    front rear

Circular Queue (efficient):
rear wraps to index 0
front = 3, rear = 0
┌──┬─┬─┬──┬──┐
│30│ │ │10│20│  (reuses space!)
└──┴─┴─┴──┴──┘
  ^      ^
 rear   front`
      }
    ]
  },

  operations: {
    title: "Core Queue Operations",
    sections: [
      {
        operation: "Enqueue (Insert)",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Enqueue Works:**
1. Check if queue is full (for bounded queues)
2. Increment rear pointer
3. Insert element at rear position
4. Increment size counter

**Key Points:**
• Adds element to the back/rear of queue
• Constant time operation O(1)
• May require resizing in dynamic arrays
• Throws exception or returns false if queue is full

**Edge Cases:**
• Empty queue: Set both front and rear to 0
• Full queue: Cannot add, return error/resize
• Circular queue: Use modulo for wrap-around`,

        pseudocode: `function enqueue(queue, element):
    // Check if queue is full
    if isFull(queue):
        throw "Queue Overflow" or resize()

    // If queue is empty
    if isEmpty(queue):
        queue.front = 0
        queue.rear = 0
    else:
        // Move rear forward (circular)
        queue.rear = (queue.rear + 1) % queue.capacity

    // Insert element
    queue.data[queue.rear] = element
    queue.size++

    return true`,

        circularQueueVersion: `function enqueueCircular(queue, element):
    // Check full condition for circular queue
    if (queue.rear + 1) % queue.capacity == queue.front:
        throw "Queue is Full"

    if queue.front == -1:  // Empty queue
        queue.front = 0
        queue.rear = 0
    else:
        queue.rear = (queue.rear + 1) % queue.capacity

    queue.data[queue.rear] = element`,

        example: `Enqueue operations on capacity 5 queue:
Step 1: enqueue(10)
front = 0, rear = 0
┌──┬─┬─┬─┬─┐
│10│ │ │ │ │
└──┴─┴─┴─┴─┘
  ^
front, rear

Step 2: enqueue(20)
front = 0, rear = 1
┌──┬──┬─┬─┬─┐
│10│20│ │ │ │
└──┴──┴─┴─┴─┘
  ^  ^
front rear

Step 3: enqueue(30)
front = 0, rear = 2
┌──┬──┬──┬─┬─┐
│10│20│30│ │ │
└──┴──┴──┴─┴─┘
  ^     ^
front   rear`,

        commonMistakes: `❌ DON'T forget to check if queue is full
❌ DON'T forget to handle empty queue case
❌ DON'T use regular increment in circular queue
✓ Use modulo arithmetic for circular queue
✓ Always update size counter
✓ Handle edge case when queue is empty`
      },

      {
        operation: "Dequeue (Remove)",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Dequeue Works:**
1. Check if queue is empty
2. Get element at front
3. Increment front pointer
4. Decrement size counter
5. Return the removed element

**Key Points:**
• Removes element from the front of queue
• Constant time operation O(1)
• Returns the removed element
• Throws exception if queue is empty
• In circular queue, use modulo for wrap-around`,

        pseudocode: `function dequeue(queue):
    // Check if queue is empty
    if isEmpty(queue):
        throw "Queue Underflow"

    // Get element at front
    element = queue.data[queue.front]

    // If only one element
    if queue.front == queue.rear:
        queue.front = -1
        queue.rear = -1
    else:
        // Move front forward (circular)
        queue.front = (queue.front + 1) % queue.capacity

    queue.size--
    return element`,

        example: `Dequeue operations:
Initial state:
front = 0, rear = 2
┌──┬──┬──┬─┬─┐
│10│20│30│ │ │
└──┴──┴──┴─┴─┘
  ^     ^
front   rear

After dequeue() → returns 10:
front = 1, rear = 2
┌─┬──┬──┬─┬─┐
│ │20│30│ │ │
└─┴──┴──┴─┴─┘
   ^  ^
front rear

After dequeue() → returns 20:
front = 2, rear = 2
┌─┬─┬──┬─┬─┐
│ │ │30│ │ │
└─┴─┴──┴─┴─┘
     ^
  front, rear

After dequeue() → returns 30:
front = -1, rear = -1 (empty)
┌─┬─┬─┬─┬─┐
│ │ │ │ │ │
└─┴─┴─┴─┴─┘
Queue is now empty`,

        errorHandling: `Best practices for dequeue:
• Always check isEmpty() before dequeue
• Throw descriptive exceptions
• Return null/undefined with flag in some languages
• Log underflow attempts for debugging

Example with error handling:
function safeDequeue(queue):
    if isEmpty(queue):
        console.error("Cannot dequeue from empty queue")
        return null

    try:
        return dequeue(queue)
    catch error:
        console.error("Dequeue failed:", error)
        return null`
      },

      {
        operation: "Peek / Front",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Peek Works:**
1. Check if queue is empty
2. Return element at front
3. Do NOT remove element
4. Do NOT modify front pointer

**Key Points:**
• View front element without removing it
• Constant time operation O(1)
• Does not modify the queue
• Useful for checking what's next without commitment
• Also called front() or getFront()`,

        pseudocode: `function peek(queue):
    // Check if queue is empty
    if isEmpty(queue):
        throw "Queue is Empty"

    // Return front element without removing
    return queue.data[queue.front]`,

        example: `Peek operation:
Queue state:
front = 0, rear = 2
┌──┬──┬──┐
│10│20│30│
└──┴──┴──┘
  ^     ^
front   rear

peek() → returns 10
Queue unchanged:
┌──┬──┬──┐
│10│20│30│  (10 still in queue)
└──┴──┴──┘
  ^     ^
front   rear

Use cases:
• Check next element before processing
• Conditional dequeue based on value
• Preview without commitment`,

        useCase: `Practical example - Task processor:
function processHighPriorityTasks(queue):
    while not isEmpty(queue):
        task = peek(queue)  // Check task

        if task.priority > 5:
            dequeue(queue)  // Remove and process
            process(task)
        else:
            break  // Stop at low priority

    return queue  // Low priority tasks remain`
      },

      {
        operation: "isEmpty",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How isEmpty Works:**
Checks if queue has no elements.

**Implementation Options:**
1. Check size: return size == 0
2. Check pointers: return front == -1
3. Check front == rear (for some implementations)

**Key Points:**
• Critical for preventing underflow
• Should be called before dequeue/peek
• Constant time operation O(1)`,

        pseudocode: `function isEmpty(queue):
    return queue.size == 0
    // OR
    return queue.front == -1
    // OR
    return queue.front > queue.rear  (linear queue)`,

        example: `isEmpty() usage:
Empty queue:
front = -1, rear = -1, size = 0
isEmpty() → returns true

Non-empty queue:
front = 0, rear = 2, size = 3
isEmpty() → returns false`
      },

      {
        operation: "isFull",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How isFull Works:**
Checks if queue has reached maximum capacity (for bounded queues).

**Implementation Options:**
1. Check size: return size == capacity
2. Check positions: return (rear + 1) % capacity == front

**Key Points:**
• Only relevant for bounded/fixed-size queues
• Not applicable to linked list implementation (grows dynamically)
• Critical for preventing overflow
• Should be called before enqueue`,

        pseudocode: `function isFull(queue):
    // For simple queue
    return queue.size == queue.capacity

    // For circular queue (alternative)
    return (queue.rear + 1) % queue.capacity == queue.front`,

        example: `isFull() usage:
Capacity = 5, size = 5
front = 0, rear = 4
┌──┬──┬──┬──┬──┐
│10│20│30│40│50│
└──┴──┴──┴──┴──┘
isFull() → returns true

Capacity = 5, size = 3
front = 0, rear = 2
┌──┬──┬──┬─┬─┐
│10│20│30│ │ │
└──┴──┴──┴─┴─┘
isFull() → returns false`
      },

      {
        operation: "Rear / Back",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",

        description: `**How Rear Works:**
Returns the last element in queue without removing it.

**Key Points:**
• View rear element without removing it
• Less commonly used than peek/front
• Useful for checking last added element
• Constant time operation O(1)`,

        pseudocode: `function rear(queue):
    if isEmpty(queue):
        throw "Queue is Empty"

    return queue.data[queue.rear]`,

        example: `rear() operation:
front = 0, rear = 2
┌──┬──┬──┐
│10│20│30│
└──┴──┴──┘
  ^     ^
front   rear

rear() → returns 30 (last added element)
peek() → returns 10 (first element to be removed)`
      }
    ]
  },

  implementation: {
    title: "Queue Implementation",
    sections: [
      {
        type: "Array-Based Implementation (Circular Queue)",
        description: `**Circular Queue using Array:**
Most efficient array-based implementation that reuses space.

**Advantages:**
• Efficient space utilization
• All operations O(1)
• Cache-friendly (contiguous memory)
• Simple to implement

**Disadvantages:**
• Fixed size (requires capacity)
• Need to handle full condition
• Modulo arithmetic overhead (minimal)`,

        code: `class CircularQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.data = new Array(capacity);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    enqueue(element) {
        if (this.isFull()) {
            throw new Error("Queue Overflow: Queue is full");
        }

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
        }

        this.data[this.rear] = element;
        this.size++;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue Underflow: Queue is empty");
        }

        const element = this.data[this.front];

        if (this.front === this.rear) {
            // Last element
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }

        this.size--;
        return element;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.data[this.front];
    }

    getSize() {
        return this.size;
    }

    display() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return;
        }

        let result = [];
        let i = this.front;
        let count = 0;

        while (count < this.size) {
            result.push(this.data[i]);
            i = (i + 1) % this.capacity;
            count++;
        }

        console.log("Queue:", result.join(" <- "));
    }
}

// Usage Example:
const queue = new CircularQueue(5);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.display();  // Queue: 10 <- 20 <- 30

console.log(queue.dequeue());  // 10
console.log(queue.peek());     // 20
queue.display();  // Queue: 20 <- 30`,

        visualRepresentation: `Circular Queue operation sequence:
Capacity = 5

1. Initial state (empty):
   front = -1, rear = -1
   ┌─┬─┬─┬─┬─┐
   │ │ │ │ │ │
   └─┴─┴─┴─┴─┘
   indices: 0 1 2 3 4

2. After enqueue(10), enqueue(20), enqueue(30):
   front = 0, rear = 2
   ┌──┬──┬──┬─┬─┐
   │10│20│30│ │ │
   └──┴──┴──┴─┴─┘
    ^     ^
   front  rear

3. After dequeue(), dequeue():
   front = 2, rear = 2
   ┌─┬─┬──┬─┬─┐
   │ │ │30│ │ │
   └─┴─┴──┴─┴─┘
        ^
    front, rear

4. After enqueue(40), enqueue(50), enqueue(60):
   front = 2, rear = 0 (wrapped around!)
   ┌──┬─┬──┬──┬──┐
   │60│ │30│40│50│
   └──┴─┴──┴──┴──┘
    ^     ^
   rear  front

   This demonstrates circular wrap-around!`
      },

      {
        type: "Linked List Implementation",
        description: `**Queue using Linked List:**
Dynamic size implementation using nodes and pointers.

**Advantages:**
• Dynamic size (no capacity limit)
• No wasted space
• Never full (except memory limit)
• No need for circular logic

**Disadvantages:**
• Extra memory for pointers
• Not cache-friendly (scattered memory)
• Slightly slower due to pointer dereferencing
• More complex memory management`,

        code: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    enqueue(element) {
        const newNode = new Node(element);

        if (this.isEmpty()) {
            // First element
            this.front = newNode;
            this.rear = newNode;
        } else {
            // Add to rear
            this.rear.next = newNode;
            this.rear = newNode;
        }

        this.size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue Underflow: Queue is empty");
        }

        const element = this.front.data;
        this.front = this.front.next;

        // If queue becomes empty
        if (this.front === null) {
            this.rear = null;
        }

        this.size--;
        return element;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.front.data;
    }

    getRear() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.rear.data;
    }

    getSize() {
        return this.size;
    }

    display() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
            return;
        }

        let result = [];
        let current = this.front;

        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }

        console.log("Queue:", result.join(" <- "));
    }

    clear() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }
}

// Usage Example:
const queue = new LinkedListQueue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.display();  // Queue: 10 <- 20 <- 30 <- 40

console.log(queue.dequeue());  // 10
console.log(queue.peek());     // 20
console.log(queue.getRear());  // 40
queue.display();  // Queue: 20 <- 30 <- 40`,

        visualRepresentation: `Linked List Queue structure:

After enqueue(10), enqueue(20), enqueue(30):

front                                  rear
  |                                      |
  v                                      v
┌────┬────┐    ┌────┬────┐    ┌────┬────┐
│ 10 │ ●──┼───→│ 20 │ ●──┼───→│ 30 │NULL│
└────┴────┘    └────┴────┘    └────┴────┘

After dequeue():

         front                           rear
           |                              |
           v                              v
         ┌────┬────┐    ┌────┬────┐
         │ 20 │ ●──┼───→│ 30 │NULL│
         └────┴────┘    └────┴────┘

After enqueue(40):

         front                                  rear
           |                                      |
           v                                      v
         ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
         │ 20 │ ●──┼───→│ 30 │ ●──┼───→│ 40 │NULL│
         └────┴────┘    └────┴────┘    └────┴────┘`
      },

      {
        type: "Dynamic Array Implementation",
        description: `**Queue using Dynamic Array:**
Combines array benefits with dynamic resizing.

**Advantages:**
• No fixed capacity limit
• Cache-friendly
• Can optimize for specific growth patterns

**Disadvantages:**
• Resizing overhead (occasional O(n))
• May waste space during resize
• More complex than fixed array`,

        code: `class DynamicQueue {
    constructor(initialCapacity = 4) {
        this.capacity = initialCapacity;
        this.data = new Array(initialCapacity);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newData = new Array(newCapacity);

        // Copy elements in order
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[(this.front + i) % this.capacity];
        }

        this.data = newData;
        this.capacity = newCapacity;
        this.front = 0;
        this.rear = this.size - 1;
    }

    enqueue(element) {
        if (this.isFull()) {
            this.resize();  // Auto-resize when full
        }

        this.rear = (this.rear + 1) % this.capacity;
        this.data[this.rear] = element;
        this.size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }

        const element = this.data[this.front];
        this.front = (this.front + 1) % this.capacity;
        this.size--;

        // Optional: shrink if too empty
        if (this.size > 0 && this.size === this.capacity / 4) {
            this.shrink();
        }

        return element;
    }

    shrink() {
        const newCapacity = Math.max(4, Math.floor(this.capacity / 2));
        const newData = new Array(newCapacity);

        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[(this.front + i) % this.capacity];
        }

        this.data = newData;
        this.capacity = newCapacity;
        this.front = 0;
        this.rear = this.size - 1;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.data[this.front];
    }
}

// Usage:
const queue = new DynamicQueue(2);  // Start small
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);  // Triggers resize to capacity 4
queue.enqueue(40);
queue.enqueue(50);  // Triggers resize to capacity 8`
      }
    ],

    comparisonTable: {
      title: "Implementation Comparison",
      headers: ["Feature", "Circular Array", "Linked List", "Dynamic Array"],
      rows: [
        ["Space Usage", "O(capacity)", "O(n) + pointers", "O(n) with overhead"],
        ["Enqueue", "O(1)", "O(1)", "O(1) amortized"],
        ["Dequeue", "O(1)", "O(1)", "O(1)"],
        ["Memory Overhead", "Minimal", "High (pointers)", "Medium (resize)"],
        ["Cache Performance", "Excellent", "Poor", "Excellent"],
        ["Size Limit", "Fixed", "Dynamic", "Dynamic"],
        ["Best For", "Known size", "Unknown size", "Variable size"]
      ]
    }
  },

  complexity: {
    title: "Time & Space Complexity Analysis",

    operationsTable: {
      title: "Queue Operations Complexity",
      description: "All basic queue operations are very efficient",
      headers: ["Operation", "Time Complexity", "Space Complexity", "Notes"],
      rows: [
        ["enqueue()", "O(1)", "O(1)", "Constant time insert at rear"],
        ["dequeue()", "O(1)", "O(1)", "Constant time remove from front"],
        ["peek()/front()", "O(1)", "O(1)", "Direct access to front element"],
        ["isEmpty()", "O(1)", "O(1)", "Simple size/pointer check"],
        ["isFull()", "O(1)", "O(1)", "Only for bounded queues"],
        ["size()", "O(1)", "O(1)", "If size counter maintained"],
        ["display()", "O(n)", "O(1)", "Must traverse all elements"]
      ]
    },

    spaceComplexity: {
      description: "Space requirements for different implementations",

      arrayBased: {
        title: "Array-Based Queue",
        space: "O(n)",
        explanation: `Space breakdown:
• Array storage: O(capacity) ≈ O(n)
• Pointers (front, rear): O(1)
• Size counter: O(1)
• Total: O(n)

Note:
• Fixed capacity may have wasted space
• Circular queue optimizes space usage
• No extra overhead per element`
      },

      linkedListBased: {
        title: "Linked List Queue",
        space: "O(n)",
        explanation: `Space breakdown:
• Node data: O(n)
• Next pointers: O(n) - one per node
• Front/rear pointers: O(1)
• Total: O(2n) = O(n)

Note:
• Approximately 2x space of array
• No wasted capacity
• Extra pointer overhead per element`
      }
    },

    detailedAnalysis: `**Why Queue Operations are O(1):**

1. **Enqueue is O(1):**
   • Direct access to rear via pointer
   • No shifting of elements required
   • Single assignment operation
   • Independent of queue size

2. **Dequeue is O(1):**
   • Direct access to front via pointer
   • No shifting of elements required
   • Just move front pointer forward
   • Independent of queue size

3. **Comparison with Array Insertion/Deletion:**
   Array operations at beginning: O(n) - requires shifting
   Queue operations: O(1) - no shifting needed

   Why? Queue restricts access to front/rear only!

**Amortized Analysis for Dynamic Queue:**
• Most enqueue: O(1)
• Resize operation: O(n)
• Frequency: After every n operations
• Amortized cost: O(n)/n = O(1)
• Overall: O(1) amortized`
  },

  applications: {
    title: "Real-World Applications of Queues",
    description: "Queues are fundamental in systems where order matters",

    useCases: [
      {
        application: "CPU Task Scheduling",
        description: `Operating systems use queues to manage process scheduling:
• Ready Queue: Processes waiting for CPU
• Job Queue: All processes in the system
• Device Queue: Processes waiting for I/O

**How it works:**
• Processes added to ready queue (enqueue)
• CPU picks first process from queue (dequeue)
• Fair scheduling - first come, first served
• Round-robin scheduling uses circular queue`,
        example: `Process scheduling example:
Ready Queue: [P1, P2, P3, P4]
1. CPU takes P1 (dequeue)
2. P1 executes for time slice
3. P5 arrives (enqueue)
4. P1 done or preempted
5. CPU takes P2 (dequeue)
Ready Queue: [P3, P4, P5]`,
        complexity: "O(1) for enqueue/dequeue operations"
      },

      {
        application: "Breadth-First Search (BFS)",
        description: `Queue is essential for level-order tree/graph traversal:
• Process nodes level by level
• Guarantees shortest path in unweighted graphs
• Used in social network analysis, web crawlers

**How it works:**
• Start with root node in queue
• Dequeue node, process it
• Enqueue all unvisited neighbors
• Repeat until queue is empty`,
        example: `BFS traversal of graph:
       1
      / \\
     2   3
    / \\   \\
   4   5   6

Queue operations:
Initial: [1]
Process 1: [2, 3]
Process 2: [3, 4, 5]
Process 3: [4, 5, 6]
Process 4: [5, 6]
Process 5: [6]
Process 6: []

BFS order: 1, 2, 3, 4, 5, 6`,
        code: `function BFS(graph, start):
    queue = new Queue()
    visited = new Set()

    queue.enqueue(start)
    visited.add(start)

    while not queue.isEmpty():
        node = queue.dequeue()
        print(node)

        for neighbor in graph.getNeighbors(node):
            if neighbor not in visited:
                queue.enqueue(neighbor)
                visited.add(neighbor)`,
        complexity: "O(V + E) where V = vertices, E = edges"
      },

      {
        application: "Printer Queue Management",
        description: `Print spoolers use queues to manage print jobs:
• Documents sent to printer enter queue
• First document sent prints first
• Fair resource sharing among users
• Can implement priority queues for urgent jobs`,
        example: `Printer queue scenario:
Queue: [Doc1, Doc2, Doc3]
1. Printer takes Doc1 (dequeue)
2. While printing Doc1, Doc4 arrives (enqueue)
3. Queue: [Doc2, Doc3, Doc4]
4. Doc1 finishes, printer takes Doc2
5. Process continues until queue empty`,
        realWorld: "Windows Print Spooler, CUPS on Linux/Mac"
      },

      {
        application: "Asynchronous Data Transfer",
        description: `Buffers between fast and slow components:
• IO Buffers: Keyboard input, network packets
• Pipe Communication: Between processes
• Stream Processing: Video/audio playback

**How it works:**
• Fast producer adds data to queue (enqueue)
• Slow consumer removes data from queue (dequeue)
• Queue acts as buffer preventing data loss
• Handles speed mismatch between components`,
        example: `Keyboard buffer:
User types: H-E-L-L-O (fast)
Queue: [H, E, L, L, O]
Application reads character by character (slower)
dequeue() → H
dequeue() → E
...

Without queue: keystrokes might be lost!`,
        types: "Bounded buffers, ring buffers, blocking queues"
      },

      {
        application: "Web Server Request Handling",
        description: `Web servers queue incoming HTTP requests:
• Multiple clients send requests simultaneously
• Server processes one request at a time (or in thread pool)
• Queue ensures fair ordering
• Prevents request loss during traffic spikes`,
        example: `Request queue:
Incoming: [Req1, Req2, Req3, Req4]
Server thread pool (3 threads):
- Thread 1 processes Req1 (dequeue)
- Thread 2 processes Req2 (dequeue)
- Thread 3 processes Req3 (dequeue)
- Req4 waits in queue

When thread finishes:
- Dequeue next request (Req4)
- Process and respond`,
        frameworks: "Node.js event loop, Apache worker MPM, Nginx"
      },

      {
        application: "Call Center Systems",
        description: `Customer service queues manage incoming calls:
• Callers wait in queue for available agent
• "Your call is important to us... you are number 5 in queue"
• Fair ordering - first caller gets first agent
• Can implement priority for premium customers`,
        example: `Call queue status:
Queue: [Caller1, Caller2, Caller3]
Agents: [Agent1: busy, Agent2: busy, Agent3: available]

Agent3 available:
dequeue() → Caller1 connected to Agent3

New caller arrives:
enqueue(Caller4)
Queue: [Caller2, Caller3, Caller4]

Agent1 finishes:
dequeue() → Caller2 connected to Agent1`
      },

      {
        application: "Message Queues in Distributed Systems",
        description: `Decoupling services in microarchitecture:
• Producer sends messages to queue
• Consumer processes messages asynchronously
• Fault tolerance - messages persist if consumer down
• Load balancing across multiple consumers

**Popular Systems:**
• RabbitMQ, Apache Kafka, Amazon SQS
• Redis Pub/Sub, Google Cloud Pub/Sub`,
        example: `E-commerce order processing:
1. User places order → enqueue(orderMessage)
2. Order queue: [Order1, Order2, Order3]
3. Payment service dequeues Order1
4. After payment, enqueue to fulfillment queue
5. Warehouse service dequeues from fulfillment
6. Email service dequeues for notification

Each service works at its own pace!`,
        benefits: "Loose coupling, scalability, reliability"
      },

      {
        application: "Cache Algorithms (FIFO Cache)",
        description: `FIFO cache eviction policy uses queue:
• Cache full, need to evict entry
• Remove oldest entry (first in queue)
• Simple and predictable
• Used when all items have equal value`,
        example: `FIFO Cache (capacity 3):
Access A: Cache [A], Queue [A]
Access B: Cache [A,B], Queue [A,B]
Access C: Cache [A,B,C], Queue [A,B,C]
Access D: Cache full!
  - Evict front of queue (A)
  - Cache [B,C,D], Queue [B,C,D]`,
        alternatives: "LRU (Least Recently Used), LFU (Least Frequently Used)"
      },

      {
        application: "Playlist Management",
        description: `Music/video players use queues for playlists:
• Songs added to queue in order
• Play next song from front of queue
• User can add to end (enqueue)
• Current song removed after playing (dequeue)`,
        example: `Music player queue:
Playlist: [Song1, Song2, Song3]
- Play Song1 (dequeue)
- User adds Song4 (enqueue)
- Playlist: [Song2, Song3, Song4]
- Play Song2 (dequeue)
- Playlist: [Song3, Song4]`,
        features: "Spotify, YouTube, Apple Music queues"
      },

      {
        application: "Traffic System Simulation",
        description: `Traffic lights and toll booths modeled with queues:
• Cars arrive at intersection
• Wait in queue for green light
• First car goes first (FIFO)
• Simulate traffic flow and congestion`,
        example: `Toll booth simulation:
Queue: [Car1, Car2, Car3, Car4]
Toll booth free:
- Process Car1 (10 seconds)
- dequeue(), Car1 leaves
- Process Car2 (8 seconds)
- Meanwhile Car5 arrives (enqueue)
- Queue: [Car3, Car4, Car5]

Metrics: Average wait time, queue length`
      }
    ]
  },

  interviewProblems: {
    title: "Common Interview Problems",
    description: "Frequently asked queue problems with detailed solutions",

    problems: [
      {
        title: "1. Implement Queue using Two Stacks",
        difficulty: "Medium",
        description: "Implement a queue using only two stacks (LIFO structures)",

        approach: `**Key Insight:**
Stack is LIFO, Queue is FIFO. Use two stacks to reverse order twice.

**Strategy:**
• Stack1 (input): For enqueue operations
• Stack2 (output): For dequeue operations
• When dequeue needed and stack2 empty, transfer from stack1 to stack2

**Why it works:**
• First push to stack1
• Pop from stack1, push to stack2 (reverses order)
• Pop from stack2 gives original order (reversed again = FIFO)`,

        solution: `class QueueUsingStacks {
    constructor() {
        this.stack1 = [];  // For enqueue
        this.stack2 = [];  // For dequeue
    }

    // O(1) - just push to stack1
    enqueue(element) {
        this.stack1.push(element);
    }

    // O(1) amortized - occasionally O(n)
    dequeue() {
        // If stack2 empty, transfer from stack1
        if (this.stack2.length === 0) {
            if (this.stack1.length === 0) {
                throw new Error("Queue is empty");
            }

            // Transfer all elements from stack1 to stack2
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }

        return this.stack2.pop();
    }

    peek() {
        if (this.stack2.length === 0) {
            if (this.stack1.length === 0) {
                throw new Error("Queue is empty");
            }
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }

        return this.stack2[this.stack2.length - 1];
    }

    isEmpty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}`,

        example: `Operations visualization:
enqueue(1): stack1=[1], stack2=[]
enqueue(2): stack1=[1,2], stack2=[]
enqueue(3): stack1=[1,2,3], stack2=[]

dequeue():
  - stack2 empty, transfer from stack1
  - pop 3,2,1 from stack1
  - push to stack2: [1,2,3]
  - stack1=[], stack2=[1,2,3]
  - pop from stack2: returns 1
  - stack1=[], stack2=[2,3]

dequeue():
  - stack2 not empty
  - pop from stack2: returns 2
  - stack1=[], stack2=[3]`,

        complexity: `Time Complexity:
• enqueue(): O(1)
• dequeue(): O(1) amortized
  - Worst case: O(n) when transferring
  - But each element transferred once
  - Amortized: O(1)

Space Complexity: O(n) for two stacks`,

        followUp: "Can you optimize to make dequeue always O(1)? (No, amortized is best possible)"
      },

      {
        title: "2. Design Circular Queue",
        difficulty: "Medium",
        description: "Design a circular queue with fixed size using array",

        approach: `**Key Design Decisions:**
• Use array with fixed capacity
• Track front and rear pointers
• Use modulo to wrap around
• Determine full condition: (rear + 1) % capacity == front

**Edge Cases:**
• Empty: front == -1
• Full: (rear + 1) % capacity == front
• Single element: front == rear`,

        solution: `class CircularQueue {
    constructor(k) {
        this.capacity = k;
        this.data = new Array(k);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    enQueue(value) {
        if (this.isFull()) {
            return false;
        }

        if (this.isEmpty()) {
            this.front = 0;
        }

        this.rear = (this.rear + 1) % this.capacity;
        this.data[this.rear] = value;
        this.size++;
        return true;
    }

    deQueue() {
        if (this.isEmpty()) {
            return false;
        }

        if (this.front === this.rear) {
            // Last element
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }

        this.size--;
        return true;
    }

    Front() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.data[this.front];
    }

    Rear() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.data[this.rear];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }
}`,

        testCase: `Example usage:
queue = new CircularQueue(3);
queue.enQueue(1);  // true
queue.enQueue(2);  // true
queue.enQueue(3);  // true
queue.enQueue(4);  // false (full)
queue.Rear();      // 3
queue.isFull();    // true
queue.deQueue();   // true
queue.enQueue(4);  // true
queue.Rear();      // 4`,

        complexity: "All operations: O(1) time, O(k) space"
      },

      {
        title: "3. Sliding Window Maximum",
        difficulty: "Hard",
        description: "Find maximum in each sliding window of size k in array",

        approach: `**Brute Force: O(n*k)**
For each window, scan k elements to find max.

**Optimal: O(n) using Deque**
Use double-ended queue to maintain useful elements:
• Store indices (not values) in deque
• Keep deque in decreasing order of values
• Front of deque is always maximum
• Remove elements outside current window

**Why Deque:**
• Need to add/remove from both ends
• Remove from front (outside window)
• Remove from rear (smaller elements)`,

        solution: `function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];  // Stores indices

    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove indices with smaller values than current
        // (they will never be maximum)
        while (deque.length > 0 &&
               nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        deque.push(i);

        // Add to result if window is complete
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}`,

        example: `Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Process:
Window [1,3,-1]: deque indices [1], max = 3
Window [3,-1,-3]: deque indices [1], max = 3
Window [-1,-3,5]: deque indices [4], max = 5
Window [-3,5,3]: deque indices [4,5], max = 5
Window [5,3,6]: deque indices [6], max = 6
Window [3,6,7]: deque indices [7], max = 7

Output: [3,3,5,5,6,7]`,

        visualization: `Step-by-step for window [1,3,-1]:
i=0: nums[0]=1
  deque=[], push 0
  deque=[0]

i=1: nums[1]=3
  3 > nums[0]=1, remove 0
  deque=[], push 1
  deque=[1]

i=2: nums[2]=-1
  -1 < nums[1]=3, just push
  deque=[1,2]
  Window complete: max = nums[1] = 3`,

        complexity: `Time: O(n) - each element added/removed once
Space: O(k) - deque size at most k`,

        keyInsight: "Maintain monotonic decreasing deque - larger elements in front"
      },

      {
        title: "4. First Non-Repeating Character in Stream",
        difficulty: "Medium",
        description: "Find first non-repeating character in a stream of characters",

        approach: `**Problem:**
Characters arrive one by one, need first non-repeating after each arrival.

**Strategy:**
• Use queue to maintain order of non-repeating characters
• Use hash map to count frequency
• After each character, clean queue front if frequency > 1

**Why Queue:**
• Need to maintain order of arrival
• First non-repeating = front of queue
• Remove from front when becomes repeating`,

        solution: `class FirstUnique {
    constructor() {
        this.queue = [];
        this.frequency = new Map();
    }

    add(char) {
        // Update frequency
        this.frequency.set(char, (this.frequency.get(char) || 0) + 1);

        // Add to queue if first occurrence
        if (this.frequency.get(char) === 1) {
            this.queue.push(char);
        }
    }

    getFirstUnique() {
        // Remove repeating characters from front
        while (this.queue.length > 0 &&
               this.frequency.get(this.queue[0]) > 1) {
            this.queue.shift();
        }

        // Return first non-repeating or null
        return this.queue.length > 0 ? this.queue[0] : null;
    }
}

// Usage:
function firstNonRepeatingChar(stream) {
    const fu = new FirstUnique();
    const result = [];

    for (let char of stream) {
        fu.add(char);
        result.push(fu.getFirstUnique() || '#');
    }

    return result;
}`,

        example: `Stream: "aabccxb"
After 'a': queue=['a'], first='a'
After 'a': queue=['a'], first='#' (a repeats, removed)
After 'b': queue=['b'], first='b'
After 'c': queue=['b','c'], first='b'
After 'c': queue=['b'], first='b' (c removed)
After 'x': queue=['b','x'], first='b'
After 'b': queue=['x'], first='x' (b removed)

Output: ['a','#','b','b','b','b','x']`,

        complexity: `Time: O(n) total for n characters
Space: O(unique characters)`,

        application: "Used in text processing, compression, pattern matching"
      },

      {
        title: "5. Implement Stack using Queues",
        difficulty: "Easy",
        description: "Implement a stack using one or two queues",

        approach: `**Two approaches:**

**Approach 1: Make push O(n), pop O(1)**
• Use two queues
• For push: add to q1, transfer all from q2 to q1, swap q1 and q2
• For pop: just dequeue from q2

**Approach 2: Make push O(1), pop O(n)**
• Use one queue
• For push: just enqueue
• For pop: dequeue and enqueue n-1 elements, then dequeue

**We'll implement Approach 2 (simpler with one queue)**`,

        solution: `class StackUsingQueue {
    constructor() {
        this.queue = [];
    }

    // O(1)
    push(x) {
        this.queue.push(x);
    }

    // O(n)
    pop() {
        if (this.empty()) {
            throw new Error("Stack is empty");
        }

        // Rotate all elements except last
        const size = this.queue.length;
        for (let i = 0; i < size - 1; i++) {
            this.queue.push(this.queue.shift());
        }

        // Now front is the last element (top of stack)
        return this.queue.shift();
    }

    // O(n)
    top() {
        if (this.empty()) {
            throw new Error("Stack is empty");
        }

        // Rotate to get last element
        const size = this.queue.length;
        for (let i = 0; i < size - 1; i++) {
            this.queue.push(this.queue.shift());
        }

        const topElement = this.queue[0];

        // Rotate back to maintain order
        this.queue.push(this.queue.shift());

        return topElement;
    }

    empty() {
        return this.queue.length === 0;
    }
}`,

        example: `Operations:
push(1): queue = [1]
push(2): queue = [1, 2]
push(3): queue = [1, 2, 3]

top():
  - Rotate: [2, 3, 1]
  - Rotate: [3, 1, 2]
  - Front is 3 (top of stack)
  - Rotate back: [1, 2, 3]
  - Returns 3

pop():
  - Rotate: [2, 3, 1]
  - Rotate: [3, 1, 2]
  - Dequeue: returns 3
  - queue = [1, 2]`,

        twoQueueSolution: `// Alternative: Two queues with O(1) pop
class StackUsingTwoQueues {
    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x) {
        // Add to q2
        this.q2.push(x);

        // Transfer all from q1 to q2
        while (this.q1.length > 0) {
            this.q2.push(this.q1.shift());
        }

        // Swap q1 and q2
        [this.q1, this.q2] = [this.q2, this.q1];
    }

    pop() {
        if (this.empty()) {
            throw new Error("Stack is empty");
        }
        return this.q1.shift();
    }

    top() {
        if (this.empty()) {
            throw new Error("Stack is empty");
        }
        return this.q1[0];
    }

    empty() {
        return this.q1.length === 0;
    }
}`,

        complexity: `Approach 1 (one queue):
• push: O(1)
• pop: O(n)
• top: O(n)

Approach 2 (two queues):
• push: O(n)
• pop: O(1)
• top: O(1)`,

        tradeoff: "Choose based on operation frequency - optimize frequent operation"
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Implementation Tips",

    tips: [
      {
        category: "Implementation Guidelines",
        points: [
          "Always check isEmpty() before dequeue or peek to prevent underflow",
          "Check isFull() before enqueue in bounded queues to prevent overflow",
          "Maintain size counter for O(1) size queries instead of counting",
          "Use circular queue for array implementation to avoid wasted space",
          "Document whether your queue is bounded or unbounded",
          "Consider thread safety for concurrent access (use locks or atomic operations)",
          "Implement clear/reset method for reusing queue instances"
        ]
      },

      {
        category: "Error Handling",
        points: [
          "Throw descriptive exceptions for underflow/overflow conditions",
          "Return null/undefined with error codes as alternative to exceptions",
          "Log queue state (size, front, rear) for debugging",
          "Validate input data before enqueue (null checks, type checks)",
          "Handle edge cases: empty queue, single element, full queue",
          "Provide clear error messages indicating queue state",
          "Consider using optional error callbacks for async operations"
        ],

        example: `// Good error handling example
class SafeQueue {
    enqueue(element) {
        if (element === null || element === undefined) {
            throw new Error("Cannot enqueue null/undefined");
        }

        if (this.isFull()) {
            console.warn(\`Queue full (size: \${this.size})\`);
            return false;
        }

        try {
            // Enqueue logic
            this.size++;
            return true;
        } catch (error) {
            console.error("Enqueue failed:", error);
            return false;
        }
    }
}`
      },

      {
        category: "Performance Optimization",
        points: [
          "Use circular array for bounded queues - avoids shifting elements",
          "Use linked list for unbounded queues with frequent size changes",
          "Pre-allocate array capacity if size is predictable",
          "Implement lazy deletion to avoid frequent memory operations",
          "Consider using deque (double-ended queue) for more flexibility",
          "Batch operations when possible to reduce overhead",
          "Use array doubling strategy (2x growth) for dynamic queues",
          "Profile your specific use case before choosing implementation"
        ],

        comparisonTable: `When to use which implementation:

Array-based (Circular):
✓ Known/bounded size
✓ Cache-friendly access needed
✓ Memory efficiency important
✗ Frequent resizing needed

Linked List:
✓ Unknown/unbounded size
✓ Frequent size changes
✓ No capacity planning needed
✗ Memory overhead acceptable
✗ Cache performance less critical

Dynamic Array:
✓ Variable size with growth pattern
✓ Cache-friendly access needed
✓ Occasional resizing acceptable
✗ Predictable capacity unknown`
      },

      {
        category: "Design Considerations",
        points: [
          "Choose between bounded (fixed size) vs unbounded (dynamic) based on requirements",
          "Consider priority queue if elements need ordering beyond FIFO",
          "Use blocking queue for producer-consumer scenarios",
          "Implement timeout mechanisms for blocking operations",
          "Add capacity limits to prevent memory exhaustion",
          "Consider persistence requirements (in-memory vs disk-backed)",
          "Design for thread safety if queue will be accessed concurrently"
        ],

        designPattern: `// Queue with timeout example
class TimedQueue {
    constructor(capacity, timeoutMs = 5000) {
        this.queue = new CircularQueue(capacity);
        this.timeoutMs = timeoutMs;
    }

    async enqueueWithTimeout(element) {
        const startTime = Date.now();

        while (this.queue.isFull()) {
            if (Date.now() - startTime > this.timeoutMs) {
                throw new Error("Enqueue timeout");
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return this.queue.enqueue(element);
    }
}`
      },

      {
        category: "Testing Strategies",
        points: [
          "Test empty queue operations (dequeue, peek should fail gracefully)",
          "Test single element queue (front == rear edge case)",
          "Test full queue operations (enqueue should fail or resize)",
          "Test wrap-around in circular queue implementation",
          "Test rapid enqueue/dequeue sequences (stress testing)",
          "Test boundary values (negative numbers, null, undefined)",
          "Verify FIFO order is maintained under all operations",
          "Test concurrent access if queue is thread-safe"
        ],

        testExample: `// Example test cases
describe('Queue Tests', () => {
    test('Empty queue dequeue throws error', () => {
        const queue = new Queue();
        expect(() => queue.dequeue()).toThrow("Queue is empty");
    });

    test('FIFO order maintained', () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
    });

    test('Circular wrap-around works', () => {
        const queue = new CircularQueue(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.dequeue();
        queue.dequeue();
        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(5);  // Should wrap to index 0

        expect(queue.size).toBe(3);
    });
})`
      },

      {
        category: "Common Pitfalls to Avoid",
        points: [
          "❌ Using linear array without circular logic (wastes space)",
          "❌ Forgetting to update both front and rear pointers",
          "❌ Not handling empty queue initialization (front = rear = -1)",
          "❌ Incorrect full condition in circular queue",
          "❌ Using wrong modulo arithmetic (should be (rear + 1) % capacity)",
          "❌ Not maintaining size counter (forces O(n) size query)",
          "❌ Allowing null/undefined elements without handling",
          "❌ Not considering thread safety in concurrent environments",
          "✓ Always use modulo for circular queue index calculations",
          "✓ Keep size counter for efficient isEmpty/isFull checks",
          "✓ Document and handle all edge cases explicitly",
          "✓ Choose implementation based on actual use case, not assumptions"
        ]
      },

      {
        category: "Code Quality Tips",
        points: [
          "Use descriptive method names: enqueue/dequeue vs add/remove",
          "Add comprehensive comments for circular queue logic",
          "Maintain clear variable names (front, rear, not f, r)",
          "Separate concerns: queue logic vs error handling vs logging",
          "Make methods chainable where appropriate (return this)",
          "Provide toString() or display() for debugging",
          "Use constants for error messages to avoid duplication",
          "Follow consistent naming conventions across codebase"
        ],

        example: `// Good code quality example
class Queue {
    // Constants
    static ERROR_EMPTY = "Queue is empty";
    static ERROR_FULL = "Queue is full";

    constructor(capacity) {
        this.capacity = capacity;
        this.data = new Array(capacity);
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    /**
     * Adds element to rear of queue
     * @param {*} element - Element to add
     * @returns {boolean} - Success status
     * @throws {Error} - If queue is full
     */
    enqueue(element) {
        // Implementation with clear logic
    }

    /**
     * Returns string representation for debugging
     * @returns {string}
     */
    toString() {
        if (this.isEmpty()) return "Queue: []";

        const elements = [];
        let idx = this.front;
        let count = 0;

        while (count < this.size) {
            elements.push(this.data[idx]);
            idx = (idx + 1) % this.capacity;
            count++;
        }

        return \`Queue: [\${elements.join(', ')}]\`;
    }
}`
      }
    ]
  },

  comparison: {
    title: "Queue vs Other Data Structures",

    comparisons: [
      {
        structure: "Stack",
        order: "LIFO (Last-In-First-Out)",
        insertOperation: "push - at top",
        removeOperation: "pop - from top",
        access: "Only top element",
        timeComplexity: "O(1) for push/pop",
        useCase: "Function calls, undo/redo, backtracking",
        notes: "Opposite order of queue - last in, first out"
      },

      {
        structure: "Queue",
        order: "FIFO (First-In-First-Out)",
        insertOperation: "enqueue - at rear",
        removeOperation: "dequeue - from front",
        access: "Only front element",
        timeComplexity: "O(1) for enqueue/dequeue",
        useCase: "Task scheduling, BFS, buffering",
        notes: "Natural ordering - first in, first out"
      },

      {
        structure: "Array",
        order: "Indexed - any order",
        insertOperation: "O(1) at end, O(n) at beginning",
        removeOperation: "O(1) at end, O(n) at beginning",
        access: "Random access O(1)",
        timeComplexity: "Varies by position",
        useCase: "Random access, sorted data",
        notes: "Flexible but expensive for front operations"
      },

      {
        structure: "Linked List",
        order: "Sequential - any order",
        insertOperation: "O(1) with pointer",
        removeOperation: "O(1) with pointer",
        access: "Sequential only O(n)",
        timeComplexity: "Fast insert/delete, slow search",
        useCase: "Frequent insertions/deletions",
        notes: "Good for queue but no random access"
      },

      {
        structure: "Priority Queue",
        order: "Priority-based",
        insertOperation: "O(log n) - heap insert",
        removeOperation: "O(log n) - heap delete",
        access: "Only highest priority",
        timeComplexity: "O(log n) for operations",
        useCase: "Dijkstra, task scheduling by priority",
        notes: "Not FIFO - priority overrides order"
      },

      {
        structure: "Deque (Double-Ended Queue)",
        order: "FIFO or LIFO",
        insertOperation: "O(1) at both ends",
        removeOperation: "O(1) at both ends",
        access: "Both ends accessible",
        timeComplexity: "O(1) for all end operations",
        useCase: "Sliding window, palindrome check",
        notes: "More flexible than queue, can work as both stack and queue"
      },

      {
        structure: "Circular Buffer",
        order: "FIFO with wrap-around",
        insertOperation: "O(1) - overwrites old data",
        removeOperation: "O(1)",
        access: "Fixed size, circular",
        timeComplexity: "O(1) for all operations",
        useCase: "Streaming data, ring buffer",
        notes: "Fixed size, oldest data overwritten when full"
      }
    ],

    detailedComparison: {
      queueVsStack: `**Queue vs Stack - Key Differences:**

Order:
• Queue: FIFO (First-In-First-Out)
• Stack: LIFO (Last-In-First-Out)

Visual:
Queue:  [1 2 3] → 1 comes out first
        ↑ rear

Stack:  [1]     → 3 comes out first
        [2]
        [3] ← top

Use Cases:
• Queue: Breadth-first, sequential processing, scheduling
• Stack: Depth-first, backtracking, expression evaluation

When to use what:
• Need processing in order of arrival? → Queue
• Need to reverse order or backtrack? → Stack
• Need to undo operations? → Stack
• Need fair scheduling? → Queue`,

      queueVsArray: `**Queue vs Array - When to Use:**

Queue (restricted operations):
✓ Only need front/rear access
✓ FIFO ordering required
✓ Efficient front operations needed
✓ Task scheduling, BFS
✗ Need random access

Array (flexible operations):
✓ Need random access by index
✓ Binary search on sorted data
✓ Multiple access patterns
✗ Frequent front operations expensive

Performance:
Queue operations: O(1) for all
Array operations:
• Access by index: O(1)
• Insert/delete at front: O(n) - must shift
• Insert/delete at end: O(1)

Example:
// Array - expensive front deletion
arr = [1,2,3,4,5]
arr.shift() // O(n) - shifts all elements

// Queue - efficient front deletion
queue = [1,2,3,4,5]
queue.dequeue() // O(1) - just move pointer`,

      queueVsPriorityQueue: `**Queue vs Priority Queue:**

Simple Queue:
• Strict FIFO order
• Equal priority for all elements
• O(1) enqueue/dequeue
• Simple implementation
• Use when: order of arrival matters

Priority Queue:
• Priority-based ordering
• Higher priority served first
• O(log n) insert/remove (heap)
• Complex implementation
• Use when: importance matters more than order

Example scenarios:
Task Queue (FIFO):
[Task1, Task2, Task3] → Task1 processed first

Priority Task Queue:
[Task1(P3), Task2(P1), Task3(P5)]
→ Task3(P5) processed first (highest priority)

Real-world:
• Emergency room: Priority queue (critical patients first)
• Bank teller: Simple queue (first come, first served)
• OS scheduling: Multi-level priority queue`,

      queueVsDeque: `**Queue vs Deque (Double-Ended Queue):**

Simple Queue:
• Insert at rear only
• Remove from front only
• Restricted but clear semantics
• Slightly simpler implementation

Deque (Double-Ended Queue):
• Insert at both ends: addFront(), addRear()
• Remove from both ends: removeFront(), removeRear()
• Can simulate both stack and queue
• More flexible, slightly more complex

When to use Deque:
✓ Need flexibility of both ends
✓ Implementing sliding window problems
✓ Want to use as both stack and queue
✓ Palindrome checking
✓ Steal from either end

When to use Simple Queue:
✓ Only need FIFO semantics
✓ Simpler code, clearer intent
✓ Prevent misuse (restrictions are good)
✓ Standard queue operations sufficient

Example - Deque advantage:
// Sliding window maximum
deque.addRear(index)
deque.removeFront() // remove old
deque.removeRear()  // remove smaller

// Can't do with simple queue!`
    },

    whenToUseQueue: `**Use Queue When:**
✓ Need to process items in order of arrival (FIFO)
✓ Implementing BFS algorithm
✓ Task scheduling (round-robin, fair scheduling)
✓ Managing shared resources (printer queue, CPU scheduling)
✓ Buffering (I/O buffers, streaming data)
✓ Message passing between components
✓ Level-order tree traversal
✓ Handling asynchronous requests

**Don't Use Queue When:**
✗ Need random access to elements (use Array)
✗ Need to access/remove from both ends frequently (use Deque)
✗ Priority matters more than order (use Priority Queue)
✗ Need LIFO ordering (use Stack)
✗ Need fast search/lookup (use Hash Table or BST)
✗ Need sorted order beyond insertion (use BST or Heap)

**Choose Implementation Based On:**
• Fixed size, bounded → Circular Array Queue
• Dynamic size, unbounded → Linked List Queue
• Priority-based → Priority Queue (Heap)
• Both ends access → Deque
• Thread-safe needed → Blocking Queue
• Persistent storage → Disk-backed Queue`
  }
};
