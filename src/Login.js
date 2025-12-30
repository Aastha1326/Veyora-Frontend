import React, {useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";

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
  };

const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  try {
    const res = await axios.post(
      "http://localhost:3001/api/auth/login",
      formData
    );

    // 🛡️ DEFENSIVE CHECK
    if (!res.data?.token || !res.data?.user) {
      throw new Error("Invalid login response");
    }

    // ✅ REAL SUCCESS
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setSuccess("Login successful! Welcome back to Veyora ✨");

    setTimeout(() => {
      navigate("/");
    }, 1200);

  } catch (err) {
    // ❌ FAILURE PATH
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


          <form className="loginForm" onSubmit={handleLogin}>
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
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </div>

        </div>

      </div>
        </>

    );
}

export default Login;