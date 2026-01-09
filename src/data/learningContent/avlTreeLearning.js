// ============= src/data/learningContent/avlTreeLearning.js =============
// Comprehensive learning content for AVL Tree (Self-Balancing Binary Search Tree)

export const avlTreeLearningContent = {
  introduction: {
    title: "What is an AVL Tree?",
    content: `An AVL Tree is a self-balancing Binary Search Tree invented by Georgy Adelson-Velsky and Evgenii Landis in 1962. It automatically maintains its height-balanced property after every insertion and deletion operation.

**Key Properties:**
• Self-balancing Binary Search Tree
• For any node, heights of left and right subtrees differ by at most 1
• Balance Factor = Height(Left Subtree) - Height(Right Subtree)
• |Balance Factor| <= 1 for all nodes
• Guarantees O(log n) time complexity for all operations
• Maintains BST property: left < root < right

**What Makes AVL Trees Special?**
Unlike regular BSTs that can become skewed (degrading to O(n) performance), AVL trees automatically restructure themselves through rotations to maintain balance. This ensures consistent O(log n) performance for search, insert, and delete operations.

**Why Use AVL Trees?**
• Guaranteed O(log n) worst-case performance
• Faster lookups than Red-Black trees (more rigidly balanced)
• Ideal for read-heavy workloads
• Prevents worst-case BST scenarios (linked list degradation)`,

    visualExample: {
      description: "Example AVL Tree with balance factors",
      tree: `
           50(0)
          /      \\
       30(0)      70(-1)
       /   \\          \\
     20(0) 40(0)      80(0)

Balance Factor shown in parentheses: (Height of Left - Height of Right)

Notice how:
• Every node has |Balance Factor| <= 1
• Node 70 has BF = -1 (right subtree taller by 1)
• All other nodes have BF = 0 (perfectly balanced)
• Tree height = 2 (minimum possible for 6 nodes)
• This is also a valid BST: maintains left < root < right
      `
    },

    heightBalancedProperty: {
      description: "Height-Balanced Property Visualization",
      content: `**Height-Balanced Tree (AVL):**
       50          Height = 2
      /  \\         For every node:
    30    70       |BF| <= 1
   / \\   / \\
  20 40 60 80     Balanced!

**NOT Height-Balanced (Regular BST):**
  10             Height = 4
    \\            Node 10 has BF = -4
     20          (Left height = 0, Right height = 4)
       \\         |BF| > 1 - VIOLATES AVL property!
        30
          \\
           40
             \\
              50

The AVL property ensures height never exceeds ~1.44 * log₂(n)
Regular BST can have height = n (worst case)`
    }
  },

  fundamentals: {
    title: "AVL Tree Fundamentals",
    sections: [
      {
        subtitle: "1. Balance Factor",
        content: `**Balance Factor (BF) Definition:**
BF(node) = Height(Left Subtree) - Height(Right Subtree)

**Valid Balance Factors in AVL:**
• BF = -1: Right subtree is 1 level taller
• BF = 0: Both subtrees have equal height (perfectly balanced)
• BF = +1: Left subtree is 1 level taller

**Invalid Balance Factors (require rebalancing):**
• BF = -2 or less: Right-heavy (needs left rotation)
• BF = +2 or more: Left-heavy (needs right rotation)

**Important Notes:**
• Height of null node = -1 (or 0, depending on convention)
• Height of leaf node = 0
• Balance factor must be calculated after every insertion/deletion
• Rebalancing starts from inserted/deleted node and moves up to root`,

        example: `Calculate Balance Factors:

       50           BF = 1 - 0 = +1
      /  \\
    30    60       BF(30) = 1 - 0 = +1
   /               BF(60) = 0 - 0 = 0
  20               BF(20) = 0 - 0 = 0

Height calculations:
• Height(20) = 0 (leaf)
• Height(30) = 1 + max(height(20), height(null)) = 1
• Height(60) = 0 (leaf)
• Height(50) = 1 + max(height(30), height(60)) = 2`
      },

      {
        subtitle: "2. Height Calculation",
        content: `**Height of a Node:**
Height = 1 + max(Height(Left Child), Height(Right Child))

**Base Cases:**
• Height of null node = -1
• Height of leaf node = 0

**Why Height Matters:**
• Determines balance factor
• Used to detect imbalance
• Must be updated after rotations
• Efficient to store height in each node (space-time tradeoff)

**Optimization:**
Most implementations store height in each node to avoid recalculating:
\`\`\`
class AVLNode {
    value: any
    left: AVLNode
    right: AVLNode
    height: int     // Cached height value
}
\`\`\``,

        example: `Height Calculation Example:

         50 (h=3)
        /         \\
      30 (h=2)    70 (h=1)
     /   \\            \\
   20(h=1) 40(h=0)    80(h=0)
   /
 10(h=0)

Step-by-step:
1. height(10) = 0 (leaf)
2. height(20) = 1 + max(0, -1) = 1
3. height(30) = 1 + max(1, 0) = 2
4. height(40) = 0 (leaf)
5. height(80) = 0 (leaf)
6. height(70) = 1 + max(-1, 0) = 1
7. height(50) = 1 + max(2, 1) = 3`
      },

      {
        subtitle: "3. Why Balancing Matters",
        content: `**Performance Impact of Balance:**

**Balanced AVL Tree (n = 1023 nodes):**
• Height = 10 levels
• Search worst case = 10 comparisons
• Insert worst case = 10 comparisons + rotation

**Unbalanced BST (n = 1023 nodes, skewed):**
• Height = 1023 levels
• Search worst case = 1023 comparisons
• Insert worst case = 1023 comparisons

**That's 100x slower for unbalanced!**

**Height Bounds in AVL:**
• Minimum height = ⌊log₂(n)⌋
• Maximum height ≈ 1.44 * log₂(n)
• Very tight bounds compared to regular BST (can be n)

**Real-World Impact:**
• 1 million nodes: AVL height ≈ 28, BST height could be 1 million
• 1 billion nodes: AVL height ≈ 43, BST height could be 1 billion
• AVL guarantees fast operations even with adversarial input`,

        comparison: `Operation Comparison (1 million nodes):

Data Structure    Search      Insert      Delete
────────────────────────────────────────────────
Unbalanced BST    O(n)        O(n)        O(n)
                  1M ops      1M ops      1M ops

AVL Tree          O(log n)    O(log n)    O(log n)
                  20 ops      20 + rotate 20 + rotate

Hash Table        O(1) avg    O(1) avg    O(1) avg
                  But NO      But NO      But NO
                  ordering    ordering    ordering

AVL gives you both speed AND sorted order!`
      }
    ]
  },

  balanceFactorAndHeight: {
    title: "Balance Factor and Height Management",

    calculatingBalanceFactor: {
      subtitle: "Calculating Balance Factor",
      content: `**Formula:**
\`\`\`
balanceFactor(node) = height(node.left) - height(node.right)
\`\`\`

**Implementation:**
\`\`\`javascript
function getHeight(node) {
    if (node === null) return -1;
    return node.height;
}

function getBalanceFactor(node) {
    if (node === null) return 0;
    return getHeight(node.left) - getHeight(node.right);
}

function updateHeight(node) {
    if (node === null) return;
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}
\`\`\`

**When to Calculate:**
• After every insertion
• After every deletion
• After every rotation
• Bottom-up: from modified node to root`,

      examples: [
        {
          scenario: "Balanced Node",
          tree: `    50
   /  \\
  30    70

BF(50) = height(30) - height(70)
       = 0 - 0
       = 0 (Balanced!)`,
          result: "No rotation needed"
        },
        {
          scenario: "Left-Heavy Node",
          tree: `    50
   /
  30
 /
20

BF(50) = height(30) - height(null)
       = 1 - (-1)
       = 2 (Left-heavy!)`,
          result: "Needs right rotation"
        },
        {
          scenario: "Right-Heavy Node",
          tree: `  50
    \\
     70
       \\
        80

BF(50) = height(null) - height(70)
       = -1 - 1
       = -2 (Right-heavy!)`,
          result: "Needs left rotation"
        }
      ]
    },

    maintainingAVLProperty: {
      subtitle: "Maintaining the AVL Property",
      content: `**The AVL Invariant:**
For every node in the tree: |balanceFactor| <= 1

**Detection and Repair:**
1. **Insertion/Deletion:** Modify tree normally (like BST)
2. **Update Heights:** Bottom-up from modified node
3. **Check Balance:** Calculate balance factor for each ancestor
4. **Detect Imbalance:** If |BF| > 1, tree is imbalanced
5. **Identify Rotation Type:** Based on BF values
6. **Perform Rotation:** Restructure tree to restore balance
7. **Continue Upward:** Check ancestors until root

**Four Imbalance Cases:**`,

      cases: [
        {
          case: "Left-Left (LL)",
          balanceFactor: "BF(node) = +2, BF(node.left) = +1",
          fix: "Single Right Rotation",
          visualization: `   50(+2)          30
     /               /  \\
   30(+1)    →     20    50
   /
 20`
        },
        {
          case: "Right-Right (RR)",
          balanceFactor: "BF(node) = -2, BF(node.right) = -1",
          fix: "Single Left Rotation",
          visualization: `50(-2)              70
    \\               /  \\
     70(-1)   →   50    80
       \\
        80`
        },
        {
          case: "Left-Right (LR)",
          balanceFactor: "BF(node) = +2, BF(node.left) = -1",
          fix: "Left Rotation on left child, then Right Rotation",
          visualization: `   50(+2)         50         40
     /               /           /  \\
   30(-1)    →     40     →    30   50
     \\            /
      40        30`
        },
        {
          case: "Right-Left (RL)",
          balanceFactor: "BF(node) = -2, BF(node.right) = +1",
          fix: "Right Rotation on right child, then Left Rotation",
          visualization: `50(-2)        50            60
    \\              \\          /  \\
     70(+1)   →     60    →  50   70
     /                \\
   60                  70`
        }
      ]
    }
  },

  rotations: {
    title: "Tree Rotations - The Heart of AVL",
    description: "Rotations are the fundamental operations that rebalance AVL trees while maintaining BST property",

    sections: [
      {
        rotationType: "Right Rotation (LL Case)",
        when: "BF(node) = +2 and BF(node.left) >= 0",
        description: `**Scenario:** Node is left-heavy and left child is also left-heavy or balanced

**What happens:**
• Left child becomes new root
• Original root becomes right child of new root
• Right subtree of left child becomes left subtree of original root

**BST Property:** Maintained throughout rotation
**Time Complexity:** O(1) - just pointer manipulation`,

        stepByStep: `**Step-by-Step Right Rotation:**

BEFORE:          z (BF=+2)
                /  \\
             y(+1)  T4
             / \\
          T1   T2   T3

Step 1: Save y's right subtree (T3)
Step 2: Make z the right child of y
Step 3: Make T3 the left child of z
Step 4: Update heights (z first, then y)
Step 5: Return y as new root

AFTER:           y
                / \\
              T1   z
                  / \\
                T3   T4

Order maintained: T1 < y < T3 < z < T4`,

        pseudocode: `function rotateRight(z):
    y = z.left              // Save left child
    T3 = y.right            // Save left child's right subtree

    // Perform rotation
    y.right = z             // Make z the right child of y
    z.left = T3             // Make T3 the left child of z

    // Update heights (bottom-up)
    updateHeight(z)         // Update z first (now lower)
    updateHeight(y)         // Then update y (new root)

    return y                // Return new root`,

        visualExample: `Example: Insert 20, 10, 5 into AVL tree

After inserting 20, 10:
    20
   /
  10        Balanced (BF=+1)

After inserting 5:
    20 (BF=+2)    ← Imbalanced! LL case
   /
  10 (BF=+1)
 /
5

Perform RIGHT ROTATION on 20:

     10            ← New root
    /  \\
   5    20        ← Balanced! All BF = 0

Tree is now balanced with height = 1 (optimal)`,

        detailedDiagram: `DETAILED RIGHT ROTATION VISUALIZATION:

Initial State (Imbalanced):
                  50 (BF = +2)  ← Imbalanced
                 /  \\
        (BF=+1) 30   [T4: 70]
               /  \\
     [T1: 20] 25  [T3: 40]

Rotation Process:
• Node 50 is imbalanced (BF = +2)
• Node 30 is left child with BF >= 0
• This is LL case → Right Rotation on 50

After Right Rotation:
                  30              ← New root (balanced)
                 /  \\
       [T1: 20] 25   50           ← Old root (now balanced)
                    /  \\
          [T3: 40] 40  [T4: 70]

All subtrees maintain BST order:
T1(20) < 25 < 30 < T3(40) < 50 < T4(70)`
      },

      {
        rotationType: "Left Rotation (RR Case)",
        when: "BF(node) = -2 and BF(node.right) <= 0",
        description: `**Scenario:** Node is right-heavy and right child is also right-heavy or balanced

**What happens:**
• Right child becomes new root
• Original root becomes left child of new root
• Left subtree of right child becomes right subtree of original root

**Mirror of Right Rotation**`,

        stepByStep: `**Step-by-Step Left Rotation:**

BEFORE:       z (BF=-2)
             / \\
           T1   y(-1)
               / \\
             T2   T3   T4

Step 1: Save y's left subtree (T2)
Step 2: Make z the left child of y
Step 3: Make T2 the right child of z
Step 4: Update heights (z first, then y)
Step 5: Return y as new root

AFTER:            y
                 / \\
                z   T4
               / \\
             T1   T2   T3

Order maintained: T1 < z < T2 < y < T4`,

        pseudocode: `function rotateLeft(z):
    y = z.right             // Save right child
    T2 = y.left             // Save right child's left subtree

    // Perform rotation
    y.left = z              // Make z the left child of y
    z.right = T2            // Make T2 the right child of z

    // Update heights (bottom-up)
    updateHeight(z)         // Update z first (now lower)
    updateHeight(y)         // Then update y (new root)

    return y                // Return new root`,

        visualExample: `Example: Insert 10, 20, 30 into AVL tree

After inserting 10, 20:
  10
    \\
     20       Balanced (BF=-1)

After inserting 30:
  10 (BF=-2)    ← Imbalanced! RR case
    \\
     20 (BF=-1)
       \\
        30

Perform LEFT ROTATION on 10:

      20           ← New root
     /  \\
   10    30       ← Balanced! All BF = 0

Tree is now balanced with height = 1 (optimal)`,

        detailedDiagram: `DETAILED LEFT ROTATION VISUALIZATION:

Initial State (Imbalanced):
        50 (BF = -2)         ← Imbalanced
       /  \\
  [T1: 30] 70 (BF = -1)
           / \\
    [T2: 60] [T4: 80]
                  \\
                 [90]

Rotation Process:
• Node 50 is imbalanced (BF = -2)
• Node 70 is right child with BF <= 0
• This is RR case → Left Rotation on 50

After Left Rotation:
              70              ← New root (balanced)
             /  \\
           50    80           ← Balanced
          / \\     \\
    [T1: 30] [T2: 60] [90]

All subtrees maintain BST order:
T1(30) < 50 < T2(60) < 70 < 80 < 90`
      },

      {
        rotationType: "Left-Right Rotation (LR Case)",
        when: "BF(node) = +2 and BF(node.left) = -1",
        description: `**Scenario:** Node is left-heavy BUT left child is right-heavy (zigzag pattern)

**Solution:** Two-step rotation
1. Left Rotation on left child (straighten the zigzag)
2. Right Rotation on original node

**Why Two Rotations?**
Single rotation won't work because the imbalance is in a zigzag pattern. We first convert it to a straight line (LL case), then do normal right rotation.`,

        stepByStep: `**Step-by-Step Left-Right Rotation:**

INITIAL STATE:
       z (BF=+2)           ← Imbalanced
      / \\
   x(-1)  T4              ← Left child is RIGHT-heavy
   /  \\
 T1    y                  ← Zigzag pattern!
      / \\
    T2   T3

STEP 1: Left Rotation on x (left child)
       z
      / \\
     y   T4               ← Zigzag converted to straight line
    / \\
   x   T3
  / \\
T1   T2

STEP 2: Right Rotation on z (original node)
         y                ← Final balanced tree
       /   \\
      x     z
     / \\   / \\
   T1  T2 T3  T4

Order maintained: T1 < x < T2 < y < T3 < z < T4`,

        pseudocode: `function rotateLeftRight(z):
    // Step 1: Left rotation on left child
    z.left = rotateLeft(z.left)

    // Step 2: Right rotation on z
    return rotateRight(z)

// Or combined:
function rotateLeftRight(z):
    x = z.left
    y = x.right

    // Perform LR rotation in one function
    T2 = y.left
    T3 = y.right

    // First rotation
    y.left = x
    x.right = T2

    // Second rotation
    y.right = z
    z.left = T3

    // Update heights
    updateHeight(x)
    updateHeight(z)
    updateHeight(y)

    return y`,

        visualExample: `Example: Insert 50, 30, 40 into AVL tree

After inserting 50, 30:
    50
   /
  30        Balanced (BF=+1)

After inserting 40:
    50 (BF=+2)     ← Imbalanced!
   /
  30 (BF=-1)      ← Left child is RIGHT-heavy
    \\              LR Case!
     40

STEP 1: Left Rotation on 30:
    50
   /
  40              ← Zigzag straightened
 /
30

STEP 2: Right Rotation on 50:
     40            ← Balanced!
    /  \\
   30   50

Final tree is balanced with all BF = 0`,

        detailedDiagram: `DETAILED LEFT-RIGHT ROTATION VISUALIZATION:

Initial State:
              50 (BF = +2)           ← Imbalanced
             /  \\
        30(-1)  [T4: 70]            ← Left-heavy, but left child right-heavy
       /  \\
  [T1: 20] 40                       ← ZIGZAG!
           / \\
     [T2: 35] [T3: 45]

After LEFT rotation on 30:
              50
             /  \\
           40   [T4: 70]            ← Now straight line (LL case)
          /  \\
        30    [T3: 45]
       /  \\
 [T1: 20] [T2: 35]

After RIGHT rotation on 50:
              40                     ← New root (balanced)
            /    \\
          30      50
         / \\    /  \\
   [T1: 20][T2: 35][T3: 45][T4: 70]

BST order preserved: 20 < 30 < 35 < 40 < 45 < 50 < 70`
      },

      {
        rotationType: "Right-Left Rotation (RL Case)",
        when: "BF(node) = -2 and BF(node.right) = +1",
        description: `**Scenario:** Node is right-heavy BUT right child is left-heavy (zigzag pattern)

**Solution:** Two-step rotation
1. Right Rotation on right child (straighten the zigzag)
2. Left Rotation on original node

**Mirror of LR rotation**`,

        stepByStep: `**Step-by-Step Right-Left Rotation:**

INITIAL STATE:
    z (BF=-2)              ← Imbalanced
   / \\
 T1   x(+1)               ← Right child is LEFT-heavy
     / \\
    y   T4                ← Zigzag pattern!
   / \\
 T2   T3

STEP 1: Right Rotation on x (right child)
    z
   / \\
 T1   y                   ← Zigzag converted to straight line
     / \\
   T2   x
       / \\
     T3   T4

STEP 2: Left Rotation on z (original node)
         y                ← Final balanced tree
       /   \\
      z     x
     / \\   / \\
   T1  T2 T3  T4

Order maintained: T1 < z < T2 < y < T3 < x < T4`,

        pseudocode: `function rotateRightLeft(z):
    // Step 1: Right rotation on right child
    z.right = rotateRight(z.right)

    // Step 2: Left rotation on z
    return rotateLeft(z)

// Or combined:
function rotateRightLeft(z):
    x = z.right
    y = x.left

    // Perform RL rotation in one function
    T2 = y.left
    T3 = y.right

    // First rotation
    y.right = x
    x.left = T3

    // Second rotation
    y.left = z
    z.right = T2

    // Update heights
    updateHeight(x)
    updateHeight(z)
    updateHeight(y)

    return y`,

        visualExample: `Example: Insert 30, 50, 40 into AVL tree

After inserting 30, 50:
  30
    \\
     50       Balanced (BF=-1)

After inserting 40:
  30 (BF=-2)    ← Imbalanced!
    \\
     50 (+1)    ← Right child is LEFT-heavy
     /           RL Case!
   40

STEP 1: Right Rotation on 50:
  30
    \\
     40         ← Zigzag straightened
       \\
        50

STEP 2: Left Rotation on 30:
     40         ← Balanced!
    /  \\
   30   50

Final tree is balanced with all BF = 0`,

        detailedDiagram: `DETAILED RIGHT-LEFT ROTATION VISUALIZATION:

Initial State:
        30 (BF = -2)               ← Imbalanced
       /  \\
  [T1: 20] 50 (+1)                 ← Right-heavy, but right child left-heavy
           / \\
         40   [T4: 60]             ← ZIGZAG!
        / \\
  [T2: 35] [T3: 45]

After RIGHT rotation on 50:
        30
       /  \\
  [T1: 20] 40                      ← Now straight line (RR case)
           / \\
     [T2: 35] 50
              / \\
        [T3: 45] [T4: 60]

After LEFT rotation on 30:
              40                    ← New root (balanced)
            /    \\
          30      50
         / \\    /  \\
   [T1: 20][T2: 35][T3: 45][T4: 60]

BST order preserved: 20 < 30 < 35 < 40 < 45 < 50 < 60`
      }
    ],

    rotationSummary: {
      title: "Rotation Decision Table",
      content: `**Quick Reference for Choosing Rotation:**

Node BF    Child BF    Pattern    Rotation Type
───────────────────────────────────────────────────
  +2         +1         LL        Right Rotation
  +2          0         LL        Right Rotation
  +2         -1         LR        Left-Right Rotation
  -2         -1         RR        Left Rotation
  -2          0         RR        Left Rotation
  -2         +1         RL        Right-Left Rotation

**Visual Pattern Recognition:**

  z          z           z            z
 /            \\         /              \\
x              x        x               x
 \\            /          \\             /
  *          *            *           *

LL (→)    RR (←)      LR (⤴)      RL (⤵)
Right     Left        L-then-R    R-then-L

**Memory Aid:**
• Single rotations: Straight line pattern (LL, RR)
• Double rotations: Zigzag pattern (LR, RL)
• First letter = which subtree is heavy
• Second letter = which sub-subtree is heavy`
    }
  },

  operations: {
    title: "AVL Tree Operations",
    description: "All operations maintain balance through rotations",

    sections: [
      {
        operation: "Search",
        timeComplexity: "O(log n) guaranteed",
        spaceComplexity: "O(log n) recursive | O(1) iterative",

        description: `**Search in AVL Tree:**
Identical to BST search because AVL trees are BSTs!

**Why it's Guaranteed O(log n):**
• AVL tree height is always O(log n)
• Maximum height ≈ 1.44 * log₂(n)
• Search worst case = tree height
• Unlike BST which can be O(n)

**Advantage over Regular BST:**
BST: O(log n) average, O(n) worst case
AVL: O(log n) worst case GUARANTEED`,

        pseudocode: `function search(node, target):
    // Base cases
    if node is null:
        return false

    if node.value == target:
        return true

    // Recursive search (BST property)
    if target < node.value:
        return search(node.left, target)
    else:
        return search(node.right, target)

// Time: O(log n) guaranteed
// Space: O(log n) for recursion`,

        example: `Search for 40 in AVL tree:

       50
      /  \\
    30    70
   / \\   / \\
  20 40 60 80

Steps:
1. Start at 50: 40 < 50 → go left
2. At 30: 40 > 30 → go right
3. At 40: 40 == 40 → FOUND!

Comparisons: 3
Maximum possible: height = ⌊log₂(7)⌋ + 1 = 3
Guaranteed O(log n)!`
      },

      {
        operation: "Insertion",
        timeComplexity: "O(log n) guaranteed",
        spaceComplexity: "O(log n) for recursion",

        description: `**AVL Insertion Process:**
1. Insert like normal BST (find leaf position)
2. Update heights bottom-up from inserted node
3. Check balance factors for each ancestor
4. If imbalanced (|BF| > 1), perform appropriate rotation
5. Continue checking up to root

**Key Differences from BST:**
• Must update heights after insertion
• Must check balance at each ancestor
• May require 1-2 rotations to rebalance
• Guaranteed O(log n) height maintained`,

        pseudocode: `function insert(node, value):
    // Step 1: Normal BST insertion
    if node is null:
        return new Node(value, height=0)

    if value < node.value:
        node.left = insert(node.left, value)
    else if value > node.value:
        node.right = insert(node.right, value)
    else:
        return node  // Duplicate, don't insert

    // Step 2: Update height of current node
    updateHeight(node)

    // Step 3: Get balance factor
    balance = getBalanceFactor(node)

    // Step 4: If imbalanced, perform rotation

    // Left-Left Case (LL)
    if balance > 1 and value < node.left.value:
        return rotateRight(node)

    // Right-Right Case (RR)
    if balance < -1 and value > node.right.value:
        return rotateLeft(node)

    // Left-Right Case (LR)
    if balance > 1 and value > node.left.value:
        node.left = rotateLeft(node.left)
        return rotateRight(node)

    // Right-Left Case (RL)
    if balance < -1 and value < node.right.value:
        node.right = rotateRight(node.right)
        return rotateLeft(node)

    // No imbalance, return unchanged
    return node

// Time: O(log n) for traversal + O(1) for rotation
// Space: O(log n) for recursion stack`,

        detailedExample: `Insert sequence: 10, 20, 30, 40, 50, 25

Step 1: Insert 10
    10  (Balanced)

Step 2: Insert 20
    10
      \\
       20  (BF=-1, Balanced)

Step 3: Insert 30
    10 (BF=-2)      ← Imbalanced! RR case
      \\
       20 (BF=-1)
         \\
          30

    After LEFT ROTATION on 10:
         20
        /  \\
      10    30      (All balanced)

Step 4: Insert 40
         20
        /  \\
      10    30 (BF=-1)
              \\
               40     (Balanced, BF within limits)

Step 5: Insert 50
         20 (BF=-2)   ← Imbalanced! RR case
        /  \\
      10    30 (BF=-2) ← Also imbalanced
              \\
               40 (BF=-1)
                 \\
                  50

    First, rotation at 30 (RR):
         20
        /  \\
      10    40
           /  \\
         30    50

    Then check 20 (BF=-1, still balanced)

Step 6: Insert 25
         20
        /  \\
      10    40 (BF=+1)
           /  \\
         30    50
        /
      25        (Balanced, all BF within limits)

Final Tree: Perfectly balanced AVL tree!
         20
        /  \\
      10    40
           /  \\
         30    50
        /
      25

All operations: O(log n) guaranteed!`
      },

      {
        operation: "Deletion",
        timeComplexity: "O(log n) guaranteed",
        spaceComplexity: "O(log n) for recursion",

        description: `**AVL Deletion Process:**
1. Delete like normal BST (3 cases: leaf, one child, two children)
2. Update heights bottom-up from deleted position
3. Check balance factors for each ancestor
4. If imbalanced (|BF| > 1), perform appropriate rotation
5. Continue checking and rotating up to root

**Key Differences from BST:**
• May require MULTIPLE rotations (unlike insertion)
• Must check balance at EVERY ancestor
• More complex than insertion
• Still O(log n) guaranteed

**Three Deletion Cases:**
• Leaf node: Simply remove
• One child: Replace with child
• Two children: Replace with inorder successor, then delete successor`,

        pseudocode: `function delete(node, value):
    // Step 1: Normal BST deletion
    if node is null:
        return null

    if value < node.value:
        node.left = delete(node.left, value)
    else if value > node.value:
        node.right = delete(node.right, value)
    else:
        // Node found! Handle 3 cases

        // Case 1: Leaf or one child
        if node.left is null:
            return node.right
        if node.right is null:
            return node.left

        // Case 2: Two children
        // Find inorder successor (smallest in right subtree)
        successor = findMin(node.right)
        node.value = successor.value
        node.right = delete(node.right, successor.value)

    // Step 2: Update height
    updateHeight(node)

    // Step 3: Get balance factor
    balance = getBalanceFactor(node)

    // Step 4: Balance the tree (check all 4 cases)

    // Left-Left Case
    if balance > 1 and getBalanceFactor(node.left) >= 0:
        return rotateRight(node)

    // Left-Right Case
    if balance > 1 and getBalanceFactor(node.left) < 0:
        node.left = rotateLeft(node.left)
        return rotateRight(node)

    // Right-Right Case
    if balance < -1 and getBalanceFactor(node.right) <= 0:
        return rotateLeft(node)

    // Right-Left Case
    if balance < -1 and getBalanceFactor(node.right) > 0:
        node.right = rotateRight(node.right)
        return rotateLeft(node)

    return node

function findMin(node):
    while node.left is not null:
        node = node.left
    return node

// Time: O(log n) - may need multiple rotations up the path
// Space: O(log n) for recursion`,

        detailedExample: `Delete 30 from:

Initial Tree:
         40
       /    \\
      20     60
     /  \\   /  \\
   10   30 50   70
           \\
            35

Step 1: Find and delete 30 (has one child)
         40
       /    \\
      20     60
     /  \\   /  \\
   10   35 50   70

Step 2: Update heights and check balance
Node 20: BF = 0 (balanced)
Node 40: BF = 0 (balanced)
All ancestors balanced!

Delete 20 from current tree:

         40
       /    \\
      20     60
     /  \\   /  \\
   10   35 50   70

Step 1: Delete 20 (two children, replace with successor 35)
         40
       /    \\
      35     60
     /      /  \\
   10      50   70

Step 2: Check balance - all balanced!

Delete 40 from current tree:

         40 (root)
       /    \\
      35     60
     /      /  \\
   10      50   70

Step 1: Delete 40 (two children, replace with 50)
         50
       /    \\
      35     60
     /         \\
   10          70

Step 2: Node 60 now has BF = -1 (balanced)
Node 50 has BF = 0 (balanced)
Tree remains balanced!

Final tree after all deletions:
         50
       /    \\
      35     60
     /         \\
   10          70

AVL property maintained throughout!`
      },

      {
        operation: "Find Minimum / Maximum",
        timeComplexity: "O(log n) guaranteed",
        spaceComplexity: "O(1) iterative | O(log n) recursive",

        description: `**Finding Min/Max in AVL:**
Same as BST, but with guaranteed O(log n) performance

**Minimum:** Leftmost node
**Maximum:** Rightmost node`,

        pseudocode: `function findMin(node):
    if node is null:
        return null

    while node.left is not null:
        node = node.left

    return node.value

function findMax(node):
    if node is null:
        return null

    while node.right is not null:
        node = node.right

    return node.value

// Time: O(log n) guaranteed (tree height)
// Space: O(1)`,

        example: `Tree:       50
           /  \\
         30    70
        / \\   / \\
       20 40 60 80

findMin(50):
50 → 30 → 20 → null
Return 20

findMax(50):
50 → 70 → 80 → null
Return 80

Both operations: O(log n) worst case`
      }
    ],

    operationSummary: {
      title: "Operation Complexity Summary",
      table: `
Operation          BST (Balanced)  BST (Skewed)    AVL Tree
──────────────────────────────────────────────────────────────
Search             O(log n)        O(n)            O(log n) ✓
Insert             O(log n)        O(n)            O(log n) ✓
Delete             O(log n)        O(n)            O(log n) ✓
Find Min/Max       O(log n)        O(n)            O(log n) ✓
Find Kth element   O(log n)        O(n)            O(log n) ✓
Range Query        O(k + log n)    O(n)            O(k + log n) ✓

Rotations per insert:  0            0               0-1
Rotations per delete:  0            0               0-log(n)

✓ = Guaranteed worst-case complexity

**Key Takeaway:**
AVL guarantees O(log n) even with adversarial input!
Regular BST can degrade to O(n) with sorted input.`
    }
  },

  complexity: {
    title: "Complexity Analysis - Why AVL is O(log n)",

    guaranteedComplexity: {
      subtitle: "Guaranteed O(log n) Performance",
      content: `**Mathematical Proof of Height Bound:**

Let N(h) = minimum number of nodes in an AVL tree of height h

Base cases:
• N(0) = 1 (single node)
• N(1) = 2 (root + one child)

Recurrence:
• N(h) = 1 + N(h-1) + N(h-2)
• (root + minimal left subtree + minimal right subtree)

This is similar to Fibonacci sequence!
• N(h) ≈ Φʰ where Φ ≈ 1.618 (golden ratio)
• Therefore: h ≈ 1.44 * log₂(n)

**Maximum Height:**
h_max ≈ 1.44 * log₂(n)

**Comparison:**
• Perfect binary tree: h = log₂(n) ≈ 1.00 * log₂(n)
• AVL tree: h ≈ 1.44 * log₂(n)
• AVL is only 44% taller than perfect!

**Practical Examples:**

Nodes (n)    Perfect Tree    AVL Max Height    Difference
─────────────────────────────────────────────────────────
       100            6                9             +3
     1,000           10               14             +4
    10,000           13               19             +6
   100,000           17               25             +8
 1,000,000           20               29             +9

Even with 1 million nodes, AVL height is just 29!`,

      visualization: `Height Growth Comparison:

Tree Height
    │
 50 │                                        Skewed BST
    │                                            /
 40 │                                          /
    │                                        /
 30 │                                      /
    │                                    /
 20 │                                  /    AVL Tree
    │                                /         /
 10 │                              /         /
    │                            /         /
  0 │──────────────────────────────────────────────
      0      100K    500K    1M    2M    3M    Nodes

AVL maintains logarithmic height regardless of insertion order!`
    },

    timeComplexity: {
      subtitle: "Operation Time Complexity",

      detailed: {
        search: {
          complexity: "O(log n)",
          explanation: `• Traverse from root to leaf
• Maximum path length = height = O(log n)
• Each comparison eliminates half the remaining nodes
• NO balancing needed for search

Worst case: O(log n) - height of tree
Best case: O(1) - element is root
Average case: O(log n)`
        },

        insert: {
          complexity: "O(log n)",
          explanation: `• BST insertion: O(log n) - traverse to leaf
• Update heights: O(log n) - bottom-up to root
• Check balance: O(log n) - check each ancestor
• Rotation: O(1) - constant pointer operations
• At most 1 rotation needed after insertion

Total: O(log n) + O(log n) + O(1) = O(log n)`,

          breakdown: `Insert operation breakdown:
1. Find insertion point: O(log n)
2. Insert node: O(1)
3. Update heights up to root: O(log n)
4. Find imbalance (first unbalanced ancestor): O(log n)
5. Perform rotation: O(1)
6. Update heights after rotation: O(1)

Total: O(log n)`
        },

        delete: {
          complexity: "O(log n)",
          explanation: `• BST deletion: O(log n) - find and remove node
• Update heights: O(log n) - bottom-up to root
• Check balance: O(log n) - check each ancestor
• Rotations: O(log n) - may need rotation at each level
• Each rotation: O(1)

Total: O(log n) + O(log n) + O(log n) * O(1) = O(log n)`,

          note: `**Key Difference from Insertion:**
• Insertion needs at most 1 rotation
• Deletion may need O(log n) rotations (one per level)
• Still O(log n) overall because O(log n) * O(1) = O(log n)

Example requiring multiple rotations:
Delete from tall tree → imbalance propagates upward →
rotation at each level → still O(log n) total`
        }
      }
    },

    spaceComplexity: {
      subtitle: "Space Complexity Analysis",

      storage: {
        complexity: "O(n)",
        explanation: `Each node stores:
• Value: O(1)
• Left pointer: O(1)
• Right pointer: O(1)
• Height: O(1)
• Total per node: O(1)

For n nodes: O(n) space

**Compared to BST:**
AVL uses slightly more space per node (height field)
But same O(n) overall`,

        breakdown: `Memory per node (typical implementation):
• value: 8 bytes (64-bit integer/reference)
• left pointer: 8 bytes
• right pointer: 8 bytes
• height: 4 bytes (integer)
────────────────────────────
Total: 28 bytes per node

For 1 million nodes: ~28 MB
(Plus overhead for object/memory management)`
      },

      recursion: {
        complexity: "O(log n)",
        explanation: `Recursive calls create stack frames:
• Maximum recursion depth = tree height
• AVL height = O(log n)
• Each stack frame: O(1) space

Total auxiliary space: O(log n)

**Can be reduced to O(1):**
Use iterative versions with explicit stack/parent pointers`,

        comparison: `Recursion Stack:

Operation     Recursive    Iterative
───────────────────────────────────────
Search        O(log n)     O(1)
Insert        O(log n)     O(log n)*
Delete        O(log n)     O(log n)*

* Need stack/parent pointers to traverse back up

Most implementations use recursion for cleaner code`
      }
    },

    comparisonWithBST: {
      title: "AVL vs Regular BST",

      table: `
Aspect              Regular BST           AVL Tree
────────────────────────────────────────────────────────────────
Search (avg)        O(log n)              O(log n)
Search (worst)      O(n) ❌               O(log n) ✓
Insert (avg)        O(log n)              O(log n)
Insert (worst)      O(n) ❌               O(log n) ✓
Delete (avg)        O(log n)              O(log n)
Delete (worst)      O(n) ❌               O(log n) ✓

Height (balanced)   log₂(n)               ~1.44 log₂(n)
Height (worst)      n ❌                  ~1.44 log₂(n) ✓

Rotations/insert    0                     0-1
Rotations/delete    0                     0-log(n)

Space per node      3 fields              4 fields (+ height)
Implementation      Simple                Complex

Best for            Simple cases,         Production systems,
                    teaching              Guaranteed performance
`,

      analysis: `**When BST Fails:**
Insert sequence: 1, 2, 3, 4, 5, 6, 7

BST result:         AVL result:
  1                     4
    \\                 /   \\
     2               2     6
       \\            / \\   / \\
        3          1   3 5   7
          \\
           4       Height: 2 ✓
             \\    O(log n) guaranteed!
              5
                \\
                 6
                   \\
                    7

Height: 7 ❌
O(n) operations!

**Real-world Impact:**
1M sorted insertions:
• BST: ~500 billion comparisons (O(n²))
• AVL: ~20 million comparisons (O(n log n))
AVL is 25,000x faster!`
    }
  },

  applications: {
    title: "Real-World Applications of AVL Trees",

    useCases: [
      {
        application: "In-Memory Databases & Indexing",
        description: `AVL trees excel in database systems requiring frequent updates:

**Why AVL for Databases:**
• Fast lookups: O(log n) guaranteed
• Frequent insertions/deletions: O(log n) maintained
• Range queries: Traverse in-order efficiently
• Memory-resident indices: Tight height bounds reduce cache misses

**Example:**
In-memory key-value stores, database indexes where read performance is critical`,

        codeExample: `Database Index using AVL:

class DatabaseIndex {
    AVLTree index;

    insert(key, recordPointer):
        index.insert(key, recordPointer)  // O(log n)

    find(key):
        return index.search(key)  // O(log n)

    rangeQuery(minKey, maxKey):
        // In-order traversal between min and max
        return index.inorderRange(minKey, maxKey)  // O(k + log n)
}

Use case: Find all users with age between 25 and 35
rangeQuery(25, 35) → Returns k records in O(k + log n) time`
      },

      {
        application: "Ordered Sets & Maps",
        description: `Standard library implementations of ordered collections:

**Languages using AVL-like trees:**
• C++ std::map, std::set (often Red-Black, similar concept)
• Java TreeMap, TreeSet (Red-Black trees)
• Python sortedcontainers (B-trees, similar guarantees)

**Why Ordered Collections:**
• Maintain sorted order automatically
• Support range operations
• Predictable performance`,

        example: `STL map (conceptually AVL-like):

map<int, string> studentGrades;

// Insert: O(log n)
studentGrades[95] = "Alice";
studentGrades[87] = "Bob";
studentGrades[92] = "Carol";

// Iterate in sorted order: O(n)
for (auto& [score, name] : studentGrades) {
    cout << name << ": " << score;
}
// Output: Bob: 87, Carol: 92, Alice: 95 (sorted!)

// Range query: O(k + log n)
auto it = studentGrades.lower_bound(90);  // First >= 90
// Returns Carol, Alice (both >= 90)`
      },

      {
        application: "Memory Management & Allocation",
        description: `Operating systems use balanced trees for memory management:

**Free Memory Block Management:**
• Track free memory blocks sorted by address
• Quick find: Best-fit, first-fit allocation
• Merge adjacent blocks: O(log n) lookup
• Split blocks: O(log n) insertion

**Why AVL:**
• Frequent allocations/deallocations
• Need fast lookup of suitable blocks
• Maintain sorted order by address for merging`,

        visualization: `Memory Management with AVL:

Free blocks stored in AVL tree (sorted by size):
         [500B]
        /      \\
    [100B]    [1000B]
    /   \\        \\
[50B] [200B]   [2000B]

Allocate 150B (Best Fit):
1. Search for smallest block >= 150B: [200B]  O(log n)
2. Split [200B] → allocate 150B, insert [50B] O(log n)
3. Total: O(log n)

Free 150B block at address X:
1. Insert [150B] into tree: O(log n)
2. Check adjacent blocks for merging: O(log n)
3. Total: O(log n)`
      },

      {
        application: "Priority Queues with Updates",
        description: `AVL trees can implement priority queues with changePriority:

**Advantage over Binary Heap:**
• Heap: O(n) to find and update priority
• AVL: O(log n) to find and update

**Use Cases:**
• Dijkstra's algorithm with priority updates
• Job schedulers with priority changes
• Event simulators with event rescheduling`,

        comparison: `Priority Queue Operations:

Operation           Binary Heap    AVL Tree
──────────────────────────────────────────────
Insert              O(log n)       O(log n)
ExtractMin          O(log n)       O(log n)
FindMin             O(1)           O(log n)
ChangePriority      O(n) ❌        O(log n) ✓
Delete arbitrary    O(n) ❌        O(log n) ✓

AVL wins when updates are frequent!

Example: Dijkstra's algorithm
• Frequent priority decreases
• AVL: O((V + E) log V)
• Binary Heap: O(V² + E) without optimization`
      },

      {
        application: "File Systems & Directory Structures",
        description: `File systems use balanced trees for directory indexing:

**Modern File Systems:**
• NTFS: B-trees (generalization of AVL)
• ext4: HTree (hash tree with balanced properties)
• Btrfs: B-trees for metadata

**Operations:**
• Lookup file by name: O(log n)
• List files in sorted order: O(n)
• Insert/delete files: O(log n)
• Range queries (files starting with 'A'): O(k + log n)`,

        example: `Directory with 1M files:

AVL-based lookup:
• Search for "document.txt": ~20 comparisons
• List all .pdf files: O(k + log n) where k = # of PDFs

Linear search (unsorted):
• Search for "document.txt": ~500,000 comparisons (average)
• List all .pdf files: O(n) - must scan all files

AVL is 25,000x faster for lookup!`
      },

      {
        application: "Computational Geometry",
        description: `Geometric algorithms use AVL trees for dynamic sorted sets:

**Applications:**
• Sweep line algorithms (line segment intersection)
• Nearest neighbor search
• Range searching in 2D
• Maintaining sorted event queue

**Why AVL:**
• Dynamic insertion/deletion during algorithm
• Maintain sorted order efficiently
• Fast predecessor/successor queries`,

        algorithmExample: `Line Segment Intersection (Bentley-Ottmann):

AVL tree stores active line segments sorted by y-coordinate

Algorithm:
1. Sort all endpoints by x-coordinate: O(n log n)
2. Sweep left to right:
   - At left endpoint: insert segment into AVL: O(log n)
   - At right endpoint: delete segment from AVL: O(log n)
   - Check neighbors for intersection: O(log n)
3. Total: O((n + k) log n) where k = # intersections

Without AVL: O(n²) brute force`
      }
    ],

    whenToUseAVL: `**Use AVL Trees When:**

✓ Need guaranteed O(log n) performance
✓ Read-heavy workload (more searches than updates)
✓ Cannot tolerate worst-case O(n) (unlike BST)
✓ Need sorted order + fast operations
✓ Memory overhead is acceptable (height storage)

**Don't Use AVL Trees When:**

❌ Only need fast lookup, no ordering (use Hash Table)
❌ Write-heavy workload (Red-Black tree better)
❌ Need very simple implementation (use BST)
❌ Data is mostly static (use sorted array + binary search)
❌ Need cache-friendly structure (use B-tree)

**AVL vs Alternatives:**

Need                          Use
──────────────────────────────────────────────
Fast lookup only              Hash Table
Fast lookup + sorted order    AVL Tree
Frequent writes               Red-Black Tree
Disk-based storage            B-tree / B+ tree
Static sorted data            Sorted Array
Simple implementation         Regular BST`
  },

  interviewProblems: {
    title: "Common AVL Tree Interview Problems",

    problems: [
      {
        title: "1. Check if Binary Tree is Height-Balanced",
        difficulty: "Easy-Medium",
        description: "Determine if a binary tree is height-balanced (AVL property: |height(left) - height(right)| <= 1 for all nodes)",

        approach: `**Approach:**
Use post-order traversal to calculate heights bottom-up
• Calculate height of left subtree
• Calculate height of right subtree
• Check if |height difference| <= 1
• Return height if balanced, -1 if not

**Key Insight:**
Check balance while calculating height (single pass)
Don't calculate height multiple times (inefficient)`,

        solution: `function isBalanced(root):
    return checkHeight(root) != -1

function checkHeight(node):
    // Base case
    if node is null:
        return 0  // Height of null is 0

    // Check left subtree
    leftHeight = checkHeight(node.left)
    if leftHeight == -1:
        return -1  // Left subtree not balanced

    // Check right subtree
    rightHeight = checkHeight(node.right)
    if rightHeight == -1:
        return -1  // Right subtree not balanced

    // Check current node
    if abs(leftHeight - rightHeight) > 1:
        return -1  // Current node not balanced

    // Return height if balanced
    return 1 + max(leftHeight, rightHeight)

// Time: O(n) - visit each node once
// Space: O(h) - recursion stack`,

        example: `Example 1: Balanced Tree
       3
      / \\
     9  20
       /  \\
      15   7

checkHeight(3):
  leftHeight = checkHeight(9) = 1
  rightHeight = checkHeight(20) = 2
  diff = |1 - 2| = 1 <= 1 ✓
  return 1 + max(1, 2) = 3

Result: true (balanced)

Example 2: Unbalanced Tree
       1
      /
     2
    /
   3

checkHeight(1):
  leftHeight = checkHeight(2):
    leftHeight = checkHeight(3) = 1
    rightHeight = 0
    diff = |1 - 0| = 1 ✓
    return 2
  rightHeight = 0
  diff = |2 - 0| = 2 > 1 ❌
  return -1

Result: false (not balanced)`
      },

      {
        title: "2. Convert Sorted Array to Balanced AVL Tree",
        difficulty: "Easy",
        description: "Given a sorted array, convert it to a height-balanced BST (AVL tree)",

        approach: `**Approach:**
Use binary search strategy:
• Middle element becomes root (ensures balance)
• Left half becomes left subtree (recursively)
• Right half becomes right subtree (recursively)

**Why This Works:**
• Middle element splits array evenly
• Results in minimum height tree
• Satisfies AVL property |BF| <= 1`,

        solution: `function sortedArrayToAVL(arr):
    return buildAVL(arr, 0, arr.length - 1)

function buildAVL(arr, start, end):
    // Base case
    if start > end:
        return null

    // Find middle element
    mid = start + (end - start) // 2

    // Middle becomes root
    root = new Node(arr[mid])

    // Recursively build left and right subtrees
    root.left = buildAVL(arr, start, mid - 1)
    root.right = buildAVL(arr, mid + 1, end)

    // Update height
    updateHeight(root)

    return root

// Time: O(n) - visit each element once
// Space: O(log n) - recursion stack depth`,

        example: `Input: [1, 2, 3, 4, 5, 6, 7]

Step-by-step construction:

1. mid = 3, arr[3] = 4
       4

2. Build left subtree: [1, 2, 3]
   mid = 1, arr[1] = 2
       4
      /
     2

3. Build left-left: [1]
       4
      /
     2
    /
   1

4. Build left-right: [3]
       4
      /
     2
    / \\
   1   3

5. Build right subtree: [5, 6, 7]
   mid = 5, arr[5] = 6
       4
      / \\
     2   6
    / \\
   1   3

6. Build right-left: [5]
       4
      / \\
     2   6
    / \\ /
   1  3 5

7. Build right-right: [7]
       4
      / \\
     2   6
    / \\ / \\
   1  3 5  7

Result: Perfectly balanced AVL tree!
Height = ⌊log₂(7)⌋ + 1 = 3 (minimum possible)`
      },

      {
        title: "3. Balance an Unbalanced BST",
        difficulty: "Medium",
        description: "Given an unbalanced BST, convert it to a balanced AVL tree",

        approach: `**Approach:**
1. Perform in-order traversal → sorted array
2. Convert sorted array to AVL (previous problem)

**Why This Works:**
• In-order traversal of BST gives sorted order
• Sorted array → balanced tree (divide and conquer)
• Two-step process: O(n) + O(n) = O(n)`,

        solution: `function balanceBST(root):
    // Step 1: In-order traversal to get sorted array
    sortedArray = []
    inorder(root, sortedArray)

    // Step 2: Build AVL from sorted array
    return sortedArrayToAVL(sortedArray)

function inorder(node, result):
    if node is null:
        return

    inorder(node.left, result)
    result.append(node.value)
    inorder(node.right, result)

function sortedArrayToAVL(arr):
    return buildAVL(arr, 0, arr.length - 1)

function buildAVL(arr, start, end):
    if start > end:
        return null

    mid = start + (end - start) // 2
    root = new Node(arr[mid])

    root.left = buildAVL(arr, start, mid - 1)
    root.right = buildAVL(arr, mid + 1, end)

    updateHeight(root)
    return root

// Time: O(n) for inorder + O(n) for building = O(n)
// Space: O(n) for array + O(log n) for recursion = O(n)`,

        example: `Input: Unbalanced BST
      1
        \\
         2
           \\
            3
              \\
               4

Step 1: In-order traversal
Result: [1, 2, 3, 4]

Step 2: Build balanced AVL
mid = 1, arr[1] = 2
       2
      / \\
     1   3
           \\
            4

Or with mid = (0 + 3) / 2 = 1:
       2
      / \\
     1   3
           \\
            4

Better balance with proper midpoint:
       2
      / \\
     1   3
           \\
            4

Actually optimal (adjusted algorithm):
       3
      / \\
     2   4
    /
   1

Height reduced from 4 to 3!
All balance factors: |BF| <= 1 ✓`
      },

      {
        title: "4. Find Closest Value in AVL Tree",
        difficulty: "Medium",
        description: "Find the value in an AVL tree that is closest to a given target value",

        approach: `**Approach:**
Use BST property to guide search:
• Start at root, track closest value so far
• If target < current, go left (but update closest)
• If target > current, go right (but update closest)
• If target == current, return immediately

**Why This Works:**
• BST property guides us toward target
• No need to search entire tree
• O(log n) due to AVL balance guarantee`,

        solution: `function findClosest(root, target):
    closest = root.value
    current = root

    while current is not null:
        // Update closest if current is closer
        if abs(target - current.value) < abs(target - closest):
            closest = current.value

        // Found exact match
        if current.value == target:
            return closest

        // Move left or right based on BST property
        if target < current.value:
            current = current.left
        else:
            current = current.right

    return closest

// Time: O(log n) - AVL tree height
// Space: O(1) - iterative solution`,

        example: `Tree:       50
           /  \\
         30    70
        / \\   / \\
       20 40 60 80

Example 1: Find closest to 45

Steps:
1. current = 50, closest = 50, |45-50| = 5
   45 < 50 → go left

2. current = 30, |45-30| = 15 > 5, closest = 50
   45 > 30 → go right

3. current = 40, |45-40| = 5 = 5, closest = 50
   45 > 40 → go right

4. current = null → stop

Return: 50 (could also be 40, both equally close)

Example 2: Find closest to 65

Steps:
1. current = 50, closest = 50, |65-50| = 15
   65 > 50 → go right

2. current = 70, |65-70| = 5 < 15, closest = 70
   65 < 70 → go left

3. current = 60, |65-60| = 5 = 5, closest = 70
   65 > 60 → go right

4. current = null → stop

Return: 70 (or 60, both equally close)

Only ~3 comparisons due to AVL balance!`
      },

      {
        title: "5. AVL Tree from Preorder Traversal",
        difficulty: "Hard",
        description: "Construct an AVL tree from its preorder traversal, with proper balancing",

        approach: `**Approach 1 (Simple but O(n log n)):**
Insert elements one by one with AVL rotations

**Approach 2 (Optimal O(n)):**
Use preorder properties + BST constraints:
• First element is root
• Elements < root go to left subtree
• Elements > root go to right subtree
• Recursively construct with balance checks

**Key Insight:**
Preorder = Root, Left, Right
Use value ranges to partition`,

        solution: `// Approach 1: Insert with rotations (O(n log n))
function buildAVLFromPreorder(preorder):
    root = null
    for value in preorder:
        root = insertAVL(root, value)  // O(log n) each
    return root

// Approach 2: Optimized O(n) construction
function buildAVLOptimized(preorder):
    index = 0
    return build(preorder, index, -∞, +∞)

function build(preorder, index, min, max):
    // Base case
    if index >= preorder.length:
        return null

    value = preorder[index]

    // Check if value is in valid range
    if value < min or value > max:
        return null

    // Create node
    node = new Node(value)
    index++

    // Build left and right subtrees
    node.left = build(preorder, index, min, value)
    node.right = build(preorder, index, value, max)

    // Update height and balance (AVL property)
    updateHeight(node)

    // Check if rotation needed
    balance = getBalanceFactor(node)

    // Perform rotations if needed
    if balance > 1 and getBalanceFactor(node.left) >= 0:
        return rotateRight(node)
    if balance < -1 and getBalanceFactor(node.right) <= 0:
        return rotateLeft(node)
    if balance > 1 and getBalanceFactor(node.left) < 0:
        node.left = rotateLeft(node.left)
        return rotateRight(node)
    if balance < -1 and getBalanceFactor(node.right) > 0:
        node.right = rotateRight(node.right)
        return rotateLeft(node)

    return node

// Time: O(n log n) for approach 1, O(n) for approach 2
// Space: O(h) = O(log n) for recursion`,

        example: `Input: Preorder = [50, 30, 20, 40, 70, 60, 80]

Using Approach 1 (Insert with rotations):

Insert 50:
    50

Insert 30:
    50
   /
  30

Insert 20:
    50 (BF=+2)      After rotation:
   /                    30
  30 (BF=+1)           /  \\
 /                   20    50
20

Insert 40:
    30
   /  \\
  20   50
      /
    40

Insert 70:
    30
   /  \\
  20   50
      /  \\
    40   70

Insert 60:
    30
   /  \\
  20   50 (BF=-2)    Needs rotation...
      /  \\
    40   70 (BF=+1)
        /
      60

After RL rotation on 50:
       30
      /  \\
    20    60
         /  \\
       50   70
      /
    40

Insert 80:
       30
      /  \\
    20    60
         /  \\
       50   70
      /       \\
    40        80

Final balanced AVL tree!
All |BF| <= 1 ✓`
      }
    ],

    additionalProblems: [
      {
        title: "6. Delete with Minimum Rotations",
        difficulty: "Hard",
        hint: "Track which nodes need rebalancing, optimize rotation count"
      },
      {
        title: "7. Range Sum in AVL Tree",
        difficulty: "Medium",
        hint: "In-order traversal within range, augment nodes with subtree sums"
      },
      {
        title: "8. Merge Two AVL Trees",
        difficulty: "Hard",
        hint: "In-order traversal of both → merge sorted arrays → build AVL"
      },
      {
        title: "9. Find Kth Smallest in AVL Tree",
        difficulty: "Medium",
        hint: "Augment nodes with subtree size, use BST property to navigate"
      },
      {
        title: "10. AVL Tree with Duplicate Values",
        difficulty: "Medium",
        hint: "Store count in each node, or allow duplicates in right subtree"
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Implementation Tips",

    tips: [
      {
        category: "When to Use AVL vs Other Trees",
        points: [
          "✓ Use AVL when: Read-heavy workload, need guaranteed O(log n)",
          "✓ Use Red-Black when: Write-heavy workload, slightly faster insertions/deletions",
          "✓ Use B-tree when: Disk-based storage, minimize disk I/O",
          "✓ Use Hash Table when: Only need fast lookup, no ordering required",
          "✓ Use BST when: Simple implementation, teaching purposes, small datasets",
          "",
          "**AVL vs Red-Black Trade-off:**",
          "• AVL: More balanced (height ≤ 1.44 log n), faster lookups",
          "• Red-Black: Less balanced (height ≤ 2 log n), faster modifications",
          "• AVL: At most 1 rotation per insert",
          "• Red-Black: At most 2 rotations per insert, but more recoloring",
          "",
          "**General Rule:**",
          "• 90% reads, 10% writes → AVL Tree",
          "• 50% reads, 50% writes → Red-Black Tree",
          "• Only lookups → Hash Table"
        ]
      },

      {
        category: "Implementation Tips",
        points: [
          "**Store Height in Node:**",
          "• Caching height avoids O(n) recalculations",
          "• Update height after every rotation/insertion/deletion",
          "• height = 1 + max(height(left), height(right))",
          "",
          "**Balance Factor Calculation:**",
          "• Always calculate as: BF = height(left) - height(right)",
          "• Positive BF = left-heavy, negative BF = right-heavy",
          "• |BF| > 1 triggers rebalancing",
          "",
          "**Rotation Functions:**",
          "• Implement 4 rotation types as separate functions",
          "• Update heights AFTER rotation (bottom-up)",
          "• Return new root from rotation functions",
          "• Test rotations independently before integration",
          "",
          "**Null Handling:**",
          "• Height of null = -1 (or 0, be consistent)",
          "• Check for null before accessing children",
          "• Handle empty tree case separately",
          "",
          "**Recursive vs Iterative:**",
          "• Recursive: Cleaner code, easier to understand",
          "• Iterative: Better performance, no stack overflow",
          "• For production: Consider iterative with parent pointers"
        ]
      },

      {
        category: "Optimization Techniques",
        points: [
          "**Reduce Rotation Checks:**",
          "• Only check balance factors on path from inserted/deleted node to root",
          "• Don't check every node in tree",
          "",
          "**Early Termination:**",
          "• For insertion: Stop after first rotation (tree is balanced)",
          "• For deletion: Continue checking all ancestors (may need multiple rotations)",
          "",
          "**Augment Nodes:**",
          "• Store subtree size for O(log n) kth smallest",
          "• Store subtree sum for O(log n) range sum queries",
          "• Trade space for time",
          "",
          "**Parent Pointers:**",
          "• Useful for iterative implementations",
          "• Allows traversing back up without recursion",
          "• Costs extra 8 bytes per node",
          "",
          "**Memory Pool:**",
          "• Pre-allocate nodes for better performance",
          "• Reduces malloc/free overhead",
          "• Useful for performance-critical applications"
        ]
      },

      {
        category: "Testing & Debugging",
        points: [
          "**Validate AVL Property:**",
          "• After every insert/delete, verify |BF| <= 1 for all nodes",
          "• Check BST property is maintained",
          "• Verify heights are correctly updated",
          "",
          "**Test Cases:**",
          "• Empty tree",
          "• Single node",
          "• All 4 rotation cases (LL, RR, LR, RL)",
          "• Sequential insertions (1, 2, 3, ...)",
          "• Random insertions",
          "• Deletions requiring multiple rotations",
          "• Large datasets (stress testing)",
          "",
          "**Visualization:**",
          "• Print tree structure with balance factors",
          "• Use graphviz or similar tool for debugging",
          "• Trace rotation steps manually for complex cases",
          "",
          "**Common Bugs:**",
          "❌ Forgetting to update heights after rotation",
          "❌ Wrong rotation type selection",
          "❌ Not returning new root from rotation",
          "❌ Checking only immediate children for balance",
          "❌ Off-by-one errors in height calculation"
        ]
      },

      {
        category: "Performance Considerations",
        points: [
          "**Cache Locality:**",
          "• AVL trees have poor cache performance (pointer chasing)",
          "• Consider B-trees for better cache utilization",
          "• Store frequently accessed nodes in array",
          "",
          "**Memory Overhead:**",
          "• Each node: ~28-32 bytes (value + 2 pointers + height)",
          "• For 1M nodes: ~30 MB minimum",
          "• Consider slab allocation for better memory efficiency",
          "",
          "**Concurrency:**",
          "• AVL trees are not inherently thread-safe",
          "• Use read-write locks for concurrent access",
          "• Consider lock-free alternatives for high concurrency",
          "",
          "**Benchmarking:**",
          "• Measure actual performance in your use case",
          "• Compare with Red-Black trees, B-trees",
          "• Profile to find bottlenecks",
          "• Don't optimize prematurely"
        ]
      }
    ]
  },

  comparison: {
    title: "AVL Tree Comparisons",

    comparisons: [
      {
        title: "AVL Tree vs Regular BST",

        table: `
Aspect              BST (Balanced)    BST (Worst)     AVL Tree
────────────────────────────────────────────────────────────────────
Height              log₂(n)          n               1.44 log₂(n)
Search              O(log n)         O(n) ❌         O(log n) ✓
Insert              O(log n)         O(n) ❌         O(log n) ✓
Delete              O(log n)         O(n) ❌         O(log n) ✓

Rotations/insert    0                0               0-1
Rotations/delete    0                0               0-log(n)

Self-balancing      No ❌            No ❌           Yes ✓
Implementation      Simple           Simple          Complex
Suitable for        Teaching         -               Production
`,

        analysis: `**When BST Degenerates:**
Sorted input: 1, 2, 3, 4, 5

BST becomes linked list:
1 → 2 → 3 → 4 → 5
O(n) operations ❌

AVL stays balanced:
       3
      / \\
     2   4
    /     \\
   1       5
O(log n) operations ✓

**Real-world Impact:**
For 1 million nodes:
• BST worst: 1,000,000 comparisons
• AVL worst: ~29 comparisons
• AVL is 34,000x faster!`
      },

      {
        title: "AVL Tree vs Red-Black Tree",

        table: `
Aspect              AVL Tree          Red-Black Tree
──────────────────────────────────────────────────────────────────
Height bound        1.44 log₂(n)      2 log₂(n)
More balanced       Yes ✓             No
Faster lookups      Yes ✓             No
Faster inserts      No                Yes ✓
Faster deletes      No                Yes ✓

Rotations/insert    0-1               0-2
Recoloring/insert   0                 O(log n)
Rotations/delete    0-log(n)          0-3
Recoloring/delete   0                 O(log n)

Implementation      More complex      Complex
Memory overhead     Height (4 bytes)  Color (1 bit)

Use case            Read-heavy        Write-heavy
`,

        analysis: `**Performance Comparison:**

Operation        AVL          Red-Black
───────────────────────────────────────────
Search (1M)      20 ops       29 ops       AVL wins
Insert (1M)      20M ops      15M ops      RB wins
Delete (1M)      25M ops      18M ops      RB wins

**Height Comparison:**
Nodes    AVL Height    RB Height    Difference
──────────────────────────────────────────────
   1000        14          19         +36%
 10,000        19          26         +37%
100,000        25          33         +32%

**When to Choose:**

Choose AVL:
• 90%+ reads, <10% writes
• Need fastest possible search
• Database indexes (read-heavy)
• Lookup tables

Choose Red-Black:
• 50/50 read/write ratio
• Frequent insertions/deletions
• General-purpose sorted containers
• Most standard libraries use RB`,

        codeComparison: `**Memory per Node:**

AVL Node:
struct AVLNode {
    int value;        // 8 bytes
    AVLNode* left;    // 8 bytes
    AVLNode* right;   // 8 bytes
    int height;       // 4 bytes
};
Total: 28 bytes + padding = 32 bytes

Red-Black Node:
struct RBNode {
    int value;        // 8 bytes
    RBNode* left;     // 8 bytes
    RBNode* right;    // 8 bytes
    bool color;       // 1 bit (1 byte)
};
Total: 25 bytes + padding = 32 bytes

Similar memory usage in practice!`
      },

      {
        title: "AVL Tree vs B-Tree",

        table: `
Aspect              AVL Tree          B-Tree
──────────────────────────────────────────────────────────────────
Node degree         2 (binary)        t to 2t (balanced)
Height              log₂(n)           log_t(n)
Search              O(log n)          O(log n)
Insert              O(log n)          O(log n)
Delete              O(log n)          O(log n)

Cache-friendly      No ❌             Yes ✓
Disk-friendly       No ❌             Yes ✓
Memory overhead     High              Low per key
Node size           ~32 bytes         ~4KB typical

Best for            In-memory         Disk-based
Used in             Memory indices    Databases, filesystems
`,

        analysis: `**Why B-Trees for Disk:**

AVL tree (binary):
• Each node access = 1 disk I/O
• Height = log₂(n)
• For 1M records: ~20 disk I/Os

B-tree (t=100):
• Each node holds 100-200 keys
• Height = log₁₀₀(n)
• For 1M records: ~3 disk I/Os

B-tree is 7x fewer disk accesses!

**Cache Performance:**

AVL:
• Pointer chasing → cache misses
• Random memory access pattern
• Poor CPU cache utilization

B-tree:
• Contiguous keys in node → cache hits
• Sequential access within node
• Good CPU cache utilization

**When to Use:**

In-Memory → AVL Tree
• Fast random access (RAM)
• No disk I/O overhead
• Small to medium datasets (<10M)

Disk-Based → B-Tree
• Minimize disk I/O
• Large datasets (>10M)
• Databases, filesystems`,

        example: `Search in 1 Million Records:

AVL Tree (in RAM):
• ~20 node accesses
• Each access: ~10 ns (RAM)
• Total: ~200 ns

B-Tree (on SSD):
• ~3 node accesses
• Each access: ~100 μs (SSD)
• Total: ~300 μs

B-tree is 1500x SLOWER for in-memory!

But for disk-based (1000x slower):
• AVL: 20 * 10 ms = 200 ms
• B-tree: 3 * 10 ms = 30 ms
B-tree is 7x FASTER for disk-based!`
      },

      {
        title: "AVL Tree vs Hash Table",

        table: `
Aspect              AVL Tree          Hash Table
──────────────────────────────────────────────────────────────────
Search              O(log n)          O(1) average
Insert              O(log n)          O(1) average
Delete              O(log n)          O(1) average

Ordered             Yes ✓             No ❌
Range queries       Yes ✓             No ❌
Predecessor/succ    O(log n) ✓        N/A ❌
Min/Max             O(log n) ✓        O(n) ❌

Worst case          O(log n) ✓        O(n) ❌
Guaranteed perf     Yes ✓             No ❌

Memory overhead     Pointers+height   Buckets+pointers
Collisions          N/A               Possible
`,

        analysis: `**Performance Comparison:**

For 1 Million Elements:

Operation           AVL          Hash Table
────────────────────────────────────────────
Random search       ~20 ops      ~1 op ✓
Sequential search   Sorted order Random order
Range [x, y]        O(k+log n)   O(n) ❌
Find min/max        O(log n)     O(n) ❌
Iterate sorted      O(n) ✓       O(n) unsorted

**Use Cases:**

Use Hash Table when:
✓ Only need fast lookup
✓ No ordering required
✓ No range queries
✓ Keys have good hash function

Example: Username → User object

Use AVL Tree when:
✓ Need sorted order
✓ Range queries common
✓ Predecessor/successor needed
✓ Guaranteed performance required

Example: Time → Event (need events in time range)`,

        codeExample: `Problem: Find all users with age 25-35

Hash Table approach:
for user in all_users:  // O(n) - scan all
    if 25 <= user.age <= 35:
        result.append(user)
Time: O(n) for every query ❌

AVL Tree approach (sorted by age):
start = tree.search(25)  // O(log n)
current = start
while current and current.age <= 35:
    result.append(current)
    current = getSuccessor(current)  // O(log n) per
Time: O(k + log n) where k = results ✓

For k << n, AVL is much faster!`
      }
    ],

    decisionTree: `**Choosing the Right Data Structure:**

START: Need fast lookup?
    │
    ├─ Yes → Need sorted order?
    │         │
    │         ├─ No → Need guaranteed O(1)?
    │         │       │
    │         │       ├─ Yes → Hash Table
    │         │       └─ No  → Could use AVL
    │         │
    │         └─ Yes → Need disk-based?
    │                   │
    │                   ├─ Yes → B-Tree
    │                   │
    │                   └─ No → Read-heavy?
    │                           │
    │                           ├─ Yes (>90% reads) → AVL Tree ✓
    │                           └─ No (mixed) → Red-Black Tree
    │
    └─ No → Different data structure needed

**Quick Decision Table:**

Need                          → Use
────────────────────────────────────────────────
Fast lookup only               Hash Table
Sorted + fast operations       AVL Tree
Sorted + frequent writes       Red-Black Tree
Sorted + disk storage          B-Tree
Sorted + simple code           BST (if input random)
Guaranteed O(log n)            AVL Tree
Fastest possible search        AVL Tree
Range queries                  AVL Tree or B-Tree`
  }
};
