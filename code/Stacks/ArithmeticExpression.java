package code.Stacks;
import java.util.Stack;

/**
 * A class that evaluates arithmetic expressions from a string.
 * It handles operator precedence (* and / before + and -) and parentheses.
 * This implementation uses two stacks: one for numbers (values) and one for operators.
 */
public class ArithmeticExpression {

    /**
     * Returns the precedence of a given operator.
     * Higher value means higher precedence.
     * @param op The operator character.
     * @return An integer representing the precedence.
     */
    private static int precedence(char op) {
        if (op == '+' || op == '-') {
            return 1;
        }
        if (op == '*' || op == '/') {
            return 2;
        }
        return 0; // For parentheses
    }

    /**
     * Performs an operation on two operands.
     * @param op The operator character.
     * @param b The second operand.
     * @param a The first operand.
     * @return The result of the operation a op b.
     */
    private static int applyOperator(char op, int b, int a) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b == 0) {
                    throw new UnsupportedOperationException("Cannot divide by zero");
                }
                return a / b;
        }
        return 0;
    }

    /**
     * Evaluates a given arithmetic expression string.
     * @param expression The string containing the expression (e.g., "14 - 3 * 2").
     * @return The integer result of the evaluation.
     */
    public static int evaluate(String expression) {
        // Add spaces around all operators and parentheses to ensure clean tokenization.
        // This makes the parser robust to expressions with or without spaces.
        String spacedExpression = expression.replaceAll("(?<=[-+*/()])|(?=[-+*/()])", " ");
        String[] tokens = spacedExpression.trim().split("\s+");

        Stack<Integer> values = new Stack<>();
        Stack<Character> ops = new Stack<>();

        for (String token : tokens) {
            if (token.isEmpty()) {
                continue;
            }

            char firstChar = token.charAt(0);

            // If token is a number, push it to the values stack.
            if (Character.isDigit(firstChar)) {
                values.push(Integer.parseInt(token));
            } else if (firstChar == '(') {
                ops.push(firstChar);
            } else if (firstChar == ')') {
                // Evaluate the expression inside the parentheses.
                while (ops.peek() != '(') {
                    values.push(applyOperator(ops.pop(), values.pop(), values.pop()));
                }
                ops.pop(); // Pop the opening parenthesis '('.
            } else { // Token is an operator.
                // While the operator stack is not empty and the top operator has a
                // higher or equal precedence than the current operator, apply the operator from the stack.
                while (!ops.isEmpty() && precedence(ops.peek()) >= precedence(firstChar)) {
                    values.push(applyOperator(ops.pop(), values.pop(), values.pop()));
                }
                // Push the current operator to the stack.
                ops.push(firstChar);
            }
        }

        // The entire expression has been parsed. Apply remaining operators to remaining values.
        while (!ops.isEmpty()) {
            values.push(applyOperator(ops.pop(), values.pop(), values.pop()));
        }

        // The top of the values stack contains the final result.
        return values.pop();
    }

    public static void main(String[] args) {
        String expression1 = "14 - 3 * 2 + 7"; // Should be 14 - 6 + 7 = 15
        System.out.println("'" + expression1 + "' evaluates to: " + evaluate(expression1));

        String expression2 = "3 + 4 * 2 - 2 * 7"; // Should be 3 + 8 - 14 = -3
        System.out.println("'" + expression2 + "' evaluates to: " + evaluate(expression2));
        
        // This tests the user-provided format with inconsistent spacing.
        String expression3 = "14 -3 *2 + 7"; // Should be 14 - 3 * 2 + 7 = 15
        System.out.println("'" + expression3 + "' evaluates to: " + evaluate(expression3));

        String expression4 = "100 * ( 2 + 12 ) / 14"; // Should be 100 * 14 / 14 = 100
        System.out.println("'" + expression4 + "' evaluates to: " + evaluate(expression4));
        
        String expression5 = "3+4*2/(1-5)"; // Should be 3 + 8 / (-4) = 3 + (-2) = 1
        System.out.println("'" + expression5 + "' evaluates to: " + evaluate(expression5));
    }
}