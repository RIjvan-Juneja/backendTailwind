const express = require("express");
const userRoutes = require("./render.router");
const authRoutes = require("./auth.router");
const panelRoutes = require("./panel.router");

const router = express.Router();

router.use('/', userRoutes);
router.use('/auth', authRoutes);
router.use('/panel', panelRoutes)

module.exports = router;

