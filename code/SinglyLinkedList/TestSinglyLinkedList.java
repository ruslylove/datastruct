package code.SinglyLinkedList;

public class TestSinglyLinkedList {
    public static void main(String[] args) {
        SinglyLinkedList<Integer> list = new SinglyLinkedList<>();
        
        // Test adding elements
        list.addFirst(10);
        list.addLast(20);
        list.addFirst(5);
        
        // Test size and isEmpty
        System.out.println("Size: " + list.size()); // Expected: 3
        System.out.println("Is empty: " + list.isEmpty()); // Expected: false
        
        // Test adding more elements
        list.addLast(30);
        System.out.println("Size after adding more elements: " + list.size()); // Expected: 4
        
        // Additional tests can be added here
    }
}
