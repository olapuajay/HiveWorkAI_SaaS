import Company from "../models/Company.js";

const tenantMiddleware = async (req, res, next) => {
  try {
    const company = await Company.findById(req.user.companyId);
    if (!company || !company.isActive) {
      return res.status(403).json({ message: "Company Inactive" });
    }
    req.company = company;
    next();
  } catch (error) {
    next(error);
  }
};

export default tenantMiddleware;
