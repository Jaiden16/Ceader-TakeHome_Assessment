const express = require('express');
const router = express.Router();
const {getAppointments, createAppointment, patchAppointment, cancelAppintment} = require('../database/queries/appointments_db');

router.get("/appointments",getAppointments);
router.post("/appointments",createAppointment);
router.patch("/appointments",patchAppointment);
router.delete("/appointments",cancelAppintment)

module.exports = router;