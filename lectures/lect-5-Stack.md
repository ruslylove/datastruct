---
# Cover Page / Title Slide (Level 1)
title: 'Stacks'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev

# Based on Presentation for use with the textbook Data Structures and Algorithms in Java, 6th edition, by M. T. Goodrich, R. Tamassia, and M. H. Goldwasser, Wiley, 2014
---

# Stacks
### Algorithm and Data Structures
### semester 1/2025
### Dr. Ruslee Sutthaweekul

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="4"/>


---

## Abstract Data Types (ADTs)

* An **Abstract Data Type (ADT)** is a conceptual model of a data structure.
* It defines:
    * What kind of data is stored.
    * Which operations can be performed on the data.
    * Potential error conditions related to those operations.
* **Example (Stock Trading System):**
    * **Data:** Buy/sell orders.
    * **Operations:** `order buy(...)`, `order sell(...)`, `void cancel(...)`.
    * **Errors:** Trying to buy/sell a non-existent stock, cancelling a non-existent order.

---


## The Stack ADT



* Operates on a **Last-In, First-Out (LIFO)** principle.
* **Core Operations:**
    * `push(object)`: Adds an element to the top of the stack.
    * `pop()`: Removes and returns the top element of the stack.
* **Helper Operations:**
    * `top()`: Returns the top element of the stack without removing it.
    * `size()`: Returns the number of elements in the stack.
    * `isEmpty()`: Returns a boolean indicating whether the stack is empty.
* **Error Conditions:**
    * Attempting to `pop()` or `top()` an empty stack should result in an error (typically by throwing an exception).

<div style="position:fixed;right:100px;width:200px;height:200px;top:100px">
<img src="/stack_asian.png"/>
</div>

---

## Stack Interface Definition in Java

* This is a Java interface representing our Stack ADT concept.
* This interface defines the standard Stack ADT, using exceptions for error handling.
* `pop` and `top` operations will throw an `EmptyStackException` if the stack is empty.
* This approach is generally preferred over returning `null` as it makes error conditions explicit.

```java
public interface Stack<E> {
  /** Returns the number of elements in the stack. */
  int size();

  /** Tests whether the stack is empty. */
  boolean isEmpty();

  /** Returns, but does not remove, the element at the top of the stack. */
  E top() throws EmptyStackException;

  /** Inserts an element at the top of the stack. */
  void push(E element);

  /** Removes and returns the element at the top of the stack. */
  E pop() throws EmptyStackException;
}
```

---
layout: two-cols
---

## Stack Operation Example
<Transform :scale="0.9">

| Method Call | Return Value | Stack Contents |
| :---------- | :----------- | :------------- |
| push(5)     |              | (5)            |
| push(3)     |              | (5, 3)         |
| size()      | 2            | (5, 3)         |
| pop()       | 3            | (5)            |
| isEmpty()   | false        | (5)            |
| pop()       | 5            | ()             |
| isEmpty()   | true         | ()             |
| pop()       | throws Exception | ()             |

</Transform>
:: right ::

<Transform :scale="0.9">

| Method Call | Return Value | Stack Contents |
| :---------- | :----------- | :------------- |
| push(7)     |              | (7)            |
| push(9)     |              | (7, 9)         |
| top()       | 9            | (7, 9)         |
| push(4)     |              | (7, 9, 4)      |
| size()      | 3            | (7, 9, 4)      |
| pop()       | 4            | (7, 9)         |
| push(6)     |              | (7, 9, 6)      |
| push(8)     |              | (7, 9, 6, 8)   |
| pop()       | 8            | (7, 9, 6)      |

</Transform>
---

## Handling Errors with Exceptions

* An operation on a data structure may fail. For example, calling `pop()` on an empty stack is an error.
* In Java, the preferred way to handle such errors is to throw an **exception**.
* For our Stack ADT, `pop()` and `top()` will throw an `EmptyStackException` if the stack is empty.
* This makes error handling explicit and robust, as the calling method must either handle the exception or propagate it.

---

