// ============= src/data/learningContent/hashTableLearning.js =============
// Comprehensive learning content for Hash Table Data Structure

export const hashTableLearningContent = {
  introduction: {
    title: "What is a Hash Table?",
    content: `A Hash Table (also called Hash Map) is a data structure that implements an associative array, mapping keys to values using a hash function. It provides average O(1) time complexity for insert, delete, and search operations.

**Key Properties:**
• Key-value pair storage - associate data with unique keys
• Hash function converts keys to array indices
• Average O(1) insert, delete, and search
• Direct access using computed index
• Collision handling required when keys hash to same index
• Dynamic resizing maintains performance

**What Makes Hash Tables Special?**
Unlike arrays (accessed by index) and linked lists/trees (require traversal), hash tables use a hash function to directly compute where data is stored. This enables constant-time average operations, making hash tables one of the fastest data structures for lookup operations.

**Why Use Hash Tables?**
• Fastest average-case lookup: O(1)
• Efficient key-value associations (like dictionaries)
• Ideal for caching and memoization
• Perfect for counting frequencies
• Database indexing and symbol tables`,

    visualExample: {
      description: "Hash Table with Key-Value Pairs",
      diagram: `
Hash Table (size = 7)

Keys:   "John"  "Emma"  "Bob"
        hash()  hash()  hash()
          |       |       |
          v       v       v
Index: [0]  [1]  [2]  [3]  [4]  [5]  [6]
Value:      25        42   35   30

Index 1: "Emma" -> age 25
Index 3: "Bob" -> age 42
Index 4: "Alice" -> age 35
Index 5: "John" -> age 30

Hash Function Example:
hash("John") = (J+o+h+n) % 7 = 40 % 7 = 5
hash("Emma") = (E+m+m+a) % 7 = 322 % 7 = 1
hash("Bob") = (B+o+b) % 7 = 213 % 7 = 3

Lookup "John":
1. Compute hash: hash("John") = 5
2. Access index 5: O(1) operation!
3. Return value: 30

Compare with array: Must search O(n)
Compare with BST: Must traverse O(log n)
Hash table: Direct access O(1)!
      `
    },

    conceptualModel: {
      title: "How Hash Tables Work",
      content: `**Conceptual Model:**

1. **Hash Function:**
   Takes key (any type) → Returns integer (array index)
   Example: hash("apple") = 5

2. **Array Storage:**
   Fixed-size array stores values
   Hash value determines which index to use

3. **Collision Handling:**
   Multiple keys may hash to same index
   Need strategy to handle collisions

**Analogy:**
Think of a library with books:
• Traditional: Walk through aisles to find book (O(n))
• Hash Table: Book title tells you exact shelf (O(1))

Hash function is like a catalog system that instantly tells you:
"Book 'Harry Potter' is on shelf 5"

**Operations:**
• Insert: hash(key) → place value at index
• Search: hash(key) → retrieve value from index
• Delete: hash(key) → remove value at index

All O(1) on average!`
    }
  },

  fundamentals: {
    title: "Hash Table Fundamentals",
    sections: [
      {
        subtitle: "1. Hash Function",
        content: `**Definition:**
A hash function is a function that maps keys of any type to fixed-size integers (array indices).

**Properties of Good Hash Function:**
• Deterministic - same key always produces same hash
• Uniform distribution - spreads keys evenly across table
• Fast to compute - O(1) time complexity
• Minimizes collisions - different keys rarely hash to same index

**Common Hash Functions:**

**1. Division Method:**
hash(key) = key % table_size
• Simple and fast
• Table size should be prime number
• Example: hash(45) = 45 % 7 = 3

**2. Multiplication Method:**
hash(key) = floor(table_size × (key × A mod 1))
• A is constant (often golden ratio ≈ 0.618)
• More uniform distribution
• Independent of table size

**3. Universal Hashing:**
hash(key) = ((a × key + b) % p) % table_size
• Random constants a and b
• Provides worst-case guarantees
• Used in theory and practice`,

        example: `Hash function for strings:

Simple approach (sum of characters):
hash("cat") = ('c' + 'a' + 't') % 7
            = (99 + 97 + 116) % 7
            = 312 % 7
            = 4

Problem: Anagrams hash to same value!
"cat", "act", "tac" all hash to 4

Better approach (polynomial rolling hash):
hash("cat") = (c × 31² + a × 31¹ + t × 31⁰) % size
            = (99×961 + 97×31 + 116) % 7
            = (95139 + 3007 + 116) % 7
            = 98262 % 7
            = 0

Now "cat" and "act" hash to different values!

Pseudocode:
function hashString(str, size):
    hash = 0
    for each char in str:
        hash = (hash × 31 + charCode(char)) % size
    return hash

Why 31?
• Prime number (reduces collisions)
• 31 × n = (n << 5) - n (fast bit operation)
• Empirically works well`,

        visualization: `Hash function visualization:

Input space (infinite):
"apple", "banana", "cherry", "date", ...
   |        |         |        |
   |  Hash Function   |        |
   |        |         |        |
   v        v         v        v
Output space (finite):
[0]  [1]  [2]  [3]  [4]  [5]  [6]

Goal: Distribute inputs uniformly across outputs

Good hash function:
"apple"  -> 2
"banana" -> 5
"cherry" -> 1
"date"   -> 4
(Well distributed!)

Bad hash function:
"apple"  -> 2
"banana" -> 2
"cherry" -> 2
"date"   -> 3
(Too many collisions!)`
      },

      {
        subtitle: "2. Collision Resolution",
        content: `**What is a Collision?**
When two different keys hash to the same index.

Example:
hash("John") = 5
hash("Jane") = 5  ← Collision!

**Why Collisions Happen:**
• Infinite keys, finite table size
• Pigeonhole principle - inevitable for large datasets
• Even perfect hash function has collisions

**Collision Probability:**
For n keys and m table size:
• Probability ≈ 1 - e^(-n²/2m)
• Birthday paradox: 50% collision with √(πm/2) keys
• For table size 365: 50% collision with just 23 keys!

**Two Main Approaches:**

**1. Chaining (Open Hashing):**
• Each table slot holds a linked list
• Colliding keys stored in same list
• Simple to implement
• Unbounded capacity

**2. Open Addressing (Closed Hashing):**
• All keys stored in table itself
• Collision → probe for next empty slot
• Requires good probing strategy
• Table can become full`,

        comparison: `Chaining vs Open Addressing:

Chaining:
[0] -> null
[1] -> [Emma, 25] -> null
[2] -> null
[3] -> [Bob, 42] -> [John, 30] -> null  (collision!)
[4] -> [Alice, 35] -> null

Open Addressing:
[0] empty
[1] [Emma, 25]
[2] empty
[3] [Bob, 42]
[4] [John, 30]    ← Probed to next slot
[5] [Alice, 35]

Trade-offs:
Chaining:
• Simple implementation
• Can exceed table size
• Extra memory for pointers
• No clustering issues

Open Addressing:
• Better cache locality
• Fixed memory usage
• Can't exceed table size
• Vulnerable to clustering`
      },

      {
        subtitle: "3. Load Factor and Resizing",
        content: `**Load Factor (α):**
α = n / m
where n = number of keys, m = table size

**Load Factor Meaning:**
• α = 0.5 → Table is 50% full
• α = 1.0 → Table is 100% full
• α > 1.0 → More keys than slots (chaining only)

**Impact on Performance:**

**Chaining:**
• Average chain length ≈ α
• Search time: O(1 + α)
• Can handle α > 1
• Typical threshold: α = 0.75

**Open Addressing:**
• Must maintain α < 1
• Performance degrades rapidly as α → 1
• Search time: O(1/(1-α))
• Typical threshold: α = 0.5

**Resizing Strategy:**
When α exceeds threshold:
1. Create larger table (usually 2× size)
2. Rehash all existing keys
3. Insert into new table
4. Replace old table

**Amortized Cost:**
• Resizing: O(n) time
• But happens infrequently
• Amortized: O(1) per insertion`,

        example: `Load factor example:

Initial: m = 7, n = 0, α = 0
[0] [1] [2] [3] [4] [5] [6]

After 3 insertions: n = 3, α = 3/7 ≈ 0.43
[0] [1] [2] [3] [4] [5] [6]
     X   X       X
Good performance!

After 6 insertions: n = 6, α = 6/7 ≈ 0.86
[0] [1] [2] [3] [4] [5] [6]
 X   X   X   X   X   X
Performance degrading!

Resize triggered (α > 0.75):
New size: m = 17 (next prime after 14)
Rehash all 6 keys into new table:
[0][1][2][3][4][5][6][7][8][9][10][11][12][13][14][15][16]
   X     X  X     X           X               X
New α = 6/17 ≈ 0.35 - Good performance restored!

Performance vs Load Factor:

α       Chaining    Open Addressing
0.25    1.25        1.15  (excellent)
0.50    1.50        2.00  (good)
0.75    1.75        4.00  (acceptable)
0.90    1.90        10.0  (poor)
1.00    2.00        ∞     (terrible)

Average probes for successful search`
      }
    ]
  },

  collisionResolution: {
    title: "Collision Resolution Techniques",

    sections: [
      {
        technique: "Chaining (Separate Chaining)",
        description: `**How Chaining Works:**
• Each table index contains a linked list (or other data structure)
• Colliding keys added to the list at that index
• Search requires traversing the list
• Most common and simple approach

**Data Structure Options:**
• Linked List (most common)
• Dynamic Array
• Self-balancing BST (Java 8+ HashMap)

**Advantages:**
• Simple to implement
• Can exceed load factor of 1.0
• Never "full"
• Deletion is straightforward
• Performance degrades gracefully

**Disadvantages:**
• Extra memory for pointers
• Poor cache locality (pointer chasing)
• Uneven distribution can create long chains`,

        pseudocode: `class HashTable:
    table: array of LinkedLists
    size: integer

function insert(key, value):
    index = hash(key) % size

    // Check if key exists in chain
    for node in table[index]:
        if node.key == key:
            node.value = value  // Update
            return

    // Add new node to chain
    table[index].insertAtHead(key, value)

function search(key):
    index = hash(key) % size

    // Search in chain
    for node in table[index]:
        if node.key == key:
            return node.value

    return null  // Not found

function delete(key):
    index = hash(key) % size

    // Remove from chain
    table[index].remove(key)

// Time Complexity (with load factor α):
// Average: O(1 + α)
// Worst case: O(n) if all keys hash to same index`,

        visualExample: `Chaining example:

Insert sequence: ("John", 25), ("Emma", 30), ("Bob", 35), ("Jane", 40)

Assume:
hash("John") = 2
hash("Emma") = 5
hash("Bob") = 2  ← Collision with John!
hash("Jane") = 2  ← Another collision!

Hash Table (size = 7):
[0] -> null
[1] -> null
[2] -> ["Jane",40] -> ["Bob",35] -> ["John",25] -> null
[3] -> null
[4] -> null
[5] -> ["Emma",30] -> null
[6] -> null

Search for "Bob":
1. hash("Bob") = 2
2. Go to index 2
3. Traverse chain: "Jane" → "Bob" ← Found!
4. Return 35

Time: O(1) for hash + O(chain length) for traversal
If chain length ≈ α, total is O(1 + α)

Java 8+ optimization:
When chain length > 8:
Convert linked list to balanced BST
Search time: O(log n) instead of O(n)

[2] -> TreeNode["Bob"] (BST structure)
         /           \\
   ["Jane"]         ["John"]

Now search in long chains is O(log chain_length)!`
      },

      {
        technique: "Linear Probing",
        description: `**How Linear Probing Works:**
• All keys stored in table itself (no external structures)
• On collision, probe next slot: (hash + 1) % size
• Continue until empty slot found
• Search follows same probe sequence

**Probe Sequence:**
h(k, i) = (h(k) + i) % m
where i = 0, 1, 2, 3, ...

**Advantages:**
• Better cache locality (array-based)
• No extra memory for pointers
• Fast when load factor is low

**Disadvantages:**
• Primary clustering - groups of consecutive filled slots
• Performance degrades as table fills
• Deletion is complex (requires tombstones)
• Must maintain α < 1`,

        pseudocode: `function insert(key, value):
    index = hash(key) % size
    i = 0

    while i < size:
        probeIndex = (index + i) % size

        if table[probeIndex] is empty or deleted:
            table[probeIndex] = (key, value)
            return true

        if table[probeIndex].key == key:
            table[probeIndex].value = value  // Update
            return true

        i++  // Try next slot

    return false  // Table full

function search(key):
    index = hash(key) % size
    i = 0

    while i < size:
        probeIndex = (index + i) % size

        if table[probeIndex] is empty:
            return null  // Not found

        if table[probeIndex].key == key:
            return table[probeIndex].value

        i++  // Try next slot

    return null  // Not found after full probe

function delete(key):
    index = hash(key) % size
    i = 0

    while i < size:
        probeIndex = (index + i) % size

        if table[probeIndex] is empty:
            return false  // Not found

        if table[probeIndex].key == key:
            table[probeIndex] = DELETED  // Tombstone
            return true

        i++

    return false

// DELETED tombstone is needed because:
// Can't set to empty - would break search chain!`,

        visualExample: `Linear probing example:

Insert: ("John", 25), ("Emma", 30), ("Bob", 35)

Assume hash("John") = 2, hash("Emma") = 2, hash("Bob") = 2
All collide!

Step 1: Insert "John"
[0] empty [1] empty [2] John,25 [3] empty [4] empty

Step 2: Insert "Emma"
hash = 2, occupied
Try (2+1)%5 = 3
[0] empty [1] empty [2] John,25 [3] Emma,30 [4] empty

Step 3: Insert "Bob"
hash = 2, occupied
Try (2+1)%5 = 3, occupied
Try (2+2)%5 = 4
[0] empty [1] empty [2] John,25 [3] Emma,30 [4] Bob,35

Primary clustering problem:
Cluster at indices 2-3-4 grows
Future keys hashing to 2, 3, or 4 will have long probe sequences!

Search for "Bob":
1. hash("Bob") = 2
2. Check [2]: "John" ≠ "Bob", continue
3. Check [3]: "Emma" ≠ "Bob", continue
4. Check [4]: "Bob" = "Bob" ← Found!
Probes: 3

Delete "Emma":
[2] John,25 [3] DELETED [4] Bob,35
           tombstone

Now search for "Bob" still works:
Checks [2], [3] (deleted, continue), [4] (found!)

If we set [3] to empty instead:
Search would stop at [3], miss "Bob" at [4]!`
      },

      {
        technique: "Quadratic Probing",
        description: `**How Quadratic Probing Works:**
• Similar to linear probing, but with quadratic jumps
• Probe sequence: (hash + i²) % size
• Reduces primary clustering

**Probe Sequence:**
h(k, i) = (h(k) + c₁×i + c₂×i²) % m
Common: c₁ = c₂ = 1, so h(k, i) = (h(k) + i²) % m
where i = 0, 1, 2, 3, ...

**Advantages:**
• Reduces primary clustering
• Better than linear probing for high load factors
• Still has good cache locality

**Disadvantages:**
• Secondary clustering - keys with same hash follow same probe sequence
• May not probe all table slots
• Requires table size to be prime or power of 2
• Deletion still complex (tombstones)`,

        example: `Quadratic probing example:

Insert: ("John", 25), ("Emma", 30), ("Bob", 35)
All hash to index 2

Table size = 11 (prime)

Step 1: Insert "John"
i=0: (2 + 0²) % 11 = 2
[0][1][2]John[3][4][5][6][7][8][9][10]

Step 2: Insert "Emma"
i=0: (2 + 0²) % 11 = 2  (occupied)
i=1: (2 + 1²) % 11 = 3
[0][1][2]John[3]Emma[4][5][6][7][8][9][10]

Step 3: Insert "Bob"
i=0: (2 + 0²) % 11 = 2  (occupied)
i=1: (2 + 1²) % 11 = 3  (occupied)
i=2: (2 + 4) % 11 = 6
[0][1][2]John[3]Emma[4][5][6]Bob[7][8][9][10]

Probe sequence: 2 → 3 → 6 → 11 → 18 → ...
No consecutive filling (less clustering than linear!)

Compare with linear probing:
Linear: 2 → 3 → 4 → 5 → 6 → ...
Quadratic: 2 → 3 → 6 → 11 → 18 → ...

Quadratic spreads out more!

Secondary clustering example:
Two keys, both hash to 2:
Both follow sequence: 2 → 3 → 6 → 11 → ...
(Same collision pattern for same initial hash)

This is better than primary clustering but not perfect.`
      },

      {
        technique: "Double Hashing",
        description: `**How Double Hashing Works:**
• Uses two hash functions: h₁ and h₂
• Probe sequence: (h₁(k) + i × h₂(k)) % m
• h₂(k) determines step size for probing
• Eliminates both primary and secondary clustering

**Probe Sequence:**
h(k, i) = (h₁(k) + i × h₂(k)) % m
where i = 0, 1, 2, 3, ...

**Requirements for h₂:**
• h₂(k) must never be 0
• h₂(k) should be relatively prime to table size m
• Common: h₂(k) = 1 + (k % (m-1))

**Advantages:**
• Best open addressing method
• Eliminates primary and secondary clustering
• Different keys have different probe sequences
• Good performance even at high load factors

**Disadvantages:**
• Requires two hash function computations
• More complex implementation
• Still requires tombstones for deletion`,

        pseudocode: `function h1(key, m):
    return key % m

function h2(key, m):
    return 1 + (key % (m - 1))

function insert(key, value):
    h1_val = h1(key, size)
    h2_val = h2(key, size)
    i = 0

    while i < size:
        probeIndex = (h1_val + i × h2_val) % size

        if table[probeIndex] is empty or deleted:
            table[probeIndex] = (key, value)
            return true

        if table[probeIndex].key == key:
            table[probeIndex].value = value
            return true

        i++

    return false  // Table full

function search(key):
    h1_val = h1(key, size)
    h2_val = h2(key, size)
    i = 0

    while i < size:
        probeIndex = (h1_val + i × h2_val) % size

        if table[probeIndex] is empty:
            return null

        if table[probeIndex].key == key:
            return table[probeIndex].value

        i++

    return null`,

        visualExample: `Double hashing example:

Table size m = 11
h1(k) = k % 11
h2(k) = 1 + (k % 10)

Insert keys: 12, 23, 34

Key 12:
h1(12) = 12 % 11 = 1
h2(12) = 1 + (12 % 10) = 1 + 2 = 3
Sequence: 1, 4, 7, 10, 2, 5, 8, 0, 3, 6, 9
Place at index 1
[0][1]12[2][3][4][5][6][7][8][9][10]

Key 23:
h1(23) = 23 % 11 = 1  (collision!)
h2(23) = 1 + (23 % 10) = 1 + 3 = 4
Sequence: 1, 5, 9, 2, 6, 10, 3, 7, 0, 4, 8
i=0: (1 + 0×4) % 11 = 1 (occupied)
i=1: (1 + 1×4) % 11 = 5
Place at index 5
[0][1]12[2][3][4][5]23[6][7][8][9][10]

Key 34:
h1(34) = 34 % 11 = 1  (collision!)
h2(34) = 1 + (34 % 10) = 1 + 4 = 5
Sequence: 1, 6, 0, 5, 10, 4, 9, 3, 8, 2, 7
i=0: (1 + 0×5) % 11 = 1 (occupied)
i=1: (1 + 1×5) % 11 = 6
Place at index 6
[0][1]12[2][3][4][5]23[6]34[7][8][9][10]

Notice:
• Different keys have different step sizes
• 12 steps by 3, 23 steps by 4, 34 steps by 5
• No clustering! Each key has unique probe pattern
• Best distribution among open addressing methods`
      }
    ],

    comparisonTable: `**Collision Resolution Comparison:**

Method              Clustering  Cache    Memory   Delete   Max Load
─────────────────────────────────────────────────────────────────────
Chaining            None        Poor     High     Easy     >1.0
Linear Probing      Primary     Best     Low      Hard     <1.0
Quadratic Probing   Secondary   Good     Low      Hard     <1.0
Double Hashing      None        Good     Low      Hard     <1.0

**Performance (average probes for successful search):**

Load α    Chaining   Linear   Quadratic   Double
───────────────────────────────────────────────────
0.25      1.13       1.17     1.15        1.15
0.50      1.25       1.50     1.39        1.39
0.75      1.38       2.50     2.16        2.01
0.90      1.45       5.50     4.66        3.16

**Recommendation:**
• General use: Chaining (simplest, most flexible)
• Memory constrained: Linear probing (best cache)
• High performance: Double hashing (best distribution)
• Java HashMap: Chaining with BST for long chains
• Python dict: Open addressing with special probing
• C++ unordered_map: Chaining (usually)`
  },

  operations: {
    title: "Hash Table Operations",

    sections: [
      {
        operation: "Insert (Put)",
        timeComplexity: "O(1) average, O(n) worst case",
        spaceComplexity: "O(1)",

        description: `**How Insert Works:**
1. Compute hash value: index = hash(key) % size
2. Handle collision (chaining or probing)
3. Insert key-value pair
4. Check load factor, resize if needed

**Two Cases:**
• **New key:** Add new entry
• **Existing key:** Update value (overwrite)

**Key Points:**
• Average O(1) with good hash function and low load factor
• May trigger resize: O(n) but amortized O(1)
• Worst case O(n) if all keys collide (poor hash)`,

        pseudocode: `// Chaining implementation
function insert(key, value):
    // Check load factor
    if (count / size) > LOAD_FACTOR_THRESHOLD:
        resize()

    index = hash(key) % size

    // Search chain for existing key
    current = table[index]
    while current is not null:
        if current.key == key:
            current.value = value  // Update
            return
        current = current.next

    // Add new node at head of chain
    newNode = new Node(key, value)
    newNode.next = table[index]
    table[index] = newNode
    count++

// Open addressing implementation
function insertOpenAddressing(key, value):
    if (count / size) > LOAD_FACTOR_THRESHOLD:
        resize()

    index = hash(key) % size
    i = 0

    while i < size:
        probeIndex = (index + i) % size  // Linear probing

        if table[probeIndex] is empty or deleted:
            table[probeIndex] = (key, value)
            count++
            return

        if table[probeIndex].key == key:
            table[probeIndex].value = value  // Update
            return

        i++

    throw "Table is full"  // Should not happen with resize`,

        example: `Insert operations:

Initial state (size = 7, chaining):
[0] null [1] null [2] null [3] null [4] null [5] null [6] null

Insert ("apple", 5):
hash("apple") = 3
[3] -> ("apple", 5)

Insert ("banana", 2):
hash("banana") = 3  (collision!)
[3] -> ("banana", 2) -> ("apple", 5)

Insert ("cherry", 9):
hash("cherry") = 1
[1] -> ("cherry", 9)

Insert ("apple", 10):  (update existing)
hash("apple") = 3
Search chain at [3], find "apple", update value
[3] -> ("banana", 2) -> ("apple", 10)  (value changed!)

Search for "apple":
1. hash("apple") = 3
2. Go to index 3
3. Traverse: "banana" → "apple" (found!)
4. Return 10

Time complexity:
• Hash computation: O(1)
• Collision handling: O(α) where α = load factor
• Total: O(1 + α) = O(1) average`,

        resizing: `Resizing when load factor exceeds threshold:

Current table (size = 7, count = 6, α = 0.86):
[0] ("date",4)
[1] ("cherry",9)
[2] null
[3] ("banana",2)->("apple",10)
[4] ("fig",6)
[5] ("grape",3)
[6] null

Trigger resize (α > 0.75):
New size = 17 (next prime after 14)

Rehashing process:
For each existing key-value pair:
1. Compute new hash with new size
2. Insert into new table

New table (size = 17, count = 6, α = 0.35):
[0] null
[1] ("banana",2)
[2] null
[3] ("date",4)
[4] null
[5] ("apple",10)
[6] ("cherry",9)
[7] ("fig",6)
[8] null
...
[15] ("grape",3)
[16] null

Better distribution, improved performance!

Amortized analysis:
• Resize happens every n/2 insertions (if α=0.5 threshold)
• Each resize costs O(n)
• Total cost for n insertions: n×O(1) + O(n) = O(n)
• Amortized per insertion: O(1)`
      },

      {
        operation: "Search (Get)",
        timeComplexity: "O(1) average, O(n) worst case",
        spaceComplexity: "O(1)",

        description: `**How Search Works:**
1. Compute hash value: index = hash(key) % size
2. Follow collision resolution strategy
3. Compare keys until found or empty slot
4. Return value if found, null otherwise

**Key Points:**
• Average O(1) with good hash function
• Performance depends on load factor and collision handling
• Worst case O(n) if all keys hash to same location`,

        pseudocode: `// Chaining implementation
function search(key):
    index = hash(key) % size

    // Traverse chain
    current = table[index]
    while current is not null:
        if current.key == key:
            return current.value  // Found!
        current = current.next

    return null  // Not found

// Open addressing implementation
function searchOpenAddressing(key):
    index = hash(key) % size
    i = 0

    while i < size:
        probeIndex = (index + i) % size

        if table[probeIndex] is empty:
            return null  // Not found

        if table[probeIndex].key == key:
            return table[probeIndex].value  // Found!

        i++

    return null  // Not found`,

        example: `Search examples:

Hash table (chaining):
[0] null
[1] ("cherry", 9)
[2] null
[3] ("banana", 2) -> ("apple", 10) -> ("apricot", 7)
[4] null

Search "apple":
1. hash("apple") = 3
2. Go to index 3
3. Compare: "banana" ≠ "apple", next
4. Compare: "apple" = "apple" ← Found!
5. Return 10
Comparisons: 2, Time: O(1 + α)

Search "grape":
1. hash("grape") = 3
2. Go to index 3
3. Traverse entire chain: "banana", "apple", "apricot", null
4. Not found
5. Return null
Comparisons: 3, Time: O(1 + α)

Best case: Key is first in chain, O(1)
Average case: Key is in middle, O(1 + α/2)
Worst case: All keys in one chain, O(n)

Hash table (linear probing):
[0] empty
[1] ("cherry", 9)
[2] empty
[3] ("banana", 2)
[4] ("apple", 10)  (probed from 3)
[5] ("apricot", 7) (probed from 3)

Search "apple":
1. hash("apple") = 3
2. Check [3]: "banana" ≠ "apple", probe next
3. Check [4]: "apple" = "apple" ← Found!
4. Return 10
Probes: 2

Search "grape":
1. hash("grape") = 3
2. Check [3]: "banana" ≠ "grape", probe
3. Check [4]: "apple" ≠ "grape", probe
4. Check [5]: "apricot" ≠ "grape", probe
5. Check [6]: empty ← Not found!
6. Return null
Probes: 4`
      },

      {
        operation: "Delete (Remove)",
        timeComplexity: "O(1) average, O(n) worst case",
        spaceComplexity: "O(1)",

        description: `**How Delete Works:**

**Chaining:**
1. Compute hash value
2. Find key in chain
3. Remove node from linked list
4. Update count

**Open Addressing:**
1. Compute hash value
2. Find key using probe sequence
3. Mark as deleted (tombstone) - cannot set to empty!
4. Update count

**Why Tombstones?**
In open addressing, setting deleted slot to empty breaks probe chains!

**Key Points:**
• Chaining: Simple removal from linked list
• Open addressing: Must use tombstones
• Too many tombstones degrade performance → rebuild table`,

        pseudocode: `// Chaining implementation
function delete(key):
    index = hash(key) % size

    // Special case: head of chain
    if table[index] is not null and table[index].key == key:
        table[index] = table[index].next
        count--
        return true

    // Traverse chain
    prev = table[index]
    current = table[index].next

    while current is not null:
        if current.key == key:
            prev.next = current.next  // Remove node
            count--
            return true
        prev = current
        current = current.next

    return false  // Not found

// Open addressing implementation
function deleteOpenAddressing(key):
    index = hash(key) % size
    i = 0

    while i < size:
        probeIndex = (index + i) % size

        if table[probeIndex] is empty:
            return false  // Not found

        if table[probeIndex].key == key:
            table[probeIndex] = DELETED  // Tombstone!
            count--
            return true

        i++

    return false  // Not found`,

        example: `Delete with chaining:

Before delete "apple":
[3] -> ("banana", 2) -> ("apple", 10) -> ("apricot", 7)

Delete "apple":
1. hash("apple") = 3
2. Traverse: "banana" → "apple" (found!)
3. Unlink: prev.next = current.next
[3] -> ("banana", 2) -> ("apricot", 7)

Simple linked list removal!

Delete with open addressing (linear probing):

Before:
[0] empty
[1] ("cherry", 9)
[2] empty
[3] ("banana", 2)
[4] ("apple", 10)
[5] ("apricot", 7)
[6] empty

Delete "apple":
1. hash("apple") = 3
2. Probe: [3] "banana", [4] "apple" (found!)
3. Mark as DELETED
[0] empty
[1] ("cherry", 9)
[2] empty
[3] ("banana", 2)
[4] DELETED       ← Tombstone!
[5] ("apricot", 7)
[6] empty

Why not set to empty?
Search for "apricot":
1. hash("apricot") = 3
2. Probe: [3] "banana", [4] empty ← Would stop here!
3. Would miss "apricot" at [5]!

With tombstone:
1. hash("apricot") = 3
2. Probe: [3] "banana", [4] DELETED (continue), [5] "apricot" ✓

Tombstone problem:
After many deletions:
[0] empty [1] DELETED [2] DELETED [3] key1 [4] DELETED [5] key2

Too many tombstones → slow search
Solution: Rebuild table when tombstone ratio is high`
      },

      {
        operation: "Contains (Has Key)",
        timeComplexity: "O(1) average, O(n) worst case",
        spaceComplexity: "O(1)",

        description: `**How Contains Works:**
Same as search, but returns boolean instead of value.

**Implementation:**
• Call search(key)
• Return true if value found, false otherwise
• Or implement separately for efficiency`,

        pseudocode: `function contains(key):
    result = search(key)
    return result is not null

// Or direct implementation
function containsDirect(key):
    index = hash(key) % size

    current = table[index]
    while current is not null:
        if current.key == key:
            return true
        current = current.next

    return false`,

        example: `Contains check:

Hash table:
[0] null
[1] ("cherry", 9)
[3] ("banana", 2) -> ("apple", 10)

contains("apple"):
→ search("apple") → returns 10
→ return true

contains("grape"):
→ search("grape") → returns null
→ return false

Simple wrapper around search operation.`
      }
    ],

    operationSummary: `**Operation Complexity Summary:**

Operation     Average     Worst Case    Space
──────────────────────────────────────────────────
Insert        O(1)        O(n)          O(1)
Search        O(1)        O(n)          O(1)
Delete        O(1)        O(n)          O(1)
Contains      O(1)        O(n)          O(1)

**Performance Factors:**
• Hash function quality (uniform distribution)
• Load factor (table fullness)
• Collision resolution method
• Table size (prime numbers help)

**Best Practices:**
• Keep load factor < 0.75 (chaining) or < 0.5 (open addressing)
• Use good hash function (uniform distribution)
• Choose appropriate collision resolution
• Resize when load factor exceeds threshold
• Use prime number table sizes`
  },

  hashFunctions: {
    title: "Hash Functions in Detail",

    sections: [
      {
        type: "Integer Keys",
        description: `**Division Method:**
h(k) = k % m
• Simple and fast
• m should be prime to avoid clustering
• Avoid powers of 2 (poor distribution)

**Multiplication Method:**
h(k) = ⌊m × (k × A mod 1)⌋
• A is constant (0 < A < 1)
• Knuth suggests A ≈ 0.618033 (golden ratio - 1)
• m can be any value (often power of 2 for efficiency)
• Better distribution than division`,

        examples: `Division method:
h(45) = 45 % 13 = 6
h(67) = 67 % 13 = 2
h(80) = 80 % 13 = 2  (collision with 67)

Multiplication method (m=8, A=0.618):
h(45) = ⌊8 × (45 × 0.618 mod 1)⌋
      = ⌊8 × (27.81 mod 1)⌋
      = ⌊8 × 0.81⌋
      = 6

h(67) = ⌊8 × (67 × 0.618 mod 1)⌋
      = ⌊8 × (41.406 mod 1)⌋
      = ⌊8 × 0.406⌋
      = 3

h(80) = ⌊8 × (80 × 0.618 mod 1)⌋
      = ⌊8 × (49.44 mod 1)⌋
      = ⌊8 × 0.44⌋
      = 3  (collision with 67)

Both methods have collisions, but multiplication generally distributes better.`
      },

      {
        type: "String Keys",
        description: `**Polynomial Rolling Hash:**
Most common and effective for strings.

Formula:
h(s) = (s[0]×p^(n-1) + s[1]×p^(n-2) + ... + s[n-1]×p^0) % m

where:
• p = prime number (commonly 31 or 33)
• n = string length
• m = table size

**Why 31?**
• Prime number (reduces collisions)
• Small enough for arithmetic
• 31×n = (n<<5) - n (efficient bit operation)

**Optimization:**
Use Horner's method for efficient computation:
h = 0
for each char c in string:
    h = (h × p + c) % m`,

        implementation: `function hashString(str, m):
    hash = 0
    p = 31

    for char in str:
        hash = (hash × p + charCode(char)) % m

    return hash

// Example:
h("cat") = ((('c'×31 + 'a')×31 + 't') % m

Step by step (m=101):
hash = 0
hash = (0×31 + 99) % 101 = 99        // 'c'
hash = (99×31 + 97) % 101 = 3166 % 101 = 31   // 'a'
hash = (31×31 + 116) % 101 = 1077 % 101 = 67  // 't'

h("cat") = 67

h("act") = ?
hash = 0
hash = (0×31 + 97) % 101 = 97        // 'a'
hash = (97×31 + 99) % 101 = 3106 % 101 = 75   // 'c'
hash = (75×31 + 116) % 101 = 2441 % 101 = 17  // 't'

h("act") = 17

"cat" and "act" hash to different values!
(Avoids anagram collision)`,

        alternatives: `Other string hash functions:

DJB2 (Dan Bernstein):
hash = 5381
for each char:
    hash = hash × 33 + char

FNV-1a (Fowler-Noll-Vo):
hash = 2166136261  // FNV offset basis
for each char:
    hash = hash XOR char
    hash = hash × 16777619  // FNV prime

MurmurHash (non-cryptographic):
• Very fast
• Good distribution
• Used in Redis, Memcached
• More complex implementation

Java's String.hashCode():
s[0]×31^(n-1) + s[1]×31^(n-2) + ... + s[n-1]
(Polynomial with p=31)`
      },

      {
        type: "Custom Object Keys",
        description: `**Requirements:**
• Must override hash function
• Must override equals function
• If a == b, then hash(a) == hash(b)
• If hash(a) == hash(b), a may or may not equal b

**Approach:**
1. Choose key fields that determine equality
2. Combine their hash values
3. Use prime numbers to combine

**Common Pattern:**
hash = 17
hash = hash × 31 + field1.hash
hash = hash × 31 + field2.hash
...
return hash`,

        implementation: `class Person:
    name: string
    age: int
    email: string

    hash():
        h = 17
        h = h × 31 + hashString(name)
        h = h × 31 + age
        h = h × 31 + hashString(email)
        return h % TABLE_SIZE

    equals(other):
        return this.name == other.name
           and this.age == other.age
           and this.email == other.email

Example:
person1 = Person("Alice", 25, "alice@email.com")
person2 = Person("Alice", 25, "alice@email.com")
person3 = Person("Bob", 25, "bob@email.com")

person1.hash() == person2.hash()  ✓ (equal objects)
person1.equals(person2)  ✓

person1.hash() != person3.hash()  (likely)
person1.equals(person3)  ✗

Using composite keys:
class Coordinate:
    x: int
    y: int

    hash():
        // Cantor pairing function
        return (x + y) × (x + y + 1) / 2 + y

Or simpler:
    hash():
        return x × 31 + y

Example:
(5, 10).hash() = 5×31 + 10 = 165
(10, 5).hash() = 10×31 + 5 = 315
Different points hash differently ✓`
      }
    ],

    properties: `**Properties of Good Hash Functions:**

1. **Deterministic:**
   • Same input always produces same output
   • h("apple") always returns same value

2. **Uniform Distribution:**
   • Spreads keys evenly across table
   • Minimizes collisions
   • Each bucket equally likely

3. **Fast Computation:**
   • O(1) or O(k) where k is key size
   • No complex operations
   • Efficient for frequent operations

4. **Avalanche Effect:**
   • Small change in input → large change in output
   • "apple" and "appme" hash to very different values

5. **Minimize Collisions:**
   • Different keys should hash differently
   • Impossible to eliminate, but minimize

**Testing Hash Function Quality:**

Chi-square test:
Expected: n/m keys per bucket
Actual: count per bucket
χ² = Σ((observed - expected)² / expected)

Lower χ² = better distribution

Visual test:
Plot hash values, should look random
No patterns or clustering

Collision rate:
Count collisions / total insertions
< 0.1 is good for α < 0.75`
  },

  complexity: {
    title: "Complexity Analysis",

    timeComplexity: {
      subtitle: "Time Complexity Detailed",

      operations: {
        average: `**Average Case (Good Hash Function, α < 0.75):**

Chaining:
• Insert: O(1) - add to head of list
• Search: O(1 + α) - hash + traverse chain
• Delete: O(1 + α) - hash + find in chain

Linear Probing:
• Insert: O(1/(1-α)) - depends on load factor
• Search: O(1/(1-α)) - probes increase as α → 1
• Delete: O(1/(1-α)) - same as search

Double Hashing:
• Insert: O(1/(1-α)) - best open addressing
• Search: O(1/(1-α)) - minimal clustering
• Delete: O(1/(1-α)) - same as search

**Why O(1) Average?**
With α < 0.75:
• Chaining: O(1 + α) = O(1 + 0.75) = O(1.75) ≈ O(1)
• Open Addressing: O(1/(1-0.75)) = O(4) ≈ O(1)

Constants are absorbed in big-O notation!`,

        worst: `**Worst Case (All Keys Hash to Same Index):**

All operations: O(n)

Chaining:
• All keys in one chain
• Search/Delete: O(n) to traverse chain
• Essentially becomes linked list

Open Addressing:
• All keys probe through entire table
• Search/Delete: O(n) probes

**When Does Worst Case Happen?**
• Poor hash function (e.g., always returns 0)
• Adversarial input (attacker knows hash function)
• Very high load factor (α → 1)

**Mitigation:**
• Use good hash function
• Universal hashing (random components)
• Keep load factor low
• Resize table when α exceeds threshold

**Real-World:**
With good hash function, worst case is extremely rare
Average case dominates in practice`
      },

      loadFactorImpact: `**Load Factor Impact on Performance:**

α     Chaining   Linear    Quadratic  Double
─────────────────────────────────────────────────
0.1   1.05       1.06      1.05       1.05
0.25  1.13       1.17      1.15       1.15
0.50  1.25       1.50      1.39       1.39
0.75  1.38       2.50      2.16       2.01
0.90  1.45       5.50      4.66       3.16
0.95  1.48       10.50     8.50       5.70
1.00  1.50       ∞         ∞          ∞

Numbers show average probes for successful search.

Observations:
• Chaining degrades gracefully
• Open addressing degrades rapidly
• Double hashing best among open addressing
• Keep α < 0.75 for good performance

Graph (conceptual):
Probes
    │
 10 │                                    Linear
    │                                   /
  8 │                              /   /
    │                         /   /   /
  6 │                    /   /   /   /  Quadratic
    │               /   /   /   /   /
  4 │          /   /   /   /   /   /   / Double
    │     /   /   /   /   /   /   /   /
  2 │────────────────────────────────── Chaining
    │
  0 └────────────────────────────────────
      0  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8  Load Factor`
    },

    spaceComplexity: {
      subtitle: "Space Complexity Analysis",

      storage: `**Space Complexity: O(n)**

Chaining:
• Array: m slots (m = O(n) typically)
• Nodes: n key-value pairs
• Pointers: n next pointers
• Total: O(m + 2n) = O(n)

Open Addressing:
• Array: m slots (m = O(n) typically)
• No extra pointers
• Total: O(m) = O(n)

**Memory Breakdown (1 million key-value pairs):**

Chaining (assuming int keys/values):
• Array: 1.33M × 8 bytes (pointers) = 10.6 MB
• Keys: 1M × 4 bytes = 4 MB
• Values: 1M × 4 bytes = 4 MB
• Next pointers: 1M × 8 bytes = 8 MB
• Total: ~26.6 MB

Open Addressing:
• Array: 2M × 16 bytes (key+value) = 32 MB
• Total: ~32 MB

Note: Open addressing needs larger table (α < 0.75)

Trade-off:
• Chaining: ~26 MB, can exceed α = 1
• Open Addressing: ~32 MB, must keep α < 1`,

      overhead: `**Memory Overhead Analysis:**

Per Entry Cost:
─────────────────────────────────────────
Chaining:
  key:   4-8 bytes
  value: 4-8 bytes
  next:  8 bytes
  Total: 16-24 bytes per entry
  Overhead: 50%

Open Addressing:
  key:   4-8 bytes
  value: 4-8 bytes
  Total: 8-16 bytes per entry
  Overhead: 0% (no extra pointers)

But open addressing needs:
• Larger table (α < 0.75)
• Tombstone markers

Effective overhead:
• Chaining: 50% per entry
• Open Addressing: 33% from table size

**Resizing Cost:**
• Create new table: O(m) space
• Temporarily need old + new: O(2m)
• Rehash all entries: O(n) time
• Free old table: O(m) space back

During resize: 2× space temporarily!`
    }
  },

  applications: {
    title: "Real-World Applications of Hash Tables",

    useCases: [
      {
        application: "Caching and Memoization",
        description: `Hash tables are perfect for caching computed results and storing frequently accessed data.

**Use Cases:**
• Web browser cache (URL → page content)
• DNS cache (domain → IP address)
• Function result memoization
• Database query cache

**Why Hash Tables?**
• O(1) lookup time
• Natural key-value association
• Efficient memory usage with eviction policies`,

        example: `Memoization example (Fibonacci):

Without memoization: O(2^n)
function fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

With memoization: O(n)
cache = new HashTable()

function fibMemo(n):
    if n <= 1:
        return n

    if cache.contains(n):
        return cache.get(n)  // O(1) lookup!

    result = fibMemo(n-1) + fibMemo(n-2)
    cache.put(n, result)
    return result

For fib(50):
• Without cache: 2^50 ≈ 1 quadrillion operations
• With cache: 50 operations (98 lookups)
• Speedup: ~20 trillion times faster!

Web cache example:
cache = HashTable()

function fetchPage(url):
    if cache.contains(url):
        return cache.get(url)  // O(1) instant!

    page = downloadFromInternet(url)  // Slow!
    cache.put(url, page)
    return page

First visit: Slow (download)
Subsequent visits: Instant (cached)`
      },

      {
        application: "Database Indexing",
        description: `Hash tables provide fast lookups for database records.

**Hash Index:**
• Maps key to record location
• O(1) equality lookups
• Used for unique constraints (primary keys, unique columns)

**Limitations:**
• No range queries (use B-tree instead)
• No sorting
• Only equality checks

**Where Used:**
• PostgreSQL: Hash indexes
• Redis: Hash data structure
• In-memory databases: Primary indexes`,

        implementation: `Database hash index:

Table: Users
ID   Name      Email
1    Alice     alice@email.com
2    Bob       bob@email.com
3    Charlie   charlie@email.com

Hash Index on Email:
emailIndex = HashTable()
emailIndex.put("alice@email.com", 1)      // → record ID
emailIndex.put("bob@email.com", 2)
emailIndex.put("charlie@email.com", 3)

Query: SELECT * FROM Users WHERE Email = 'bob@email.com'
1. Lookup emailIndex.get("bob@email.com") → 2  // O(1)
2. Fetch record with ID=2 → Bob's data

Without index:
1. Scan entire table → O(n)

For 1 million records:
• Hash index: ~1 operation
• Full scan: ~500,000 operations (average)

Hash vs B-Tree index:
Hash Index:
• Equality: O(1) ✓
• Range: Not supported ❌
• Sort: Not supported ❌

B-Tree Index:
• Equality: O(log n)
• Range: O(log n + k) ✓
• Sort: Yes ✓

Use hash index for: Primary keys, unique lookups
Use B-tree for: Range queries, sorting`
      },

      {
        application: "Counting Frequencies",
        description: `Hash tables excel at counting occurrences of items.

**Use Cases:**
• Word frequency in text
• Character counting
• Event tracking
• Histogram generation

**Pattern:**
For each item:
  count[item] = count.get(item, 0) + 1`,

        example: `Word frequency counter:

Text: "the quick brown fox jumps over the lazy dog"

wordCount = HashTable()

for word in text.split():
    if wordCount.contains(word):
        wordCount.put(word, wordCount.get(word) + 1)
    else:
        wordCount.put(word, 1)

Result:
"the"   -> 2
"quick" -> 1
"brown" -> 1
"fox"   -> 1
"jumps" -> 1
"over"  -> 1
"lazy"  -> 1
"dog"   -> 1

Most common word:
maxWord = null
maxCount = 0
for word, count in wordCount:
    if count > maxCount:
        maxCount = count
        maxWord = word

Result: "the" (appears 2 times)

Character frequency (for anagram detection):
function getFrequency(str):
    freq = HashTable()
    for char in str:
        freq.put(char, freq.get(char, 0) + 1)
    return freq

function areAnagrams(s1, s2):
    return getFrequency(s1).equals(getFrequency(s2))

areAnagrams("listen", "silent") → true
areAnagrams("hello", "world") → false

Time: O(n) for both counting and comparison!`
      },

      {
        application: "Sets and Unique Elements",
        description: `Hash tables implement set operations efficiently.

**Set Operations:**
• Add: O(1)
• Contains: O(1)
• Remove: O(1)
• Union, Intersection, Difference: O(n)

**Use Cases:**
• Remove duplicates from list
• Check membership
• Find common elements
• Implement mathematical sets`,

        example: `Remove duplicates:

arr = [1, 2, 3, 2, 4, 1, 5, 3]

seen = HashSet()  // Implemented with hash table
result = []

for num in arr:
    if not seen.contains(num):
        seen.add(num)
        result.append(num)

result = [1, 2, 3, 4, 5]  // Duplicates removed!
Time: O(n) - single pass

Set operations:
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

Union (elements in either):
union = HashSet()
for x in set1: union.add(x)
for x in set2: union.add(x)
Result: {1, 2, 3, 4, 5, 6}

Intersection (elements in both):
intersection = HashSet()
for x in set1:
    if set2.contains(x):
        intersection.add(x)
Result: {3, 4}

Difference (in set1 but not set2):
difference = HashSet()
for x in set1:
    if not set2.contains(x):
        difference.add(x)
Result: {1, 2}

All operations: O(n + m) where n, m are set sizes!`
      },

      {
        application: "Implementing LRU Cache",
        description: `Hash table + doubly linked list = efficient LRU cache.

**Structure:**
• Hash table: O(1) access to cache entries
• Doubly linked list: O(1) reordering (LRU tracking)

**Operations:**
• Get: O(1) - hash table lookup + move to front
• Put: O(1) - hash table insert + add to front

**Why Both?**
• Hash table alone: Can't track LRU order
• Linked list alone: Can't find entry in O(1)
• Together: Perfect combination!`,

        implementation: `LRU Cache implementation:

class LRUCache:
    capacity: int
    cache: HashTable      // key → node
    head: Node           // Most recently used
    tail: Node           // Least recently used

    get(key):
        if not cache.contains(key):
            return -1

        node = cache.get(key)
        moveToFront(node)  // Mark as recently used
        return node.value

    put(key, value):
        if cache.contains(key):
            // Update existing
            node = cache.get(key)
            node.value = value
            moveToFront(node)
        else:
            // Add new
            if cache.size() >= capacity:
                // Evict LRU (tail)
                lru = tail
                removeNode(lru)
                cache.delete(lru.key)

            newNode = new Node(key, value)
            cache.put(key, newNode)
            addToFront(newNode)

    moveToFront(node):
        removeNode(node)
        addToFront(node)

    addToFront(node):
        node.next = head.next
        node.prev = head
        head.next.prev = node
        head.next = node

    removeNode(node):
        node.prev.next = node.next
        node.next.prev = node.prev

Example usage:
cache = LRUCache(capacity=3)

cache.put(1, 10)  // Cache: [1]
cache.put(2, 20)  // Cache: [2, 1]
cache.put(3, 30)  // Cache: [3, 2, 1]

cache.get(1)      // Cache: [1, 3, 2] - 1 moved to front

cache.put(4, 40)  // Cache: [4, 1, 3] - 2 evicted (LRU)

All operations O(1)!
Used in: Web caches, databases, CPU caches`
      },

      {
        application: "Symbol Tables in Compilers",
        description: `Compilers use hash tables to store and lookup identifiers.

**Symbol Table:**
• Maps variable names to properties
• Stores: type, scope, memory location
• Needs fast lookup during compilation

**Properties Stored:**
• Variable name (key)
• Data type
• Scope level
• Memory address
• Initialization status`,

        example: `Compiler symbol table:

code:
int x = 10;
float y = 3.14;
string name = "Alice";

symbolTable = HashTable()

symbolTable.put("x", {
    type: "int",
    value: 10,
    address: 0x1000,
    scope: "global"
})

symbolTable.put("y", {
    type: "float",
    value: 3.14,
    address: 0x1004,
    scope: "global"
})

symbolTable.put("name", {
    type: "string",
    value: "Alice",
    address: 0x1008,
    scope: "global"
})

Later in code:
x = x + 5;

Compiler lookup:
1. Parse "x"
2. symbolTable.get("x") → {type: "int", ...}  // O(1)
3. Check type compatibility
4. Generate machine code

Without hash table:
• Would need O(n) linear search
• Compilation would be much slower!

Nested scopes:
function foo():
    int x = 20;  // Local x

Scope stack:
globalSymbols = HashTable()
localSymbols = HashTable()

Lookup order:
1. Check localSymbols first
2. If not found, check globalSymbols
3. If not found, compilation error

Fast O(1) lookups at each scope level!`
      }
    ],

    summary: `**When to Use Hash Tables:**

✓ Need fast O(1) lookups by key
✓ Key-value associations (dictionaries)
✓ Counting frequencies
✓ Checking membership (sets)
✓ Caching/memoization
✓ Removing duplicates
✓ Database indexing (equality queries)

**When NOT to Use Hash Tables:**

❌ Need sorted order (use BST)
❌ Need range queries (use BST or B-tree)
❌ Need predecessor/successor (use BST)
❌ Memory is extremely constrained (use array)
❌ Keys are sequential integers (use array)

**Comparison:**
Data Structure    Lookup    Insert    Delete    Ordered
───────────────────────────────────────────────────────────
Hash Table        O(1)      O(1)      O(1)      No
BST (balanced)    O(log n)  O(log n)  O(log n)  Yes
Array (sorted)    O(log n)  O(n)      O(n)      Yes
Linked List       O(n)      O(1)      O(n)      No

Hash table wins for lookup speed!`
  },

  interviewProblems: {
    title: "Common Hash Table Interview Problems",

    problems: [
      {
        title: "1. Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers and a target, return indices of two numbers that add up to target.",

        approach: `**Hash Table Approach:**
• Store each number with its index
• For each number x, check if (target - x) exists
• Time: O(n), Space: O(n)

**Why Hash Table?**
• Need to check if complement exists: O(1) lookup
• Need to remember indices: Store in hash table
• One pass through array`,

        solution: `function twoSum(nums, target):
    seen = new HashTable()  // num → index

    for i from 0 to nums.length - 1:
        complement = target - nums[i]

        if seen.contains(complement):
            return [seen.get(complement), i]

        seen.put(nums[i], i)

    return []  // No solution

// Time: O(n) - single pass
// Space: O(n) - hash table storage`,

        example: `nums = [2, 7, 11, 15], target = 9

Iteration 1: i=0, nums[0]=2
  complement = 9 - 2 = 7
  seen = {} (empty)
  Add: seen = {2: 0}

Iteration 2: i=1, nums[1]=7
  complement = 9 - 7 = 2
  seen.contains(2) = true ✓
  seen.get(2) = 0
  Return [0, 1]

Result: indices 0 and 1 (nums[0]=2, nums[1]=7, 2+7=9)

Why hash table is perfect:
• Complement lookup: O(1)
• Store index: Easy with key-value pairs
• One pass: Don't need nested loops

Brute force would be O(n²):
for i from 0 to n:
    for j from i+1 to n:
        if nums[i] + nums[j] == target:
            return [i, j]

Hash table: O(n), 1000x faster for n=1000!`
      },

      {
        title: "2. Group Anagrams",
        difficulty: "Medium",
        description: "Given array of strings, group anagrams together. Anagrams are words with same characters.",

        approach: `**Hash Table with Sorted Key:**
• Sort each word to get canonical form
• Use sorted word as key
• Group words with same sorted form
• Time: O(n × k log k) where k = max word length

**Alternative: Character Count Key:**
• Count characters in each word
• Use count as key (e.g., "a1b2c1")
• Time: O(n × k)`,

        solution: `function groupAnagrams(strs):
    groups = new HashTable()  // sorted → [words]

    for word in strs:
        // Sort word to get canonical form
        sorted = sort(word)  // "eat" → "aet"

        if not groups.contains(sorted):
            groups.put(sorted, [])

        groups.get(sorted).append(word)

    // Return all groups
    return groups.values()

// Time: O(n × k log k)
// Space: O(n × k)

// Alternative with character counting
function groupAnagramsOptimized(strs):
    groups = new HashTable()

    for word in strs:
        // Count characters
        count = [0] × 26
        for char in word:
            count[char - 'a']++

        // Use count as key
        key = count.toString()  // [1,0,1,0,1...] → "1,0,1..."

        if not groups.contains(key):
            groups.put(key, [])

        groups.get(key).append(word)

    return groups.values()

// Time: O(n × k)
// Space: O(n × k)`,

        example: `Input: ["eat", "tea", "tan", "ate", "nat", "bat"]

Step 1: Sort each word
"eat" → "aet"
"tea" → "aet"  (same as eat!)
"tan" → "ant"
"ate" → "aet"  (same as eat!)
"nat" → "ant"  (same as tan!)
"bat" → "abt"

Step 2: Group by sorted form
groups = {
    "aet": ["eat", "tea", "ate"],
    "ant": ["tan", "nat"],
    "abt": ["bat"]
}

Step 3: Return groups
[
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"]
]

Why hash table?
• Need to group by canonical form
• O(1) lookup to find group
• Easy to build groups dynamically

Character count alternative:
"eat" → [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]
         a b c d e f g h i j k l m n o p q r s t u v w x y z
         1       1                   1
Key: "1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0"

All anagrams have same character count!`
      },

      {
        title: "3. Longest Consecutive Sequence",
        difficulty: "Medium",
        description: "Find length of longest consecutive elements sequence in unsorted array. Must be O(n) time.",

        approach: `**Hash Table Set Approach:**
• Add all numbers to hash set
• For each number, check if it's start of sequence
• If it's a start, count consecutive numbers
• Time: O(n), Space: O(n)

**Key Insight:**
• Only start counting from sequence start
• Start is identified by: (num - 1) not in set
• This ensures each number visited once`,

        solution: `function longestConsecutive(nums):
    numSet = new HashSet()

    // Add all numbers to set: O(n)
    for num in nums:
        numSet.add(num)

    maxLength = 0

    for num in numSet:
        // Check if this is start of sequence
        if not numSet.contains(num - 1):
            // This is a sequence start
            currentNum = num
            currentLength = 1

            // Count consecutive numbers
            while numSet.contains(currentNum + 1):
                currentNum++
                currentLength++

            maxLength = max(maxLength, currentLength)

    return maxLength

// Time: O(n) - each number visited at most twice
// Space: O(n) - hash set storage`,

        example: `nums = [100, 4, 200, 1, 3, 2]

Step 1: Build set
numSet = {100, 4, 200, 1, 3, 2}

Step 2: Check each number
100: (99 not in set) → sequence start ✓
     100 → 101 not in set
     Length: 1

4: (3 in set) → not sequence start ✗
   Skip!

200: (199 not in set) → sequence start ✓
     200 → 201 not in set
     Length: 1

1: (0 not in set) → sequence start ✓
   1 → 2 in set
   2 → 3 in set
   3 → 4 in set
   4 → 5 not in set
   Length: 4  [1, 2, 3, 4]

3: (2 in set) → not sequence start ✗
   Skip!

2: (1 in set) → not sequence start ✗
   Skip!

Result: maxLength = 4

Why O(n)?
• Each number added to set once: O(n)
• Each number checked for (num-1): O(n)
• Each number in a sequence visited once during counting
• Total: O(n) + O(n) + O(n) = O(n)

Without hash set:
Sort array: O(n log n)
Then count consecutive: O(n)
Total: O(n log n)

Hash set enables O(n) solution!`
      },

      {
        title: "4. Subarray Sum Equals K",
        difficulty: "Medium",
        description: "Count number of continuous subarrays whose sum equals k.",

        approach: `**Prefix Sum + Hash Table:**
• Calculate cumulative sum at each position
• Use hash table to store: sum → count
• For each position, check if (cumSum - k) exists
• Time: O(n), Space: O(n)

**Key Insight:**
If cumSum[j] - cumSum[i] = k, then subarray(i+1, j) sums to k
Rearranging: cumSum[i] = cumSum[j] - k
So we need to count how many times (cumSum - k) appeared before!`,

        solution: `function subarraySum(nums, k):
    count = 0
    cumSum = 0
    sumCount = new HashTable()  // sum → occurrences
    sumCount.put(0, 1)  // Base case: empty prefix

    for num in nums:
        cumSum += num

        // Check if (cumSum - k) exists
        if sumCount.contains(cumSum - k):
            count += sumCount.get(cumSum - k)

        // Add current sum to map
        sumCount.put(cumSum, sumCount.get(cumSum, 0) + 1)

    return count

// Time: O(n)
// Space: O(n)`,

        example: `nums = [1, 2, 3], k = 3

Initialization:
cumSum = 0
sumCount = {0: 1}  // Base case
count = 0

Iteration 1: num = 1
cumSum = 0 + 1 = 1
Check: cumSum - k = 1 - 3 = -2
  sumCount.contains(-2) = false
sumCount = {0: 1, 1: 1}

Iteration 2: num = 2
cumSum = 1 + 2 = 3
Check: cumSum - k = 3 - 3 = 0
  sumCount.contains(0) = true ✓
  count += sumCount.get(0) = 1
sumCount = {0: 1, 1: 1, 3: 1}
(Found subarray [1,2] with sum 3)

Iteration 3: num = 3
cumSum = 3 + 3 = 6
Check: cumSum - k = 6 - 3 = 3
  sumCount.contains(3) = true ✓
  count += sumCount.get(3) = 1
sumCount = {0: 1, 1: 1, 3: 1, 6: 1}
(Found subarray [3] with sum 3)

Result: count = 2
Subarrays: [1,2] and [3]

Why hash table?
• Need to lookup previous sums quickly: O(1)
• Need to count occurrences
• Enables one-pass solution

Brute force: O(n²)
for i from 0 to n:
    sum = 0
    for j from i to n:
        sum += nums[j]
        if sum == k:
            count++

Hash table: O(n), much faster!`
      },

      {
        title: "5. LRU Cache",
        difficulty: "Hard",
        description: "Design and implement a data structure for Least Recently Used (LRU) cache with O(1) operations.",

        approach: `**Hash Table + Doubly Linked List:**
• Hash table: key → node (O(1) access)
• Doubly linked list: LRU order (O(1) reorder)
• Get: Move to front (recently used)
• Put: Add to front, evict tail if full

**Why Both?**
• Hash table: Can't track order
• Linked list: Can't find node in O(1)
• Combined: Perfect for LRU!`,

        solution: `class Node:
    key: any
    value: any
    prev: Node
    next: Node

class LRUCache:
    capacity: int
    cache: HashTable      // key → node
    head: Node           // Dummy head
    tail: Node           // Dummy tail
    size: int

    constructor(capacity):
        this.capacity = capacity
        this.cache = new HashTable()
        this.head = new Node()
        this.tail = new Node()
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0

    get(key):
        if not cache.contains(key):
            return -1

        node = cache.get(key)
        moveToFront(node)
        return node.value

    put(key, value):
        if cache.contains(key):
            // Update existing
            node = cache.get(key)
            node.value = value
            moveToFront(node)
        else:
            // Add new
            if size >= capacity:
                // Evict LRU
                lru = tail.prev
                removeNode(lru)
                cache.delete(lru.key)
                size--

            newNode = new Node(key, value)
            cache.put(key, newNode)
            addToFront(newNode)
            size++

    moveToFront(node):
        removeNode(node)
        addToFront(node)

    addToFront(node):
        node.next = head.next
        node.prev = head
        head.next.prev = node
        head.next = node

    removeNode(node):
        node.prev.next = node.next
        node.next.prev = node.prev

// All operations: O(1)!`,

        example: `LRUCache cache = new LRUCache(2)

cache.put(1, 10)
State: head <-> [1:10] <-> tail
Cache: {1 → node1}

cache.put(2, 20)
State: head <-> [2:20] <-> [1:10] <-> tail
Cache: {1 → node1, 2 → node2}
(2 is most recently used)

cache.get(1)  // Returns 10
State: head <-> [1:10] <-> [2:20] <-> tail
Cache: {1 → node1, 2 → node2}
(1 moved to front - most recently used)

cache.put(3, 30)  // Capacity reached, evict LRU
State: head <-> [3:30] <-> [1:10] <-> tail
Cache: {1 → node1, 3 → node3}
(2 was LRU, evicted)

cache.get(2)  // Returns -1 (not found)

All operations O(1):
• get: Hash table lookup + move to front
• put: Hash table insert + add to front + possible eviction
• Hash table: O(1)
• Doubly linked list operations: O(1)

This is a masterpiece of data structure design!
Used in real systems: CPU caches, web caches, databases`
      },

      {
        title: "6. First Non-Repeating Character",
        difficulty: "Easy",
        description: "Find the first non-repeating character in a string. Return its index, or -1 if none exists.",

        approach: `**Two Pass with Hash Table:**
1. First pass: Count frequency of each character
2. Second pass: Find first character with frequency 1
Time: O(n), Space: O(1) (at most 26 characters for lowercase)

**Key Insight:**
• Hash table for constant-time frequency lookup
• Two passes necessary to maintain order`,

        solution: `function firstUniqChar(s):
    // Count frequencies
    freq = new HashTable()
    for char in s:
        freq.put(char, freq.get(char, 0) + 1)

    // Find first with frequency 1
    for i from 0 to s.length - 1:
        if freq.get(s[i]) == 1:
            return i

    return -1

// Time: O(n)
// Space: O(1) - at most 26 lowercase letters`,

        example: `s = "leetcode"

Pass 1: Count frequencies
freq = {
    'l': 1,
    'e': 3,
    't': 1,
    'c': 1,
    'o': 1,
    'd': 1
}

Pass 2: Find first unique
Index 0: 'l', freq['l'] = 1 ✓
Return 0

s = "loveleetcode"

Pass 1: Count frequencies
freq = {
    'l': 2,
    'o': 2,
    'v': 1,
    'e': 4,
    't': 1,
    'c': 1,
    'd': 1
}

Pass 2: Find first unique
Index 0: 'l', freq['l'] = 2 ✗
Index 1: 'o', freq['o'] = 2 ✗
Index 2: 'v', freq['v'] = 1 ✓
Return 2

s = "aabb"

freq = {'a': 2, 'b': 2}
No character has frequency 1
Return -1`
      }
    ],

    additionalProblems: [
      {
        title: "7. Valid Sudoku",
        difficulty: "Medium",
        hint: "Use hash sets to track seen numbers in rows, columns, and 3×3 boxes"
      },
      {
        title: "8. Top K Frequent Elements",
        difficulty: "Medium",
        hint: "Count frequencies with hash table, then use heap or bucket sort"
      },
      {
        title: "9. Contains Duplicate II (within k distance)",
        difficulty: "Easy",
        hint: "Use hash table to store num → recent index, check distance"
      },
      {
        title: "10. Isomorphic Strings",
        difficulty: "Easy",
        hint: "Two hash tables for bidirectional mapping"
      },
      {
        title: "11. Design Twitter (following, timeline)",
        difficulty: "Medium-Hard",
        hint: "Hash table for user → tweets/following, heap for timeline merge"
      },
      {
        title: "12. Palindrome Pairs",
        difficulty: "Hard",
        hint: "Hash table for word → index, check reverse and split palindromes"
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Common Pitfalls",

    tips: [
      {
        category: "Choosing Hash Function",
        points: [
          "**Use Well-Tested Functions:**",
          "• Don't write your own hash function unless necessary",
          "• Use language built-ins (Python hash(), Java hashCode())",
          "• For strings: Polynomial rolling hash with prime base",
          "",
          "**Prime Numbers:**",
          "• Table size should be prime (reduces clustering)",
          "• Hash function should use prime multiplier (31, 37)",
          "• Avoids patterns and collisions",
          "",
          "**Avoid Pitfalls:**",
          "❌ Using powers of 2 for table size (poor distribution)",
          "❌ Simple sum for strings (anagrams collide)",
          "❌ Modulo before multiplication (loses information)",
          "✓ Use prime table sizes",
          "✓ Polynomial hash for strings",
          "✓ Test distribution on real data"
        ]
      },

      {
        category: "Collision Resolution Choice",
        points: [
          "**Choose Chaining When:**",
          "• Need simplicity",
          "• Can tolerate pointer overhead",
          "• Load factor may exceed 1.0",
          "• Deletion is frequent",
          "",
          "**Choose Open Addressing When:**",
          "• Memory constrained",
          "• Need cache locality",
          "• Load factor stays low (<0.5)",
          "• Deletion is rare",
          "",
          "**Best Practices:**",
          "• Java HashMap: Chaining (converts to BST for long chains)",
          "• Python dict: Open addressing (custom probing)",
          "• Redis: Chaining with rehashing",
          "• For general use: Chaining (simpler, more flexible)"
        ]
      },

      {
        category: "Load Factor Management",
        points: [
          "**Monitor Load Factor:**",
          "• Calculate: α = n / m (items / table size)",
          "• Chaining: Resize at α = 0.75",
          "• Open Addressing: Resize at α = 0.5",
          "",
          "**Resizing Strategy:**",
          "• Double table size (or next prime)",
          "• Rehash all existing keys",
          "• Trigger before performance degrades",
          "• Amortized O(1) insertion",
          "",
          "**Implementation:**",
          "```javascript",
          "function insert(key, value) {",
          "    if (size / capacity > LOAD_FACTOR_THRESHOLD) {",
          "        resize();",
          "    }",
          "    // ... insert logic",
          "}",
          "",
          "function resize() {",
          "    newCapacity = nextPrime(capacity × 2);",
          "    newTable = new Array(newCapacity);",
          "    rehashAll();",
          "}",
          "```"
        ]
      },

      {
        category: "Common Mistakes",
        points: [
          "❌ **Not Implementing equals() with hashCode():**",
          "• If a.equals(b), then a.hashCode() == b.hashCode()",
          "• Violating this breaks hash table correctness",
          "",
          "❌ **Mutable Keys:**",
          "• Never modify keys after insertion",
          "• Hash value changes → can't find entry",
          "• Use immutable objects as keys",
          "",
          "❌ **Poor Hash Distribution:**",
          "• All keys hash to few buckets",
          "• Performance degrades to O(n)",
          "• Test hash function on real data",
          "",
          "❌ **Forgetting Null Checks:**",
          "• Check if key exists before get",
          "• Handle null keys/values appropriately",
          "",
          "❌ **Ignoring Load Factor:**",
          "• Table becomes full",
          "• Open addressing fails",
          "• Performance degrades significantly"
        ]
      },

      {
        category: "Performance Optimization",
        points: [
          "**Cache Hash Values:**",
          "• Store hash value in key object",
          "• Avoids recomputation",
          "• Especially useful for complex keys",
          "",
          "**Use Appropriate Initial Capacity:**",
          "• If size is known, pre-allocate",
          "• Avoids multiple resizes",
          "• Example: new HashMap(1000) for 1000 items",
          "",
          "**Consider Alternatives:**",
          "• For integer keys 0..n: Use array!",
          "• For range queries: Use BST",
          "• For top-k: Use heap",
          "",
          "**Benchmark:**",
          "• Test with real workload",
          "• Compare chaining vs open addressing",
          "• Profile to find bottlenecks"
        ]
      }
    ]
  },

  comparison: {
    title: "Hash Table vs Other Data Structures",

    table: `**Comprehensive Comparison:**

Feature              Hash Table  BST       Array     Linked List
─────────────────────────────────────────────────────────────────
Search by key        O(1) ✓      O(log n)  O(n)      O(n)
Insert               O(1) ✓      O(log n)  O(n)      O(1)
Delete               O(1) ✓      O(log n)  O(n)      O(n)
Access by index      N/A         N/A       O(1) ✓    O(n)
Ordered operations   No ❌       Yes ✓     Yes ✓     No ❌
Range query          No ❌       Yes ✓     Yes ✓     No ❌
Min/Max              O(n) ❌     O(log n)✓ O(n)      O(n)
Memory overhead      High        High      Low ✓     Medium
Cache friendly       No ❌       No ❌     Yes ✓     No ❌

**Decision Guide:**

Need fast lookup by key? → Hash Table
Need sorted order? → BST
Need range queries? → BST or B-tree
Need random access by index? → Array
Need fast insert/delete at ends? → Linked List or Deque
Need both fast lookup AND order? → BST (balanced)`,

    scenarios: `**When to Use Each:**

**Hash Table:**
✓ Fast key-value lookup
✓ Counting frequencies
✓ Caching
✓ Sets (unique elements)
✓ Two-sum type problems
Examples: Word count, user sessions, cache

**BST:**
✓ Need sorted order
✓ Range queries
✓ Predecessor/successor
✓ Order statistics (kth element)
Examples: Database indexes, ordered maps

**Array:**
✓ Fixed size, known upfront
✓ Random access by index
✓ Cache-friendly traversal
✓ Simple iteration
Examples: Lookup tables, buffers

**Linked List:**
✓ Unknown size, frequent changes
✓ Insert/delete at ends
✓ No random access needed
✓ Implementing queue/stack
Examples: Undo history, playlists`,

    performanceAnalysis: `**Performance Comparison (1 million elements):**

Operation            Hash Table    BST        Array
─────────────────────────────────────────────────────
Random lookup        ~1 μs ✓      ~20 μs     ~500 ms
Sorted iteration     N/A          ~10 ms ✓   ~10 ms ✓
Range query [x,y]    O(n)         ~20 μs ✓   ~500 ms
Insert in middle     ~1 μs ✓      ~20 μs     ~500 ms
Delete in middle     ~1 μs ✓      ~20 μs     ~500 ms

Memory:
Hash Table: ~40 MB (key+value+overhead)
BST: ~40 MB (key+value+pointers)
Array: ~8 MB (just key+value)

**Conclusion:**
• Hash table wins for pure key-value lookups
• BST wins for ordered operations
• Array wins for memory efficiency
• Choose based on primary operation!`
  }
};
