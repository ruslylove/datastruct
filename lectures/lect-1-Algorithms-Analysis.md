---
title: 'Analysis of Algorithms'
# Cover Page / Title Slide (Level 1)
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
# Based on Presentation for use with the textbook Data Structures and Algorithms in Java, 6th edition, by M. T. Goodrich, R. Tamassia, and M. H. Goldwasser, Wiley, 2014
---

# Analysis of Algorithms
## {{ $slidev.configs.subject }}
### Semester {{ $slidev.configs.semester }}
<br>

### Presented by {{ $slidev.configs.presenter }}

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="2"/>

---
layout: two-cols
---

## What is Algorithm Analysis?

Algorithm analysis is the study of how an algorithm performs and scales.

*   **Input:** Data provided to the algorithm.
*   **Algorithm:** A sequence of steps to solve a problem.
*   **Output:** The result produced by the algorithm.

The time an algorithm takes typically **increases with the input size**. We often focus on the **worst-case running time** because it provides a guaranteed upper bound on performance, which is crucial for real-time applications.

:: right ::

<img src="/lectures/img/algorithm_concept.png" />

---
layout: two-cols
---

## Approaches to Analysis

There are two main ways to analyze an algorithm's performance.

<Transform scale="0.8">

| **Experimental Analysis** | **Theoretical Analysis** |
| :--- | :--- |
| Implement the algorithm and measure its performance on a computer. | Use a high-level description of the algorithm to mathematically determine its performance. |
| Measures actual running time in seconds. | Characterizes running time as a function of the input size, `n`. |
| Depends on specific hardware and software. | Independent of any specific computer. |

</Transform>

:: right ::

<img src="/analysis_experiment.png">

---

## Limitations of Experimental Analysis

While useful, experiments have significant drawbacks:

*   **Implementation Effort:** Coding and testing an algorithm can be time-consuming.
*   **Limited Scope:** Results are only valid for the specific inputs and environment tested.
*   **Difficult to Compare:** To compare algorithms fairly, tests must run on identical hardware and software, which is not always feasible.

Because of these limitations, **theoretical analysis** is the standard tool for computer scientists.

<img src="/lectures/img/environment_dependency.png" style="height:250px;margin:auto;padding-bottom:40px"/>

---
layout: two-cols
---

## The Framework for Theoretical Analysis

To analyze algorithms theoretically, we use a common framework.

*   **Pseudocode:** A high-level language that is more structured than English but less detailed than actual code. It allows us to focus on the logic without worrying about implementation details.
*   **RAM Model:** An abstract computer model with a CPU and a memory bank. We assume that accessing any memory cell or performing any basic instruction takes a fixed amount of **unit time**.

:: right ::

$$
\begin{array}{l}
\hline
\textbf{procedure } \text{BubbleSort}(A) \\
\hline
\quad n \leftarrow \text{length of } A \\
\quad \textbf{for } i \leftarrow 0 \textbf{ to } n-1 \textbf{ do} \\
\qquad \textbf{for } j \leftarrow 0 \textbf{ to } n-i-2 \textbf{ do} \\
\qquad \quad \textbf{if } A[j] > A[j+1] \textbf{ then} \\
\qquad \qquad \text{swap } A[j] \text{ and } A[j+1] \\
\qquad \quad \textbf{end if} \\
\qquad \textbf{end for} \\
\quad \textbf{end for} \\
\textbf{end procedure}
\end{array}
$$

---

## Primitive Operations

*   These are the fundamental computations an algorithm performs, identifiable in pseudocode.
*   We assume each primitive operation takes a constant amount of time in the RAM model.
*   **Examples:**
    *   Evaluating an expression (e.g., `x + y`)
    *   Assigning a value to a variable (e.g., `x ← 5`)
    *   Indexing into an array (e.g., `A[i]`)
    *   Calling or returning from a method

The goal of theoretical analysis is to count the number of primitive operations an algorithm will execute as a function of its input size, `n`.

---

## Counting Operations: An Example

Let's count the primitive operations for an algorithm that finds the maximum element in an array.

<img src="./img/analysis_arraymax.png" style="height:200px; padding-top:20px"/>

*   By examining the pseudocode, we can count the maximum number of operations for each step.
*   The total number of operations is the sum of these counts. For `arrayMax`, <br> this comes out to be $c''+(n - 1)c'$ in the worst case.
*   The key takeaway is that the running time is expressed as a function of the input size `n`, <br> like `f(n) = 2+(n - 1)`.

---
layout: two-cols
---

## From Counting to Growth Rate

The exact number of operations (e.g., `8n - 2`) is not as important as the **growth rate** of the function.

*   As the input size `n` gets very large, the highest-order term (like `8n`) dominates the function's value.
*   Constant factors (`8`) and lower-order terms (`-2`) become insignificant.
*   Therefore, we can say the growth rate of `8n - 2` is **linear**.

This focus on the growth rate is called **asymptotic analysis**.

:: right ::

<img src="/analyis_growthrate.png" style="padding-top:50px">



---

## Asymptotic Notation: O, Ω, Θ

