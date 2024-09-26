import React, { useState, useEffect } from "react";
import "../register/Register.css";
import { validateForm } from "../../utils/Function";
import { toast } from "react-toastify";
import { REGISTER,LOGIN} from "../../utils/ApiRoute";

const Register = () => {

  const [buttonText, setButtonText] = useState("Register");
  const [formdata1, setFormdata1] = useState({
    email: "",
    password: "",
  });
  const handleToastClose = () => {
    setToastShown(false);
  };
  const [toastShown, setToastShown] = useState(false);

  const RegisterCheck = () => {
    const capitalizeFirstLetter = (string) => {
      if (typeof string === 'string') {
        return string.charAt(0).toUpperCase() + string.slice(1);
      } else if (typeof string === 'object' && string !== null) {
        const key = Object.keys(string)[0];
        const value = string[key];
        return { [key]: value.charAt(0).toUpperCase() + value.slice(1) };
      }
      return string;
    };
    setButtonText('Register')
    if (Object.keys(validateForm(formdata1)).length !== 0 && !toastShown) {
      const errorMessage = Object.values(validateForm(formdata1))[0];
      const formattedErrorMessage = capitalizeFirstLetter(errorMessage);
      toast.error(formattedErrorMessage, {
        autoClose: 3000, // Close after 6 seconds
        closeButton: false,
        onClose: handleToastClose,
      }
      );
      setToastShown(true);
      return;
    }
    fetch(REGISTER, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formdata1.email,
        password: formdata1.password,
        is_active: true,
        is_superuser: false,
        is_verified: false
      })
    })
      .then(response => {
        if (!toastShown && !response.ok) {
          toast.error("Register user already exists",{
            autoClose: 3000, // Close after 6 seconds
            closeButton: false, // Hide the default close button
            onClose: handleToastClose, 
          });
          setToastShown(true);
          throw new Error(response.detail);
        }
        return response.json();
      })
      .then(data => {
          localStorage.setItem('isLoggedIn', true);
        localStorage.setItem("users",JSON.stringify(data));

        fetch(LOGIN, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'grant_type': '',
            'username': formdata1.email,
            'password': formdata1.password,
            'scope': '',
            'client_id': '',
            'client_secret': ''
          })
        })
          .then(response => {
        
            return response.json();
          })
          .then(data => {
            if (!toastShown && data) {
              toast.success("Register Successfully",{
                autoClose: 3000, // Close after 6 seconds
                closeButton: false, // Hide the default close button
                onClose: handleToastClose, 
              });
              setToastShown(true);
            }
            localStorage.setItem("logindata",JSON.stringify(data));
             window.location.href = '/optimized_sp';
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          }); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata1({ ...formdata1, [name]: value });
  };

  return (
    <div className="container">
      <div>
        <img src="/logo.png" className="logoimage" />
      </div>

      <div className="title">Registration</div>
      <div className="content">

        <div className="user-details">
          {/* <div className="input-box">
          <span className="details">Full Name</span>
          <input type="text" placeholder="Enter your name" required="" />
        </div> */}
          {/* <div className="input-box">
          <span className="details">Username</span>
          <input type="text" placeholder="Enter your username" required="" />
        </div> */}
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text"
              placeholder="Enter your email"
              className="form-control"
              name="email"
              value={formdata1.email}
              onChange={handleInputChange} />
          </div>
          {/* <div className="input-box">
          <span className="details">Phone Number</span>
          <input type="text" placeholder="Enter your number" required="" />
        </div> */}
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password"
              placeholder="Enter your password"
              className="form-control"
              name="password"
              value={formdata1.password}
              onChange={handleInputChange} />
          </div>
          {/* <div className="input-box">
          <span className="details">Confirm Password</span>
          <input type="text" placeholder="Confirm your password" required="" />
        </div> */}
        </div>
        {/* <div className="gender-details">
        <input type="radio" name="gender" id="dot-1" />
        <input type="radio" name="gender" id="dot-2" />
        <input type="radio" name="gender" id="dot-3" />
        <span className="gender-title">Gender</span>
        <div className="category">
          <label htmlFor="dot-1">
            <span className="dot one" />
            <span className="gender">Male</span>
          </label>
          <label htmlFor="dot-2">
            <span className="dot two" />
            <span className="gender">Female</span>
          </label>
          <label htmlFor="dot-3">
            <span className="dot three" />
            <span className="gender">Prefer not to say</span>
          </label>
        </div>
      </div> */}
        <div className="button">
          <input type="submit" value={buttonText} onClick={RegisterCheck} />
        </div>

      </div>
    </div>
  )
}

export default Register