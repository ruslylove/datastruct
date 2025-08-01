public class Ruler {
    public static void main(String[] args) {
        drawInterval(3);
    }

    private static void drawInterval(int centralLength) {
        if (centralLength >= 1) { // Recursive step
            drawInterval(centralLength - 1);    // Draw top sub-interval
            drawLine(centralLength);            // Draw center tick
            drawInterval(centralLength - 1);    // Draw bottom sub-interval
        }
        // Base case: centralLength < 1, do nothing
    }

    private static void drawLine(int tickLength, int tickLabel) {
        for (int j = 0; j < tickLength; j++) {
            System.out.print("-");
        }
        if (tickLabel >= 0) {
            System.out.print(" " + tickLabel);
        }
        System.out.print("\n");
    }

    private static void drawLine(int tickLength) {
        drawLine(tickLength, -1);
    }
}