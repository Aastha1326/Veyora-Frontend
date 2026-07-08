import React from "react";
import "./RegistrationPage.css";
import { Link ,useNavigate} from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';
import BASE_URL from "./config";

function Register() {

    const navigate=useNavigate();  //useNavigate is a hook provided by react-router-dom that allows you to programmatically navigate to different routes in your application. In this code, it is used to navigate the user to the login page after a successful registration.

    const [formData,setFormData] = useState({
        username:"",
        email:"",
        password:""
    });//formData is a state variable that holds the values of the registration form fields (username, email, and password). setFormData is the function used to update this state. The initial state is an object with empty strings for each field, indicating that the form is initially empty. As the user types into the form fields, the handleChange function updates the corresponding values in formData, allowing us to keep track of what the user has entered.

    const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }  //handleChange is a function that updates the formData state whenever the user types into any of the input fields (username, email, or password). It uses the name attribute of the input fields to determine which field is being updated and sets the corresponding value in the formData state. This allows us to keep track of the user's input in real-time as they fill out the registration form.


    const handleRegister=(e)=>{

        e.preventDefault();

        axios.post(`${BASE_URL}/api/auth/register`, formData)    //sends a POST request to the backend API at the specified endpoint (/api/auth/register) with the formData (which contains the username, email, and password entered by the user) as the request body. The response from the server is handled in the .then() block for a successful registration and in the .catch() block for any errors that may occur during the registration process.
        .then((response)=>{
            alert("Registration Successful!");
            navigate('/login');
        })
        .catch((err)=>{
            if (err.response && err.response.status===400) {   //checks if the error response from the server has a status code of 400, which typically indicates a bad request. In the context of user registration, this often means that the email provided by the user already exists in the database. If this is the case, it alerts the user with a specific message indicating that the email is already in use and prompts them to log in instead.
                alert("Email already Exists! Please login.");
            }
            console.error("Error registering user:",err); 
        });
        
    }//this function is called when the registration form is submitted. It prevents the default form submission behavior, sends a POST request to the backend API with the form data, and handles the response. If the registration is successful, it alerts the user and navigates them to the login page. If there is an error (such as the email already existing), it alerts the user accordingly and logs the error to the console for debugging purposes.
    
    

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
