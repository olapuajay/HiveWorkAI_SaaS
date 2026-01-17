import Leave from "../models/Leave.js";
import { calculateLeaveDays } from "../services/leaveService.js";
import { getIO } from "../config/socket.js";

export const applyleave = async (req, res, next) => {
  try {
    const { type, reason, startDate, endDate } = req.body;
    if (!startDate || !endDate || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date" });
    }

    const totalDays = calculateLeaveDays(startDate, endDate);

    const leave = await Leave.create({
      employee: req.user.userId,
      company: req.company._id,
      type,
      reason,
      startDate,
      endDate,
      totalDays,
    });

    getIO().emit("leave:applied", {
      employeeId: req.user.userId,
      totalDays,
    });

    res.status(201).json({ success: true, leave });
  } catch (error) {
    next(error);
  }
};

export const getMyLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({
      employee: req.user.userId,
      company: req.company._id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, leaves });
  } catch (error) {
    next(error);
  }
};

export const getCompanyLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.find({
      company: req.company._id,
    })
      .populate("employee", "name department")
      .sort({ createdAt: -1 });

    res.json({ success: true, leaves });
  } catch (error) {
    next(error);
  }
};

export const reviewLeave = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findOneAndUpdate(
      {
        _id: req.params.id,
        company: req.company._id,
      },
      {
        status,
        reviewedBy: req.user.userId,
      },
      { new: true },
    );

    if (!leave) {
      res.status(404).json({ message: "Leave not found" });
    }

    getIO().emit("leave:reviewed", {
      leaveId: leave._id,
      status,
    });

    res.json({ success: true, leave });
  } catch (error) {
    next(error);
  }
};
