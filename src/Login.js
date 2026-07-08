import React, {useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";   //axios is a popular JavaScript library used for making HTTP requests from the browser. In this code, it is used to send a POST request to the backend API for user authentication when the login form is submitted.
import BASE_URL from "./config";   //BASE_URL is likely a constant defined in a separate config file that holds the base URL of the backend API. This allows for easier management of API endpoints and makes it easier to switch between different environments (e.g., development, staging, production) without changing the code in multiple places.

function Login() {

  const navigate=useNavigate();

  const [formData,setFormData]=useState({email:"",password:""});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };    //this fucntion updates the formData state whenever the user types into the email or password input fields. It uses the name attribute of the input fields to determine which field is being updated and sets the corresponding value in the formData state.

const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  try {
    const res = await axios.post(
      `${BASE_URL}/api/auth/login`,
      formData
    );     //sends a POST request to the backend API at the specified endpoint (/api/auth/login) with the formData (which contains the email and password entered by the user) as the request body. The response from the server is stored in the res variable.

    //  DEFENSIVE CHECK
    if (!res.data?.token || !res.data?.user) {
      throw new Error("Invalid login response");
    }     //it will check if the response from the server contains both a token and user data. If either of these is missing, it throws an error, which will be caught in the catch block, leading to the display of an error message to the user. This is a defensive programming practice to ensure that the application can handle unexpected responses gracefully.

    // REAL SUCCESS
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setSuccess("Login successful! Welcome back to Veyora ✨");

    setTimeout(() => {
      navigate("/");
    }, 1200);

  } catch (err) {
    //  FAILURE PATH
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setSuccess(""); // IMPORTANT: clear success

    setError(
      err.response?.data?.message ||
      "Invalid email or password"
    );
  }
};




    return(
        <>
        <style>
            {`
               /* Page background */
                .loginPage {
                  height: 100vh;
                  width: 100%;
                  background: radial-gradient(circle at top left, #1b2234, #0c0f1a 65%);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                
                /* Main Login Box */
                .loginCard {
                  width: 440px;
                  padding: 40px 32px 32px;
                  background: rgba(255, 255, 255, 0.06);
                  border-radius: 18px;
                  border: 1px solid rgba(245, 217, 155, 0.25);
                  backdrop-filter: blur(14px);
                  text-align: center;
                  color: #f5d99b;
                  position: relative;       /* REQUIRED */
                }
                
                
                /* Logo inside box */
                .logo {
                  font-size: 40px;
                  font-weight: 700;
                  font-family: "Times New Roman", serif;
                  margin-bottom: 18px;
                  letter-spacing: 2px;
                }
                
                /* Headings */
                .loginCard h2 {
                  font-size: 20px;
                  margin-bottom: 4px;
                }
                
                .loginCard p {
                  font-size: 13px;
                  color: #dfcfac;
                  margin-bottom: 15px;
                }
                
                /* Small plane icon */
                .planeIcon {
                  color: #f1d28d;
                  margin: 10px 0 18px;
                  font-size: 18px;
                  opacity: 0.8;
                }
                
                /* Form fields */
                .loginForm {
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                }
                
                .loginForm input {
                  padding: 12px 14px;
                  background: rgba(255, 255, 255, 0.12);
                  border-radius: 10px;
                  border: 1px solid rgba(255, 222, 158, 0.25);
                  color: white;
                  outline: none;
                  transition: 0.25s;
                }
                
                .loginForm input::placeholder {
                  color: #d9c8a4;
                }
                
                .loginForm input:focus {
                  border-color: #f5d99b;
                }
                
                /* Button */
                .btnLogin {
                  margin-top: 6px;
                  padding: 12px;
                  font-size: 15px;
                  font-weight: 600;
                  background: linear-gradient(135deg, #f1d18a, #caa55d);
                  border: none;
                  border-radius: 10px;
                  color: #0c0f1a;
                  cursor: pointer;
                }
                
                .btnLogin:hover {
                  opacity: 0.95;
                }
                
                /* Register text */
                .registerText {
                  margin-top: 16px;
                  font-size: 14px;
                  color: #e8d7a7;
                }
                
                .registerText a {
                  color: #f5d99b;
                  text-decoration: none;
                  font-weight: 500;
                }
                  .logo hr{
                    border: 1px solid rgba(245, 217, 155, 0.25);
                    margin-top: -10px;
                    margin-bottom: 15px;
                
                  }
                .back {
                  position: absolute;
                  top: 12px;       /* Moves it inside the box edge */
                  left: 12px;      /* Left corner */
                  font-size: 14px;
                  font-weight: 500;
                  color: #f5d99b;
                  text-decoration: none;
                  cursor: pointer;
                }
                                
                .back:hover {
                  text-decoration: underline;
                }

            `}
        </style>
        <div className="loginPage">
        
        <div className="loginCard">
            <Link to="/" className="back">
            ←Back to Home </Link>

          <br/>
          <div className="logo">VEYORA</div><br/>

          <h1>Login to Your Account</h1>
          <p>Welcome Back to Veyora</p>


          <form className="loginForm" onSubmit={handleLogin}>    {/*when the form is submitted, it triggers the handleLogin function, which handles the authentication process by sending the login credentials to the backend API and managing the response accordingly (success or error).*/}
            <input type="text" name="email" placeholder="Email/Username" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" className="btnLogin">Login</button>
          </form>

          {success && (
  <p style={{
    color: "#7fffd4",
    marginTop: "12px",
    fontSize: "14px"
  }}>
    {success}
  </p>
)}


          {error && (
            <p style={{
              color: "#ff6b6b",
              marginTop: "12px",
              fontSize: "14px"
            }}>
              {error}
            </p>
          )}
          

          <div className="registerText">
            Don&apos;t have an account? <Link to="/register">Register</Link>    {/*provides a link to the registration page for users who do not have an account, allowing them to create one before attempting to log in.*/}
          </div>

        </div>

      </div>
        </>

    );
}

export default Login;