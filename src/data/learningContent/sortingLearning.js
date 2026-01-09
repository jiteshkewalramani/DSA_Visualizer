export const sortingLearningContent = {
  introduction: {
    title: "What are Sorting Algorithms?",
    content: `Sorting algorithms are fundamental algorithms that arrange elements of a list in a specific order (ascending or descending). They are essential building blocks in computer science and are used extensively in databases, search algorithms, and data processing.

**Why Sorting Matters:**
• Enables efficient searching (binary search requires sorted data)
• Improves data organization and readability
• Optimizes database query performance
• Foundation for many other algorithms
• Real-world applications: sorting files, organizing data, ranking search results

**Key Properties to Consider:**
• Time Complexity - how execution time grows with input size
• Space Complexity - extra memory required
• Stability - preserves relative order of equal elements
• Adaptivity - performs better on partially sorted data
• In-place - sorts without requiring extra space`,

    visualExample: {
      unsorted: [64, 34, 25, 12, 22, 11, 90],
      sorted: [11, 12, 22, 25, 34, 64, 90],
      description: "Sorting transforms unordered data into an ordered sequence"
    }
  },

  algorithms: {
    title: "Sorting Algorithms",
    sections: [
      {
        name: "Bubble Sort",
        timeComplexity: "O(n²) average/worst | O(n) best",
        spaceComplexity: "O(1)",
        stable: "Yes",
        description: `**How Bubble Sort Works:**
1. Compare adjacent elements
2. Swap them if they're in wrong order
3. Repeat until no swaps are needed
4. Largest elements "bubble up" to the end

**Visual Process:**
Pass 1: [64, 34, 25, 12] → [34, 25, 12, 64]
Pass 2: [34, 25, 12, 64] → [25, 12, 34, 64]
Pass 3: [25, 12, 34, 64] → [12, 25, 34, 64]`,

        pseudocode: `function bubbleSort(arr):
    n = arr.length
    for i from 0 to n-1:
        swapped = false
        for j from 0 to n-i-2:
            if arr[j] > arr[j+1]:
                swap(arr[j], arr[j+1])
                swapped = true
        if not swapped:
            break  // Array is sorted`,

        advantages: [
          "Simple to understand and implement",
          "Adaptive - O(n) for nearly sorted data",
          "Stable - maintains relative order",
          "In-place - no extra memory needed"
        ],

        disadvantages: [
          "Very slow on large datasets - O(n²)",
          "Not suitable for production use",
          "Many unnecessary comparisons"
        ],

        bestFor: "Small datasets, educational purposes, nearly sorted data"
      },

      {
        name: "Quick Sort",
        timeComplexity: "O(n log n) average | O(n²) worst",
        spaceComplexity: "O(log n)",
        stable: "No",
        description: `**How Quick Sort Works:**
1. Choose a pivot element
2. Partition array: elements < pivot on left, > pivot on right
3. Recursively sort left and right partitions
4. Divide and conquer approach

**Visual Process:**
[64, 34, 25, 12, 22, 11, 90] pivot=25
↓
[12, 11, 22] [25] [64, 34, 90]
↓
Recursively sort left and right`,

        pseudocode: `function quickSort(arr, low, high):
    if low < high:
        // Partition and get pivot index
        pivotIndex = partition(arr, low, high)

        // Recursively sort left and right
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j from low to high-1:
        if arr[j] < pivot:
            i++
            swap(arr[i], arr[j])

    swap(arr[i+1], arr[high])
    return i + 1`,

        advantages: [
          "Very fast average case - O(n log n)",
          "In-place sorting (low memory)",
          "Cache-friendly due to locality",
          "Most commonly used in practice"
        ],

        disadvantages: [
          "Worst case O(n²) with bad pivot",
          "Not stable",
          "Recursive - stack overflow risk"
        ],

        bestFor: "General purpose sorting, large datasets, when average performance matters"
      },

      {
        name: "Merge Sort",
        timeComplexity: "O(n log n) all cases",
        spaceComplexity: "O(n)",
        stable: "Yes",
        description: `**How Merge Sort Works:**
1. Divide array into two halves
2. Recursively sort each half
3. Merge the sorted halves
4. Guaranteed O(n log n) performance

**Visual Process:**
[64, 34, 25, 12]
↓ Divide
[64, 34] [25, 12]
↓ Divide
[64] [34] [25] [12]
↓ Merge
[34, 64] [12, 25]
↓ Merge
[12, 25, 34, 64]`,

        pseudocode: `function mergeSort(arr, left, right):
    if left < right:
        mid = (left + right) / 2

        // Recursively sort halves
        mergeSort(arr, left, mid)
        mergeSort(arr, mid + 1, right)

        // Merge sorted halves
        merge(arr, left, mid, right)

function merge(arr, left, mid, right):
    // Create temp arrays
    leftArr = arr[left...mid]
    rightArr = arr[mid+1...right]

    i = 0, j = 0, k = left

    // Merge back to arr
    while i < leftArr.length and j < rightArr.length:
        if leftArr[i] <= rightArr[j]:
            arr[k++] = leftArr[i++]
        else:
            arr[k++] = rightArr[j++]

    // Copy remaining elements
    copy remaining from leftArr and rightArr`,

        advantages: [
          "Guaranteed O(n log n) - predictable",
          "Stable sorting algorithm",
          "Good for linked lists",
          "Parallelizable"
        ],

        disadvantages: [
          "Requires O(n) extra space",
          "Slower than Quick Sort in practice",
          "Not adaptive"
        ],

        bestFor: "When stability matters, linked lists, external sorting, guaranteed performance"
      },

      {
        name: "Selection Sort",
        timeComplexity: "O(n²) all cases",
        spaceComplexity: "O(1)",
        stable: "No",
        description: `**How Selection Sort Works:**
1. Find minimum element in unsorted part
2. Swap it with first unsorted element
3. Move boundary of sorted part
4. Repeat until array is sorted

**Visual Process:**
[64, 34, 25, 12, 22]
Find min (12): [12, 34, 25, 64, 22]
Find min (22): [12, 22, 25, 64, 34]
Find min (25): [12, 22, 25, 64, 34]
Find min (34): [12, 22, 25, 34, 64]`,

        pseudocode: `function selectionSort(arr):
    n = arr.length

    for i from 0 to n-1:
        minIndex = i

        // Find minimum in unsorted part
        for j from i+1 to n-1:
            if arr[j] < arr[minIndex]:
                minIndex = j

        // Swap minimum to position i
        if minIndex != i:
            swap(arr[i], arr[minIndex])`,

        advantages: [
          "Simple implementation",
          "Minimal swaps - O(n) swaps",
          "In-place sorting",
          "Good for small datasets"
        ],

        disadvantages: [
          "O(n²) time complexity always",
          "Not stable",
          "Not adaptive",
          "Poor performance on large data"
        ],

        bestFor: "Small datasets, when swap cost is high, memory constrained"
      },

      {
        name: "Insertion Sort",
        timeComplexity: "O(n²) average/worst | O(n) best",
        spaceComplexity: "O(1)",
        stable: "Yes",
        description: `**How Insertion Sort Works:**
1. Start with second element
2. Compare with elements before it
3. Insert at correct position
4. Like sorting playing cards in hand

**Visual Process:**
[34, 25, 12, 22]
Step 1: [25, 34, 12, 22]  (insert 25)
Step 2: [12, 25, 34, 22]  (insert 12)
Step 3: [12, 22, 25, 34]  (insert 22)`,

        pseudocode: `function insertionSort(arr):
    n = arr.length

    for i from 1 to n-1:
        key = arr[i]
        j = i - 1

        // Move elements greater than key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j--

        // Insert key at correct position
        arr[j + 1] = key`,

        advantages: [
          "Efficient for small data",
          "Adaptive - O(n) for nearly sorted",
          "Stable algorithm",
          "Online - can sort as data arrives"
        ],

        disadvantages: [
          "O(n²) for large datasets",
          "Inefficient for reverse sorted data",
          "Many shifts required"
        ],

        bestFor: "Small datasets, nearly sorted data, online sorting, stable sorting needed"
      }
    ]
  },

  complexity: {
    title: "Time & Space Complexity Analysis",
    comparison: [
      {
        algorithm: "Bubble Sort",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "Yes"
      },
      {
        algorithm: "Quick Sort",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
        space: "O(log n)",
        stable: "No"
      },
      {
        algorithm: "Merge Sort",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)",
        stable: "Yes"
      },
      {
        algorithm: "Selection Sort",
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "No"
      },
      {
        algorithm: "Insertion Sort",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
        stable: "Yes"
      }
    ],

    explanation: `**Understanding Complexity:**

**O(n) - Linear:** Time grows linearly with input
Example: Best case Bubble Sort on sorted array

**O(n log n) - Linearithmic:** Optimal comparison-based sorting
Example: Merge Sort, Quick Sort average case

**O(n²) - Quadratic:** Time grows with square of input
Example: Bubble Sort, Selection Sort, Insertion Sort

**Space Complexity:**
• O(1) - In-place: Bubble, Selection, Insertion
• O(log n) - Recursive stack: Quick Sort
• O(n) - Extra arrays: Merge Sort`
  },

  applications: {
    title: "Real-World Applications",
    examples: [
      {
        application: "Database Systems",
        description: "Query optimization, indexing, ORDER BY clauses",
        algorithm: "Quick Sort, Merge Sort for external sorting"
      },
      {
        application: "E-commerce",
        description: "Product sorting by price, rating, popularity",
        algorithm: "Quick Sort for fast sorting"
      },
      {
        application: "Search Engines",
        description: "Ranking search results by relevance",
        algorithm: "Merge Sort for stable sorting"
      },
      {
        application: "Operating Systems",
        description: "Process scheduling, memory management",
        algorithm: "Heap Sort, Quick Sort"
      },
      {
        application: "Data Analysis",
        description: "Finding median, percentiles, outliers",
        algorithm: "Quick Select (variant of Quick Sort)"
      },
      {
        application: "Graphics & Games",
        description: "Z-ordering, sprite sorting",
        algorithm: "Insertion Sort for nearly sorted data"
      }
    ]
  },

  interviewProblems: {
    title: "Common Interview Problems",
    problems: [
      {
        title: "Sort an array of 0s, 1s, and 2s",
        difficulty: "Medium",
        description: "Given an array with only 0s, 1s, and 2s, sort it in one pass.",
        hint: "Use Dutch National Flag algorithm - three pointers approach",
        solution: `Algorithm: Use low, mid, high pointers
• If arr[mid] = 0: swap with low, move both
• If arr[mid] = 1: just move mid
• If arr[mid] = 2: swap with high, move high
Time: O(n), Space: O(1)`
      },
      {
        title: "Merge two sorted arrays",
        difficulty: "Easy",
        description: "Merge two sorted arrays into one sorted array.",
        hint: "Two pointer approach from the end",
        solution: `Algorithm: Start from end of both arrays
• Compare elements from end
• Place larger element at end of result
• Move pointers backward
Time: O(m+n), Space: O(1) if in-place`
      },
      {
        title: "Find Kth largest element",
        difficulty: "Medium",
        description: "Find the kth largest element in an unsorted array.",
        hint: "Use Quick Select or Min Heap",
        solution: `Algorithm 1: Quick Select
• Partition like Quick Sort
• Recursively search in one partition
Time: O(n) average, O(n²) worst

Algorithm 2: Min Heap of size k
• Maintain heap of k largest elements
Time: O(n log k), Space: O(k)`
      },
      {
        title: "Sort linked list",
        difficulty: "Medium",
        description: "Sort a linked list in O(n log n) time.",
        hint: "Merge Sort works best for linked lists",
        solution: `Algorithm: Merge Sort
• Find middle using slow/fast pointers
• Recursively sort left and right halves
• Merge sorted halves
Time: O(n log n), Space: O(log n) stack`
      },
      {
        title: "Count inversions in array",
        difficulty: "Hard",
        description: "Count pairs (i, j) where i < j but arr[i] > arr[j].",
        hint: "Modified Merge Sort",
        solution: `Algorithm: During Merge Sort merge step
• Count inversions when right < left
• Add to count during merging
Time: O(n log n), Space: O(n)`
      }
    ]
  },

  bestPractices: {
    title: "Best Practices & Tips",
    tips: [
      {
        category: "Algorithm Selection",
        practices: [
          "Use Quick Sort for general purpose sorting (fastest average case)",
          "Use Merge Sort when stability is required",
          "Use Insertion Sort for small arrays (< 10-20 elements)",
          "Use Heap Sort when O(1) space and O(n log n) time needed",
          "Use Counting Sort for integers in limited range"
        ]
      },
      {
        category: "Implementation Tips",
        practices: [
          "Add early termination in Bubble Sort (swapped flag)",
          "Use random pivot or median-of-3 for Quick Sort",
          "Switch to Insertion Sort for small subarrays in Quick/Merge Sort",
          "Use iterative Quick Sort to avoid stack overflow",
          "Implement in-place Merge Sort to save space"
        ]
      },
      {
        category: "Optimization",
        practices: [
          "Hybrid algorithms: IntroSort = Quick Sort + Heap Sort + Insertion Sort",
          "Use TimSort (Python/Java default) - Merge + Insertion Sort",
          "Parallel sorting for large datasets",
          "Cache-aware sorting for better performance",
          "Use library sorting unless specific requirement"
        ]
      },
      {
        category: "Testing",
        practices: [
          "Test with empty array, single element, two elements",
          "Test with sorted, reverse sorted, random data",
          "Test with duplicates",
          "Test stability for stable sorting algorithms",
          "Benchmark with realistic data sizes"
        ]
      }
    ]
  },

  comparison: {
    title: "When to Use Which Algorithm?",
    decisionMatrix: [
      {
        scenario: "General purpose, large dataset",
        recommendation: "Quick Sort",
        reason: "Fastest average case, in-place, cache-friendly"
      },
      {
        scenario: "Need guaranteed O(n log n)",
        recommendation: "Merge Sort or Heap Sort",
        reason: "No worst-case O(n²) performance"
      },
      {
        scenario: "Need stable sorting",
        recommendation: "Merge Sort or Insertion Sort",
        reason: "Maintains relative order of equal elements"
      },
      {
        scenario: "Nearly sorted data",
        recommendation: "Insertion Sort",
        reason: "O(n) for nearly sorted, adaptive"
      },
      {
        scenario: "Memory constrained (O(1) space)",
        recommendation: "Heap Sort or Quick Sort",
        reason: "In-place sorting algorithms"
      },
      {
        scenario: "Small dataset (< 20 elements)",
        recommendation: "Insertion Sort",
        reason: "Low overhead, simple, fast for small n"
      },
      {
        scenario: "Linked list",
        recommendation: "Merge Sort",
        reason: "No random access needed, stable"
      },
      {
        scenario: "External sorting (disk)",
        recommendation: "Merge Sort",
        reason: "Sequential access pattern, stable"
      },
      {
        scenario: "Integers in limited range",
        recommendation: "Counting Sort or Radix Sort",
        reason: "O(n) time, non-comparison based"
      },
      {
        scenario: "Production system",
        recommendation: "Use language built-in sort",
        reason: "Highly optimized (TimSort, IntroSort)"
      }
    ]
  }
};
