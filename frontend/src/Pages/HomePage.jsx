import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Text from "../Components/Text"

export default function HomePage(){
    const [appointments, setAppointments]= useState([])
    
    const getAllAppointments = async () =>{
        let res = await axios({
            method: 'get',
            url: 'appointments'
        })
        console.log(res.data.appointments);
        setAppointments(res.data.appointments)
    }

    useEffect(()=>{
        // console.log('effect')
        getAllAppointments();
    },[])
    
    // console.log("array",appointments);

    
    
    
    return(
        <div className='home'>
            <h1>My Appointments</h1>
            {appointments.map((el,id)=>{
                return(
                    <Text key={id} 
                    month ={el.apt_month}
                    day ={el.apt_day}
                    year={el.apt_year}
                    hour={el.apt_hour}
                    min={el.apt_min}
                    first={el.apt_doctor_first}
                    last={el.apt_doctor_last}/>
                )
            })}
        </div>
    )
}