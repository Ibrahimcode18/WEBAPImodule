const argon2 = require('argon2');
async function testArgon() {
    const password = "mySecurePassword!";

    console.log("Hashing with Argon2 (This takes a moment...)");

    // Argon2 automatically generates a salt and embeds it in the final string
    const hash = await argon2.hash(password);
    console.log("Argon2 Hash:\n", hash);
    // Notice the output contains the algorithm type, memory cost, and salt.
    // e.g., $argon2id$v=19$m=65536,t=3,p=4$SALT_HERE$HASH_HERE
    console.log("\nVerifying...");
    const isMatch = await argon2.verify(hash, "mySecurePassword!");
    const isWrong = await argon2.verify(hash, "wrongGuess");

    console.log("Correct Guess:", isMatch);
    console.log("Wrong Guess:", isWrong);
}
testArgon();