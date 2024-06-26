const sendMail = require("../services/sendMail");
const bcrypt = require('bcryptjs');
const db = require("../models/index");
const { where } = require("sequelize");

const addMedication = async (req, res) => { 
  try {
    let data;
    // TODO: code quality update
      data = {
        user_id: req.user.id, 
        name: req.body.name,  
        notes:req.body.note, 
        file_path: "https://res.cloudinary.com/dn8qn0rvj/image/upload/v1717650024/uploads/image-1717650023764.jpg", 
        start_date: req.body.start_date, 
        end_date: req.body.start_date, 
        time: req.body.time, 
        recurrence: (req.body.form_type != 'oto')? req.body.routing : 'oto',  // daily, weekly or oto(one time only)
        day_of_week: (req.body.routing == 'weekly')? req.body.day : null,
      }
    console.log(data);
    db.Medication.create(data);
    res.status(200).send({ status: 'Added successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

const displayMedication = async (req,res) => {
  try {
    const medications = await db.Medication.findAll({
      attributes : ['id',['file_path', 'image'],'name','notes','start_date', 'end_date','time', 'recurrence', 'day_of_week'],
      where : {
        user_id : req.user.id || 0
      }
    }); 
    res.status(200).send(medications);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

const deleteMedication = async (req, res) => {
  try {
    const id = req.params.id || 0;
    const medication = await db.Medication.findByPk(id);
    if (medication) {
      await medication.destroy({ force: true });
      return res.status(200).send({status : "deleted Successfully"});
    } else {
      return  res.status(400).send({ status: "Data Not Found", msg: "Data Not Awailable" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

const updateMedication = async (req, res) => {
  console.log(req.body,"----------------");
  try {
    const medicationId = req.params.id || 0;
    let data = {
      user_id: req.user.id, 
      name: req.body.name,  
      notes:req.body.note, 
      file_path: "https://res.cloudinary.com/dn8qn0rvj/image/upload/v1717650024/uploads/image-1717650023764.jpg", 
      start_date: req.body.start_date, 
      end_date: req.body.start_date, 
      time: req.body.time, 
      recurrence: (req.body.form_type != 'oto')? req.body.routing : 'oto',  // daily, weekly or oto(one time only)
      day_of_week: (req.body.routing == 'weekly')? req.body.day : null,
    }
    console.log(data);
    await db.Medication.update(data,{
      where : {
        id : medicationId
      }
    })
    return res.status(200).send({status : 'updated successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

const fetchDataForUpdate = async (req,res) => {
  try {
    const id = req.params.id || 0;
    const medication = await db.Medication.findOne({
      where : {
        id : id,
        user_id : req.user.id || 0,
      }
    });

    if (medication) {
      console.log(medication);
      return res.status(200).send(medication);
    } else {
      return  res.status(400).send({ status: "Data Not Found", msg: "Data Not Awailable" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

module.exports = { addMedication, displayMedication, deleteMedication, fetchDataForUpdate, updateMedication };