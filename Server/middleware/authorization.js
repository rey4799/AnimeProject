const Article = require("../models");

const authorizationAdminOnly = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    next(error);
  }
};
const subscriberOnly = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.role === "superUser") {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizationAdminOnly, subscriberOnly };
