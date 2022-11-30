import { useState } from "react";
import "./app.css";
import FormInput from "../components/FormInput";
import {userUrl} from '../constants/constant'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const Signup = () => {
  const navigate = useNavigate()
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
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
   
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];
 let details=values
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(values);
    await axios.post(`${userUrl}/api/auth/register`,details).then((response) => {
                  console.log('signup success',response);
                  navigate('/login')
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
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1 style={{"paddingTop":"10px"}}>Welcome | Join now</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        <div style={{"paddingBottom":"10px"}}>
          Already signed up? <b><Link to="/login" className="link">login now.</Link></b><br/>
           
          </div>
      </form>
    </div>
  );
};

export default Signup;


