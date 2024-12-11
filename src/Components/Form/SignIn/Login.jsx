import { React, useState } from "react";
import { InputField } from "./Field";
import { signIn } from "../../../Services/Services";
import { toast } from "react-toastify";
import "./login.css";
import NavBar from "../../NavBar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.password) {
      console.log("Something is empty");
      toast.error("Error: Please input all fields");
      setLoading(false);
      return;
    }

    const loadingToastId = toast.loading("Logging in...");

    signIn(formData)
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        localStorage.setItem("userId", JSON.stringify(resp.userID));
        toast.dismiss(loadingToastId);
        toast.success("Login Successful");
        const hashedPassword = btoa(formData.password);
        localStorage.setItem("hashedPassword", hashedPassword);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        toast.dismiss(loadingToastId);
        if(error.message.includes("401")) {
          toast.error("Error: Invalid credentials");
        }
      }).finally(() => {
        setLoading(false);
      });
      setFormData({
        username: "",
        password: "",
      });
  };

  return (
    <div>
      <NavBar />
      <div className="login-page">
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className="form-row">
              <InputField
                label="Email Address"
                name="username"
                type="email"
                placeholder="Enter Email Address..."
                value={formData.username}
                change={handleChange}
                required={true}
              />
            </div>
            <div className="login-row">
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Password..."
                value={formData.password}
                change={handleChange}
                required={true}
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            <p className="register-new">Don't have an account? <Link to="/signup" className="register-link">Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
