const Admin = require('../schema/adminSchema');

module.exports.find = async function (username, password) {

  try {
    let user = await Admin.findOne({ username: username, password: password })
    if (user) {
      return ({ username });
    } else {
      throw new Error("No such user Found in database");
    }
  } catch (err) {
    throw new Error("User not found");
  }
};
