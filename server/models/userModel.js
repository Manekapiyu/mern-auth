import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 }, // ✅ Default = 0 (cleaner than Date.now)

    isAccountVerified: { type: Boolean, default: false },

    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 }, // ✅ Also default to 0
  },
  {
    collection: "users",
    timestamps: true, // ✅ Adds createdAt & updatedAt automatically
  }
);

// Prevent model overwrite error in dev/hot-reload
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
