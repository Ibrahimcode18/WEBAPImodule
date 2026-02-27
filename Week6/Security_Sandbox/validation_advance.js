const { Validator } = require('jsonschema');
const v = new Validator();
const productSchema = {
    type: "object",
    properties: {
        sku: {
            type: "string",
            // Must be exactly 3 uppercase letters, a dash, and 4 numbers (e.g., ABC-1234)
            pattern: "^[A-Z]{3}-[0-9]{4}$"
        },
        price: {
            type: "number",
            minimum: 0.01,
            maximum: 9999.99
        },
        tags: {
            type: "array",
            items: { type: "string", minLength: 2 },
            minItems: 1, // Must have at least one tag
            uniqueItems: true // No duplicate tags allowed
        },
        releaseDate: {
            type: "string",
            format: "date" // Must be YYYY-MM-DD
        }
    },
    required: ["sku", "price"]
};
// --- Test Cases ---
const validProduct = {
    sku: "TSH-9021",
    price: 19.99,
    tags: ["clothing", "summer"],
    releaseDate: "2026-05-15"
};

const invalidProduct = {
    sku: "tshirt123", // Fails Regex
    price: -5, // Fails Minimum
    tags: ["sale", "sale"], // Fails Unique
    releaseDate: "15/05/2026" // Fails Date Format
};

console.log("Valid Product Check:", v.validate(validProduct, productSchema).valid);
const badCheck = v.validate(invalidProduct, productSchema);
console.log("\nInvalid Product Errors:");
badCheck.errors.forEach(err => console.log(`- ${err.property}: ${err.message}`));