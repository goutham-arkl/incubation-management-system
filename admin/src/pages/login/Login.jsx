import { useState,useContext } from "react";

import FormInput from "../../components/FormInput";
import {userUrl} from '../../constants/constant'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from "../../Store/UserContext";
// import Cookies from 'universal-cookie';
// import "./login.css";
const Login = () => {
  const {setAdminDetails,adminDetails}=useContext(UserContext)
  // const cookies = new Cookies();
  // const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
   
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
   
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
   
  ];
 let details=values
  const handleSubmit = async(e) => {
    console.log('login');
    e.preventDefault();
    await axios.post(`${userUrl}/api/auth/login`,details).then((response) => {
      if(response.data.isAdmin){
        localStorage.setItem("userToken", JSON.stringify(response.data.accessToken))
      // console.log(response.data);
			localStorage.setItem("user", JSON.stringify(response.data));
      setAdminDetails(response.data)
      // navigate('/')
      // cookies.set('accessToken', response.data.accessToken, { path: '/' });
      window.location.replace('/')

      }else{
        Swal.fire({
          title: 'Error!',
          text: 'please recheck credentials',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      
    
              }).catch((err)=>{
                console.log(err);
                Swal.fire({
                  title: 'Error!',
                  text: 'please recheck credentials',
                  icon: 'error',
                  confirmButtonText: 'ok'
                })
              })
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <h1 style={{"paddingTop":"10px"}}>Welcome back | Please login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>

            
     
          
      </form>
    </div>
  );
};

export default Login;