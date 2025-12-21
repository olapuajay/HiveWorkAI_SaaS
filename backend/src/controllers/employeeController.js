import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if(req.user.role === "HR" && role !== "EMPLOYEE") {
      return res.status(403).json({ message: "Not allowed" });
    }

    const userExists = await User.findOne({ email });
    if(userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const employee = await User.create({
      ...req.body,
      password: hashedPwd,
      company: req.company._id,
    });

    res.status(201).json({
      success: true,
      employee
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const employees = await User.find({
      company: req.company._id,
      role: { $ne: "ADMIN" }
    }).select("-password");

    res.status(200).json({
      success: true,
      employees
    })
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await User.findOne({
      _id: req.params.id,
      company: req.company._id
    }).select("-password");

    if(!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      employee
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await User.findOneAndUpdate(
      { _id: req.params.id, company: req.company._id },
      req.body,
      { new: true }
    ).select("-password");

    if(!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      employee
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateEmployee = async (req, res, next) => {
  try {
    const employee = await User.findOneAndUpdate(
      { _id: req.params.id, company: req.company._id },
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Employee deactivated successfully",
      employee
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await User.findById(req.user.userId).select("-password");
    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    next(error);
  }
};