import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: Date.now() },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: Date.now() },
}, { collection: "users" }); // Ensuring the correct collection name

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;



