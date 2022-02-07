import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Text from "../Components/Text"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import EditApp from '../Components/EditApp';
import "../css/Appointment.css"

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
export default function Appointments() {
    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [id, setId] = useState(0)
    const [edit, setEdit] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    const getAllAppointments = async () => {
        let res = await axios({
            method: 'get',
            url: 'appointments'
        })
        // console.log(res.data.appointments);
        setAppointments(res.data.appointments)
    }

    const getAllDoctors = async () => {
        let res = await axios({
            method: 'get',
            url: 'doctors'
        })
        console.log(res.data.doctors);
        setDoctors(res.data.doctors);
    }



    const ClickEvent = (e) => {

        console.log(e.target.getAttribute("data-id"))
        let res = e.target.getAttribute("data-id")
        setId(res);
        setEdit(!edit)
    }


    useEffect(() => {
        // console.log('effect')
        getAllAppointments();
        getAllDoctors();

    }, [])

    console.log("array", doctors);


    function filterDocotor(appointments) {
        let result = [];
        if (searchTerm) {
            for (let i =0; i<appointments.length; i++) {
                if (appointments[i].apt_doctor.toLowerCase().includes(searchTerm)) {
                    result.push(appointments[i])
                }
            }
        }
        console.log(result)
        return(
            <div>
                {result.map(el=>{
                    return <Text
                            month={el.apt_month}
                            day={el.apt_day}
                            year={el.apt_year}
                            hour={el.apt_hour}
                            min={el.apt_min}
                            doctor={el.apt_doctor}
                        />
                })}
            </div>
        )



        // <div>
        //     <Text
        //         month={el.apt_month}
        //         day={el.apt_day}
        //         year={el.apt_year}
        //         hour={el.apt_hour}
        //         min={el.apt_min}
        //         doctor={el.apt_doctor}
        //     />
        // </div>
    }









    function app(appointments) {
        return appointments.map((el) => {
            return (


                <div className='Unclick' data-id={el.id} onClick={ClickEvent}>
                    <Text
                        month={el.apt_month}
                        day={el.apt_day}
                        year={el.apt_year}
                        hour={el.apt_hour}
                        min={el.apt_min}
                        doctor={el.apt_doctor}
                    />
                </div>
            )
        })
    }

    const cancelFunction = () => {
        setEdit(!edit)
    }
    console.log(searchTerm)

    return (
        <div className='home'>
            <h1>View/Change Appointments</h1>

            <div>
                <h3>Search</h3>
                <div className="Search Field">
                    <TextField
                        required
                        id="outlined-required"
                        label="Search raffles"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }

                        }

                        placeholder="Search Field"
                        variant="outlined"
                    />
                </div>
            </div>

            {searchTerm ? filterDocotor(appointments) : app(appointments)}

            {/* {edit ? searchTerm ? filterDocotor(appointments) : app(appointments): <EditApp id={id}
                cancel={cancelFunction} />} */}
        </div>
    )
}