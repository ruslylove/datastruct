---
title: 'Arrays in Data Structures'
presenter: 'Dr. Ruslee Sutthaweekul'
course: 'Algorithm and Data Structures'
semester: '1/2025'
# Based on Presentation for use with the textbook Data Structures and Algorithms in Java, 6th edition, by M. T. Goodrich, R. Tamassia, and M. H. Goldwasser, Wiley, 2014
---

# Arrays: The Basics

An array provides a way to store a sequence of items, where all items are of the same data type.

* **Cell:** Each storage location within an array.
* **Index:** A unique number (starting from 0) used to access a specific cell.
* **Element:** The value stored within a particular cell.

(Diagram illustrating an array 'A' with indexed cells 0, 1, 2, ..., i, ..., n)

---

# Array Length vs. Capacity

* The **length** of an array dictates the total number of elements it can hold.
* We often refer to this length as the array's **capacity**.
* In Java, you can get an array's length using `.length` (e.g., `myArray.length`).
* The valid indices for an array `a` range from `0` to `a.length - 1`.
* You access the element at index `k` using square brackets: `a[k]`.

(Diagram showing an array 'a' with indices 0 to n, highlighting index k)

---

# Creating Arrays: Method 1 (Literal Assignment)

One way to create and initialize an array is by using a literal assignment when you declare it:

```java
elementType[] arrayName = {initialValue_0, initialValue_1, ..., initialValue_N-1};
```

* `elementType`: Any valid Java type (primitive or class).
* `arrayName`: A valid Java variable name.
* The initial values provided must match the `elementType`.

---

# Creating Arrays: Method 2 (Using `new`)

The second common method uses the `new` operator:

```java
new elementType[length]
```

* This approach doesn't use a traditional constructor like classes do.
* `length`: A positive integer specifying the size (capacity) of the array.
* The `new` operator creates the array in memory and returns a reference to it, which is typically assigned to an array variable.

Example:
```java
int[] scores = new int[10]; // Creates an integer array of size 10
```

---

# Storing Different Data Types

Arrays are versatile:

* They can hold **primitive types**, like characters:

    (Diagram showing an array holding 'S', 'A', 'M', 'P', 'L', 'E')

* They can also store **references to objects**:

    (Diagram showing an array holding references pointing to String objects: 'Janet', 'Jonas', 'Joseph', etc.)

---

# Java Example: `GameEntry` Class

Let's define a simple class to store a player's name and their high score.

```java
public class GameEntry {
    private String name; // Player's name
    private int score;   // Player's score

    /** Constructor for GameEntry */
    public GameEntry(String n, int s) {
        name = n;
        score = s;
    }

    /** Accessor for the name field */
    public String getName() { return name; }

    /** Accessor for the score field */
    public int getScore() { return score; }

    /** Provides a string representation */
    public String toString() {
        return "(" + name + ", " + score + ")";
    }
}
```

---

# Java Example: `Scoreboard` Class

Now, let's use an array to manage a list of high scores using `GameEntry` objects. We'll keep the array sorted by score.

```java
/** Manages high scores using a non-decreasing sorted array. */
public class Scoreboard {
    private int numEntries = 0;      // Tracks the actual number of scores stored
    private GameEntry[] board;       // The array holding GameEntry objects

    /** Creates an empty scoreboard with a specified capacity. */
    public Scoreboard(int capacity) {
        board = new GameEntry[capacity]; // Initialize the array
    }

    // Methods for adding/removing entries will follow...
}

```

---

# Adding an Entry to a Sorted Array

To insert a new entry `e` at a specific index `i` in our sorted `board` array, we first need to make space.

1.  Shift existing entries `board[i]` through `board[n-1]` one position to the right (towards higher indices).
2.  Place the new entry `e` into the now-empty `board[i]`.

(Diagram showing: initial array, array after shifting elements right, array with new element 'e' inserted at index 'i')

---

# Java Example: `add` Method for Scoreboard

This method adds a new `GameEntry` if it's a high score or if there's space. It maintains the sorted order.

```java
/** Adds a new score if it qualifies or if the board isn't full. */
public void add(GameEntry e) {
    int newScore = e.getScore();

    // Check if the board has space OR if the new score is high enough
    if (numEntries < board.length || newScore > board[numEntries - 1].getScore()) {
        if (numEntries < board.length) { // If there's space, increment count
            numEntries++;
        }

        // Start from the end and shift scores lower than newScore to the right
        int j = numEntries - 1;
        while (j > 0 && board[j - 1].getScore() < newScore) {
            board[j] = board[j - 1]; // Shift element right
            j--;                     // Move to the next position left
        }
        board[j] = e; // Place the new entry in its correct sorted position
    }
}
```

---

# Removing an Entry from an Array

To remove an entry `e` currently at index `i`:

1.  Identify the element to remove at `board[i]`.
2.  Shift all subsequent elements (`board[i+1]` through `board[n-1]`) one position to the left to fill the gap.
3.  (Optional but recommended) Update the count of actual entries and potentially nullify the last previously occupied slot.

(Diagram showing: initial array with 'e' at index 'i', array with 'e' removed creating a gap, array after shifting elements left to fill the gap)

---

# Java Example: `remove` Method (Conceptual)

Here's how you might implement the removal logic:

```java
/** Removes the entry at index i and shifts subsequent entries left. */
public GameEntry remove(int i) throws IndexOutOfBoundsException {
    if (i < 0 || i >= numEntries) {
        throw new IndexOutOfBoundsException("Invalid index: " + i);
    }

    GameEntry temp = board[i]; // Store the entry to be removed

    // Shift elements to the left
    for (int j = i; j < numEntries - 1; j++) {
        board[j] = board[j + 1];
    }

    board[numEntries - 1] = null; // Clear the last previously used slot
    numEntries--;                 // Decrement the count of entries
    return temp;                  // Return the removed entry
}

// Note: This method assumes 'numEntries' correctly tracks the number of actual entries.
