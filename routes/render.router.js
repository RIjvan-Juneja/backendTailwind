const express = require("express");
const passport = require('../middleware/passport');
const renderController = require("../controllers/render.controller");
const authMiddleware = require("../middleware/auth.middleware");
const renderRouter = express.Router();


// ================== render  ==================//

renderRouter.use(passport.initialize());
renderRouter.get('/login',renderController.renderLogin);
renderRouter.get('/registation',renderController.renderRegistation);
renderRouter.get('/dashboard',authMiddleware,renderController.renderDashboard);
renderRouter.get('/medication',authMiddleware,renderController.renderMedicationList);
renderRouter.get('/medication/add',authMiddleware,renderController.renderMedicationForm);
renderRouter.get('/reports',authMiddleware,renderController.renderReports);
renderRouter.get('/sessions',authMiddleware,renderController.renderSessions);


module.exports = renderRouter;