## Using Exceptions in Java

When a method declares that it `throws` an exception, you must handle it. The standard way is using a `try...catch` block.

*   **`try` block:** Enclose the code that might throw an exception (e.g., `stack.pop()`).
*   **`catch` block:** "Catches" the exception if it occurs and defines how to handle it (e.g., print an error message).

```java {*}{maxHeight:'250px',lines:true}
public class StackTester {
    public static void main(String[] args) {
        Stack<Integer> myStack = new ArrayStack<>(5);
        myStack.push(10);
        myStack.push(20);

        try {
            System.out.println("Top element is: " + myStack.top()); // Safe
            System.out.println("Popped: " + myStack.pop());       // Safe
            System.out.println("Popped: " + myStack.pop());       // Safe
            System.out.println("Popped: " + myStack.pop());       // This will fail
        } catch (EmptyStackException e) {
            System.err.println("Error: Tried to pop from an empty stack.");
            // In a real application, you might log this error or show a user-friendly message.
        }
        System.out.println("Program continues after handling the exception.");
    }
}
```

---

## Applications of Stacks

* **Direct Uses:**
    * Tracking visited pages in a web browser's history.
    * Managing the undo sequence in text editors.
    * Handling the chain of method calls in the Java Virtual Machine (JVM).
* **Indirect Uses:**
    * As helper data structures within other algorithms.
    * As components used to build more complex data structures.

---
layout: two-cols
---


## The JVM Method Stack

* The Java Virtual Machine (JVM) uses a stack to manage active method calls.
* When a method is invoked:
    * A **frame** is pushed onto the stack.
    * This frame stores the method's local variables, return value placeholder, and the program counter (tracking the current execution point).
* When a method finishes:
    * Its frame is popped off the stack.
    * Control returns to the method represented by the new top frame.
* This mechanism naturally supports **recursion**.

:: right ::

<div style="position:fixed;right:100px">


```mermaid {scale:0.6}
sequenceDiagram
    participant C as Caller
    participant S as JVM Stack

    C->>+S: main() called
    Note over S: Frame for main() pushed

    C->>+S: foo() called
    Note over S: Frame for foo() pushed

    C->>+S: bar() called
    Note over S: Frame for bar() pushed

    S-->>-C: bar() returns
    Note over S: Frame for bar() popped

    S-->>-C: foo() returns
    Note over S: Frame for foo() popped

    S-->>-C: main() returns
    Note over S: Frame for main() popped
```


</div>


---
layout: two-cols
---

## Array-Based Stack Implementation

* A straightforward way to implement a stack is using an array (`S`).
* Elements are added sequentially (e.g., from index 0 upwards).
* A variable (`t`) tracks the index of the topmost element.

```text
Algorithm size():
  return t + 1

Algorithm pop():
  if isEmpty() then
    throw EmptyStackException()
  else
    elementToReturn = S[t]
    t = t - 1
    return elementToReturn
```

:: right ::

<div style="position:fixed;right:100px">

```mermaid {scale:0.6}
graph TD
    subgraph Array ["Array 'S'"]
        direction LR
        s0["S[0]"] --- s1["S[1]"] --- s2["S[2]"] --- s_etc["..."] --- st["S[t]"] --- sn_etc["..."] --- sn["S[N-1]"]
    end
    subgraph "Top Index Pointer"
      t_ptr["t"]
    end
    t_ptr --> st
```

</div>

---
layout: two-cols
---

## Array-Based Stack: Handling Fullness

* A potential issue: the underlying array can become full.
* If a `push` operation is attempted when `t` is already at the last index (`S.length - 1`), the array cannot hold more elements.
* In this implementation, attempting to push onto a full stack would typically cause an error (e.g., throw an `IllegalStateException` or similar).

```text
Algorithm push(o):
  if t = S.length - 1 then
    throw IllegalStateException("Stack is full")
  else
    t = t + 1
    S[t] = o
```

:: right ::

<div style="position:fixed;right:100px">


