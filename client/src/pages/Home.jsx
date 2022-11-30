import React from "react";
import NAV from "../components/nav";
import { useNavigate } from "react-router-dom";
import { useContext, useState,useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import {userUrl} from '../constants/constant'
import axios from 'axios'
function Home() {
	const { userDetails } = useContext(UserContext)
	const user=userDetails
  const [form,setForm]=useState(null)

  useEffect(()=>{

    axios.get(`${userUrl}/api/users/application/${userDetails._id}`).then((response) => {
      if (response.data) {
        console.log(response.data);
        setForm(response.data)
      } else {
        console.log(response)
      }
    }).catch((err) => {
      console.log(err);
    })
  },[])
  
   const navigate=useNavigate()

	return (
		<><NAV/>
		<div className="container">{user.isRegistered?<h1>Application submitted successfully</h1>
		:  <button className="w-60 bg-blue-500 hover:bg-blue-400  font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
		onClick={()=>{navigate('/apply')}}>
Apply for incubation
</button>}
{form?.isBooked? <p style={{"color":"black"}}>status : <div style={{"display":"inline"}} className='text-green-400  '>Approved</div> </p>:
          (form?.isApproved? <p style={{"color":"black"}}>status : <div style={{"display":"inline"}} className='  '>Under process</div> </p> : <p hidden style={{"color":"black"}}>status : <div style={{"display":"inline"}} className='text-orange-700'> Pending</div> </p>)}
          {/* <Link to={'/apply'}>Apply for Incubation</Link> */}
		</div>
		</>
	);
}

export default Home
