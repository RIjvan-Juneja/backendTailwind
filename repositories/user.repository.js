const db = require("../models/index");

const getUsers = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ['id', 'email']
    });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve users");
  }
  
}


const getUserEmailById = async (userId) => {
  try {
    const user = await db.User.findByPk(userId);
    return user.email;
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve user Email");
  }
};



module.exports = { getUsers, getUserEmailById }