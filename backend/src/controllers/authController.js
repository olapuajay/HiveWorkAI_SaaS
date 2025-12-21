import Company from "../models/Company.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerCompany = async (req, res, next) => {
  try {
    const { companyName, domain, name, email, password } = req.body;

    const companyExists = await Company.findOne({ domain });
    if(companyExists) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const company = await Company.create({ name: companyName, domain });

    const hashedPwd = await bcrypt.hash(password, 10);

    const admin = await User.create({
      company: company._id,
      name,
      email,
      password: hashedPwd,
      role: "ADMIN",
    });

    const token = generateToken(admin);

    res.status(201).json({
      success: true,
      user: {
        id: admin._id,
        name: admin.name,
        role: admin.role
      },
      company,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
};