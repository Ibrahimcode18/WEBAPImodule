const crypto = require('crypto');
// 1. Setup the Keys
// AES-256 requires a 32-byte key and a 16-byte Initialization Vector (IV)
// The Key is your master secret. NEVER share it.
const secretKey = crypto.randomBytes(32);
// The IV adds randomness so the same message doesn't encrypt to the same output twice.
const iv = crypto.randomBytes(16);
const message = "The launch code is 0000.";
console.log("Original Message:", message);
// 2. Encrypt
function encrypt(text) {
 const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
 let encrypted = cipher.update(text, 'utf8', 'hex');
 encrypted += cipher.final('hex');
 // We must return both the IV and the encrypted text to decrypt it later
 return { iv: iv.toString('hex'), data: encrypted };
}
const secureData = encrypt(message);
console.log("\nEncrypted Data (Safe to store/transmit):", secureData.data);
console.log("IV Used:", secureData.iv);
// 3. Decrypt
function decrypt(encryptedObj) {
 const decipher = crypto.createDecipheriv(
 'aes-256-cbc',
 secretKey,
 Buffer.from(encryptedObj.iv, 'hex')
 );
 let decrypted = decipher.update(encryptedObj.data, 'hex', 'utf8');
 decrypted += decipher.final('utf8');
 return decrypted;
}
const recoveredMessage = decrypt(secureData);
console.log("\nDecrypted Message:", recoveredMessage);