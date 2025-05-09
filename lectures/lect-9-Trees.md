---
# Frontmatter for Slidev configuration
title: 'Trees'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Trees
### Algorithm and Data Structures
### semester 1/2025
### Dr. Ruslee Sutthaweekul

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="2"/>


---
layout: two-cols
---
## What is a Tree?

* In computer science, a **tree** is an abstract representation of a hierarchical structure.
* It's composed of **nodes** connected by a **parent-child** relationship.
* **Common Applications:**
    * Organizational charts.
    * File systems (directories and files).
    * Structure in programming environments (e.g., syntax trees).
:: right ::
<img src="./img/tree_wahtisatree.png" style="padding-left:30px;padding-top:50px"/>

---
layout: two-cols
---
## Tree Terminology

* **Root:** The unique node with no parent (e.g., A).
* **Internal Node:** A node possessing at least one child (e.g., A, B, C, F).
* **External Node (Leaf):** A node without any children (e.g., E, I, J, K, G, H, D).
* **Ancestors:** Parent, grandparent, great-grandparent, etc., tracing back to the root.
* **Descendants:** Child, grandchild, great-grandchild, etc., tracing down from a node.
* **Subtree:** The portion of the tree consisting of a node and all its descendants.
* **Depth:** The number of ancestors a node has (root depth is 0).
* **Height:** The maximum depth among all nodes in the tree.
:: right ::
<img src="./img/tree_terminology.png" style="padding-left:30px"/>

---

## Tree Abstract Data Type (ADT)

* We use the concept of **Positions** to abstractly refer to nodes.

<transform scale="0.8">

* **Generic Methods:**
    * `size()`: Returns the total number of nodes.
    * `isEmpty()`: Checks if the tree has any nodes.
    * `iterator()`: Provides an iterator for the elements (often based on a traversal).
    * `positions()`: Returns an iterable collection of all node positions.
* **Accessor Methods:**
    * `root()`: Returns the position of the root node.
    * `parent(p)`: Returns the position of the parent of `p`.
    * `children(p)`: Returns an iterable collection of the positions of `p`'s children.
    * `numChildren(p)`: Returns the count of `p`'s children.
* **Query Methods:**
    * `isInternal(p)`: Checks if `p` is an internal node.
    * `isExternal(p)`: Checks if `p` is an external node (leaf).
    * `isRoot(p)`: Checks if `p` is the root node.

*(Note: Update methods like add/remove are usually defined by specific tree implementations)*

</transform>

---

## Tree Interface in Java

A possible Java interface definition for the Tree ADT:

```java {*}{maxHeight:'380px',lines:true}
import java.util.Iterator;

/** An interface for a tree where nodes can have an arbitrary number of children. */
public interface Tree<E> extends Iterable<E> {

    Position<E> root();
    Position<E> parent(Position<E> p) throws IllegalArgumentException;
    Iterable<Position<E>> children(Position<E> p) throws IllegalArgumentException;
    int numChildren(Position<E> p) throws IllegalArgumentException;

    boolean isInternal(Position<E> p) throws IllegalArgumentException;
    boolean isExternal(Position<E> p) throws IllegalArgumentException;
    boolean isRoot(Position<E> p) throws IllegalArgumentException;

    int size();
    boolean isEmpty();

    // Methods inherited from Iterable<E>
    Iterator<E> iterator();

    // Method to get positions
    Iterable<Position<E>> positions();
}

// Note: Position<E> would be another interface/class defining getElement()
// and potentially other position-related methods.

```

---

## Tree Traversal: Preorder

* **Traversal:** A systematic way to visit every node in a tree.
* **Preorder Traversal:** A node is visited *before* its descendants.
* **Algorithm:**

```text
Algorithm preOrder(v):
  visit(v) // Process the current node v
  for each child w of v:
    preOrder(w) // Recursively traverse the subtree rooted at w

```

* **Application:** Useful for printing structured documents, like outlining sections and subsections in order.
<img src="./img/tree_preorder.png" style="height:200px"/>

---

## Tree Traversal: Postorder

* **Postorder Traversal:** A node is visited *after* all its descendants have been visited.
* **Algorithm:**

```text
Algorithm postOrder(v):
  for each child w of v:
    postOrder(w) // Recursively traverse the subtree rooted at w
  visit(v) // Process the current node v

```

