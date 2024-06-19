const fs = require('fs');
const path = require('path');

const userReports = async (req,res) => {

  const reportsFolder = path.join(__dirname,'../public/','reports');
  try {
    let obj = [];
    // Read the directory
    fs.readdir(reportsFolder, (err, files) => {
      if (err) {
          return res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
      }
      const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
      csvFiles.forEach((file,i) => {
        let arr = file.split("_");
        if(req.user.id == arr[0]){
          obj.push({
            id : i,
            userId : arr[0],
            date : arr[1],
            reportName : file
          });
        }
      });
      res.status(200).send(obj);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: "An unexpected error occurred while processing your request" });
  }
}

module.exports = { userReports };


