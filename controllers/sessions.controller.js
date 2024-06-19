const db = require("../models/index");
const { Op } = require('sequelize');

const activeUser = async (req,res) => {
  try {
    const users = await db.Session.findAll({
      where: {
        session_token : { 
          [Op.ne] : ''
        },
        user_id : req.user.id
      },
      order: [
        ['id', 'DESC']
      ]
    });

    const processedUsers = users.map(user => {
      return {
        ...user.dataValues,
        is_logged : (user.session_token == req.user.session_token)? 1:0
      }
    });
    res.status(200).send(processedUsers);

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
  
}

module.exports = { activeUser };