const db = require('../db');
//required routes
//create an appointment - check
//edit/delete an appointment 
//view all appointments - check
//filter appointments by doctor


//edit.delete appointment
const cancelAppintment = async (req, res, next) => {
    try {
        let query = `Delete from appointments Where id = ${req.body.id} RETURNING *`
        let data = db.any(query)
        res.json({
            data: data,
            message: "APP Deleteed"
        }).status(200)
        
    } catch (err) {
        res.json({
            data: err,
            message: "no appointment there"
        }).status(404)
        console.log(err)

    }


}


//edit/patch appointment
const patchAppointment = async (req, res, next) => {
    let patch;
    // const selection = `apt_month, apt_day, apt_year,apt_hour,
    // apt_min, apt_doctor_first, apt_doctor_last`
    let userUpdates = {
        id: parseInt(req.body.id),
        month: parseInt(req.body.month),
        day: parseInt(req.body.day),
        year: parseInt(req.body.year),
        hour: parseInt(req.body.hour),
        min: parseInt(req.body.min),
        first: req.body.first,
        last: req.body.last
    }

    try {
        let query = "UPDATE appointments SET ";
        let endQuery = "Where id = $/id/ Returning *"

        if (req.body.month) {
            query += "apt_month = $/month/, "
        }

        if (req.body.day) {
            query += "apt_day = $/day/, "
        }

        if (req.body.year) {
            query += "apt_year = $/year/, "
        }

        if (req.body.hour) {
            query += "apt_hour = $/hour/, "
        }

        if (req.body.min) {
            query += "apt_min = $/min/, "
        }

        if (req.body.first) {
            query += "apt_doctor_first = $/first/, "
        }

        if (req.body.last) {
            query += "apt_doctor_last = $/last/, "
        }

        let index = query.lastIndexOf(',');
        if (query[index] === ',') {
            let lastIndex = query.lastIndexOf(',');
            let newString = query.substring(0, lastIndex);
            query = newString;
        }

        let fullQuery = query + endQuery;
        console.log(fullQuery)
        patch = await db.one(fullQuery, userUpdates);


        res.json({
            data: patch,
            message: "success"
        }).status(200)

    } catch (err) {
        res.json({
            data: err
        })
        console.log(err);

    }
}







//create an appointment
const createAppointment = async (req, res, next) => {
    const selection = `apt_month, apt_day, apt_year,apt_hour,
    apt_min, apt_doctor_first, apt_doctor_last`

    let query1 = `INSERT INTO appointments(${selection})`
    let value = 'Values(${month},${day},${year},${hour},${min},${first},${last}) RETURNING*';
    let select = query1 + value
    try {
        let createdAppointment = await db.one(select, req.body);
        console.log(createdAppointment)
        res.json({
            apt: createdAppointment,
            message: "Created Appointment"
        }).status(200)


    } catch (err) {
        res.json(err);
        console.log(err)
    }

}






//view all appointment
const getAppointments = async (req, res, next) => {
    const selection = `id, apt_month, apt_day, apt_year,apt_hour,
    apt_min, apt_doctor_first, apt_doctor_last`
    try {
        const appointments = await db.any(`Select ${selection} From appointments`)
        res.json({
            appointments: appointments,
            message: `success`
        }).status(200);

    } catch (err) {
        res.json({
            err: err
        })
        console.log(err);
    }
}

module.exports = { createAppointment, getAppointments, patchAppointment, cancelAppintment };