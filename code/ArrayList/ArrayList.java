// ArrayList.java
// My ArrayList Implementation based on Goodrich's book
// Data Structures and Algorithms in Java, 6th Edition

package code.ArrayList;

public class ArrayList<E> {
    private E[] elements;
    private int size;
    private static final int INITIAL_CAPACITY = 10;

    public ArrayList() {
        elements = (E[]) new Object[INITIAL_CAPACITY];
        size = 0;
    }

    public void add(E element) {
        if (size == elements.length) {
            resize();
        }
        elements[size++] = element;
    }

    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Invalid index");
        }
        return elements[index]; // Cast to E is safe because we only add E type elements
    } // End of get method

    public int size() {
        return size;
    }

    private void resize() {
        E[] newArray = (E[]) new Object[elements.length * 2];
        System.arraycopy(elements, 0, newArray, 0, elements.length);
        elements = newArray;
    }
}
