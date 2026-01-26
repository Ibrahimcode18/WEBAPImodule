// Write a function that takes a score and prints a message 
// based on different ranges (for example, 0–59, 60–79, 80–89, 90–100).

function sorter(score){
    if ((score > 0) && (score < 60)) {
        console.log("Tier 5");
    } else if (score > 59 && score < 80){
        console.log("Tier 4");
    } else if (score > 79 && score < 90){
        console.log("Tier 3")
    } else if (score > 89 && score < 101){
        console.log("Tier 2")
    }
}
// Test your function with various input values to confirm that it prints the correct message each time.
sorter(45);  // Should print "Tier 5"
sorter(75);  // Should print "Tier 4"
sorter(85);  // Should print "Tier 3"
sorter(95);  // Should print "Tier 2"   