```mermaid {scale:0.8}
graph TD
    subgraph Array [Array S Full]
        direction LR
        s0["S[0]"] --- s1["S[1]"] --- s2["S[2]"] --- s_etc["..."] --- st["S[t = N-1]"]
    end
    subgraph "Top Index Pointer"
      t_ptr["t"]
    end
    t_ptr --> st
```

</div>


---

## Array-Based Stack: Performance & Limits

* **Performance:**
    * Let $n$ be the number of elements in the stack.
    * Space complexity: $O(n)$ - space used is proportional to the number of elements.
    * Time complexity: $O(1)$ - each operation (push, pop, top, size, isEmpty) takes constant time on average.
* **Limitations:**
    * The maximum capacity of the stack must be defined when the array is created and cannot be easily changed later.
    * Pushing onto a full stack results in an error/exception specific to the implementation.

---

## Array-Based Stack Snippet (Java)

```java {*}{maxHeight:'380px'}
public class ArrayStack<E> implements Stack<E> {
    public static final int CAPACITY = 1000; // Default capacity
    private E[] data;        // Generic array used for storage
    private int t = -1;      // Index of the top element (-1 if empty)

    // Constructor with default capacity
    public ArrayStack() { this(CAPACITY); }

    // Constructor with given capacity
    public ArrayStack(int capacity) {
        data = (E[]) new Object[capacity]; // Safe cast; compiler may warn
    }

    @Override
    public int size() { return (t + 1); }

    @Override
    public boolean isEmpty() { return (t == -1); }

    @Override
    public void push(E e) throws IllegalStateException {
        if (size() == data.length) throw new IllegalStateException("Stack is full");
        data[++t] = e; // Increment t before storing new item
    }

    @Override
    public E top() {
        if (isEmpty()) throw new EmptyStackException();
        return data[t];
    }

    @Override
    public E pop() {
        if (isEmpty()) throw new EmptyStackException();
        E answer = data[t];
        data[t] = null; // Dereference to help garbage collection
        t--;
        return answer;
    }
}
```

*(Note: Added more methods from the interface for completeness)*

---

## Linked-List-Based Stack Implementation

*   An alternative to an array-based stack is to use a **singly linked list**.
*   The `top` of the stack is represented by the `head` of the linked list.
*   A `push` operation corresponds to adding an element to the front of the list (`addFirst`).
*   A `pop` operation corresponds to removing the element from the front of the list (`removeFirst`).
*   This approach overcomes the fixed-capacity limitation of an array-based implementation.

---


## Linked-List-Based Stack

