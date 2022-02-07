import React, { useState, useEffect, useRef } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CancelIcon from '@mui/icons-material/Cancel';
import PublishIcon from '@mui/icons-material/Publish';
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { orange, red } from "@mui/material/colors"
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const RedColorButton = styled(Button)(({ theme }) => ({
    /*color: theme.palette.getContrastText(grey[900]),*/
    // color: "white-smoke",
    backgroundColor: red["A700"],
    '&:hover': {
        backgroundColor: red[600],
    },
}));

export default function EditApp({id,cancel}) {

    //variables
    console.log("id: ", id)
    const [appointment, setAppointment] = useState([])
    const [doctors, setDoctors] = useState([])
    let doctorRef = useRef(null)
    let hourRef = useRef(null)
    let minRef = useRef(null)
    let monthRef = useRef(null)
    let dayRef = useRef(null)
    //////////////////////////////

    const getAppointment = async () => {
        let res = await axios({
            method: 'get',
            url: `appointment/${id}`
        })
        console.log(res.data.appointment);
        setAppointment(res.data.appointment)
    }

    const getAllDoctors = async () => {
        let res = await axios({
            method: 'get',
            url: `doctors`
        })
        console.log(res.data.doctors);
        setDoctors(res.data.doctors)

    }

    useEffect(() => {
        getAppointment()
        getAllDoctors()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let updates = {
            id: id.id,
            month: monthRef,
            day: dayRef,
            hour:hourRef,
            min:minRef,
            doctor: doctorRef
        }

        try{
            let url= `/appointments/${updates.id}`
            let patch = await axios.patch(url,updates) 
            console.log("good")
            cancel();

        }catch(err){
            console.log(err)

        }

    }

    const handleDelete = async ()=>{
        try{
            let url= `/appointments/${id}`
            let deleted = await axios.delete(url) 
            console.log("good")
            cancel();

        }catch(err){
            console.log(err)

        }
    }
    
    
    const handleChange = (e) => {
        switch (e.target.name) {
            case "doctor":
                doctorRef = e.target.value;
                console.log("doctor", doctorRef);
                break;

            case "month":
                monthRef = e.target.value;
                console.log("month", monthRef);
                break;

            case "day":
                dayRef = e.target.value;
                console.log("day", dayRef);
                break;

            case "hour":
                hourRef = e.target.value;
                console.log("hour", hourRef);
                break;

            case "min":
                minRef = e.target.value;
                console.log("min", minRef);
                break;

            default:
                break;

        }

    }

    


    let doctor = doctors.map((el) => {
        return el.doctor
    })

    let month = Array.from({ length: 12 }, (_, i) => i + 1)
    let day = Array.from({ length: 31 }, (_, i) => i + 1)
    let hour = Array.from({ length: 12 }, (_, i) => i + 1)
    let min = Array.from({ length: 4 }, (_, i) => i * 15)


    if (appointment) {
        appointment.map((el) => {
            return (
                doctorRef = el.apt_doctor,
                hourRef = el.apt_hour,
                minRef = el.apt_min,
                monthRef = el.apt_month,
                dayRef = el.apt_day
            )
        })
    }
    // console.log(doctorRef, hourRef, minRef, monthRef, dayRef)

    return (
        <div>
            <h1>Change Appointment</h1>
            <form onSubmit={handleSubmit}>
                <TableContainer /*component={Paper}*/>
                    <Table sx={{ width: "100%" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Doctor</StyledTableCell>
                                <StyledTableCell align="left">month</StyledTableCell>
                                <StyledTableCell align="left">day</StyledTableCell>
                                <StyledTableCell align="left">year</StyledTableCell>
                                <StyledTableCell align="left">hour</StyledTableCell>
                                <StyledTableCell align="left">min</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointment.map((el) => (
                                <StyledTableRow key={el.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {`${el.apt_doctor} `}
                                        <select id={el.apt_doctor} onClick={(e) => { console.log("target name", e) }} name={"doctor"} onChange={handleChange}>
                                            <option value={0}>Choose Doctor</option>
                                            {doctor.map((el, ind) => {
                                                return (
                                                    <option key={ind} value={el}>{el}</option>
                                                )


                                            })}
                                        </select>
                                    </StyledTableCell>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {el.apt_month}
                                        <select id={el.apt_month} onClick={(e) => { console.log("target name", e) }} name={"month"} onChange={handleChange} >
                                            <option value={0}>Choose Month</option>
                                            {month.map((el, ind) => {
                                                return (
                                                    <option key={ind} value={el}>{el}</option>
                                                )


                                            })}
                                        </select>
                                    </StyledTableCell>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {el.apt_day}
                                        <select id={el.apt_day} onClick={(e) => { console.log("target name", e) }} name={"day"} onChange={handleChange} >
                                            <option value={0}>Choose Day</option>
                                            {day.map((el, ind) => {
                                                return (
                                                    <option key={ind} value={el}>{el}</option>
                                                )


                                            })}
                                        </select>
                                    </StyledTableCell>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {el.apt_year}
                                    </StyledTableCell>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {el.apt_hour}
                                        <select id={el.apt_hour} onClick={(e) => { console.log("target name", e) }} name={"hour"} onChange={handleChange} >
                                            <option value={0}>Choose Hour</option>
                                            {hour.map((el, ind) => {
                                                return (
                                                    <option key={ind} value={el}>{el}</option>
                                                )


                                            })}
                                        </select>
                                    </StyledTableCell>
                                    
                                    <StyledTableCell component="th" scope="row">
                                        {el.apt_min}
                                        <select id={el.apt_min} onClick={(e) => { console.log("target name", e) }} name={"min"} onChange={handleChange}>
                                            <option value={0}>Select Rating</option>
                                            {min.map((el, ind) => {
                                                return (
                                                    <option key={ind} value={el}>{el}</option>
                                                )


                                            })}
                                        </select>
                                    </StyledTableCell>
                                </StyledTableRow>

                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                    <Button style={{ float: "right", width: 115, color: "black" }} variant="contained" endIcon={<PublishIcon />} type="submit">Send</Button>
                    <RedColorButton style={{ float: "right", width: 115, color: "black", fontWeight: 550 }} variant="contained" endIcon={<CancelIcon />} onClick={cancel} >Cancel</RedColorButton>
                    <RedColorButton style={{ float: "right", width: 115, color: "black", fontWeight: 550 }} variant="contained" endIcon={<CancelIcon />} onClick={cancel} >Delete</RedColorButton>
                </Stack>
            </form>
        </div>
    )

}


