const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    // // This is not good practice
    // const USER = new userModel({ name, email, password });
    // USER.password = await bcrypt.hash(password, 10);
    // await USER.save();

    // This is good practice, becauase userModel.create({...}) both creates and saves the user in one step.
    // It avoids mutating the user object after creation.
    // It’s more concise and readable.
    // It’s atomic: the user is only created if all data is ready.
    const hashedPassword = await bcrypt.hash(password, 10);
    const USER = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

const login = async(req, res)=> {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const errMsg = "Authentication failed, email or password is wrong";
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const token = jwt.sign(
      { name: user.name, email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      token,
      message: "Login Successfully",
      success: true,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

module.exports = { signup, login };
