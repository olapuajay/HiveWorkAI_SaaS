import Performance from "../models/Performance.js";

export const upsertPerformanceReview = async (req, res, next) => {
  try {
    const { employeeId, period, month, year, metrics, feedback } = req.body;

    const scores = Object.values(metrics);
    const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    const performance = await Performance.findOneAndUpdate(
      {
        company: req.company._id,
        employee: employeeId,
        period,
        month,
        year
      },
      {
        metrics,
        overallScore,
        feedback,
        reviewedBy: req.user.userId
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, performance });
  } catch (error) {
    next(error);
  }
};

export const getMyPerformance = async (req, res, next) => {
  try {
    const records = await Performance.find({
      employee: req.user.userId,
      company: req.company._id
    }).sort({ year: -1, month: -1 });

    res.json({ success: true, records });
  } catch (error) {
    next(error);
  }
};

export const getCompanyPerformance = async (req, res, next) => {
  try {
    const records = await Performance.find({
      company: req.company._id
    })
      .populate("employee", "name department")
      .sort({ year: -1, month: -1 });

    res.json({ success: true, records });
  } catch (error) {
    next(error);
  }
};