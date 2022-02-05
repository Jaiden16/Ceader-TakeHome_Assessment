const express = require('express');
const router = express.Router();
const {getAppointments, createAppointment} = require('../database/queries/appointments_db');

router.get("/appointments",getAppointments);
router.post("/appointments/create",createAppointment);

module.exports = router;