import Notification from "../models/Notification.js";

export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      user: req.user.userid,
      company: req.company._id
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
}

export const markAsRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};