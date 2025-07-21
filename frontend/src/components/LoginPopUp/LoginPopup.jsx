import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const { url, token, setToken } = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onchangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data => ({ ...data, [name]: value }))

    }
    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url
        console.log(newUrl)
        if(currentState === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl +="/api/user/register"
        }
        const response = await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Login" ? <></> :
                        <input type="text" name="name" onChange={onchangeHandler} value={data.name} placeholder='Your name' required />}
                    <input type="email" name="email" onChange={onchangeHandler} value={data.email} placeholder='Your email' required />
                    <input type="password" name="password" onChange={onchangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-pop-up-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Login" ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click</span></p> : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Click</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup