import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    next("Please provide a name.");
  }

  if (!email) {
    next("Please provide a email address.");
  }

  if (!password) {
    next("Please provide a password.");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already exists.");
  }

  if (password.length < 6) {
    next("Password must be 6 character long.");
  }

  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  user.password = undefined;
  res.send({
    success: true,
    message: "User created successfully",
    user,
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next("Please provide all required information");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    next("Please provide valid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Please provide valid email or password");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).send({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
};
