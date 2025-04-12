---
# Cover Page / Title Slide (Level 1)
title: 'Introduction to Java Programming for C/C++ Developers'
subtitle: 'Preparing for Algorithm and Data Structures'
presenter: 'Dr. Ruslee Sutthaweekul'
course: 'Algorithm and Data Structures'
semester: '1/2025'
layout: cover
background: https://cover.sli.dev
transition: slide-left
---

# Introduction to Java Programming & OOP
Semester 1/2025

## 010153523 Algorithm and Data Structures
Dr. Ruslee Sutthaweekul


---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2"/>

---

## Java vs C++: High-Level View

* **Similarities:**
    * Syntax derived from C/C++ (curly braces `{}`, semicolons `;`, similar control flow).
    * Statically typed (mostly).
    * Support for Object-Oriented Programming (OOP).
* **Key Differences:**
    * **Platform Independence:** Java uses the Java Virtual Machine (JVM) - "Write Once, Run Anywhere". C++ compiles to native machine code.
    * **Memory Management:** Java has automatic Garbage Collection (GC). C++ requires manual memory management (`new`/`delete`, `malloc`/`free`).
    * **Pointers:** Java uses *references*, not direct memory pointers like C++.
    * **OOP:** Java is arguably *more* object-oriented; almost everything is an object or belongs to a class.

---

## Setting Up Your Java Environment

* **JDK (Java Development Kit):** You need this to compile and run Java code. It includes the compiler (`javac`), JVM (`java`), and standard libraries. Download from Oracle or OpenJDK providers (e.g., Adoptium).
* **IDE (Integrated Development Environment):** Highly recommended!
    * IntelliJ IDEA (Community Edition is free)
    * Eclipse
    * Visual Studio Code (with Java extensions)
* **Basic Workflow:**
    1.  Write code in a `.java` file.
    2.  Compile: `javac MyProgram.java` -> creates `MyProgram.class` (bytecode).
    3.  Run: `java MyProgram` -> executes the bytecode on the JVM.

---

## Basic Syntax: Familiar Ground (Similarities)

Much of the basic syntax will feel familiar coming from C/C++.

* **Primitive Data Types:** `int`, `long`, `float`, `double`, `boolean` (true/false), `char`.
* **Operators:** Arithmetic (`+`, `-`, `*`, `/`, `%`), Relational (`==`, `!=`, `<`, `>`, `<=`, `>=`), Logical (`&&`, `||`, `!`), Increment/Decrement (`++`, `--`).
* **Control Flow:**
    * `if (condition) { ... } else { ... }`
    * `switch (variable) { case value: ... break; default: ... }`
    * `for (int i = 0; i < n; i++) { ... }` (also for-each loop)
    * `while (condition) { ... }`
    * `do { ... } while (condition);`
* **Comments:** `// Single line`, `/* Multi-line */`, `/** JavaDoc */`

---

## Basic Syntax: Key Differences & Java Specifics

* **No Pointers:** Java uses *references* to objects. Think of them as safer pointers managed by the JVM. You don't do pointer arithmetic.
* **Strings:** `String` is a built-in *class*, not a null-terminated `char` array. Strings are immutable.
    ```java
    String message = "Hello";
    String name = "World";
    String greeting = message + " " + name; // Concatenation
    System.out.println(greeting.length()); // Use methods
    ```
* **Input/Output:**
    * Output: `System.out.println("Text");` (prints and adds newline)
    * Input: Typically use the `Scanner` class (`import java.util.Scanner;`).
    ```java
    Scanner input = new Scanner(System.in);
    System.out.print("Enter your age: ");
    int age = input.nextInt();
    input.close(); // Important to close scanner
    ```
* **Primitives vs. Objects:** Java distinguishes between primitives (`int`, `float`) and Objects (`String`, `ArrayList`). Every primitive has a corresponding *Wrapper Class* (`Integer`, `Float`) used when an Object is needed (e.g., in Collections). Java often handles conversion automatically (autoboxing/unboxing).

