import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const schema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    lastName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validator: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: true,
    },
    location: { type: String, default: "India" },
  },
  { timestamps: true }
);

// middleware
schema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
schema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

// JWT
schema.methods.createJWT = function () {
  return JWT.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export default mongoose.model("User", schema);
