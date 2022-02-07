const express = require('express');
const router = express.Router();
const {getAppointment,getAppointments, createAppointment, patchAppointment, cancelAppintment} = require('../database/queries/appointments_db');

router.get("/appointments",getAppointments);
router.get("/appointment/:id",getAppointment)
router.post("/appointments",createAppointment);
router.patch("/appointments/:id",patchAppointment);
router.delete("/appointments/:id",cancelAppintment)

module.exports = router;