import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// console.log('Loaded secret key:', process.env.secret_key);

const Schema = mongoose.Schema;
const algorithm = 'aes-256-cbc';
const key = process.env.secret_key;

function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decrypt(encryptedData, inputIV) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(inputIV, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: Object, // Storing as an object to include both IV and encrypted data
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

userSchema.pre("save", function (next) {
    // Encrypt the email before saving
    const { iv, encryptedData } = encrypt(this.email);
    this.email = { iv, encryptedData };
    next();
});

export default mongoose.model("User", userSchema);