We use special notation to describe asymptotic growth rates.

*   **`O(g(n))` (Big-Oh):** An **upper bound**. `f(n)` grows **no faster than** `g(n)`.
    *   `f(n) ≤ c * g(n)` for some constant `c > 0` and for all `n ≥ n₀`.

*   **`Ω(g(n))` (Big-Omega):** A **lower bound**. `f(n)` grows **at least as fast as** `g(n)`.
    *   `f(n) ≥ c * g(n)` for some constant `c > 0` and for all `n ≥ n₀`.

*   **`Θ(g(n))` (Big-Theta):** A **tight bound**. `f(n)` grows **at the same rate as** `g(n)`.
    *   `f(n)` is both `O(g(n))` and `Ω(g(n))`.

---
layout: two-cols
---

## Big-Oh in Practice

Big-Oh is the most common notation. It gives us an upper bound on the worst-case running time.

**Rules of Thumb:**
1.  If `f(n)` is a polynomial of degree `d`, then `f(n)` is `O(nᵈ)`.
    *   Drop lower-order terms.
    *   Drop constant factors.
2.  Use the smallest appropriate class. Say `2n` is `O(n)`, not `O(n²)`.
3.  Use the simplest expression. Say `3n + 5` is `O(n)`, not `O(3n)`.

:: right ::

**Examples:**
*   `8n - 2` is `O(n)`.
*   `10⁵n² + 10⁸n` is `O(n²)`.
*   `3n³ + 20n² + 5` is `O(n³)`
*   `3 log n + 5` is `O(log n)`.

<img src="https://media.licdn.com/dms/image/v2/D4E12AQEvsKZNftrL5w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1734702748422?e=2147483647&v=beta&t=Mp0AfdcOaVE6TQlsFmj-CIw9i9C0hXvAWk61IYqeH9w" style="height:250px;padding-top:10px"/>

---

## Case Study 1: Prefix Averages

**Problem:** Given an array `X`, compute an array `A` where `A[i]` is the average of `X[0]` through `X[i]`.

### A Naive `O(n²)` Solution

A straightforward approach uses nested loops. The outer loop iterates through each element `i`, and the inner loop sums up all elements from `0` to `i`.

```txt
Algorithm prefixAverage1(X):
  A = new array of size n
  for i = 0 to n-1 do
    s = 0
    for j = 0 to i do
      s = s + X[j]
    A[i] = s / (i + 1)
  return A
```

The inner loop's operations form the sum `1 + 2 + ... + n`, which is `n(n+1)/2`. This is `O(n²)`.

---

## An Efficient `O(n)` Solution

We can make this much faster by keeping a running sum.

```txt
Algorithm prefixAverage2(X):
  A = new array of size n
  s = 0
  for i = 0 to n-1 do
    s = s + X[i]
    A[i] = s / (i + 1)
  return A
```

This version has only one loop and performs a constant number of operations per iteration. Its running time is **`O(n)`**, a significant improvement over `O(n²)`. Analysis helped us find a better algorithm!

---

## Case Study 2: Searching

### Linear Search: `O(n)`
Sequentially checks each element in a list until a match is found. In the worst case, it must check all `n` elements.

**Example:** Find `7` in `[4, 9, 2, 7, 5]`.
1. Check `4`... No.
2. Check `9`... No.
3. Check `2`... No.
4. Check `7`... **Yes!**

---

## Binary Search: `O(log n)`
Efficiently finds an element in a **sorted** list by repeatedly dividing the search interval in half.

**Example:** Find `7` in the sorted list `[2, 4, 5, 7, 9]`.
1. Middle is `5`. `7 > 5`, so search the right half: `[7, 9]`.
2. New middle is `7`. `7 == 7`... **Yes!**

With each step, we eliminate half the remaining elements.

---

## $O(n)$ vs. $O(\log n)$: The Impact

The choice of algorithm has a dramatic impact on performance as data size increases.

| Algorithm | Big-O | For 1,000,000 items... |
|---|---|---|
| **Linear Search** | $O(n)$ | ...could take up to **1,000,000** steps. |
| **Binary Search**| $O(\log n)$ | ...would take at most **20** steps. |

---

## Summary

*   **Algorithm analysis** helps us predict performance and scalability.
*   **Asymptotic analysis** focuses on growth rates for large input sizes, ignoring constant factors and lower-order terms.
*   **Big-Oh (`O`) notation** gives an **upper bound** (worst-case) on the growth rate and is a key tool for classifying algorithms.
*   Choosing an algorithm with a lower growth rate (e.g., `O(n)` vs. `O(n²)`) can lead to massive performance gains.

---

## Mathematical Background

Concepts frequently used in algorithm analysis:

*   **Summations:** Especially `1 + 2 + ... + n = n(n+1)/2`.
*   **Powers:** Rules like `a^(b+c) = a^b * a^c`, `(a^b)^c = a^(bc)`.
*   **Logarithms:** Rules like `log(xy) = log x + log y`, `log(x^a) = a log x`, and the change of base formula.
*   **Proof Techniques:** Induction and contradiction.