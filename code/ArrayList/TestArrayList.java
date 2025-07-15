package code.ArrayList;

public class TestArrayList {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        
        // Test adding elements
        list.add(10);
        list.add(20);
        list.add(30);
        
        // Test size
        System.out.println("Size: " + list.size()); // Expected: 3
        
        // Test getting elements
        System.out.println("Element at index 0: " + list.get(0)); // Expected: 10
        System.out.println("Element at index 1: " + list.get(1)); // Expected: 20
        System.out.println("Element at index 2: " + list.get(2)); // Expected: 30
        
        // Additional tests can be added here
    }
}