* **Application:** Useful for computing space used by files in a directory structure (calculate subdirectory sizes first, then add the directory's own size).

<img src="./img/tree_postorder.png" style="height:200px"/>

---

## Binary Trees

* A specialized type of tree where each node has **at most two** children.
* **Properties:**
    * Each node has a potential left child and a potential right child.
    * A node's children form an ordered pair (left child comes before right child).
* **Applications:**
    * Arithmetic expressions.
    * Decision processes.
    * Binary search trees.
<img src="./img/tree_binarytree.png" style="height:200px"/>

---

## Binary Tree ADT

Extends the basic Tree ADT with methods specific to binary trees:

* `left(p)`: Returns the `Position` of the left child of `p` (or null if none).
* `right(p)`: Returns the `Position` of the right child of `p` (or null if none).
* `sibling(p)`: Returns the `Position` of the sibling of `p` (the other child of `p`'s parent, or null if none).

---

## Binary Tree Interface in Java

Extends the `Tree` interface.

```java
/** An interface for a binary tree, where each node has at most two children. */
public interface BinaryTree<E> extends Tree<E> {

    /** Returns the Position of p's left child (or null if no left child). */
    Position<E> left(Position<E> p) throws IllegalArgumentException;

    /** Returns the Position of p's right child (or null if no right child). */
    Position<E> right(Position<E> p) throws IllegalArgumentException;

    /** Returns the Position of p's sibling (or null if no sibling). */
    Position<E> sibling(Position<E> p) throws IllegalArgumentException;

    // Methods inherited from Tree: root, parent, children, numChildren,
    // isInternal, isExternal, isRoot, size, isEmpty, iterator, positions
}

```

---

## Properties of Binary Trees

Let `n` be the number of nodes, `e` the number of external nodes (leaves), `i` the number of internal nodes, and `h` the height.

* `n = i + e` (Total nodes = internal + external)
* `e = i + 1` (Number of leaves is one more than internal nodes)
* `n = 2e - 1` (Total nodes in terms of leaves)
* `h >= log₂(n)` (Height is at least logarithmic in the number of nodes)
* `h >= log₂(i + 1)`
* `h >= log₂(e) - 1`

---

## Binary Tree Traversal: Inorder

* Specific to binary trees.
* A node is visited *after* its left subtree and *before* its right subtree.
* **Algorithm:**

```text
Algorithm inOrder(v):
  if v has a left child u then
    inOrder(u) // Traverse left subtree
  visit(v) // Process the current node v
  if v has a right child w then
    inOrder(w) // Traverse right subtree

```

* **Application:** Useful for visiting nodes in a binary search tree in ascending order.

<img src="./img/tree_inorder.png" style="height:200px"/>

---

## Binary Tree Traversal: Applications

* **Preorder:** Useful for creating a prefix representation of an expression tree. `+ * 2 5 - 3 1`
* **Postorder:** Useful for creating a postfix representation (Reverse Polish Notation). `2 5 * 3 1 - +`
* **Inorder:** Useful for creating the standard infix representation (requires parentheses for correctness). `(2 * 5) + (3 - 1)`

(Diagram of an expression tree: `+` root, left child `*`, right child `-`. `*` has children `2`, `5`. `-` has children `3`, `1`.)

---

## Evaluating Arithmetic Expressions (Binary Tree)

* A specialized postorder traversal can evaluate an expression tree.
* **Algorithm:**

```text
Algorithm evaluateExpression(v):
  if isInternal(v) then // v is an operator
    x = evaluateExpression(left(v))
    y = evaluateExpression(right(v))
    return x OPERATOR y // Apply operator stored at v
  else // v is an external node (operand)
    return value_stored_at_v

```

(Diagram of the expression tree used previously, showing evaluation steps)

---

## Euler Tour Traversal (Binary Trees)

* A generic way to traverse a binary tree that encompasses preorder, inorder, and postorder.
* Imagine "walking around" the tree. Each node is encountered three times:
    1.  From the left (corresponds to preorder visit).
    2.  From below (corresponds to inorder visit).
    3.  From the right (corresponds to postorder visit).

(Diagram showing the path of an Euler tour around a binary tree, marking L, B, R visits)

---

## Linked Structure for General Trees

* A node can be represented by an object containing:
    * The element.
    * A reference to the parent node.
    * A sequence (e.g., a List or Array) of references to its children nodes.
* These node objects implement the `Position` ADT concept.

(Diagram showing node objects with element, parent pointer, and a list/array of child pointers)

---

## Linked Structure for Binary Trees

* A node representation optimized for binary trees:
    * The element.
    * A reference to the parent node.
    * A reference to the left child node.
    * A reference to the right child node.
* Again, these node objects implement the `Position` ADT concept.

(Diagram showing binary tree node objects with element, parent, left child, and right child pointers)
