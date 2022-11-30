import React from 'react'
import styles from "./styles.module.css";
import { useState,useEffect } from "react";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'

function NAV() {
  const [user, setUser] = useState({});

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
   setUser(user);
  }
}, [localStorage.getItem('userToken')]);
	const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
       
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
    
        window.location.replace('/');
      } else if (result.isDenied) {
        
      }
    })
    
	
	};
  return (
    <div className={styles.main_container}>
    <nav className={styles.navbar}>
      <h1>Incubation</h1>
      
      <h1 style={{"marginLeft":"auto","paddingRight":"1rem"}}>Welcome, {user.name}</h1>
      <button className={styles.white_btn} onClick={handleLogout} style={{'marginTop':"2rem","zIndex":"5000"}}>
        Logout
      </button>
    </nav>
  </div>
  )
}

export default NAV