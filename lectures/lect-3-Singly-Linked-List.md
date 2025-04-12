---
title: 'Singly Linked Lists'
presenter: 'Dr. Ruslee Sutthaweekul'
course: 'Algorithm and Data Structures'
semester: '1/2025'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev

# Based on Presentation for use with the textbook Data Structures and Algorithms in Java, 6th edition, by M. T. Goodrich, R. Tamassia, and M. H. Goldwasser, Wiley, 2014
---

# Singly Linked List
### Algorithm and Data Structures
### semester 1/2025
### Dr. Ruslee Sutthaweekul

---

# Singly Linked Lists: Introduction

A singly linked list is a data structure built from a sequence of nodes.

* It starts with a reference called the **head**.
* Each **node** contains:
    * An **element** (the data stored).
    * A **next** reference (or link) pointing to the subsequent node in the sequence.
* The last node's `next` reference points to `null`.

(Diagram showing head pointing to node A, which points to B, then C, then D, which points to null (Ø))

---

# Implementing Nodes: A Nested Class

We often define the `Node` structure as a private static nested class within the linked list class itself. This encapsulates the node's details.

```java {*}{maxHeight:'350px'}
// Outer SinglyLinkedList class declaration
public class SinglyLinkedList<E> {

    //----- nested Node class -----
    private static class Node<E> {
        private E element;         // Data stored in this node
        private Node<E> next;      // Reference to the next node

        // Constructor for Node
        public Node(E e, Node<E> n) {
            element = e;
            next = n;
        }

        // Accessor methods for Node fields
        public E getElement() { return element; }
        public Node<E> getNext() { return next; }

        // Modifier method for the next reference
        public void setNext(Node<E> n) { next = n; }
    } //----------- end of nested Node class -----------

    // Remainder of the SinglyLinkedList class implementation follows...
}
```

---

# SinglyLinkedList Class Structure

The main `SinglyLinkedList` class manages the nodes.

```java {*}{maxHeight:'350px'}
public class SinglyLinkedList<E> {
    // (Nested Node class defined here previously)

    // Instance variables for the list
    private Node<E> head = null;   // Reference to the first node (null if empty)
    private Node<E> tail = null;   // Reference to the last node (null if empty)
    private int size = 0;          // Count of nodes in the list

    // Constructor for an empty list
    public SinglyLinkedList() { }

    // Basic accessor methods
    public int size() { return size; }
    public boolean isEmpty() { return size == 0; }

    /** Returns the first element without removing it. */
    public E first() {
        if (isEmpty()) return null;
        return head.getElement();
    }

    /** Returns the last element without removing it. */
    public E last() {
        if (isEmpty()) return null;
        return tail.getElement();
    }

    // Update methods (addFirst, addLast, removeFirst) will follow...
}
```

---

# Adding an Element to the Front (Head)

1.  **Allocate:** Create a new node containing the element.
2.  **Link New Node:** Set the `next` reference of the new node to point to the current `head`.
3.  **Update Head:** Change the list's `head` reference to point to the newly created node.

(Diagram: (a) Initial list. (b) New node created, pointing to old head. (c) Head updated to point to the new node.)

---

# Adding an Element to the End (Tail)

1.  **Allocate:** Create a new node with the element and its `next` reference set to `null`.
2.  **Link Old Tail:** Set the `next` reference of the current `tail` node to point to the new node. (Handle the case where the list was initially empty).
3.  **Update Tail:** Change the list's `tail` reference to point to the newly added node.

(Diagram: (a) Initial list. (b) New node created. (c) Old tail points to new node, tail reference updated to new node.)

---

# Java Implementation: `addFirst` and `addLast`

```java {*}{maxHeight:'400px'}
public class SinglyLinkedList<E> {
    // ... (Node class, head, tail, size, constructor, accessors) ...

    /** Adds element e to the front of the list. */
    public void addFirst(E e) {
        head = new Node<>(e, head); // Create new node pointing to old head
        if (size == 0) {
            tail = head;           // If list was empty, new node is also the tail
        }
        size++;
    }

    /** Adds element e to the end of the list. */
    public void addLast(E e) {
        Node<E> newest = new Node<>(e, null); // New node will be the tail
        if (isEmpty()) {
            head = newest;         // If list was empty, new node is also the head
        } else {
            tail.setNext(newest);  // Link the previous tail to the new node
        }
        tail = newest;             // Update the list's tail reference
        size++;
    }

    // ... (removeFirst method) ...
}
```

---

# Removing the First Element (Head)

1.  **Target:** Identify the node currently pointed to by `head`.
2.  **Update Head:** Change the `head` reference to point to the *next* node in the sequence (`head.getNext()`).
3.  **Cleanup:** The original head node is now unreferenced and can be garbage collected. (Handle the case where the list becomes empty).

(Diagram: (a) Initial list. (b) Head updated to point to the second node. (c) Original first node is effectively removed.)

---

# Java Implementation: `removeFirst`

```java
public class SinglyLinkedList<E> {
    // ... (Node class, head, tail, size, constructor, accessors, add methods) ...

    /** Removes and returns the first element of the list. */
    public E removeFirst() {
        if (isEmpty()) {
            return null; // Nothing to remove
        }
        E removedElement = head.getElement(); // Get data from the first node
        head = head.getNext();                // Update head to the next node
        size--;
        if (size == 0) {
            tail = null; // Special case: list is now empty, update tail
        }
        return removedElement; // Return the data that was removed
    }
} // End of SinglyLinkedList class
```

---

# Challenge: Removing from the Tail

* Removing the last element efficiently in a *singly* linked list is problematic.
* To update the `tail` reference correctly, you need access to the node *before* the current tail.
* There's no direct way to get the previous node without traversing the list from the `head`.
* This traversal takes time proportional to the list's length, making tail removal inefficient (not constant time).

(Diagram showing a list and highlighting the difficulty of finding the node before the tail without traversing.)
