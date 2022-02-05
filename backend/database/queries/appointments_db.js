const db = require('../db');
//required routes
//create an appointment
//edit/delete an appointment
//view all appointments - check
//filter appointments by doctor

//create an appointment
const createAppointment = async (req,res,next) => {
    const selection = `apt_month, apt_day, apt_year,apt_hour,
    apt_min, apt_doctor_first, apt_doctor_last`
    
    let query1 = `INSERT INTO appointments(${selection})` 
    let value = 'Values(${month},${day},${year},${hour},${min},${first},${last}) RETURNING*';
    let select = query1 + value
    try{
        let createdAppointment = await db.one(select,req.body);
        console.log(createdAppointment)
        res.json({
            apt:createdAppointment,
            message:"Created Appointment"
        }).status(200)


    }catch(err){
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

module.exports = { createAppointment,getAppointments };