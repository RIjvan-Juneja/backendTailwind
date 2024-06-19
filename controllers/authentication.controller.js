const sendMail = require("../services/sendMail");
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const functions = require("../helpers/functions");
const db = require("../models/index");

const registation = async (req, res) => {
  try {

    let salt = functions.randomString(4);
    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile_number: req.body.mobile_number,
      age: req.body.age,
      salt: salt,
      password_hash: functions.encryptString(salt + req.body.password)
    }

    const html = `<p>Your Username Is : ${data.email} </p> </br>
                  <p>Your Password Is : ${req.body.password} </p> </br>`;

    await db.User.create(data);
    sendMail.sendEmail(req.body.email, 'hWellness,  Thank You For Registation', 'hWellness', html, null);
    res.status(200).send({ status: 'ok' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

const login = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await db.User.findOne({ where: { email: username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let password = functions.encryptString(user.dataValues.salt + req.body.password);

    if (!user || !(user.dataValues.password_hash == password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    } else {

      let payload = {
        id: user.id,
        session_token: functions.randomString(6)
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'Rijvan1116c', { expiresIn: '1h' });
      res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 3600000 // 1 hour expiration
      });

      db.Session.create({
        user_id: payload.id,
        device_info: req.ip,
        session_token: payload.session_token
      });

      
      res.status(200).send({ status: 'ok' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "Internal Server error", msg: "An unexpected error occurred while processing your request" });
  }
};

const logout = async (req, res) => {
  try {
    await db.Session.update({ session_token: '' }, {
      where: {
        session_token: req.user.session_token,
        user_id: req.user.id
      },
    });
    res.clearCookie('access_token');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }

}

const logoutFromAll = async (req, res) => {
  try {
    await db.Session.update({ session_token: '' }, {
      where: {
        session_token: { [Op.ne]: req.user.session_token },
        user_id: req.user.id
      },
    });
    res.status(200).send({ status: 'ok' });

  } catch (err) {
    res.status(500).send({ status: "Internal Server Error", msg: "Unexpected error on server" });
    console.log(err);
  }
}

const logoutDevice = async (req, res) => {

  try {
    const update = await db.Session.update({ session_token: '' }, {
      where: {
        session_token: req.params.session_token,
        user_id: req.user.id
      },
    });

    if (!update[0]) {
      return res.status(500).send({ status: 'not Updated' });
    }

    res.status(200).send({ status: 'ok' });

  } catch (err) {
    res.status(500).send({ status: "Internal Server Error", msg: "Unexpected error on server" });
    console.log(err);
  }


}

module.exports = { registation, login, logout, logoutFromAll, logoutDevice };