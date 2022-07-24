const { Roles } = require("../../middleware/auth")

const endPoint = {
  Send_mul: [Roles.Admin],
  signout: [Roles.User],
  updatePassword: [Roles.User],
  Block_email: [Roles.Admin]
}

module.exports = endPoint
