const { Queue, Worker } = require('bullmq');
const sendMail = require("../services/sendMail");
const cron = require('node-cron');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const db = require('../models/index');
const { getUsers } = require("../repositories/user.repository");

const connection = {
    host: '127.0.0.1',
    port: 6379,
};
  
const queue = new Queue('user-report', { connection: connection });

const reportGenerate = async (user) => {
    const reportData = await db.Medication.findAll({
        attributes: ['id','start_date', 'end_date', 'time','recurrence', 'day_of_week', 'created_at'],
        where : {
          user_id : user.id
        }
    });

    const date = new Date();
    const currentDate = date.toISOString().split('T')[0]; 
    const csvFileName = `${user.id}_${currentDate}_report.csv`
    const csvFilePath = path.join(__dirname, '../public/', 'reports', csvFileName);

    const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'id', title: 'Id'},
          { id: 'start_date', title: 'Start Date'},
          { id: 'end_date', title: 'End Date'},
          { id: 'time', title: 'Time'},
          { id: 'recurrence', title: 'Recurrence'},
          { id: 'day_of_week', title: 'Day Of Week'},
          { id: 'created_at', title: 'Add Date'},
        ]
    });

    if(reportData){
      await csvWriter.writeRecords(reportData);
    }

    return { 
        csvFilePath: csvFilePath,
        csvFileName: csvFileName
    };
}

// Define the job processing function
async function sendNotification({ data: { user } }) {
    const currentDate = new Date().toISOString().split('T')[0];
    const { csvFilePath } = await reportGenerate(user);
    await sendMail.sendEmail(user.email, 'Your Weekly Report', `Your Weekly Report generated at ${currentDate}`, null, csvFilePath);
    // fs.unlinkSync(csvFilePath);
}

new Worker('user-report', sendNotification, { connection: connection });

// At 10:00 on every Monday.
const schedule = cron.schedule('0 10 * * 1', async () => {
    const users = await getUsers();
    users.forEach(user => {
        queue.add('user-report', { user });
    });
});

schedule.start();
