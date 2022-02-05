const express = require('express');
const router = express.Router();
const {getAppointments, createAppointment, patchAppointment} = require('../database/queries/appointments_db');

router.get("/appointments",getAppointments);
router.post("/appointments",createAppointment);
router.patch("/appointments",patchAppointment);

module.exports = router;