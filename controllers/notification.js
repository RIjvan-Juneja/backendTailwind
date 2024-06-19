const cron = require('node-cron');
const db = require('../models/index');
const sendEmail = require('../services/sendMail');
const functions = require("../helpers/functions");
const { Op } = require('sequelize');
const { getUserEmailById } = require("../repositories/user.repository")

const insertMedicationLog = async (data) =>{
  try {
    const insert = db.MedicationLog.create({
      medication_id: data.id,
      user_id: data.user_id,
      link : functions.randomString(15)
    });
    return insert;
  } catch (error) {
    throw error;
  }
}

const sendNotification = async () =>{
  const now = new Date();
  const currentTime = now.toTimeString().split(' ')[0].slice(0, 5) + ':00';
  const currentDate = now.toISOString().split('T')[0]; 
  const currentDay = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase(); 
  

  try {
    // // One-time medication reminders
    const oneTimeMedications = await db.Medication.findAll({
      where: {
        start_date: {
          [Op.lte]: currentDate.toString() 
        },
        end_date: {
          [Op.gte]: new Date(currentDate) 
        },
        time: currentTime,
        recurrence: 'oto'
      }
    });

    
  
    // Daily medication reminders
    const dailyMedications = await db.Medication.findAll({
      where: {
        recurrence: 'daily',
        time: currentTime,
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate }
      }
    });
  
    // Weekly medication reminders
    const weeklyMedications = await db.Medication.findAll({
      where: {
        recurrence: 'weekly',
        day_of_week: currentDay,
        time: currentTime,
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate }
      }
    });
  
    const allMedications = [...oneTimeMedications, ...dailyMedications, ...weeklyMedications];
    // console.log(allMedications);
    
    for (const medication of allMedications) {
      let data = await insertMedicationLog(medication);
      let html = `
        <p>Please Take Your Medicine</p> </br>
        <p>medicine Name : ${medication.name}</p> </br>
        <p>medicine Notes : ${medication.notes}</p> </br>
        <img src='${medication.file_path}' width ='250px' /> </br>
        <a href='medicationlog/mark/${data.link}'>  Mark as Done ${data.link}</a>
        <p>link : http://hwellness/panel/medicationlog/mark/${data.link}</p>
      `;
      let userEmail = await getUserEmailById(medication.user_id);
      await sendEmail.sendEmail(userEmail, 'Medication Reminder', `It's time to take your medication.`,html,null);
    }
  } catch (error) {
    console.log(error);
  }
}

// This cron job runs every minute
cron.schedule('* * * * *', async () => {
  sendNotification();
});
