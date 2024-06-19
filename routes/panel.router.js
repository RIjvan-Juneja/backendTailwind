const express = require("express");
const panelRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const medication = require("../controllers/medication.controller");
const parser = require("../middleware/cloudinaryFileUpload");
const reports = require("../controllers/reports.controller");
const sessions = require("../controllers/sessions.controller");
const medicationlog = require("../controllers/medicationLog.controller");
require("../controllers/notification");
// require("../controllers/worker");

// ==================== Panel ===================== //

panelRouter.post('/medication/api/list',authMiddleware,medication.displayMedication);
panelRouter.post('/medication/api/add',authMiddleware,medication.addMedication);
panelRouter.post('/medication/api/delete/:id',authMiddleware,medication.deleteMedication);
panelRouter.post('/reports/api',authMiddleware,reports.userReports);
panelRouter.post('/sessions/api',authMiddleware,sessions.activeUser);
panelRouter.get('/medicationlog/mark/:secretKey',medicationlog.markAsDone);

module.exports = panelRouter;
