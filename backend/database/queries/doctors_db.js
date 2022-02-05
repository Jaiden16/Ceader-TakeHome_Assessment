const db = require('../db')

const getDoctors = async (req,res, next) =>{
    try{
        const doctor = await db.any('SELECT * FROM doctors');
        res.json({
            doctors: doctor,
            message: 'success'
        }).status(200);

    }catch(err){
        res.json({
            err: err
        })
        console.log(err);
    }
}


module.exports = {getDoctors};