*   We only need to maintain a reference to the `head` node (which we'll call `top`) and the `size`.
*   `push(e)`: Creates a new node for `e`, sets its `next` to the current `top`, and then updates `top` to be the new node.
*   `pop()`: Takes the element from the `top` node, updates `top` to `top.getNext()`, and returns the element.


```mermaid
graph TD
    subgraph "Linked Stack"
        direction LR
        Top(("top")) --> A["Node A"]
        A -- "next" --> B["Node B"]
        B -- "next" --> C["Node C"]
        C -- "next" --> Null["null"]
    end
```

---

## LinkedStack Implementation (Java)

```java {*}{maxHeight:'430px'}
public class LinkedStack<E> implements Stack<E> {

    private static class Node<E> {
        private E element;
        private Node<E> next;
        public Node(E e, Node<E> n) {
            element = e;
            next = n;
        }
        public E getElement() { return element; }
        public Node<E> getNext() { return next; }
    }

    private Node<E> top = null;
    private int size = 0;

    public LinkedStack() { }

    @Override
    public int size() { return size; }

    @Override
    public boolean isEmpty() { return size == 0; }

    @Override
    public void push(E e) {
        top = new Node<>(e, top);
        size++;
    }

    @Override
    public E top() {
        if (isEmpty()) throw new EmptyStackException();
        return top.getElement();
    }

    @Override
    public E pop() {
        if (isEmpty()) throw new EmptyStackException();
        E answer = top.getElement();
        top = top.getNext();
        size--;
        return answer;
    }
}
```

---

## Linked-List Stack: Performance

*   **Performance:**
    *   Let $n$ be the number of elements in the stack.
    *   Space complexity: $O(n)$ - each element requires a new node object.
    *   Time complexity: $O(1)$ - all operations (`push`, `pop`, `top`, `size`, `isEmpty`) take constant time because they only involve a few pointer manipulations at the head of the list.
*   **Advantages:**
    *   No fixed capacity; the stack can grow as long as memory is available.
    *   No need to worry about `IllegalStateException` for a full stack.


---

## Example Usage in Java (Generics)

Stacks can be used with different data types thanks to Java Generics.

```java {*}{maxHeight:'350px'}
public class ArrayReverser {

    /** Reverses the elements of an Integer array using a Stack. */
    public static void reverse(Integer[] a) {
        Stack<Integer> buffer = new ArrayStack<>(a.length);
        for (int i = 0; i < a.length; i++) {
            buffer.push(a[i]);
        }
        for (int i = 0; i < a.length; i++) {
            a[i] = buffer.pop();
        }
    }

     /** Reverses the elements of a Float array using a Stack. */
    public static void reverse(Float[] f) {
        Stack<Float> buffer = new ArrayStack<>(f.length);
         for (int i = 0; i < f.length; i++) {
            buffer.push(f[i]);
        }
        for (int i = 0; i < f.length; i++) {
            f[i] = buffer.pop();
        }
    }
}
```

*(Note: Provided a more complete example showing reversal)*

---

## Application: Parentheses Matching

* Problem: Check if delimiters like `()`, `{}`, `[]` are correctly paired and nested in a string.
* **Examples:**
    * Correct: `()(( )){([( )])}`
    * Correct: `((( )(( )){([( )])}`
    * Incorrect: `)(( )){([( )])}` (Closing parenthesis before opening)
    * Incorrect: `({[ ])}` (Mismatched types)
    * Incorrect: `(` (Unmatched opening)

---

## Parentheses Matching Algorithm (Java)

Uses a stack to track opening delimiters.

```java {*}{maxHeight:'350px',lines:true}
public static boolean isMatched(String expression) {
    final String opening = "({["; // Allowed opening delimiters
    final String closing = ")}]"; // Corresponding closing delimiters
    Stack<Character> buffer = new ArrayStack<>(); // Or LinkedStack

    for (char c : expression.toCharArray()) {
        if (opening.indexOf(c) != -1) { // If it's an opening delimiter...
            buffer.push(c);             // ...push it onto the stack.
        } else if (closing.indexOf(c) != -1) { // If it's a closing delimiter...
            if (buffer.isEmpty()) {     // ...and stack is empty, mismatch.
                return false;
            }
            // Check if the closing delimiter matches the top of the stack
            if (closing.indexOf(c) != opening.indexOf(buffer.pop())) {
                return false; // Mismatched delimiter type
            }
        }
    }
    // If stack is empty at the end, all delimiters were matched.
    return buffer.isEmpty();
}
```

*(Note: Used ArrayStack based on previous context, LinkedStack also works)*

---

## Parentheses Matching Algorithm (Java)

Uses a stack to track opening delimiters.

```java {*}{maxHeight:'360px',lines:true }
public static boolean isMatched(String expression) {
    final String opening = "({["; // Allowed opening delimiters
    final String closing = ")}]"; // Corresponding closing delimiters
    Stack<Character> buffer = new ArrayStack<>(); // Or LinkedStack

    for (char c : expression.toCharArray()) {
        if (opening.indexOf(c) != -1) { // If it's an opening delimiter...
            buffer.push(c);             // ...push it onto the stack.
        } else if (closing.indexOf(c) != -1) { // If it's a closing delimiter...
            if (buffer.isEmpty()) {     // ...and stack is empty, mismatch.
                return false;
            }
            // Check if the closing delimiter matches the top of the stack
            if (closing.indexOf(c) != opening.indexOf(buffer.pop())) {
                return false; // Mismatched delimiter type
            }
        }
    }
    // If stack is empty at the end, all delimiters were matched.
    return buffer.isEmpty();
}
```


*(Note: Used ArrayStack based on previous context, LinkedStack also works)*

---

## HTML Tag Matching Algorithm (Java)

Uses a stack to keep track of opened tags.

```java {*}{maxHeight:'380px', lines:true}
public static boolean isHTMLMatched(String html) {
    Stack<String> buffer = new ArrayStack<>(); // Use a stack for tag names
    int j = html.indexOf('<'); // Find the first '<'

    while (j != -1) {
        int k = html.indexOf('>', j + 1); // Find the matching '>'
        if (k == -1) {
            return false; // Invalid tag structure
        }
        String tag = html.substring(j + 1, k); // Extract the tag name

        if (!tag.startsWith("/")) { // If it's an opening tag...
            buffer.push(tag);       // ...push it onto the stack.
        } else { // If it's a closing tag...
            if (buffer.isEmpty()) {
                return false; // No opening tag to match
            }
            // Check if the closing tag matches the tag on top of the stack
            if (!tag.substring(1).equals(buffer.pop())) {
                return false; // Mismatched tag names
            }
        }
        j = html.indexOf('<', k + 1); // Find the next '<'
    }
    // If the stack is empty, all tags were matched.
    return buffer.isEmpty();
}
```

---

## Application: Evaluating Arithmetic Expressions

* Example: `14 – 3 * 2 + 7` should be evaluated as `(14 – (3 * 2)) + 7`.
* Need to consider:
    * **Operator Precedence:** `*` and `/` have higher precedence than `+` and `-`.
    * **Associativity:** Operators of the same precedence are usually evaluated left-to-right (e.g., `x - y + z` is `(x - y) + z`).
* **Idea:** Use two stacks. One for values (`valStk`) and one for operators (`opStk`). Process tokens, performing operations based on precedence rules.

---

## Algorithm for Evaluating Expressions

Uses two stacks: `valStk` for numbers, `opStk` for operators.

```text {*}{maxHeight:'350px',lines:true}
Algorithm doOp(): // Performs one operation
  x = valStk.pop()
  y = valStk.pop()
  op = opStk.pop()
  valStk.push( y op x ) // Apply operator

Algorithm repeatOps( refOp ): // Performs ops based on precedence
  // While stack has operands & top op has >= precedence than refOp
  while ( valStk.size() > 1 AND prec(refOp) <= prec(opStk.top()) ):
    doOp()

Algorithm EvalExp():
  Input: Stream of tokens (numbers, operators)
  Output: Value of the expression

  // Use $ as a special end-of-input marker with lowest precedence
  while there’s another token z:
    if isNumber(z):
      valStk.push(z)
    else: // It's an operator
      repeatOps(z) // Perform higher/equal precedence ops first
      opStk.push(z)

  repeatOps($) // Perform remaining operations
  return valStk.top() // Final result
```

*(Note: `prec(op)` is a function returning precedence level)*

---
layout: two-cols
---
## Expression Evaluation Example Trace

<transform scale="0.68">
Expression: `14 – 3 * 2 + 7` (processed token by token)

| Token | Action | `valStk` | `opStk` | Comment |
|:---|:---|:---|:---|:---|
| 14 | push(14) | (14) | () | Push value |
| – | push(–) | (14) | (–) | `opStk` was empty |
| 3 | push(3) | (14, 3) | (–) | Push value |
| * | push(*) | (14, 3) | (–, *) | `prec(*)` > `prec(–)` |
| 2 | push(2) | (14, 3, 2) | (–, *) | Push value |

</transform>

:: right ::

<transform scale="0.65">

| Token | Action | `valStk` | `opStk` | Comment |
|:---|:---|:---|:---|:---|
| + | `prec(+)` <= `prec(*)` -> doOp(*) | (14, 6) | (–) | Pop *, 3, 2; push 6 |
| | `prec(+)` <= `prec(–)` -> doOp(–) | (8) | () | Pop –, 6, 14; push 8 |
| | push(+) | (8) | (+) | Now push + |
| 7 | push(7) | (8, 7) | (+) | Push value |
| end | `opStk` not empty -> doOp(+) | (15) | () | Pop +, 7, 8; push 15 |
| | return top | 15 | | Final result |

*(Note: Simplified trace, actual precedence check might vary slightly)*

</transform>


---

## Application: Computing Spans

* **Problem:** Given an array `X`, find the **span** `S[i]` for each element `X[i]`.
* The span `S[i]` is the maximum number of *consecutive* elements `X[j]` immediately preceding `X[i]` (including `X[i]`) such that `X[j] <= X[i]`.
* Used in applications like financial analysis (e.g., number of consecutive days stock price was less than or equal to today's price).

**Example:**
X = [6, 3, 4, 5, 2]
S = [1, 1, 2, 3, 1]

---

## Computing Spans: Quadratic Algorithm

A straightforward, but less efficient, approach.

```text
Algorithm spans1(X):
  Input: array X of n integers
  Output: array S of spans of X

  S = new array of size n
  for i from 0 to n - 1:
    s = 1 // Initialize span for X[i]
    // Look backwards while preceding elements are <= X[i]
    while s <= i AND X[i - s] <= X[i]:
      s = s + 1
    S[i] = s // Store the calculated span
  return S
```

* This algorithm involves nested loops (the `while` loop inside the `for` loop).
* In the worst case, the inner loop might run up to `i` times for each `i`.
* The total time complexity is **$O(n²)$**.

---

## Computing Spans: Using a Stack

* A more efficient approach uses a stack to store indices of elements.
* The stack helps find the nearest preceding element `X[j]` that is *greater* than the current element `X[i]`.
* **Process:**
    1.  Scan the array `X` from left to right (index `i`).
    2.  While the stack is not empty and the element at the index on top of the stack (`X[stack.top()]`) is less than or equal to the current element `X[i]`, pop from the stack. (These popped elements cannot be the boundary for `X[i]`'s span).
    3.  If the stack becomes empty, it means all preceding elements are less than or equal to `X[i]`. The span `S[i]` is `i + 1`.
    4.  If the stack is not empty, the index `j` remaining on top is the index of the first preceding element *greater* than `X[i]`. The span `S[i]` is `i - j`.
    5.  Push the current index `i` onto the stack.

---

## Computing Spans: Linear Time Algorithm

```text {*}{maxHeight:'300px'}
Algorithm spans2(X):
  Input: array X of n integers
  Output: array S of spans of X

  S = new array of size n
  A = new empty stack // Stack stores indices

  for i from 0 to n - 1:
    // Pop indices j while X[j] <= X[i]
    while (NOT A.isEmpty() AND X[A.top()] <= X[i]):
      A.pop()

    // Determine span based on stack state
    if A.isEmpty():
      S[i] = i + 1 // No preceding element is greater
    else:
      S[i] = i - A.top() // A.top() is index of first preceding element > X[i]

    A.push(i) // Push current index onto stack

  return S
```

* Each array index `i` is pushed onto the stack exactly once.
* Each index is popped from the stack at most once.
* The total time spent in the `while` loop across all iterations of the `for` loop is proportional to `n`.
* Therefore, the overall time complexity is **$O(n)$**.

---

## Summary: Stacks

*   **Principle:** Last-In, First-Out (LIFO).
*   **Core Operations:** `push`, `pop`, `top`, `isEmpty`, `size`.
*   **Implementations:**
    *   **Array-Based:**
        *   **Pros:** Simple, memory-efficient.
        *   **Cons:** Fixed capacity.
        *   **Performance:** $O(1)$ for all operations.
    *   **Linked-List-Based:**
        *   **Pros:** Dynamic capacity.
        *   **Cons:** Slightly more memory overhead per element.
        *   **Performance:** $O(1)$ for all operations.
*   **Key Applications:** Managing function calls (JVM), undo/redo, parsing expressions, and algorithm components.
