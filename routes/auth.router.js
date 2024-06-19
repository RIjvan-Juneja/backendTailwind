const express = require("express");
const authRouter = express.Router();
const authentication = require("../controllers/authentication.controller");
const authMiddleware = require("../middleware/auth.middleware");

// =============== authentication =================//

authRouter.post('/api/registation',authentication.registation);
authRouter.post('/api/login',authentication.login);
authRouter.get('/logout',authMiddleware,authentication.logout);
authRouter.post('/logout/all',authMiddleware,authentication.logoutFromAll);
authRouter.post('/sessions/logout/device/:session_token',authMiddleware,authentication.logoutDevice);


module.exports = authRouter;
