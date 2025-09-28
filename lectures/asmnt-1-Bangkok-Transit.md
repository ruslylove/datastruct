---
# Frontmatter for Slidev configuration
title: 'DSA Assignment: Bangkok Transit Navigator'
transition: slide-left
theme: seriph
layout: cover
background: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bangkok_BTS_01.jpg/960px-Bangkok_BTS_01.jpg
---

# DSA Assignment: Bangkok Transit Navigator
## {{ $slidev.configs.subject }}
### Semester {{ $slidev.configs.semester }}

---
layout: two-cols
---

## Objectives

*   Apply graph theory and shortest path algorithms to a real-world problem.
*   Model the Bangkok mass transit network as a graph.
*   Implement an algorithm to find the most efficient route between any two stations.
*   Analyze and justify crucial design decisions regarding data structures and algorithms, demonstrating your understanding of their trade-offs.

:: right ::

<img src="https://www.thailandselftours.com/images/Maps/bangkok_transport.jpg" style="width: 400px"/>

---

## Project Description

You are tasked with building a "Bangkok Transit Navigator." This program will:

*   Take a starting station and a destination station as input.
*   Output the best route based on a defined cost metric.
*   Focus on three key areas: representation, algorithm implementation, and design justification.

---

## Part 1: Graph Representation & Modeling (The Data Structure)

Your first task is to convert the provided transit map into a graph data structure.

* **Vertices (Nodes):** Each station on the map (e.g., 'Siam' , 'Asok' , 'Tao Poon' ) will be a vertex in your graph.
* **Edges:** An edge will connect two vertices if the corresponding stations are adjacent on the same line. For example, there is an edge between 'Phrom Phong' and 'Thong Lo' on the Sukhumvit Line.
* **Weights (Cost):** You must assign a weight to each edge. You must also account for the "cost" of transferring between lines.

---

### 1. Choosing a Graph Data Structure

* **Task:** Represent the network of stations and connections using a graph. You must choose the underlying data structure for this graph. Common choices include an adjacency list or an adjacency matrix.
* **Justification:** In your report, you must justify your choice. Analyze the Bangkok transit network ---is it sparse (few connections relative to the number of stations) or dense? Based on this, explain why your chosen structure is superior in terms of space complexity and the time complexity of operations required by your pathfinding algorithm (e.g., iterating over a station's neighbors).

---

### 2. Choosing a Weighting Model

* **Task:** Assign a "cost" to traveling through the network. Choose one of the following models to define what "shortest path" means.
* **Model A (Fewest Stations):** The cost between any two adjacent stations is 1. The cost of a transfer is 0. This model finds the route with the minimum number of stops.
* **Model B (Time-Based - Recommended):** This model is more realistic. Assume travel time between adjacent stations is 3 minutes and the penalty for a line transfer at an interchange station (e.g., Asok-Sukhumvit) is 10 minutes.
* **Justification:** In your report, state which model you chose. Explain the logic of your implementation, detailing how you incorporated the transfer penalty into your graph or algorithm if you chose Model B.

---

## Part 2: Shortest Path Algorithm (The Algorithm)

* **Task:** Implement Dijkstra's algorithm to find the shortest path between a start and end station. For Dijkstra's to be efficient, it must be paired with a priority queue. You can implement the priority queue using different underlying data structures, such as a binary heap or even a simple sorted array/list.
* **Justification:** In your report, specify the data structure you used to implement your priority queue. Justify your choice by comparing its time complexity for key operations (insert and extract-min) against other alternatives and explain why it is a suitable choice for this problem.

Your program's output must clearly state:

* The optimal route as an ordered list of stations.
* The total cost of the route .

---

## Part 3: User Interface

Create a simple command-line interface that:

* Prompts the user to enter a starting station.
* Prompts the user to enter a destination station.
* Prints the calculated shortest path and total cost (either the total number of stations for Model A, or the total estimated minutes for Model B)
* Includes basic error handling for invalid station names.

---

## Data

*   To simplify data entry, you are not required to transcribe the map yourself.
*   You will be provided with a `connections.csv` file containing all the direct links between stations.
    *   The format of the file is: `station_A,station_B,line_name`
*   You will need to write code to parse this file to build your graph in memory when the program starts.

---
layout: two-cols-header
---

## Deliverables
* **Source Code:** All of your source code files, well-commented and organized.
:: left ::
* **Report:**<br>
A brief report containing:
    * Your name and Student ID.
    * Instructions on how to compile and run your program.
    * A description of the data structures you used to implement the graph (e.g., adjacency list, adjacency matrix).
    * Which weighting model (A or B) you chose and a brief justification.

:: right::

* An "Analysis and Justification" section detailing:
    * Graph Representation: Your choice of data structure and the reasoning behind it (sparsity, time/space complexity).
    * Weighting Model: Which model you chose and how you implemented the logic for costs and transfers.
    * Priority Queue: The data structure you used and why it was an effective choice for Dijkstra's algorithm.
* Example output for a query from:
    * 'Bang Wa' to 'Lat Phrao' .
    * 'Lak Song' to 'Kheha'.

---

## Grading Rubric

Your project will be graded based on the following criteria:

* **Correctness & Functionality (50%)**
    * Graph is correctly constructed from the data file.
    * Shortest path algorithm produces the correct route and cost.
    * The program runs without errors and handles bad input gracefully.
* **Analysis & Justification (30%)**
    * Your report provides clear, well-reasoned justifications for your choice of data structures for the graph and priority queue, referencing algorithmic complexity.
    * Your explanation of the weighting model implementation is logical and clear.
* **Code Quality & Documentation (20%)**
    * Code is readable, clean, and appropriately commented.
    * The README file is well-written and complete.

---

## 🎁 Bonus Challenges (Optional for Extra Credit)

* **Fewest Transfers:** In addition to the primary path, calculate a secondary path that prioritizes the fewest number of transfers, even if it takes longer.
* **Line Visualization:** In your output, print the line (e.g., 'MRT Blue Line') the traveler should be on for each segment of the journey.
* **Exclude a Station:** Allow the user to specify a station to "close" for maintenance, and calculate the best detour.