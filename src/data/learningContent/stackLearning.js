export const stackLearningContent = {
  introduction: {
    title: "What is a Stack?",
    content: `A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Think of it like a stack of plates - you can only add or remove plates from the top.

**Key Characteristics:**
• LIFO (Last-In-First-Out) ordering
• Access only to the top element
• Two primary operations: push and pop
• Can be implemented using arrays or linked lists
• Restricted access pattern for controlled data flow

**Real-World Analogies:**
• Stack of plates in a cafeteria
• Browser back button (navigation history)
• Undo mechanism in text editors
• Stack of books on a desk
• Function call stack in programming`,

    visualExample: {
      description: "Stack Operations Visualization",
      operations: [
        "Empty Stack: []",
        "Push 10: [10]",
        "Push 20: [10, 20]",
        "Push 30: [10, 20, 30] ← top",
        "Pop: [10, 20] (30 removed)",
        "Peek: 20 (top element)"
      ]
    }
  },

  fundamentals: {
    title: "Stack Fundamentals",
    sections: [
      {
        concept: "LIFO Principle",
        explanation: `**Last-In-First-Out (LIFO):**
The last element added to the stack is the first one to be removed. This ordering is the defining characteristic of a stack.

**Why LIFO Matters:**
• Natural for nested structures (parentheses, function calls)
• Reverses order of items
• Enables backtracking
• Memory-efficient for temporary storage`,

        example: `Timeline:
Push A → Stack: [A]
Push B → Stack: [A, B]
Push C → Stack: [A, B, C]
Pop   → Returns C, Stack: [A, B]
Pop   → Returns B, Stack: [A]

Notice: Last pushed (C) was first popped`
      },

      {
        concept: "Stack Structure",
        explanation: `**Components:**
• Top pointer/index - tracks top element
• Data array/linked list - stores elements
• Size/capacity - maximum elements (array implementation)

**Key Properties:**
• Only top element is accessible
• Dynamic size (linked list) or fixed size (array)
• O(1) push and pop operations
• No direct access to middle elements`,

        diagram: `
    Top → [30]  ← Can only access this
          [20]
          [10]
        Bottom
        `
      }
    ]
  },

  operations: {
    title: "Stack Operations",
    sections: [
      {
        operation: "Push",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        description: `**Push - Add element to top**

**Algorithm:**
1. Check if stack is full (array implementation)
2. Increment top pointer
3. Place new element at top position
4. Update size

**When to Use:**
• Adding new item to process
• Saving state for backtracking
• Building nested structures`,

        pseudocode: `function push(stack, element):
    // Check overflow (for array)
    if stack.top >= stack.capacity - 1:
        throw "Stack Overflow"

    // Increment top and add element
    stack.top++
    stack.data[stack.top] = element
    stack.size++

    return true`,

        example: `Initial: [10, 20]  top=1
Push(30):
  top = 2
  data[2] = 30
  size = 3
Result: [10, 20, 30]  top=2`
      },

      {
        operation: "Pop",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        description: `**Pop - Remove and return top element**

**Algorithm:**
1. Check if stack is empty
2. Retrieve element at top
3. Decrement top pointer
4. Return retrieved element
5. Update size

**When to Use:**
• Processing most recent item
• Backtracking to previous state
• Undoing operations`,

        pseudocode: `function pop(stack):
    // Check underflow
    if stack.top < 0:
        throw "Stack Underflow"

    // Get top element
    element = stack.data[stack.top]

    // Decrement top
    stack.top--
    stack.size--

    return element`,

        example: `Initial: [10, 20, 30]  top=2
Pop():
  element = 30
  top = 1
  size = 2
Result: [10, 20]  top=1
Returns: 30`
      },

      {
        operation: "Peek/Top",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        description: `**Peek - View top element without removing**

**Algorithm:**
1. Check if stack is empty
2. Return element at top position
3. Don't modify stack state

**When to Use:**
• Check next item to process
• Verify expected value
• Look ahead without commitment`,

        pseudocode: `function peek(stack):
    // Check if empty
    if stack.top < 0:
        throw "Stack is empty"

    // Return top element
    return stack.data[stack.top]`,

        example: `Stack: [10, 20, 30]  top=2
Peek(): Returns 30
Stack unchanged: [10, 20, 30]  top=2`
      },

      {
        operation: "isEmpty",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        description: `**isEmpty - Check if stack has no elements**

**Algorithm:**
1. Check if top pointer is -1 (or size is 0)
2. Return boolean result`,

        pseudocode: `function isEmpty(stack):
    return stack.top == -1
    // or: return stack.size == 0`,

        example: `Empty stack: top = -1 → isEmpty() = true
Non-empty: top = 2 → isEmpty() = false`
      },

      {
        operation: "isFull",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        description: `**isFull - Check if stack reached capacity** (Array implementation only)

**Algorithm:**
1. Compare top with capacity-1
2. Return boolean result`,

        pseudocode: `function isFull(stack):
    return stack.top == stack.capacity - 1`,

        example: `Capacity 5, top=4 → isFull() = true
Capacity 5, top=2 → isFull() = false`
      }
    ]
  },

  implementation: {
    title: "Implementation Approaches",
    methods: [
      {
        approach: "Array-Based Implementation",
        pros: [
          "Simple and cache-friendly",
          "O(1) random access to elements",
          "Memory contiguous",
          "Better cache performance"
        ],
        cons: [
          "Fixed size (need to resize)",
          "Resize operation is O(n)",
          "Wasted space if underutilized",
          "Stack overflow if exceeded capacity"
        ],
        code: `class ArrayStack:
    constructor(capacity):
        this.data = new Array(capacity)
        this.top = -1
        this.capacity = capacity

    push(element):
        if this.top >= this.capacity - 1:
            throw "Stack Overflow"
        this.top++
        this.data[this.top] = element

    pop():
        if this.top < 0:
            throw "Stack Underflow"
        element = this.data[this.top]
        this.top--
        return element

    peek():
        if this.top < 0:
            throw "Stack is empty"
        return this.data[this.top]

    isEmpty():
        return this.top == -1`,
        bestFor: "Known maximum size, frequent push/pop, memory efficiency"
      },

      {
        approach: "Linked List Implementation",
        pros: [
          "Dynamic size (no overflow)",
          "No wasted space",
          "Easy to implement",
          "No resizing needed"
        ],
        cons: [
          "Extra memory for pointers",
          "Not cache-friendly",
          "Slightly slower than array",
          "More memory overhead per element"
        ],
        code: `class Node:
    constructor(data):
        this.data = data
        this.next = null

class LinkedListStack:
    constructor():
        this.top = null
        this.size = 0

    push(element):
        newNode = new Node(element)
        newNode.next = this.top
        this.top = newNode
        this.size++

    pop():
        if this.top == null:
            throw "Stack Underflow"
        element = this.top.data
        this.top = this.top.next
        this.size--
        return element

    peek():
        if this.top == null:
            throw "Stack is empty"
        return this.top.data

    isEmpty():
        return this.top == null`,
        bestFor: "Unknown size, dynamic growth, no size limit needed"
      }
    ]
  },

  complexity: {
    title: "Time & Space Complexity",
    analysis: `**All Operations are O(1):**

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Push      | O(1) | O(1)  | Direct access to top |
| Pop       | O(1) | O(1)  | Direct removal from top |
| Peek      | O(1) | O(1)  | View top element |
| isEmpty   | O(1) | O(1)  | Check top pointer |
| isFull    | O(1) | O(1)  | Check capacity (array) |

**Space Complexity:**
• Array: O(n) where n is capacity (pre-allocated)
• Linked List: O(n) where n is actual elements
• Extra space: O(1) for top pointer and size

**Why Stack is Efficient:**
• All operations access only the top
• No traversal required
• No searching needed
• No shifting of elements`,

    explanation: `The efficiency comes from the restricted access pattern - we only ever work with the top element, never needing to access or move elements in the middle or bottom of the stack.`
  },

  applications: {
    title: "Real-World Applications",
    examples: [
      {
        application: "Function Call Stack",
        description: "Programming languages use stacks to manage function calls, local variables, and return addresses",
        details: `When function is called:
• Push return address
• Push parameters
• Push local variables

When function returns:
• Pop local variables
• Pop parameters
• Pop and jump to return address

Example:
main() calls foo() calls bar()
Stack grows: [main] → [main, foo] → [main, foo, bar]
Stack shrinks: [main, foo, bar] → [main, foo] → [main]`
      },

      {
        application: "Expression Evaluation",
        description: "Evaluate arithmetic expressions and convert between infix, prefix, postfix notations",
        details: `Infix to Postfix conversion:
Expression: (A + B) * C
1. Scan left to right
2. Push operands to output
3. Use stack for operators
4. Pop operators based on precedence

Postfix Evaluation:
Expression: 2 3 + 5 *
1. Push operands: [2, 3]
2. See +: pop 3,2, push 5: [5]
3. Push 5: [5, 5]
4. See *: pop 5,5, push 25: [25]
Result: 25`
      },

      {
        application: "Browser History",
        description: "Back button functionality in web browsers",
        details: `Navigation Stack:
• Visit page: push to stack
• Back button: pop current, show previous
• Forward button: uses separate forward stack

Example:
Visit A: [A]
Visit B: [A, B]
Visit C: [A, B, C]
Back: [A, B] (C moved to forward stack)
Back: [A] (B moved to forward stack)
Forward: [A, B] (B restored)`
      },

      {
        application: "Undo/Redo Mechanism",
        description: "Text editors, graphics software, IDEs",
        details: `Two stacks: undo and redo
• Action performed: push to undo stack
• Undo: pop from undo, push to redo
• Redo: pop from redo, push to undo
• New action: clear redo stack

Example:
Type "Hello": undo=[type "Hello"]
Undo: undo=[], redo=[type "Hello"]
Type "World": undo=[type "World"], redo=[]`
      },

      {
        application: "Balanced Parentheses",
        description: "Checking syntax in code, mathematical expressions",
        details: `Algorithm:
1. Scan expression left to right
2. Opening bracket: push to stack
3. Closing bracket: pop and match
4. End: stack should be empty

Example: "{[()]}"
{ → push {: [{]
[ → push [: [{, []
( → push (: [{, [, (]
) → pop and match (: [{, []
] → pop and match [: [{]
} → pop and match {: []
Result: Valid (stack empty)`
      },

      {
        application: "Depth-First Search (DFS)",
        description: "Graph and tree traversal",
        details: `DFS using explicit stack:
1. Push start node
2. While stack not empty:
   - Pop node
   - Process node
   - Push unvisited neighbors
3. Continue until stack empty

Replaces recursive call stack with explicit stack for iterative DFS`
      }
    ]
  },

  interviewProblems: {
    title: "Common Interview Problems",
    problems: [
      {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string containing '()', '{}', '[]', determine if it's valid",
        hint: "Use stack to match opening and closing brackets",
        solution: `Algorithm:
1. For each character:
   - If opening bracket: push to stack
   - If closing bracket: check if matches top
2. At end: stack should be empty

Time: O(n), Space: O(n)

Code:
function isValid(s):
    stack = []
    pairs = {')':'(', '}':'{', ']':'['}

    for char in s:
        if char in '({[':
            stack.push(char)
        else:
            if stack.isEmpty() or stack.pop() != pairs[char]:
                return false
    return stack.isEmpty()`
      },

      {
        title: "Min Stack",
        difficulty: "Medium",
        description: "Design a stack that supports push, pop, top, and retrieving minimum in O(1)",
        hint: "Use two stacks - one for values, one for minimums",
        solution: `Algorithm: Use auxiliary stack for minimums

class MinStack:
    constructor():
        this.stack = []
        this.minStack = []

    push(val):
        this.stack.push(val)
        if minStack.isEmpty() or val <= minStack.top():
            this.minStack.push(val)

    pop():
        val = this.stack.pop()
        if val == this.minStack.top():
            this.minStack.pop()

    getMin():
        return this.minStack.top()

Time: O(1) all operations, Space: O(n)`
      },

      {
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        description: "Evaluate arithmetic expression in postfix notation",
        hint: "Use stack - push operands, pop for operators",
        solution: `Algorithm:
1. For each token:
   - If number: push to stack
   - If operator: pop 2, apply operator, push result
2. Return final stack value

function evalRPN(tokens):
    stack = []
    for token in tokens:
        if token is number:
            stack.push(parseInt(token))
        else:
            b = stack.pop()
            a = stack.pop()
            result = apply(a, token, b)
            stack.push(result)
    return stack.pop()

Time: O(n), Space: O(n)`
      },

      {
        title: "Next Greater Element",
        difficulty: "Medium",
        description: "For each element, find the next greater element to its right",
        hint: "Use stack to keep track of elements waiting for greater element",
        solution: `Algorithm: Monotonic decreasing stack
1. Traverse array right to left
2. While stack.top() <= current: pop
3. If stack empty: no greater element
4. Else: stack.top() is next greater
5. Push current to stack

function nextGreater(arr):
    result = []
    stack = []

    for i from n-1 to 0:
        while !stack.isEmpty() && stack.top() <= arr[i]:
            stack.pop()

        result[i] = stack.isEmpty() ? -1 : stack.top()
        stack.push(arr[i])

    return result

Time: O(n), Space: O(n)`
      },

      {
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        description: "Find largest rectangular area in histogram",
        hint: "Use stack to keep track of increasing heights",
        solution: `Algorithm: Monotonic increasing stack
1. For each bar:
   - While current < stack.top(): pop and calculate area
   - Push current index
2. Process remaining stack elements

Key insight: For each bar, find left and right boundaries where heights are >= current height

Time: O(n), Space: O(n)

This is a classic hard problem using stack for O(n) solution`
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Tips",
    tips: [
      {
        category: "Implementation",
        practices: [
          "Always check for underflow before pop/peek",
          "Check for overflow before push (array implementation)",
          "Initialize top to -1 for array implementation",
          "Use isEmpty() rather than checking top directly",
          "Consider using linked list for unbounded size"
        ]
      },
      {
        category: "Error Handling",
        practices: [
          "Throw exceptions for underflow/overflow",
          "Return null/undefined instead of throwing (alternative)",
          "Provide clear error messages",
          "Document expected behavior for edge cases",
          "Consider returning Optional/Maybe types"
        ]
      },
      {
        category: "Performance",
        practices: [
          "Use array implementation for better cache performance",
          "Pre-allocate array size if maximum known",
          "Use linked list only if truly dynamic size needed",
          "Avoid resizing arrays frequently",
          "Consider pool of nodes for linked list"
        ]
      },
      {
        category: "Design",
        practices: [
          "Keep stack interface simple (push, pop, peek, isEmpty)",
          "Make class generic/template for any type",
          "Consider thread-safety if multi-threaded",
          "Provide size() method for debugging",
          "Override toString() for easy printing"
        ]
      }
    ]
  },

  comparison: {
    title: "Stack vs Other Data Structures",
    comparisons: [
      {
        structure: "Queue",
        difference: "Stack is LIFO, Queue is FIFO. Stack has one end (top), Queue has two ends (front/rear)",
        whenToUseStack: "Need LIFO, backtracking, undo operations, DFS",
        whenToUseQueue: "Need FIFO, task scheduling, BFS, producer-consumer"
      },
      {
        structure: "Array",
        difference: "Stack has restricted access (top only), Array has random access to any index",
        whenToUseStack: "Need LIFO ordering, don't need random access",
        whenToUseArray: "Need random access, sorting, searching"
      },
      {
        structure: "Linked List",
        difference: "Stack restricts to top operations, Linked List allows insertion/deletion anywhere",
        whenToUseStack: "Need LIFO with O(1) operations",
        whenToUseLinkedList: "Need insertion/deletion at arbitrary positions"
      },
      {
        structure: "Recursion",
        difference: "Stack uses explicit data structure, Recursion uses implicit call stack",
        whenToUseStack: "Better control, avoid stack overflow, iterative algorithms",
        whenToUseRecursion: "More readable, naturally recursive problems"
      }
    ]
  }
};
