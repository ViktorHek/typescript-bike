'use client'
import React, { EventHandler, useState } from "react";
import axios from 'axios'
import Button from './components/Button'
import Icons from "./components/Icons";
import './styles/home.css'

export default function Login() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfermation, setpasswordConfermation] = useState("");

  interface User {
    id: number,
    name: string,
    password: string,
    email: string,
    favoritBike: number,
    imgUrl: string,
    money: number,
    points: number,
  }

  function handleLogin() {
    setOpenLogin(!openLogin);
  }

  function handleRegister() {
    setOpenRegister(!openRegister);
  }

  const handleSubmitRegistration = async () => {
    if (!name || !email || !password || !passwordConfermation) {
      alert("missing something");
      return;
    }
    if(password !== passwordConfermation) {
      alert('password and password confermation does not match');
      return;
    }
    const payload = {
      email: email,
      userName: name,
      password: password,
    };
    let result = await axios.put("https://shy-rose-goldfish-wrap.cyclic.app/register", { payload });
    if (result.status === 200) {
      localStorage.setItem('user', name)
      window.location.assign("http://localhost:3000/bikes")      
    }
  };

  const handleSubmitLogin = async () => {
    if (!name || !password) {
      alert("missing something");
      return;
    }
    const payload = {
      userName: name,
      password: password,
    };
    let result = await axios.post("https://shy-rose-goldfish-wrap.cyclic.app/login", { payload });
    if (result.data.userName) {
      localStorage.setItem('user', name)
      if(result.data.admin) {
        window.location.assign("http://localhost:3000/admin")
      } else {
        window.location.assign("http://localhost:3000/bikes")
      }
    } else {
      alert(result.data);
    }
  };

  function changeView() {
    setOpenRegister(!openRegister);
    setOpenLogin(!openLogin);
  }

  return (
    <div className="home-main-container">
      {openRegister || openLogin ? (
        <div className="home-header-container">
          <span style={{ color: openLogin ? "#000000" : "#04444D" }} onClick={changeView}>
            SIGN IN
          </span>
          <span className="seperator"></span>
          <span style={{ color: openRegister ? "#000000" : "#04444D" }} onClick={changeView}>
            SIGN UP
          </span>
        </div>
      ) : (
        <span style={{ height: "20%", backgroundColor: "transparent" }}></span>
      )}
      <div className="home-inner-container center">
        <img src="/home-bg.png" alt="sorry :(" className="home-backgrond-img" />
        {!openRegister && !openLogin ? (
          <>
            <span className="home-wellcome-text">
              Wellcome Biker!
            </span>
            <div className="home-button-container">
              <Button
                text={"Sign in"}
                handleClick={handleLogin}
                type={"secondary"}
                color={"primary"}
              />
              <Button
                text={"Sign up"}
                handleClick={handleRegister}
                type={"secondary"}
                color={"primary"}
              />
            </div>
          </>
        ) : null}
        {openRegister && (
          <div className="main-register-container">
            <div className="form-header center">
              <span>SIGN UP</span>
              <span>To Create An Account</span>
            </div>
            <div
              // onSubmit={() => handleSubmitRegistration()}
              className="register-form-container">
              <div className="input-container">
                <div className="input-icon-container center">
                  <Icons type={"email"} color={"black"} />
                </div>
                <input type="text" name="email" placeholder="Email" onChange={(event: any) => setEmail(event.target.value)} />
              </div>
              <div className="input-container">
                <div className="input-icon-container center">
                  <Icons type={"user"} color={"black"} />
                </div>
                <input type="text" name="name" placeholder="User name" onChange={(event: any) => setName(event.target.value)} />
              </div>
              <div className="input-container">
                <div className="input-icon-container center">
                  <Icons type={"lock"} color={"black"} />
                </div>
                <input type="password" name="password" placeholder="Password" onChange={(event: any) => setPassword(event.target.value)} />
              </div>
              <div className="input-container">
                <div className="input-icon-container center">
                  <Icons type={"lock"} color={"black"} />
                </div>
                <input type="password" name="password2" placeholder="Repeat Password" onChange={(event: any) => setpasswordConfermation(event.target.value)} />
              </div>
              <button className="form-submit-btn" onClick={() => handleSubmitRegistration()}>Sign Up</button>
            </div>
          </div>
        )}
        {openLogin && (
          <div className="main-register-container">
            <div className="form-header center">
              <span>SIGN IN</span>
              <span>To Continue</span>
            </div>
            <div className="login-form-container">
              <div className="input-container">
                <div className="input-icon-container center">
                  <Icons type={"user"} color={"black"} />
                </div>
                <input type="text" name="name" placeholder="User name" onChange={(event: any) => setName(event.target.value)} />
              </div>
              <div className="input-container">
                <div className="input-icon-container center">
                  <Icons type={"lock"} color={"black"} />
                </div>
                <input type="password" name="password" placeholder="Password" onChange={(event: any) => setPassword(event.target.value)} />
              </div>
              <button className="form-submit-btn" onClick={() => handleSubmitLogin()}>Sign In</button>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}









// <div className="main-login-container">
//   <span className="close-modal-button" onClick={() => setOpenLogin(!openLogin)}>
//     x
//   </span>
//   <form onSubmit={(event) => handleSubmitLogin(event)}>
//     <div className="name-input-container">
//       <label>
//         User Name:
//         <input type="text" name="name" />
//       </label>
//     </div>
//     <div className="password-input-container">
//       <label>
//         Password:
//         <input type="text" name="password" />
//       </label>
//     </div>
//     <input type="submit" value="Submit" />
//   </form>
// </div>