---

## Object-Oriented Programming (OOP) in Java - The Core

Java is fundamentally object-oriented.

* **Classes:** Blueprints for creating objects. Almost all Java code resides within classes.
```java {*}{maxHeight:'250px'}
    public class Dog {
        // Fields (instance variables)
        String name;
        int age;

        // Constructor
        public Dog(String name, int age) {
            this.name = name; // 'this' refers to the current object
            this.age = age;
        }

        // Method (instance method)
        public void bark() {
            System.out.println(this.name + " says Woof!");
        }
    }
```

* **Objects:** Instances of classes. Created using the `new` keyword.
```java
    Dog myDog = new Dog("Buddy", 3); // Creates a Dog object
    myDog.bark(); // Calls the bark method on the myDog object
```

---

## Key OOP Concepts in Java

* **Encapsulation:** Bundling data (fields) and methods operating on that data within a class. Controlled using access modifiers:
    * `public`: Accessible from anywhere.
    * `private`: Accessible only within the declaring class. (Common for fields).
    * `protected`: Accessible within the class, subclasses, and package.
    * *default* (package-private): Accessible only within the same package.
* **Inheritance:** Creating new classes (subclasses) based on existing ones (superclasses) using the `extends` keyword. Promotes code reuse.
    ```java
    public class GoldenRetriever extends Dog { /* inherits fields/methods */ }
    ```
* **Polymorphism:** Objects of different classes responding to the same method call differently. Achieved through method overriding (`@Override` annotation is good practice).
* **Abstraction:** Hiding implementation details. Achieved via `abstract` classes and `interfaces` (crucial for defining ADT contracts in Java).

---

## Memory Management: Garbage Collection (GC)

This is a major difference from C++!

* **Automatic:** You create objects using `new`, but you *do not* explicitly delete them.
* **JVM Responsibility:** The JVM's Garbage Collector periodically identifies and reclaims memory occupied by objects that are no longer reachable (no active references point to them).
* **The Heap:** Objects live in a memory area called the heap.
* **Implications:**
    * (+) Greatly reduces memory leak bugs and dangling pointers.
    * (+) Simplifies development.
    * (-) Less direct control over *when* memory is freed.
    * (-) Can introduce slight pauses during GC cycles (usually negligible for ADS).

---

## Java Standard Library: Collections Framework

Essential for ADS! Located primarily in the `java.util` package.

* **Purpose:** Provides ready-to-use implementations of common data structures.
* **Key Interfaces (Contracts):**
    * `List<E>`: Ordered sequence, allows duplicates (e.g., `ArrayList`, `LinkedList`).
    * `Set<E>`: Collection of unique elements (e.g., `HashSet`, `TreeSet`).
    * `Map<K, V>`: Key-value pairs (e.g., `HashMap`, `TreeMap`).
    * `Queue<E>`: FIFO structure (e.g., `LinkedList`, `ArrayDeque`).
    * `Stack<E>`: LIFO structure (often implemented using `ArrayDeque`).
* **Generics (`<E>`, `<K, V>`):** Provide type safety at compile time. Similar idea to C++ templates but implemented differently (type erasure). You specify the type of elements the collection will hold.
    ```java
    List<String> names = new ArrayList<>(); // A List that holds only Strings
    names.add("Alice");
    String firstName = names.get(0);
    // names.add(123); // Compile-time error!
    ```

---

## Packages and Imports

Java uses packages to organize code and prevent naming conflicts.

* **Defining a Package:** Use the `package` keyword at the top of your `.java` file. Convention uses reverse domain name (e.g., `package com.myuniversity.ads.lab1;`). Corresponds to directory structure.
* **Using Classes from Other Packages:** Use the `import` statement.
    ```java
    import java.util.ArrayList; // Import a specific class
    import java.util.*;       // Import all classes in java.util (use sparingly)

    public class MyClass {
        public static void main(String[] args) {
            ArrayList<Integer> numbers = new ArrayList<>();
            // ... use ArrayList ...
        }
    }
    ```
