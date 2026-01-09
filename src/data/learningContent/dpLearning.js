// ============= src/data/learningContent/dpLearning.js =============
// Comprehensive learning content for Dynamic Programming

export const dpLearningContent = {
  introduction: {
    title: "What is Dynamic Programming?",
    content: `Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems and storing the results to avoid redundant calculations. It's an optimization technique that trades space for time.

**Key Properties:**
• Breaks problem into overlapping subproblems
• Stores solutions to subproblems (memoization/tabulation)
• Reuses stored solutions instead of recomputing
• Guarantees optimal solution for optimization problems
• Reduces exponential time to polynomial time

**What Makes DP Special?**
Unlike divide-and-conquer (which solves independent subproblems), DP solves overlapping subproblems that share results. By caching these results, DP can transform exponential-time algorithms into polynomial-time ones - often the difference between impossible and instant!

**Why Use Dynamic Programming?**
• Dramatically improves time complexity (2^n → n²)
• Solves optimization problems (shortest path, maximum profit)
• Guarantees optimal solutions
• Essential for many real-world problems (route planning, resource allocation)`,

    visualExample: {
      description: "Fibonacci: DP vs Naive Recursion",
      diagram: `
**Naive Recursion: fib(5) - Exponential O(2^n)**

                    fib(5)
                   /      \\
              fib(4)        fib(3)
              /    \\        /    \\
         fib(3)  fib(2)  fib(2)  fib(1)
         /   \\    /  \\    /  \\
    fib(2) fib(1)...  ...  ...  ...

Problem: fib(3) computed 2 times
         fib(2) computed 3 times
         Overlapping subproblems!

**Dynamic Programming: Memoized - Polynomial O(n)**

memo = {}

fib(5): Check memo → Not found → Compute
  fib(4): Check memo → Not found → Compute
    fib(3): Check memo → Not found → Compute
      fib(2): Compute → Store in memo[2] = 1
      fib(1): Return 1
    Store in memo[3] = 2
  fib(2): Check memo → Found! Return memo[2] = 1 ✓
  Store in memo[4] = 3
fib(3): Check memo → Found! Return memo[3] = 2 ✓
Store in memo[5] = 5

Each fib(n) computed only once!
Time: O(n) instead of O(2^n)

For fib(50):
• Naive: 2^50 ≈ 1 quadrillion operations
• DP: 50 operations
• 20 trillion times faster!
      `
    },

    conceptualModel: {
      title: "How Dynamic Programming Works",
      content: `**Conceptual Model:**

1. **Identify Overlapping Subproblems:**
   Same subproblem solved multiple times
   Example: fib(2) computed many times in fib(5)

2. **Define Recurrence Relation:**
   Express solution in terms of smaller problems
   Example: fib(n) = fib(n-1) + fib(n-2)

3. **Store Solutions (Memoization or Tabulation):**
   • Memoization: Top-down with caching
   • Tabulation: Bottom-up with table

4. **Reuse Stored Solutions:**
   Check cache before computing
   Avoid redundant work

**Two Approaches:**

**Top-Down (Memoization):**
• Start with original problem
• Recursively break down
• Cache results
• Natural, follows problem structure

**Bottom-Up (Tabulation):**
• Start with base cases
• Build up to solution
• Fill table iteratively
• Often more efficient (no recursion overhead)

**Analogy:**
Imagine solving a jigsaw puzzle:
• Naive: Try every piece for every position (exponential)
• DP: Remember which pieces fit where (polynomial)`
    }
  },

  fundamentals: {
    title: "Dynamic Programming Fundamentals",
    sections: [
      {
        subtitle: "1. Overlapping Subproblems",
        content: `**Definition:**
A problem has overlapping subproblems if the same subproblems are solved multiple times during the computation.

**Key Insight:**
This is what makes DP applicable! If subproblems don't overlap, use divide-and-conquer instead.

**How to Identify:**
• Draw recursion tree
• Look for repeated nodes
• Check if same parameters occur multiple times

**Examples:**

**Has Overlapping Subproblems (Use DP):**
• Fibonacci: fib(n) = fib(n-1) + fib(n-2)
• Shortest path: path(A, C) uses path(A, B) multiple times
• String matching: compare same substrings repeatedly

**No Overlapping Subproblems (Use D&C):**
• Merge sort: each subarray sorted once
• Binary search: each half searched once
• Quick sort: each partition processed once`,

        example: `Fibonacci recursion tree (overlapping subproblems):

fib(5):
                    f(5)
                   /    \\
                f(4)      f(3) ← Computed again!
               /    \\    /    \\
            f(3)   f(2) f(2) f(1)
            /  \\   /  \\
         f(2) f(1) ...

Count computations:
• f(5): 1 time
• f(4): 1 time
• f(3): 2 times ← Overlap!
• f(2): 3 times ← Overlap!
• f(1): 5 times ← Overlap!

Total: 15 function calls for fib(5)

With DP (memoization):
• f(5): 1 time
• f(4): 1 time
• f(3): 1 time
• f(2): 1 time
• f(1): 1 time

Total: 5 function calls for fib(5)

Merge sort tree (NO overlapping):
                 [8,3,1,4,2,5]
                 /            \\
        [8,3,1]                [4,2,5]
        /      \\               /      \\
    [8,3]      [1]         [4,2]      [5]
    /   \\                  /   \\
  [8]   [3]              [4]   [2]

Each element processed once at each level
No subproblem computed twice!`,

        identification: `How to check for overlapping subproblems:

1. Write recursive solution
2. Add print statement with parameters
3. Run on small input
4. Count how many times each parameter set appears

Example:
function fib(n):
    print("Computing fib(" + n + ")")
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

fib(5) output:
Computing fib(5)
Computing fib(4)
Computing fib(3)
Computing fib(2)
Computing fib(1)
Computing fib(0)
Computing fib(1)  ← Repeated!
Computing fib(2)  ← Repeated!
Computing fib(1)  ← Repeated!
Computing fib(0)  ← Repeated!
Computing fib(3)  ← Repeated!
...

Many repeated calls → Overlapping subproblems!
→ DP is applicable!`
      },

      {
        subtitle: "2. Optimal Substructure",
        content: `**Definition:**
A problem has optimal substructure if an optimal solution to the problem contains optimal solutions to its subproblems.

**Key Insight:**
This property ensures that solving subproblems optimally leads to optimal overall solution.

**Formal Statement:**
If optimal solution to problem P contains solution to subproblem S, then the solution to S must also be optimal for S.

**How to Verify:**
• Assume optimal solution exists
• Show it must use optimal solutions to subproblems
• Proof by contradiction: if subproblem solution not optimal, replace it with optimal one → better overall solution → contradiction!

**Examples:**

**Has Optimal Substructure (Use DP):**
• Shortest path: Shortest A→C uses shortest A→B and B→C
• Longest common subsequence
• Matrix chain multiplication
• Minimum edit distance

**No Optimal Substructure:**
• Longest simple path (path with no repeated vertices)
  Longest A→C may not use longest A→B and B→C!
  (Might revisit vertices)`,

        example: `Shortest Path - Has Optimal Substructure:

Graph:
A --5-- B --3-- D
 \\       \\      /
  10      4    2
   \\       \\  /
    -------- C

Optimal path A→D: A→B→D (cost 5+3=8)

Claim: This uses optimal A→B and B→D
• A→B: Direct path (cost 5) is optimal ✓
  (Alternative A→C→B costs 10+4=14)
• B→D: Direct path (cost 3) is optimal ✓
  (Alternative B→C→D costs 4+2=6)

Proof: If A→B or B→D not optimal:
Suppose better path A→B exists (cost < 5)
Then A→B'→D would be better than A→B→D
Contradiction! So A→B must be optimal.

Optimal substructure verified! DP applicable.

Longest Simple Path - NO Optimal Substructure:

Graph:
A --> B --> C
 \\         /
  \\----> D

Longest simple path A→C: A→D→C (length 2)
But: Longest A→D is A→B→C→D (length 3)
      Longest D→C is D→C (length 1)
Using "optimal" A→D (A→B→C→D) and D→C creates cycle!
A→B→C→D→C revisits C ❌

Longest simple path does NOT have optimal substructure!
Can't use DP for this problem.`,

        verification: `Verifying optimal substructure:

Template:
1. Define optimal solution OPT(problem)
2. Express OPT in terms of subproblems
3. Show: If OPT(problem) uses solution to subproblem,
         that solution must be optimal for subproblem
4. Proof by contradiction:
   Assume subproblem solution not optimal
   → Can improve overall solution
   → Contradicts optimality of OPT

Example: Minimum Cost Path

Problem: Find minimum cost path from (0,0) to (m,n)
         Can move right or down only

Claim: Has optimal substructure

Proof:
Let OPT(i,j) = min cost to reach (i,j)

OPT(i,j) = cost[i][j] + min(OPT(i-1,j), OPT(i,j-1))
                          └── Must be optimal!

Why? Suppose OPT(i-1,j) not optimal for (i-1,j)
Then exists better path to (i-1,j)
Using better path + move to (i,j) gives better OPT(i,j)
Contradiction! So OPT(i-1,j) must be optimal.

Optimal substructure proven! ✓`
      },

      {
        subtitle: "3. Memoization vs Tabulation",
        content: `**Memoization (Top-Down DP):**
• Start with original problem
• Solve recursively
• Cache results in memo table
• Check cache before computing

**Process:**
1. Solve problem recursively
2. Before computing, check if result cached
3. If cached, return it
4. If not, compute, cache, and return

**Advantages:**
• Natural, follows problem structure
• Only computes needed subproblems
• Easy to convert from recursion

**Disadvantages:**
• Recursion overhead (stack space)
• Slightly slower than tabulation
• May hit stack limit for deep recursion

**Tabulation (Bottom-Up DP):**
• Start with base cases
• Build up solution iteratively
• Fill table in order
• Final answer in table[n]

**Process:**
1. Initialize table with base cases
2. Use recurrence relation to fill table
3. Compute in order (no dependency issues)
4. Return final table entry

**Advantages:**
• No recursion overhead
• Usually faster than memoization
• Easier to optimize space
• Guaranteed no stack overflow

**Disadvantages:**
• May compute unnecessary subproblems
• Less intuitive for some problems
• Order of computation matters`,

        comparison: `Fibonacci comparison:

**Memoization (Top-Down):**
\`\`\`
memo = {}

function fib(n):
    if n <= 1:
        return n

    if n in memo:
        return memo[n]  // Return cached!

    result = fib(n-1) + fib(n-2)
    memo[n] = result  // Cache result
    return result
\`\`\`

Execution for fib(5):
fib(5) → fib(4) → fib(3) → fib(2) → fib(1), fib(0)
                          Cache: {2:1, 3:2, 4:3, 5:5}

**Tabulation (Bottom-Up):**
\`\`\`
function fib(n):
    if n <= 1:
        return n

    table = new Array(n+1)
    table[0] = 0  // Base case
    table[1] = 1  // Base case

    for i from 2 to n:
        table[i] = table[i-1] + table[i-2]

    return table[n]
\`\`\`

Execution for fib(5):
table[0] = 0
table[1] = 1
table[2] = 0 + 1 = 1
table[3] = 1 + 1 = 2
table[4] = 1 + 2 = 3
table[5] = 2 + 3 = 5

Both: O(n) time, O(n) space

**When to Use Each:**

Memoization:
✓ Not all subproblems needed
✓ Hard to determine order
✓ Converting from recursion
Example: Word break problem

Tabulation:
✓ All subproblems needed
✓ Clear order of computation
✓ Want maximum performance
Example: Fibonacci, knapsack`,

        spaceOptimization: `Space optimization (often only with tabulation):

Fibonacci space optimization:
Instead of storing all n values, only keep last 2!

function fibOptimized(n):
    if n <= 1:
        return n

    prev2 = 0  // fib(i-2)
    prev1 = 1  // fib(i-1)

    for i from 2 to n:
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

Space: O(n) → O(1) !
Still O(n) time.

General pattern:
If recurrence only depends on last k values,
can reduce space from O(n) to O(k).

Examples:
• Fibonacci: Depends on last 2 → O(1) space
• Tribonacci: Depends on last 3 → O(1) space
• Min cost path: Depends on last row → O(m) space

Not always possible:
• Longest common subsequence: Need entire table for reconstruction
• Knapsack with path: Need full table to trace back solution`
      }
    ]
  },

  approaches: {
    title: "DP Approaches and Patterns",

    sections: [
      {
        approach: "Top-Down Approach (Memoization)",
        description: `**Steps to Implement Memoization:**

1. **Write Recursive Solution:**
   Start with natural recursive formulation

2. **Identify Parameters:**
   What defines a subproblem?
   These become cache keys

3. **Add Memo Dictionary:**
   Store results keyed by parameters

4. **Check Cache:**
   Before computing, check if result exists

5. **Cache and Return:**
   Compute, store, and return result`,

        template: `General memoization template:

// Global or passed memo dictionary
memo = new HashMap()

function solve(parameters):
    // Base case(s)
    if base_condition:
        return base_value

    // Check memo
    key = makeKey(parameters)
    if key in memo:
        return memo[key]

    // Recursive case
    result = combineResults(
        solve(subproblem1),
        solve(subproblem2),
        ...
    )

    // Cache and return
    memo[key] = result
    return result

// Usage
result = solve(original_problem)`,

        example: `Example: Longest Common Subsequence (LCS)

Problem: Find length of longest subsequence common to both strings
s1 = "ABCDGH", s2 = "AEDFHR"
LCS = "ADH" (length 3)

Recursive solution:
function lcs(s1, s2, i, j):
    // Base cases
    if i == 0 or j == 0:
        return 0

    // If characters match
    if s1[i-1] == s2[j-1]:
        return 1 + lcs(s1, s2, i-1, j-1)

    // If characters don't match
    return max(
        lcs(s1, s2, i-1, j),  // Skip s1[i]
        lcs(s1, s2, i, j-1)   // Skip s2[j]
    )

With memoization:
memo = {}

function lcsMemo(s1, s2, i, j):
    // Base cases
    if i == 0 or j == 0:
        return 0

    // Check memo
    key = (i, j)
    if key in memo:
        return memo[key]

    // Recursive cases
    if s1[i-1] == s2[j-1]:
        result = 1 + lcsMemo(s1, s2, i-1, j-1)
    else:
        result = max(
            lcsMemo(s1, s2, i-1, j),
            lcsMemo(s1, s2, i, j-1)
        )

    // Cache and return
    memo[key] = result
    return result

Time: O(m × n) instead of O(2^(m+n))
Space: O(m × n) for memo + O(m+n) for recursion`
      },

      {
        approach: "Bottom-Up Approach (Tabulation)",
        description: `**Steps to Implement Tabulation:**

1. **Create DP Table:**
   Array or matrix to store subproblem solutions

2. **Initialize Base Cases:**
   Fill known values (usually first row/column)

3. **Determine Fill Order:**
   Ensure dependencies computed before use

4. **Apply Recurrence Relation:**
   Fill table using previously computed values

5. **Extract Final Answer:**
   Usually at dp[n] or dp[m][n]`,

        template: `General tabulation template:

function solve(input):
    n = input.size

    // Create DP table
    dp = new Array(n + 1)

    // Initialize base cases
    dp[0] = base_value
    dp[1] = base_value

    // Fill table bottom-up
    for i from 2 to n:
        dp[i] = recurrence_relation(dp, i)

    // Return final answer
    return dp[n]

// For 2D problems:
function solve2D(input1, input2):
    m = input1.size
    n = input2.size

    // Create 2D table
    dp = new Array(m+1, n+1)

    // Initialize base cases
    for i from 0 to m:
        dp[i][0] = base_value
    for j from 0 to n:
        dp[0][j] = base_value

    // Fill table
    for i from 1 to m:
        for j from 1 to n:
            dp[i][j] = recurrence_relation(dp, i, j)

    return dp[m][n]`,

        example: `Example: Longest Common Subsequence (LCS) - Tabulation

function lcsTabulation(s1, s2):
    m = s1.length
    n = s2.length

    // Create table
    dp = new Array(m+1, n+1)

    // Initialize base cases (0th row and column = 0)
    for i from 0 to m:
        dp[i][0] = 0
    for j from 0 to n:
        dp[0][j] = 0

    // Fill table
    for i from 1 to m:
        for j from 1 to n:
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

Example: s1 = "ABCDGH", s2 = "AEDFHR"

DP table (after filling):
    ""  A  E  D  F  H  R
""   0  0  0  0  0  0  0
A    0  1  1  1  1  1  1
B    0  1  1  1  1  1  1
C    0  1  1  1  1  1  1
D    0  1  1  2  2  2  2
G    0  1  1  2  2  2  2
H    0  1  1  2  2  3  3

Result: dp[6][6] = 3

Time: O(m × n)
Space: O(m × n)

Can optimize to O(min(m,n)) space by keeping only previous row!`
      }
    ]
  },

  recognizingDPProblems: {
    title: "Recognizing DP Problems",

    indicators: [
      {
        indicator: "Counting Problems",
        description: `**Pattern:** "How many ways to..."

**Keywords:**
• Count number of ways
• Count paths
• Count subsequences
• Count partitions

**Why DP?**
• Total ways = sum of ways for subproblems
• Same subproblems appear multiple times

**Examples:**
• Climbing stairs: How many ways to reach step n?
• Unique paths: How many paths in grid?
• Coin change: How many ways to make amount?
• Decode ways: How many ways to decode string?`,

        example: `Climbing Stairs:
You can climb 1 or 2 steps at a time.
How many ways to reach step n?

Recursion:
ways(n) = ways(n-1) + ways(n-2)
          └─ 1 step   └─ 2 steps

Recognition:
• "How many ways" → Counting problem
• "Can take 1 or 2" → Choices
• "Reach step n" → Overlapping subproblems

DP Solution:
dp[i] = number of ways to reach step i
dp[i] = dp[i-1] + dp[i-2]

This is essentially Fibonacci!`
      },

      {
        indicator: "Optimization Problems",
        description: `**Pattern:** "Maximize" or "Minimize"

**Keywords:**
• Maximum profit
• Minimum cost
• Longest path/subsequence
• Shortest path
• Largest sum

**Why DP?**
• Optimal solution uses optimal subproblem solutions
• Need to try all possibilities but avoid recomputation

**Examples:**
• Knapsack: Maximize value with weight limit
• Rod cutting: Maximize profit from cuts
• Edit distance: Minimize changes to transform
• House robber: Maximize money stolen`,

        example: `House Robber:
Rob houses for max money, can't rob adjacent houses.
houses = [2, 7, 9, 3, 1]

Recursion:
maxMoney(i) = max(
    houses[i] + maxMoney(i-2),  // Rob house i
    maxMoney(i-1)                // Skip house i
)

Recognition:
• "Maximize" → Optimization problem
• "Can't rob adjacent" → Constraint on choices
• "From houses 0 to i" → Overlapping subproblems

DP Solution:
dp[i] = max money robbing houses 0..i
dp[i] = max(houses[i] + dp[i-2], dp[i-1])

dp = [2, 7, 11, 11, 12]
Max money: 12`
      },

      {
        indicator: "Decision Making",
        description: `**Pattern:** "Can we achieve..." or "Is it possible..."

**Keywords:**
• Can partition
• Can reach target
• Can transform
• Is valid

**Why DP?**
• Answer depends on subproblem answers
• Need to explore all possibilities efficiently

**Examples:**
• Partition equal subset: Can partition into equal sums?
• Word break: Can segment into dictionary words?
• Jump game: Can reach last index?
• Target sum: Can achieve target with +/-?`,

        example: `Word Break:
Given string and dictionary, can segment into words?
s = "leetcode", dict = ["leet", "code"]

Recursion:
canBreak(s, start) =
    for each word in dict:
        if s[start:] starts with word:
            if canBreak(s, start + word.length):
                return true
    return false

Recognition:
• "Can we" → Decision problem
• "Segment into words" → Multiple choices
• "From start position" → Overlapping subproblems

DP Solution:
dp[i] = can break s[0:i]
dp[i] = true if exists j where
        dp[j] == true and s[j:i] in dict

dp = [T, F, F, F, T, F, F, F, T]
        ^           ^           ^
       ""        "leet"    "leetcode"
Can break: Yes!`
      },

      {
        indicator: "Sequence Problems",
        description: `**Pattern:** Problems on arrays/strings with dependencies

**Keywords:**
• Subsequence
• Subarray
• Substring
• Sequence matching

**Why DP?**
• Current choice depends on previous choices
• Need to track state across sequence
• Overlapping subproblems in comparisons

**Examples:**
• Longest increasing subsequence
• Longest common subsequence
• Palindrome problems
• Maximum subarray sum`,

        example: `Longest Increasing Subsequence:
Find length of longest increasing subsequence.
arr = [10, 9, 2, 5, 3, 7, 101, 18]

Recursion:
lis(i) = length of LIS ending at index i
lis(i) = 1 + max(lis(j)) for all j < i where arr[j] < arr[i]

Recognition:
• "Longest subsequence" → Sequence problem
• "Increasing" → Constraint on choices
• "Ending at i" → Overlapping subproblems

DP Solution:
dp[i] = length of LIS ending at arr[i]
dp[i] = 1 + max(dp[j] for j < i where arr[j] < arr[i])

dp = [1, 1, 1, 2, 2, 3, 4, 4]

LIS length: 4  [2, 3, 7, 101] or [2, 5, 7, 101]`
      }
    ],

    checklist: `**DP Problem Recognition Checklist:**

Ask these questions:

1. **Can problem be broken into subproblems?**
   ✓ Yes → Continue
   ✗ No → Not DP

2. **Do subproblems overlap?**
   ✓ Yes → DP applicable
   ✗ No → Use divide-and-conquer

3. **Does problem have optimal substructure?**
   ✓ Yes → DP will give optimal solution
   ✗ No → DP not applicable

4. **Are there keywords?**
   ✓ "How many ways", "Maximum", "Minimum", "Can we"
   ✓ "Longest", "Shortest", "Largest", "Smallest"
   ✓ "Subsequence", "Substring", "Subarray"

5. **Can you define state?**
   ✓ Clear state definition → Easy DP
   ✗ Unclear state → May need greedy or other approach

6. **Can you write recurrence?**
   ✓ Yes → DP solution exists
   ✗ No → Reconsider approach

If answers are mostly ✓ → Use Dynamic Programming!

**Common Non-DP Problems:**
• Problems with no overlapping subproblems
• Problems without optimal substructure
• Problems requiring all paths (use backtracking)
• Problems with independent subproblems (use D&C)`
  },

  classicProblems: {
    title: "Classic DP Problems",

    problems: [
      {
        problem: "0/1 Knapsack",
        difficulty: "Medium",
        description: `Given items with weights and values, and a knapsack with capacity W, maximize total value without exceeding capacity. Each item can be taken at most once.

**Input:** weights = [1, 2, 3], values = [60, 100, 120], W = 5
**Output:** 220 (take items 2 and 3)`,

        approach: `**Subproblem Definition:**
dp[i][w] = maximum value using items 0..i with capacity w

**Recurrence Relation:**
dp[i][w] = max(
    dp[i-1][w],                           // Don't take item i
    values[i] + dp[i-1][w - weights[i]]   // Take item i
)

**Base Cases:**
• dp[0][w] = 0 for all w (no items)
• dp[i][0] = 0 for all i (no capacity)

**Constraints:**
• Can only take item i if weights[i] <= w`,

        solution: `function knapsack(weights, values, W):
    n = weights.length

    // Create DP table
    dp = new Array(n+1, W+1)

    // Initialize base cases
    for i from 0 to n:
        dp[i][0] = 0
    for w from 0 to W:
        dp[0][w] = 0

    // Fill table
    for i from 1 to n:
        for w from 1 to W:
            // Option 1: Don't take item i-1
            dp[i][w] = dp[i-1][w]

            // Option 2: Take item i-1 (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                )

    return dp[n][W]

// Time: O(n × W)
// Space: O(n × W)`,

        example: `weights = [1, 2, 3], values = [60, 100, 120], W = 5

DP table:
     w: 0   1   2   3   4   5
i=0:    0   0   0   0   0   0
i=1:    0  60  60  60  60  60   (item 0: w=1, v=60)
i=2:    0  60 100 160 160 160   (item 1: w=2, v=100)
i=3:    0  60 100 160 180 220   (item 2: w=3, v=120)

Explanation for dp[3][5]:
Option 1: Don't take item 2 → dp[2][5] = 160
Option 2: Take item 2 → 120 + dp[2][5-3] = 120 + 100 = 220 ✓
Result: max(160, 220) = 220

Items taken: 1 and 2 (weights: 2+3=5, values: 100+120=220)

Space optimization: Only need previous row!
dp[w] = new Array(W+1)
for each item:
    for w from W down to weights[item]:
        dp[w] = max(dp[w], values[item] + dp[w-weights[item]])`
      },

      {
        problem: "Longest Common Subsequence (LCS)",
        difficulty: "Medium",
        description: `Find length of longest subsequence common to two strings. Subsequence means characters appear in same order but not necessarily consecutive.

**Input:** s1 = "ABCDGH", s2 = "AEDFHR"
**Output:** 3 (subsequence "ADH")`,

        approach: `**Subproblem Definition:**
dp[i][j] = length of LCS of s1[0..i-1] and s2[0..j-1]

**Recurrence Relation:**
If s1[i-1] == s2[j-1]:
    dp[i][j] = 1 + dp[i-1][j-1]
Else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])

**Base Cases:**
• dp[0][j] = 0 for all j (empty s1)
• dp[i][0] = 0 for all i (empty s2)`,

        solution: `function lcs(s1, s2):
    m = s1.length
    n = s2.length

    // Create DP table
    dp = new Array(m+1, n+1)

    // Initialize base cases (implicit: 0)
    for i from 0 to m:
        dp[i][0] = 0
    for j from 0 to n:
        dp[0][j] = 0

    // Fill table
    for i from 1 to m:
        for j from 1 to n:
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

// Time: O(m × n)
// Space: O(m × n)

// To reconstruct LCS:
function reconstructLCS(s1, s2, dp):
    i = s1.length
    j = s2.length
    lcs = ""

    while i > 0 and j > 0:
        if s1[i-1] == s2[j-1]:
            lcs = s1[i-1] + lcs
            i--
            j--
        else if dp[i-1][j] > dp[i][j-1]:
            i--
        else:
            j--

    return lcs`,

        example: `s1 = "ABCDGH", s2 = "AEDFHR"

DP table:
      ""  A  E  D  F  H  R
  ""   0  0  0  0  0  0  0
  A    0  1  1  1  1  1  1   ← A matches A
  B    0  1  1  1  1  1  1
  C    0  1  1  1  1  1  1
  D    0  1  1  2  2  2  2   ← D matches D
  G    0  1  1  2  2  2  2
  H    0  1  1  2  2  3  3   ← H matches H

LCS length: 3

Reconstructing LCS:
Start at dp[6][6] = 3
(6,6): G ≠ R, dp[5][6] = 3 > dp[6][5] = 3, move to (5,6)
(5,6): G ≠ R, dp[4][6] = 3 > dp[5][5] = 2, move to (4,6)
(4,6): D ≠ R, dp[3][6] = 2 > dp[4][5] = 2, move to (3,6)
(3,6): C ≠ R, dp[2][6] = 2 > dp[3][5] = 2, move to (2,6)
(2,6): B ≠ R, dp[1][6] = 2 > dp[2][5] = 2, move to (1,6)
(1,6): A ≠ R, dp[0][6] = 0 < dp[1][5] = 1, move to (1,5)
(1,5): A ≠ H, move to (1,4)
...
Backtrack to find: A, D, H

LCS: "ADH"`
      },

      {
        problem: "Edit Distance (Levenshtein Distance)",
        difficulty: "Hard",
        description: `Minimum number of operations (insert, delete, replace) to transform one string into another.

**Input:** s1 = "horse", s2 = "ros"
**Output:** 3 (horse → rorse → rose → ros)`,

        approach: `**Subproblem Definition:**
dp[i][j] = min operations to transform s1[0..i-1] to s2[0..j-1]

**Recurrence Relation:**
If s1[i-1] == s2[j-1]:
    dp[i][j] = dp[i-1][j-1]  // No operation needed
Else:
    dp[i][j] = 1 + min(
        dp[i-1][j],      // Delete from s1
        dp[i][j-1],      // Insert into s1
        dp[i-1][j-1]     // Replace in s1
    )

**Base Cases:**
• dp[0][j] = j (insert j characters)
• dp[i][0] = i (delete i characters)`,

        solution: `function editDistance(s1, s2):
    m = s1.length
    n = s2.length

    // Create DP table
    dp = new Array(m+1, n+1)

    // Initialize base cases
    for i from 0 to m:
        dp[i][0] = i  // Delete all
    for j from 0 to n:
        dp[0][j] = j  // Insert all

    // Fill table
    for i from 1 to m:
        for j from 1 to n:
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      // Delete
                    dp[i][j-1],      // Insert
                    dp[i-1][j-1]     // Replace
                )

    return dp[m][n]

// Time: O(m × n)
// Space: O(m × n)`,

        example: `s1 = "horse", s2 = "ros"

DP table:
      ""  r  o  s
  ""   0  1  2  3
  h    1  1  2  3
  o    2  2  1  2
  r    3  2  2  2
  s    4  3  3  2
  e    5  4  4  3

Explanation:
dp[5][3] = 3 (transform "horse" to "ros")

Tracking operations:
(5,3): e ≠ s, min(dp[4][3]+1=3, dp[5][2]+1=5, dp[4][2]+1=5) = 3
       Delete 'e'
(4,2): s ≠ o, min(dp[3][2]+1=3, dp[4][1]+1=4, dp[3][1]+1=3) = 3
       Delete 's' or Replace 's' with 'o'
(3,2): r ≠ o, min(dp[2][2]+1=2, dp[3][1]+1=3, dp[2][1]+1=3) = 2
       Delete 'r'
(2,2): o = o, dp[1][1] = 1
(1,1): h ≠ r, min(dp[0][1]+1=2, dp[1][0]+1=2, dp[0][0]+1=1) = 1
       Replace 'h' with 'r'

Operations:
1. Replace 'h' with 'r': "horse" → "rorse"
2. Delete 'r': "rorse" → "rose"
3. Delete 'e': "rose" → "ros"

Total: 3 operations`
      },

      {
        problem: "Coin Change",
        difficulty: "Medium",
        description: `Given coin denominations and amount, find minimum number of coins needed. Return -1 if impossible.

**Input:** coins = [1, 2, 5], amount = 11
**Output:** 3 (11 = 5 + 5 + 1)`,

        approach: `**Subproblem Definition:**
dp[i] = minimum coins needed to make amount i

**Recurrence Relation:**
dp[i] = min(dp[i - coin] + 1) for all coins where coin <= i

**Base Cases:**
• dp[0] = 0 (0 coins for amount 0)
• dp[i] = ∞ for i > 0 initially`,

        solution: `function coinChange(coins, amount):
    // Create DP array
    dp = new Array(amount + 1)

    // Initialize
    dp[0] = 0
    for i from 1 to amount:
        dp[i] = ∞  // Impossible initially

    // Fill table
    for i from 1 to amount:
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] == ∞ ? -1 : dp[amount]

// Time: O(amount × coins.length)
// Space: O(amount)

// To reconstruct coins used:
function reconstructCoins(coins, amount, dp):
    result = []
    current = amount

    while current > 0:
        for coin in coins:
            if current >= coin and dp[current - coin] == dp[current] - 1:
                result.append(coin)
                current -= coin
                break

    return result`,

        example: `coins = [1, 2, 5], amount = 11

DP array construction:
dp[0] = 0

dp[1]: Try coins [1,2,5]
  coin=1: dp[1] = min(∞, dp[1-1]+1) = min(∞, 0+1) = 1 ✓

dp[2]: Try coins [1,2,5]
  coin=1: dp[2] = min(∞, dp[2-1]+1) = min(∞, 1+1) = 2
  coin=2: dp[2] = min(2, dp[2-2]+1) = min(2, 0+1) = 1 ✓

dp[3]: Try coins [1,2,5]
  coin=1: dp[3] = min(∞, dp[2]+1) = 2
  coin=2: dp[3] = min(2, dp[1]+1) = min(2, 2) = 2
  Result: 2

...continuing...

dp = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3]
      0  1  2  3  4  5  6  7  8  9 10 11

dp[11] = 3

Reconstruction:
current = 11
  Try coin=5: dp[11-5]=dp[6]=2, dp[11]-1=2 ✓ Use 5
current = 6
  Try coin=5: dp[6-5]=dp[1]=1, dp[6]-1=1 ✓ Use 5
current = 1
  Try coin=1: dp[1-1]=dp[0]=0, dp[1]-1=0 ✓ Use 1

Coins used: [5, 5, 1]`
      },

      {
        problem: "Longest Increasing Subsequence (LIS)",
        difficulty: "Medium",
        description: `Find length of longest strictly increasing subsequence in array.

**Input:** nums = [10, 9, 2, 5, 3, 7, 101, 18]
**Output:** 4 (subsequence [2, 3, 7, 101])`,

        approach: `**Subproblem Definition:**
dp[i] = length of LIS ending at index i

**Recurrence Relation:**
dp[i] = 1 + max(dp[j]) for all j < i where nums[j] < nums[i]
If no such j exists, dp[i] = 1

**Base Cases:**
• dp[i] = 1 for all i (each element is LIS of length 1)`,

        solution: `function lengthOfLIS(nums):
    n = nums.length
    if n == 0:
        return 0

    // Create DP array
    dp = new Array(n)

    // Initialize base cases
    for i from 0 to n-1:
        dp[i] = 1  // Each element is LIS of length 1

    // Fill table
    for i from 1 to n-1:
        for j from 0 to i-1:
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    // Return maximum value in dp
    return max(dp)

// Time: O(n²)
// Space: O(n)

// Optimized O(n log n) solution using binary search:
function lengthOfLISOptimized(nums):
    tails = []  // tails[i] = smallest tail of LIS of length i+1

    for num in nums:
        pos = binarySearch(tails, num)
        if pos == tails.length:
            tails.append(num)
        else:
            tails[pos] = num

    return tails.length

// Time: O(n log n)
// Space: O(n)`,

        example: `nums = [10, 9, 2, 5, 3, 7, 101, 18]

DP array construction:

Initial: dp = [1, 1, 1, 1, 1, 1, 1, 1]

i=1 (num=9):
  j=0: 10 < 9? No
  dp[1] = 1

i=2 (num=2):
  j=0: 10 < 2? No
  j=1: 9 < 2? No
  dp[2] = 1

i=3 (num=5):
  j=0: 10 < 5? No
  j=1: 9 < 5? No
  j=2: 2 < 5? Yes → dp[3] = max(1, dp[2]+1) = 2
  dp[3] = 2

i=4 (num=3):
  j=0,1: No
  j=2: 2 < 3? Yes → dp[4] = max(1, dp[2]+1) = 2
  j=3: 5 < 3? No
  dp[4] = 2

i=5 (num=7):
  j=2: 2 < 7? Yes → dp[5] = max(1, dp[2]+1) = 2
  j=3: 5 < 7? Yes → dp[5] = max(2, dp[3]+1) = 3
  j=4: 3 < 7? Yes → dp[5] = max(3, dp[4]+1) = 3
  dp[5] = 3

i=6 (num=101):
  All previous < 101
  Max previous dp = 3 (from index 5)
  dp[6] = 3 + 1 = 4

i=7 (num=18):
  Previous < 18: indices 2,3,4,5
  Max dp = 3
  dp[7] = 3 + 1 = 4

Final dp = [1, 1, 1, 2, 2, 3, 4, 4]

LIS length: max(dp) = 4

Reconstruction (one possible LIS):
Find index with dp[i] = 4: i = 6 (num=101)
Find index with dp[i] = 3 and num < 101: i = 5 (num=7)
Find index with dp[i] = 2 and num < 7: i = 3 (num=5)
Find index with dp[i] = 1 and num < 5: i = 2 (num=2)

LIS: [2, 5, 7, 101]`
      }
    ]
  },

  complexity: {
    title: "Complexity Analysis of DP",

    timeComplexity: {
      subtitle: "Time Complexity Analysis",

      general: `**General Time Complexity:**

For memoization/tabulation:
Time = (# of subproblems) × (time per subproblem)

**Common Patterns:**

1D DP (single parameter):
• Subproblems: O(n)
• Time per subproblem: Usually O(1) or O(n)
• Total: O(n) or O(n²)

2D DP (two parameters):
• Subproblems: O(m × n)
• Time per subproblem: Usually O(1)
• Total: O(m × n)

3D DP (three parameters):
• Subproblems: O(m × n × k)
• Time per subproblem: Usually O(1)
• Total: O(m × n × k)`,

      examples: `Time complexity examples:

**Fibonacci:**
• Subproblems: n (for fib(0) to fib(n))
• Time per subproblem: O(1)
• Total: O(n)

**Longest Common Subsequence:**
• Subproblems: m × n (dp[i][j] for all i, j)
• Time per subproblem: O(1)
• Total: O(m × n)

**0/1 Knapsack:**
• Subproblems: n × W (items × capacity)
• Time per subproblem: O(1)
• Total: O(n × W)
• Note: Pseudo-polynomial (depends on W value, not size)

**Longest Increasing Subsequence:**
• Subproblems: n (dp[i] for each i)
• Time per subproblem: O(n) (check all j < i)
• Total: O(n²)
• Can optimize to O(n log n) with binary search

**Matrix Chain Multiplication:**
• Subproblems: O(n²) (all (i, j) pairs)
• Time per subproblem: O(n) (try all split points)
• Total: O(n³)`,

      comparison: `Comparison with naive recursion:

Problem                  Naive      DP        Speedup
─────────────────────────────────────────────────────────
Fibonacci               O(2^n)     O(n)      Exponential!
LCS                     O(2^(m+n)) O(m×n)    Exponential!
Knapsack                O(2^n)     O(n×W)    Exponential!
Coin Change             O(S^n)     O(n×S)    Exponential!
Edit Distance           O(3^(m+n)) O(m×n)    Exponential!

S = amount, W = capacity, n = items/length

Example: Fibonacci(50)
• Naive: 2^50 ≈ 1 quadrillion operations
• DP: 50 operations
• DP is ~20 trillion times faster!

This is why DP is so powerful!`
    },

    spaceComplexity: {
      subtitle: "Space Complexity Analysis",

      general: `**Space Complexity:**

Memoization:
Space = (# of unique subproblems) + (recursion stack depth)

Tabulation:
Space = (# of unique subproblems)
(No recursion stack!)

**Common Optimizations:**

1D DP:
• Full table: O(n)
• Optimized: O(1) if only need last k values

2D DP:
• Full table: O(m × n)
• Optimized: O(min(m, n)) using rolling array

3D DP:
• Full table: O(m × n × k)
• Optimized: Sometimes O(m × n) or O(n × k)`,

      examples: `Space complexity examples:

**Fibonacci:**
• Memoization: O(n) memo + O(n) stack = O(n)
• Tabulation: O(n) table
• Optimized: O(1) - only need last 2 values!

\`\`\`
prev2 = 0
prev1 = 1
for i from 2 to n:
    current = prev1 + prev2
    prev2 = prev1
    prev1 = current
\`\`\`

**LCS:**
• Full table: O(m × n)
• Optimized: O(min(m, n)) - keep only previous row!

\`\`\`
prev = new Array(n+1)
curr = new Array(n+1)
for i from 1 to m:
    for j from 1 to n:
        curr[j] = ... // Use prev[j-1]
    prev = curr
    curr = new Array(n+1)
\`\`\`

**Knapsack:**
• 2D table: O(n × W)
• Optimized: O(W) - use 1D array!

\`\`\`
dp = new Array(W+1)
for each item:
    for w from W down to weight[item]:
        dp[w] = max(dp[w], value[item] + dp[w-weight[item]])
\`\`\`

Note: Iterate backwards to avoid using updated values!

**Trade-off:**
Space optimization often makes path reconstruction harder.
If you need to reconstruct solution, may need full table.`
    }
  },

  applications: {
    title: "Real-World Applications of DP",

    useCases: [
      {
        application: "Route Planning and Navigation",
        description: `DP finds shortest paths in navigation systems (GPS, maps).

**Algorithm:** Dynamic Programming + Dijkstra/Bellman-Ford

**Use Cases:**
• Google Maps shortest route
• Flight path optimization
• Delivery route planning
• Network packet routing`,

        example: `Shortest Path with DP (Bellman-Ford):

Graph: Cities with distances
A --5-- B --3-- D
 \\       \\      /
  10      2    1
   \\       \\  /
    -------- C

dist[node] = shortest distance from source to node

Initialize:
dist[A] = 0
dist[B] = ∞
dist[C] = ∞
dist[D] = ∞

DP iteration (relax all edges):
For each edge (u, v, weight):
    dist[v] = min(dist[v], dist[u] + weight)

After iterations:
dist[A] = 0
dist[B] = 5  (A → B)
dist[C] = 7  (A → B → C)
dist[D] = 8  (A → B → D or A → B → C → D)

Real-world: Google Maps processes billions of paths
Uses optimized DP variants for real-time routing!`
      },

      {
        application: "DNA Sequence Alignment",
        description: `DP aligns DNA/protein sequences to find similarities.

**Algorithm:** Edit Distance (Needleman-Wunsch, Smith-Waterman)

**Use Cases:**
• Genome comparison
• Evolutionary analysis
• Disease gene identification
• BLAST (sequence database search)`,

        example: `Sequence Alignment using DP:

Sequence 1: AGCT
Sequence 2: AGT

DP table (edit distance):
      ""  A  G  T
  ""   0  1  2  3
  A    1  0  1  2
  G    2  1  0  1
  C    3  2  1  1
  T    4  3  2  1

Alignment cost: 1 (delete C)

Aligned sequences:
AGCT
AG-T

In genomics:
• Match: +1 score
• Mismatch: -1 score
• Gap: -2 score

Real-world: BLAST searches trillions of DNA sequences
Finds matching genes in seconds using optimized DP!`
      },

      {
        application: "Text Editing and Spell Check",
        description: `DP powers autocorrect and spell checkers.

**Algorithm:** Edit Distance

**Use Cases:**
• Spell check suggestions
• Autocorrect on phones
• Search query correction ("did you mean...")
• Plagiarism detection`,

        example: `Autocorrect using Edit Distance:

User types: "helo"
Dictionary: ["hello", "help", "hero", "hell", "held"]

Compute edit distance to each word:
"helo" → "hello": 1 (insert 'l')
"helo" → "help": 2 (replace 'o' with 'p')
"helo" → "hero": 1 (replace 'l' with 'r')
"helo" → "hell": 1 (replace 'o' with 'l')
"helo" → "held": 2

Suggestions (distance <= 1): "hello", "hero", "hell"

Google Search "did you mean":
Searches dictionary of billions of queries
Uses DP to find closest match in milliseconds!`
      },

      {
        application: "Resource Allocation and Scheduling",
        description: `DP optimizes resource allocation in operations research.

**Algorithm:** Knapsack variants

**Use Cases:**
• Project selection (maximize profit with budget)
• CPU task scheduling
• Memory allocation
• Investment portfolio optimization`,

        example: `Project Selection (0/1 Knapsack):

Projects with profits and costs:
Project A: profit=$100, cost=$50
Project B: profit=$60, cost=$20
Project C: profit=$120, cost=$70
Budget: $100

DP solution:
dp[i][budget] = max profit with projects 0..i

Result: Select B and C
Profit: $180, Cost: $90

Amazon Warehouse:
• Items to store (space is knapsack capacity)
• Each item has demand (value) and size (weight)
• DP selects items to maximize warehouse profit!`
      },

      {
        application: "Game Development and AI",
        description: `DP solves game strategies and AI decision making.

**Algorithm:** Minimax with DP, Game state evaluation

**Use Cases:**
• Chess/Go game engines
• Optimal game play (Tetris, Pac-Man)
• AI opponent behavior
• Procedural content generation`,

        example: `Optimal Game Play:

Coin Game: Two players pick from ends of row
Row: [5, 3, 7, 10]
Players alternate, maximize your score

DP state:
dp[i][j] = max score for subarray [i..j] if you go first

dp[0][3] represents full game
Each player plays optimally

Result: First player can guarantee score of 15

AlphaGo (Google DeepMind):
Uses advanced DP (Monte Carlo Tree Search + DP)
Beat world champion by evaluating billions of positions
DP crucial for position evaluation!`
      },

      {
        application: "Stock Trading Strategies",
        description: `DP calculates optimal buy/sell strategies.

**Algorithm:** State machine DP

**Use Cases:**
• Algorithmic trading
• Portfolio optimization
• Risk management
• Profit maximization with constraints`,

        example: `Stock Trading with DP:

prices = [7, 1, 5, 3, 6, 4]
Can buy/sell multiple times, cooldown 1 day

DP states:
buy[i] = max profit on day i ending with buy
sell[i] = max profit on day i ending with sell
cooldown[i] = max profit on day i in cooldown

Transitions:
buy[i] = max(buy[i-1], cooldown[i-1] - prices[i])
sell[i] = max(sell[i-1], buy[i-1] + prices[i])
cooldown[i] = sell[i-1]

Result: Max profit = 7
Strategy: Buy day 1($1), sell day 2($5), cooldown day 3,
          buy day 3($3), sell day 4($6)

High-frequency trading firms:
Use DP to make millions of trades per second
Optimize profit with complex constraints!`
      }
    ],

    summary: `**When to Use Dynamic Programming:**

✓ Optimization problems (min/max)
✓ Counting problems (how many ways)
✓ Decision problems (can we achieve)
✓ Problems with overlapping subproblems
✓ Problems with optimal substructure

**Real-World Impact:**

• Google Maps: Billions of route queries daily
• Genomics: Human Genome Project analysis
• Spell Check: Billions of autocorrections
• Finance: Algorithmic trading strategies
• AI: Game engines (Chess, Go)

DP is everywhere in computer science!`
  },

  interviewProblems: {
    title: "Common DP Interview Problems",

    problems: [
      {
        title: "1. Climbing Stairs",
        difficulty: "Easy",
        description: "You can climb 1 or 2 steps at a time. How many distinct ways to reach the top of n steps?",

        approach: `**Recognition:**
• "How many ways" → Counting problem
• "1 or 2 steps" → Choices at each step
• ways(n) depends on ways(n-1) and ways(n-2)

**Recurrence:**
ways(n) = ways(n-1) + ways(n-2)
This is Fibonacci sequence!

**Base Cases:**
ways(0) = 1 (one way: don't move)
ways(1) = 1 (one way: 1 step)`,

        solution: `// Tabulation (bottom-up)
function climbStairs(n):
    if n <= 1:
        return 1

    dp = new Array(n + 1)
    dp[0] = 1
    dp[1] = 1

    for i from 2 to n:
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

// Time: O(n), Space: O(n)

// Space-optimized
function climbStairsOptimized(n):
    if n <= 1:
        return 1

    prev2 = 1  // dp[i-2]
    prev1 = 1  // dp[i-1]

    for i from 2 to n:
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

// Time: O(n), Space: O(1)`,

        example: `n = 5

Ways to reach each step:
step 0: 1 way (start)
step 1: 1 way (0 → 1)
step 2: 2 ways (0 → 2, or 0 → 1 → 2)
step 3: 3 ways (sum of ways to 1 and 2)
step 4: 5 ways (sum of ways to 2 and 3)
step 5: 8 ways (sum of ways to 3 and 4)

dp = [1, 1, 2, 3, 5, 8]

Answer: 8 ways to reach step 5

The 8 ways:
1. 1+1+1+1+1
2. 1+1+1+2
3. 1+1+2+1
4. 1+2+1+1
5. 2+1+1+1
6. 1+2+2
7. 2+1+2
8. 2+2+1`
      },

      {
        title: "2. House Robber",
        difficulty: "Medium",
        description: "Rob houses for maximum money. Can't rob two adjacent houses. Given array of house values.",

        approach: `**Recognition:**
• "Maximize" → Optimization problem
• "Can't rob adjacent" → Constraint
• Choice: rob current house or skip it

**Recurrence:**
dp[i] = max(
    houses[i] + dp[i-2],  // Rob house i
    dp[i-1]                // Skip house i
)

**Base Cases:**
dp[0] = houses[0]
dp[1] = max(houses[0], houses[1])`,

        solution: `function rob(houses):
    n = houses.length
    if n == 0:
        return 0
    if n == 1:
        return houses[0]

    dp = new Array(n)
    dp[0] = houses[0]
    dp[1] = max(houses[0], houses[1])

    for i from 2 to n-1:
        dp[i] = max(
            houses[i] + dp[i-2],  // Rob i
            dp[i-1]                // Skip i
        )

    return dp[n-1]

// Time: O(n), Space: O(n)

// Space-optimized
function robOptimized(houses):
    if houses.length == 0:
        return 0

    prev2 = 0  // dp[i-2]
    prev1 = 0  // dp[i-1]

    for house in houses:
        current = max(house + prev2, prev1)
        prev2 = prev1
        prev1 = current

    return prev1

// Time: O(n), Space: O(1)`,

        example: `houses = [2, 7, 9, 3, 1]

DP array construction:
dp[0] = 2  (rob house 0)
dp[1] = max(2, 7) = 7  (skip 0, rob 1)

dp[2] = max(9 + dp[0], dp[1])
      = max(9 + 2, 7)
      = 11  (rob houses 0 and 2)

dp[3] = max(3 + dp[1], dp[2])
      = max(3 + 7, 11)
      = 11  (skip house 3)

dp[4] = max(1 + dp[2], dp[3])
      = max(1 + 11, 11)
      = 12  (rob houses 0, 2, and 4)

dp = [2, 7, 11, 11, 12]

Maximum money: 12
Rob houses: 0, 2, 4 (values: 2, 9, 1)`
      },

      {
        title: "3. Unique Paths",
        difficulty: "Medium",
        description: "Robot in m×n grid. Can only move right or down. How many unique paths from top-left to bottom-right?",

        approach: `**Recognition:**
• "How many paths" → Counting problem
• "Right or down" → Choices
• Grid problem → 2D DP

**Recurrence:**
dp[i][j] = dp[i-1][j] + dp[i][j-1]
         (from top)   (from left)

**Base Cases:**
dp[0][j] = 1 for all j (one path: go right)
dp[i][0] = 1 for all i (one path: go down)`,

        solution: `function uniquePaths(m, n):
    // Create DP table
    dp = new Array(m, n)

    // Initialize base cases
    for i from 0 to m-1:
        dp[i][0] = 1
    for j from 0 to n-1:
        dp[0][j] = 1

    // Fill table
    for i from 1 to m-1:
        for j from 1 to n-1:
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]

// Time: O(m × n), Space: O(m × n)

// Space-optimized (only need previous row)
function uniquePathsOptimized(m, n):
    prev = new Array(n)
    for j from 0 to n-1:
        prev[j] = 1

    for i from 1 to m-1:
        curr = new Array(n)
        curr[0] = 1
        for j from 1 to n-1:
            curr[j] = curr[j-1] + prev[j]
        prev = curr

    return prev[n-1]

// Time: O(m × n), Space: O(n)`,

        example: `m = 3, n = 3 (3×3 grid)

DP table:
    j: 0  1  2
i=0:   1  1  1   ← Base case (first row)
i=1:   1  2  3
i=2:   1  3  6
       ↑
  Base case
  (first column)

Filling process:
dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3
dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6

Unique paths: 6

The 6 paths:
1. RRDD (right, right, down, down)
2. RDRD
3. RDDR
4. DRRD
5. DRDR
6. DDRR

Each path has 2 rights and 2 downs.
Combinatorics: C(4, 2) = 6`
      },

      {
        title: "4. Maximum Subarray (Kadane's Algorithm)",
        difficulty: "Easy-Medium",
        description: "Find contiguous subarray with largest sum in an integer array.",

        approach: `**Recognition:**
• "Maximum sum" → Optimization problem
• "Contiguous subarray" → Sequence problem
• Can use DP or greedy

**DP Recurrence:**
dp[i] = maximum sum ending at index i
dp[i] = max(nums[i], dp[i-1] + nums[i])
       (start new) (extend previous)

**Key Insight:**
Either start fresh at current element,
or extend previous subarray.`,

        solution: `function maxSubArray(nums):
    n = nums.length
    dp = new Array(n)

    dp[0] = nums[0]
    maxSum = dp[0]

    for i from 1 to n-1:
        dp[i] = max(nums[i], dp[i-1] + nums[i])
        maxSum = max(maxSum, dp[i])

    return maxSum

// Time: O(n), Space: O(n)

// Kadane's algorithm (space-optimized)
function maxSubArrayOptimized(nums):
    maxEndingHere = nums[0]
    maxSoFar = nums[0]

    for i from 1 to nums.length-1:
        maxEndingHere = max(nums[i], maxEndingHere + nums[i])
        maxSoFar = max(maxSoFar, maxEndingHere)

    return maxSoFar

// Time: O(n), Space: O(1)

// To find actual subarray:
function maxSubArrayWithIndices(nums):
    maxEndingHere = nums[0]
    maxSoFar = nums[0]
    start = 0
    end = 0
    tempStart = 0

    for i from 1 to nums.length-1:
        if maxEndingHere + nums[i] > nums[i]:
            maxEndingHere += nums[i]
        else:
            maxEndingHere = nums[i]
            tempStart = i

        if maxEndingHere > maxSoFar:
            maxSoFar = maxEndingHere
            start = tempStart
            end = i

    return (maxSoFar, start, end)`,

        example: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

DP array (maxEndingHere):
i=0: dp[0] = -2, maxSoFar = -2
i=1: dp[1] = max(1, -2+1) = 1, maxSoFar = 1
i=2: dp[2] = max(-3, 1-3) = -2, maxSoFar = 1
i=3: dp[3] = max(4, -2+4) = 4, maxSoFar = 4
i=4: dp[4] = max(-1, 4-1) = 3, maxSoFar = 4
i=5: dp[5] = max(2, 3+2) = 5, maxSoFar = 5
i=6: dp[6] = max(1, 5+1) = 6, maxSoFar = 6
i=7: dp[7] = max(-5, 6-5) = 1, maxSoFar = 6
i=8: dp[8] = max(4, 1+4) = 5, maxSoFar = 6

Maximum sum: 6
Subarray: [4, -1, 2, 1]

Why it works:
• At each position, decide: start fresh or extend
• Always keep track of global maximum
• Negative prefix sums are discarded (start fresh)`
      },

      {
        title: "5. Word Break",
        difficulty: "Medium",
        description: "Given string and dictionary, determine if string can be segmented into space-separated dictionary words.",

        approach: `**Recognition:**
• "Can we segment" → Decision problem
• "Dictionary words" → Multiple choices
• Overlapping subproblems in trying different segmentations

**DP Definition:**
dp[i] = true if s[0..i-1] can be segmented

**Recurrence:**
dp[i] = true if exists j where:
        dp[j] == true AND s[j..i-1] in dictionary

**Base Case:**
dp[0] = true (empty string)`,

        solution: `function wordBreak(s, wordDict):
    n = s.length
    dp = new Array(n + 1)

    // Base case
    dp[0] = true

    // Convert dict to set for O(1) lookup
    dictSet = new Set(wordDict)

    // Fill table
    for i from 1 to n:
        dp[i] = false
        for j from 0 to i-1:
            if dp[j] and s.substring(j, i) in dictSet:
                dp[i] = true
                break  // Found valid segmentation

    return dp[n]

// Time: O(n² × m) where m = avg word length
// Space: O(n)

// To reconstruct segmentation:
function wordBreakWithPath(s, wordDict):
    n = s.length
    dp = new Array(n + 1)
    parent = new Array(n + 1)

    dp[0] = true
    dictSet = new Set(wordDict)

    for i from 1 to n:
        dp[i] = false
        for j from 0 to i-1:
            if dp[j] and s.substring(j, i) in dictSet:
                dp[i] = true
                parent[i] = j
                break

    if not dp[n]:
        return null

    // Reconstruct path
    result = []
    i = n
    while i > 0:
        j = parent[i]
        result.prepend(s.substring(j, i))
        i = j

    return result`,

        example: `s = "leetcode", wordDict = ["leet", "code"]

DP array construction:
dp[0] = true  (empty string)

i=1: Try j=0
  dp[0]=true and "l" in dict? No
  dp[1] = false

i=2: Try j=0,1
  dp[0]=true and "le" in dict? No
  dp[1]=false
  dp[2] = false

i=3: Try j=0,1,2
  dp[0]=true and "lee" in dict? No
  dp[3] = false

i=4: Try j=0,1,2,3
  dp[0]=true and "leet" in dict? Yes! ✓
  dp[4] = true

i=5: Try j=0,1,2,3,4
  dp[4]=true and "c" in dict? No
  dp[5] = false

i=6: Try j=0,1,2,3,4,5
  dp[4]=true and "co" in dict? No
  dp[6] = false

i=7: Try j=0,1,2,3,4,5,6
  dp[4]=true and "cod" in dict? No
  dp[7] = false

i=8: Try j=0,1,2,3,4,5,6,7
  dp[4]=true and "code" in dict? Yes! ✓
  dp[8] = true

dp = [T, F, F, F, T, F, F, F, T]

Can segment: Yes!
Segmentation: "leet" + "code"`
      },

      {
        title: "6. Partition Equal Subset Sum",
        difficulty: "Medium",
        description: "Given array of positive integers, can partition into two subsets with equal sum?",

        approach: `**Recognition:**
• "Can partition" → Decision problem
• "Equal sum" → Target is totalSum / 2
• This is 0/1 Knapsack variant!

**DP Definition:**
dp[i][sum] = can achieve sum using elements 0..i

**Recurrence:**
dp[i][sum] = dp[i-1][sum] OR  // Don't take element i
             dp[i-1][sum - nums[i]]  // Take element i

**Key Insight:**
If totalSum is odd, impossible to partition equally.
Otherwise, find if we can make sum = totalSum / 2.`,

        solution: `function canPartition(nums):
    totalSum = sum(nums)

    // If odd sum, can't partition equally
    if totalSum % 2 != 0:
        return false

    target = totalSum / 2
    n = nums.length

    // Create DP table
    dp = new Array(n + 1, target + 1)

    // Base cases
    for i from 0 to n:
        dp[i][0] = true  // Can always make sum 0

    for s from 1 to target:
        dp[0][s] = false  // Can't make sum > 0 with no elements

    // Fill table
    for i from 1 to n:
        for s from 1 to target:
            // Option 1: Don't take nums[i-1]
            dp[i][s] = dp[i-1][s]

            // Option 2: Take nums[i-1] (if it fits)
            if nums[i-1] <= s:
                dp[i][s] = dp[i][s] OR dp[i-1][s - nums[i-1]]

    return dp[n][target]

// Time: O(n × sum), Space: O(n × sum)

// Space-optimized (1D DP)
function canPartitionOptimized(nums):
    totalSum = sum(nums)
    if totalSum % 2 != 0:
        return false

    target = totalSum / 2
    dp = new Array(target + 1)
    dp[0] = true

    for num in nums:
        // Iterate backwards to avoid overwriting
        for s from target down to num:
            dp[s] = dp[s] OR dp[s - num]

    return dp[target]

// Time: O(n × sum), Space: O(sum)`,

        example: `nums = [1, 5, 11, 5]

totalSum = 22, target = 11

DP table:
     s: 0  1  2  3  4  5  6  7  8  9  10 11
i=0:    T  F  F  F  F  F  F  F  F  F  F  F
i=1:    T  T  F  F  F  F  F  F  F  F  F  F  (can make 1)
i=2:    T  T  F  F  F  T  T  F  F  F  F  F  (can make 5,6)
i=3:    T  T  F  F  F  T  T  F  F  F  F  T  (can make 11!)
i=4:    T  T  F  F  F  T  T  F  F  F  F  T

dp[4][11] = true

Can partition: Yes!
Partitions: {1, 5, 5} and {11}
Both sum to 11 ✓

Step-by-step for row i=3 (adding 11):
s=11: dp[3][11] = dp[2][11] OR dp[2][11-11]
                = false OR dp[2][0]
                = false OR true
                = true ✓`
      }
    ],

    additionalProblems: [
      {
        title: "7. Coin Change 2 (Count Ways)",
        difficulty: "Medium",
        hint: "Unbounded knapsack. dp[i][amount] = ways using coins 0..i"
      },
      {
        title: "8. Decode Ways",
        difficulty: "Medium",
        hint: "dp[i] = ways to decode s[0..i]. Check last 1 or 2 digits."
      },
      {
        title: "9. Jump Game II (Minimum Jumps)",
        difficulty: "Medium",
        hint: "BFS or DP. dp[i] = min jumps to reach i."
      },
      {
        title: "10. Regular Expression Matching",
        difficulty: "Hard",
        hint: "2D DP. Match character or *, handle . wildcard."
      },
      {
        title: "11. Burst Balloons",
        difficulty: "Hard",
        hint: "Interval DP. dp[i][j] = max coins bursting balloons i..j."
      },
      {
        title: "12. Wildcard Matching",
        difficulty: "Hard",
        hint: "Similar to regex but simpler. dp[i][j] = match s[0..i] with p[0..j]."
      }
    ]
  },

  bestPractices: {
    title: "Best Practices for Dynamic Programming",

    tips: [
      {
        category: "Problem-Solving Strategy",
        points: [
          "**1. Identify if DP is Applicable:**",
          "• Check for overlapping subproblems",
          "• Verify optimal substructure",
          "• Look for keywords (maximize, minimize, count ways)",
          "",
          "**2. Define the State:**",
          "• What parameters uniquely identify a subproblem?",
          "• Common: dp[i], dp[i][j], dp[i][j][k]",
          "• State should be minimal but complete",
          "",
          "**3. Write the Recurrence Relation:**",
          "• Express dp[state] in terms of smaller states",
          "• Consider all choices/options",
          "• Include constraints in relation",
          "",
          "**4. Identify Base Cases:**",
          "• Simplest subproblems",
          "• Often empty input or size 0/1",
          "• Must be computable directly",
          "",
          "**5. Determine Computation Order:**",
          "• Top-down: Use memoization (recursion + cache)",
          "• Bottom-up: Use tabulation (iterative + table)",
          "• Ensure dependencies computed first",
          "",
          "**6. Optimize Space (if possible):**",
          "• If dp[i] only depends on dp[i-1], use O(1) space",
          "• If dp[i][j] only depends on previous row, use O(n) space",
          "• Trade-off: Harder to reconstruct solution"
        ]
      },

      {
        category: "Implementation Tips",
        points: [
          "**Start with Memoization:**",
          "• Write recursive solution first",
          "• Add memoization (easier to understand)",
          "• Convert to tabulation for optimization",
          "",
          "**Initialize Carefully:**",
          "• Set base cases correctly",
          "• Initialize impossible states (use -1, null, or ∞)",
          "• For min problems: use ∞ initially",
          "• For max problems: use -∞ initially",
          "",
          "**Handle Edge Cases:**",
          "• Empty input",
          "• Single element",
          "• All negative/positive values",
          "• Boundary conditions",
          "",
          "**Test with Small Examples:**",
          "• Draw DP table for n=3 or n=4",
          "• Verify recurrence by hand",
          "• Check base cases",
          "",
          "**Use Meaningful Variable Names:**",
          "✓ dp[weight], dp[length], dp[sum]",
          "❌ dp[i], dp[j], dp[k] without comments"
        ]
      },

      {
        category: "Common Pitfalls to Avoid",
        points: [
          "❌ **Not Checking if DP is Applicable:**",
          "• Verify overlapping subproblems",
          "• Ensure optimal substructure",
          "",
          "❌ **Wrong State Definition:**",
          "• State too broad (includes unnecessary info)",
          "• State too narrow (misses important info)",
          "• Test: Can you compute dp[state] from smaller states?",
          "",
          "❌ **Incorrect Base Cases:**",
          "• Forgetting base cases",
          "• Wrong base case values",
          "• Not handling edge cases",
          "",
          "❌ **Wrong Computation Order:**",
          "• Computing dp[i] before dp[i-1]",
          "• In 2D: wrong loop nesting",
          "• Solution: Draw dependency graph",
          "",
          "❌ **Off-by-One Errors:**",
          "• Array indices (0-indexed vs 1-indexed)",
          "• Loop bounds (< vs <=)",
          "• Substring ranges [start, end)",
          "",
          "❌ **Not Handling Impossible States:**",
          "• Use sentinel values (-1, null, ∞)",
          "• Check if state is reachable",
          "",
          "❌ **Overwriting Values Too Soon:**",
          "• In space-optimized DP, iterate backwards!",
          "• Example: Knapsack 1D DP"
        ]
      },

      {
        category: "Debugging Techniques",
        points: [
          "**Print DP Table:**",
          "• Visualize small examples",
          "• Check if values make sense",
          "• Verify base cases and transitions",
          "",
          "**Draw Recursion Tree:**",
          "• For memoization, trace recursive calls",
          "• Check for repeated subproblems",
          "• Verify memoization working",
          "",
          "**Test Small Inputs:**",
          "• n = 0, 1, 2, 3",
          "• Manually compute expected result",
          "• Compare with DP solution",
          "",
          "**Check Recurrence:**",
          "• Pick a cell in DP table",
          "• Manually compute using recurrence",
          "• Verify it matches table value",
          "",
          "**Add Assertions:**",
          "• Check state validity",
          "• Verify base cases",
          "• Assert non-negative indices"
        ]
      }
    ],

    template: `**Generic DP Problem Template:**

1. **Identify DP:**
   □ Overlapping subproblems?
   □ Optimal substructure?
   □ Keywords present?

2. **Define State:**
   What parameters define a subproblem?
   dp[?] = ?

3. **Recurrence Relation:**
   dp[state] = function(smaller states)

4. **Base Cases:**
   Simplest subproblems

5. **Implementation:**

// Memoization template
memo = {}

function solve(params):
    if base_case:
        return base_value

    if params in memo:
        return memo[params]

    result = recurrence_relation(
        solve(smaller_params)
    )

    memo[params] = result
    return result

// Tabulation template
function solve(input):
    dp = initialize_table()

    // Set base cases
    dp[base] = base_value

    // Fill table
    for state in order:
        dp[state] = recurrence_relation(dp)

    return dp[final_state]

6. **Test:**
   □ Empty input
   □ Single element
   □ Small examples (n=3)
   □ Edge cases

7. **Optimize:**
   □ Space optimization possible?
   □ Pruning unnecessary states?
   □ Better state representation?`
  },

  dpPatterns: {
    title: "Common DP Patterns",

    patterns: [
      {
        pattern: "Linear DP (1D)",
        description: `Single parameter, linear dependency.`,
        examples: ["Fibonacci", "Climbing Stairs", "House Robber", "Decode Ways"],
        template: `dp[i] = function(dp[i-1], dp[i-2], ...)

Base: dp[0], dp[1]
Fill: i from 2 to n
Return: dp[n]`
      },

      {
        pattern: "Grid/Matrix DP (2D)",
        description: `Two parameters, often grid traversal.`,
        examples: ["Unique Paths", "Minimum Path Sum", "Longest Common Subsequence"],
        template: `dp[i][j] = function(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

Base: dp[0][j], dp[i][0]
Fill: i from 1 to m, j from 1 to n
Return: dp[m][n]`
      },

      {
        pattern: "Knapsack (0/1)",
        description: `Include or exclude items with capacity constraint.`,
        examples: ["0/1 Knapsack", "Partition Equal Subset", "Target Sum"],
        template: `dp[i][w] = max(
    dp[i-1][w],                    // Exclude
    value[i] + dp[i-1][w-weight[i]]  // Include
)

Base: dp[0][w] = 0, dp[i][0] = 0
Fill: i from 1 to n, w from 1 to W
Return: dp[n][W]`
      },

      {
        pattern: "Unbounded Knapsack",
        description: `Can use items unlimited times.`,
        examples: ["Coin Change", "Rod Cutting", "Unbounded Knapsack"],
        template: `dp[i][w] = max(
    dp[i-1][w],                    // Exclude
    value[i] + dp[i][w-weight[i]]  // Include (can reuse!)
)

Note: dp[i][w-weight[i]], not dp[i-1][...]`
      },

      {
        pattern: "Interval DP",
        description: `Problems on subarrays/substrings with different splits.`,
        examples: ["Matrix Chain Multiplication", "Burst Balloons", "Palindrome Partitioning"],
        template: `dp[i][j] = optimal for subarray [i...j]

for length from 1 to n:
    for i from 0 to n-length:
        j = i + length - 1
        for k from i to j:
            dp[i][j] = optimize(dp[i][k], dp[k+1][j])`
      },

      {
        pattern: "State Machine DP",
        description: `Different states with transitions.`,
        examples: ["Stock Trading", "Paint House", "Buy/Sell with Cooldown"],
        template: `states: buy[i], sell[i], cooldown[i]

buy[i] = max(buy[i-1], cooldown[i-1] - price)
sell[i] = max(sell[i-1], buy[i-1] + price)
cooldown[i] = sell[i-1]

Track multiple states simultaneously`
      },

      {
        pattern: "String Matching DP",
        description: `Compare two strings, often 2D.`,
        examples: ["LCS", "Edit Distance", "Regex Matching", "Wildcard Matching"],
        template: `dp[i][j] = match s1[0...i] with s2[0...j]

if s1[i] == s2[j]:
    dp[i][j] = dp[i-1][j-1] + 1  // Match
else:
    dp[i][j] = function(dp[i-1][j], dp[i][j-1])  // Operations`
      },

      {
        pattern: "Digit DP",
        description: `Count numbers with certain properties.`,
        examples: ["Count numbers with digit d", "Sum of digits", "Palindrome numbers"],
        template: `dp[pos][tight][other_state]

pos: current digit position
tight: whether we're bounded by input
other_state: problem-specific constraints`
      }
    ],

    recognitionGuide: `**Pattern Recognition Guide:**

**1D Linear:**
• Keywords: "each step", "sequence", "ending at"
• Example: "How many ways to reach step n?"

**2D Grid:**
• Keywords: "grid", "matrix", "two strings"
• Example: "Paths in m×n grid"

**Knapsack:**
• Keywords: "capacity", "weight", "value", "select items"
• Example: "Maximize value with weight limit"

**Interval:**
• Keywords: "subarray", "split", "merge", "all ways to divide"
• Example: "Minimum cost to multiply matrices"

**State Machine:**
• Keywords: "states", "transitions", "constraints between choices"
• Example: "Buy/sell stock with cooldown"

**String Matching:**
• Keywords: "compare strings", "transform", "match"
• Example: "Edit distance between two strings"

Drawing DP table helps identify pattern!`
  }
};
