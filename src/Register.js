import React from "react";
import "./RegistrationPage.css";
import { Link ,useNavigate} from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';

function Register() {

    const navigate=useNavigate();

    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:""
    });

    const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }  


    const handleRegister=(e)=>{

        e.preventDefault();

        axios.post('http://localhost:3001/api/auth/register', formData)
        .then((response)=>{
            alert("Registration Successful!");
            navigate('/login');
        })
        .catch((err)=>{
            if (err.response && err.response.status===400) {
                alert("Email already Exists! Please login.");
            }
            console.error("Error registering user:",err); 
        });
        
    }
    
    

  return (
    <div className="reg-container">


      <div className="register-box">
        <Link to="/" className="back">
            ←Back to Home </Link><br/>
        <h2><center>Create Your Account</center></h2>
        <center><p className="subtitle">Start your journey with Veyora</p></center>

        <form onSubmit={handleRegister}>
          <input type="text" name="username" placeholder="Username" value={formData.username} required onChange={handleChange}/>
          <input type="email" name="email" placeholder="Email" value={formData.email} required onChange={handleChange}/>  
          <input type="password" name="password" placeholder="Password" value={formData.password} required onChange={handleChange}/>
          <button type="submit" className="btn">Create Account</button>
        </form> 

        <p className="login-text">
          <center>Already have an account? <a href="/login">Login</a></center>
        </p>
      </div>
    </div>
  );
}

export default Register;
