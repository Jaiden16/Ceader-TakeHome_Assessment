const express = require('express');
const router = express.Router();
const {getDoctors} = require('../database/queries/doctors_db');

router.get("/doctors",getDoctors);

module.exports = router;