* Classes in `java.lang` (like `String`, `System`, `Integer`) are imported automatically.

---

## Exception Handling

Mechanism for dealing with runtime errors gracefully.

* **`try-catch` blocks:** Similar concept to C++.
    ```java
    try {
        // Code that might throw an exception
        int result = 10 / 0; // Throws ArithmeticException
    } catch (ArithmeticException e) {
        // Code to handle this specific exception
        System.err.println("Error: Cannot divide by zero!");
        // e.printStackTrace(); // Often useful for debugging
    } catch (Exception e) {
        // Catch other potential exceptions
        System.err.println("An unexpected error occurred: " + e.getMessage());
    } finally {
        // Code here ALWAYS executes, whether exception occurred or not
        // Useful for cleanup (e.g., closing files/resources)
        System.out.println("Finally block executed.");
    }
    ```
* **Checked vs. Unchecked Exceptions:** Java distinguishes between exceptions the compiler *forces* you to handle (checked, e.g., `IOException`) and those it doesn't (unchecked/runtime, e.g., `NullPointerException`, `ArithmeticException`).

---

## Your First Java Program (ADS Context)

Let's look at the basic structure and use an `ArrayList`.

```java {*}{maxHeight:'350px'}
// Import necessary class from the Collections Framework
import java.util.ArrayList;
import java.util.List;

// Every Java program needs at least one class
public class SimpleListExample {

    // The entry point for execution: public static void main(String[] args)
    // - public: Accessible from anywhere
    // - static: Belongs to the class, not an object instance
    // - void: Doesn't return a value
    // - main: Special name JVM looks for
    // - String[] args: Array to hold command-line arguments
    public static void main(String[] args) {
        System.out.println("Welcome to Java for ADS!");

        // Create a List of Integers using ArrayList implementation
        List<Integer> scores = new ArrayList<>(); // Using Generics

        // Add elements (Autoboxing: int primitive -> Integer object)
        scores.add(95);
        scores.add(88);
        scores.add(72);

        System.out.println("Number of scores: " + scores.size()); // Use size() method

        // Access elements (index starts at 0)
        System.out.println("First score: " + scores.get(0));

        // Iterate using a for-each loop
        System.out.print("All scores: ");
        for (Integer score : scores) { // Unboxing: Integer object -> int primitive
            System.out.print(score + " ");
        }
        System.out.println();
    }
}
```

---

## Bridging to Algorithm & Data Structures

How does this Java knowledge help in ADS?

* **Implementations:** You'll use Java classes to implement fundamental data structures (Nodes for lists/trees, classes for Stacks, Queues, Graphs, etc.).
* **Interfaces:** Define ADT contracts (like `Stack`, `Queue`, `List`) using Java `interface`s, separating the "what" from the "how".
* **Collections Framework:** Leverage built-in structures (`ArrayList`, `LinkedList`, `HashMap`) when appropriate, or use them as building blocks.
* **Generics:** Ensure type safety when implementing generic data structures.
* **References:** Understanding how object references work is crucial for linked structures (lists, trees, graphs) – passing references, shallow vs. deep copies.
* **Recursion:** Java fully supports recursion, essential for many algorithms (tree traversals, sorting, etc.), managed via the JVM method stack.

---

## Summary & Next Steps

* **Key Takeaways:** Java offers platform independence (JVM), automatic memory management (GC), and a strong OOP focus compared to C++. Syntax is often similar.
* **Crucial for ADS:** Master classes, objects, interfaces, inheritance, the Collections Framework (especially `List`, `Map`), and Generics. Understand references!
* **Practice:** The best way to learn is by doing. Convert simple C++ programs, experiment with Collections, start implementing basic ADS structures.
* **Course Resources:** Refer to the course materials, recommended textbooks, and don't hesitate to ask questions!
