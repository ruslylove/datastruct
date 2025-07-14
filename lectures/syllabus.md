---
layout: image-right
image: "https://images.thenile.io/r1000/9781118808573.jpg"
---

## Course Information

* **Course Number:** 010153103
* **Credits:** 3 (3-0-6)
* **Lecture Hours:** 3 hours per week (incl. class exercises)
* **Course Type:** Required
* **Prerequisites:** 010153002 Computer Programming
* **Textbook:**
    * Goodrich, Michael T., Roberto Tamassia, and Michael H. Goldwasser. *Data structures and algorithms in Java, 6th Edition*, John Wiley & Sons, 2014.

---
layout: two-cols
image: https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8a5a4fc-5cc9-44db-b8ca-08dd83c34737_1160x1384.png
---

## Course Description

This course requires students to understand basic data structures for computer programming development, including 
* lists 
* stacks 
* queues 
* trees
* graphs

The course also covers fundamental algorithms for
* sorting 
* searching
* recursion

:: right ::

<div style="padding-left:100px">

```mermaid {scale:0.4}
graph LR
    %% Define styles for each data structure
    classDef list fill:#87CEEB,stroke:#277996,stroke-width:2px;
    classDef null fill:#f2f2f2,stroke:#999,stroke-width:1px;

    classDef root fill:#90EE90,stroke:#2E8B57,stroke-width:2px;
    classDef child fill:#FFA07A,stroke:#CD5C5C,stroke-width:2px;
    classDef leaf fill:#FFD700,stroke:#B8860B,stroke-width:2px;

    classDef gNode fill:#D8BFD8,stroke:#8A2BE2,stroke-width:2px;

    subgraph List 
        direction LR
        L1[Node A] --> L2[Node B] --> L3[Node C] --> L4[Null]
    end

    subgraph Tree
        T1(Root) --> T2(Child)
        T1 --> T3(Child)
        T2 --> T4(Leaf)
        T2 --> T5(Leaf)
        T3 --> T6(Leaf)
    end

    subgraph Graph
        G1(Node 1) --- G2(Node 2)
        G2 --- G3(Node 3)
        G3 --- G1(Node 1)
        G3 --- G4(Node 4)
        G4 --- G1(Node 1)
    end

    %% Apply styles to the nodes
    class L1,L2,L3 list;
    class L4 null;

    class T1 root;
    class T2,T3 child;
    class T4,T5,T6 leaf;

    class G1,G2,G3,G4 gNode;
```

</div>




---

## Course Learning Outcomes (CLOs)

Upon successful completion of this course, students will be able to:

1.  Demonstrate a good understanding of linear data structures, including arrays, linked lists, stacks, and queues.
2.  Implement abstract data types effectively.
3.  Understand non-linear data structures, including trees and graphs.
4.  Select and use appropriate data structures to solve specific problems.
5.  Understand and implement sorting, searching, and hashing algorithms.
6.  Choose and apply appropriate algorithms to solve specific problems.

---

## Course Topics

* Arrays
* Stacks, Queues, and Deques
* Lists and Iterator 
* Trees/Binary Trees
* Priority Queues and Heap
* Maps and Hash Tables
* Search Trees
* Sorting and Searching
* Graphs

---
layout: two-cols
---

## Assessment and Grading

**Assessment Tools:**
* Exams - 80%
* Assignments - 20%

<br>
```mermaid {scale:0.6}
pie
    title Assessment Breakdown
    "Exams" : 80
    "Assignments" : 20
```

:: right ::

**Grading Plan:**
* **81-100:** A
* **76-80:** B+
* **71-75:** B
* **61-70:** C+
* **51-60:** C
* **46-50:** D+
* **40-45:** D
* **0-39:** F

<div style="position:fixed;right:0;top:0;padding-right:190px;padding-top:30px">
```mermaid {scale:0.6}
graph BT

    A["A (81-100)"]
    Bplus["B+ (76-80)"]
    B["B (71-75)"]
    Cplus["C+ (61-70)"]
    C["C (51-60)"]
    Dplus["D+ (46-50)"]
    D["D (40-45)"]
    F["F (0-39)"]

    F --> D --> Dplus --> C --> Cplus --> B --> Bplus --> A

    %% Style Definitions for Grades
    classDef gradeA fill:#2E8B57,color:white,stroke:#1d5937,stroke-width:2px
    classDef gradeB fill:#90EE90,color:black,stroke:#639a63,stroke-width:2px
    classDef gradeC fill:#FFD700,color:black,stroke:#b8860b,stroke-width:2px
    classDef gradeD fill:#FFA07A,color:black,stroke:#b36240,stroke-width:2px
    classDef gradeF fill:#CD5C5C,color:white,stroke:#8b3e3e,stroke-width:2px

    %% Assign styles to nodes
    class A gradeA
    class B,Bplus gradeB
    class C,Cplus gradeC
    class D,Dplus gradeD
    class F gradeF
```
</div>
