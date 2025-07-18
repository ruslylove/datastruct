package code.lab.lab3;

/**
 * A common interface for list data structures.
 * @param <E> the type of elements in this list
 */

public interface MyList<E> {
    void add(E element);
    E get(int index);
    E remove(int index);
    int size();
    void printList();
    int find(E element);
    void clear();
    void reverse();
}

