const acl = require("../utils/acl");

const checkPermission = (role, action) => {
  return (req, res, next) => {
    // Get permissions for the role from the ACL
    const permissions = acl[role]?.permissions || [];

    // Check if the requested action is allowed
    if (!permissions.includes(action)) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }

    // If allowed, move to the next middleware/controller
    next();
  };
};

module.exports = checkPermission;
