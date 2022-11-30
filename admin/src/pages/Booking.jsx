import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/navbar/Navbar"
import BookingSlot from '../components/BookingSlot'
import Sidebar from '../components/sidebar/Sidebar'
function Booking() {
//   const {adminDetails}=useContext(UserContext)
//   const navigate=useNavigate()
//   console.log(adminDetails);
// useEffect(() => {
//   if(adminDetails){
//     navigate('/book')
//   }else{
//     navigate('/login')
//   }
// }, [])

  return (
  <>
   <div className="list">
      <Sidebar/>
      <div className="listContainer">
      <Navbar/>
   <BookingSlot/>
      </div>
    </div>
  
   
   </>
  )
}

export default Booking