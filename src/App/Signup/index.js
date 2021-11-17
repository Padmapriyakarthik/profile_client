import React, { useState } from "react"
import { login,signup} from "../interaction"
import '../App.css';

export const Signup = ({history})=>{
    const [user,setUser]=useState({name:"",email:"",password:"",confirmpassword:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");

    const handleSignup=()=>{

        setcustomMessage(" ");
        setMessage("");
        const {name,email,password,confirmpassword} =user
        console.log(confirmpassword);
        if(name===""){
            setcustomMessage("Enter your name")
        }
        else if(email===""){
            setcustomMessage("Enter Your email")
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            setcustomMessage("Enter valid Email id")
        }
        else if(password===""){
            setcustomMessage("password field is required")
        }
        else if((confirmpassword==="") || (password!==confirmpassword)){
            setcustomMessage("Password and confirmpassword doesn't match")
        }
        else{
        signup(name,email,password)
        .then((data)=>{
            const {message,token}=data;
            setMessage(message);
            localStorage.setItem("auth_token",token);
            history.push(`/Dashboard`)  
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    }

    const login=()=>{
        history.push(`/login`)
    }
    return(

            <div className="container center p-5" >
                <form >
                <h1 className="head">Signup</h1>
                <div className="row">
                    <div offset="col-2">
                        <div className="row">
                        <div className="col-12">
                    <label for="fname">Name</label>
                <input 
                    type="text" 
                    name="firstname" 
                    id="fname"
                    className="form-control" 
                    placeholder="Enter your Name"
                    value = {user.name}
                    required
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, name:e.target.value}))
                    }}
                    />
                </div>

                <div  className="col-12">
                    <label for="email"> Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        className="form-control" 
                        placeholder="Enter Email"
                        value = {user.email}
                        required
                        onChange={(e)=>{
                            setUser((usr)=>({...usr, email:e.target.value}))
                        }}
                        />
                    </div>
            
                <div className="col-12">
                <label for="pwd">Password</label>
                <input 
                    type="password" 
                    name="Password" 
                    id="pwd"
                    className="form-control" 
                    placeholder="Enter Your password"
                    value = {user.password}
                    required
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, password:e.target.value}))
                    }}
                    />
                </div>

                <div className="col-12">
                <label for="password">Confirm Password</label>
                    <input
                    type="password" 
                    name="confirmpassword" 
                    id="confirmpassword"
                    className="form-control" 
                    placeholder="Re enter Your password"
                    value = {user.confirmpassword}
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, confirmpassword:e.target.value}))
                    }}
                    required/>
                </div>
                </div>
                    <p className="error">{custommessage}</p>
                    <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSignup}
                    >Signup</button>
                    <div>
                    <p className="message">{message}</p>
                    <span style={{fontSize:"20px",height:"30px"}}>Already an user?</span>
                     <button type="button" className="btn btn-link message"  onClick={login}>Sign In</button>
                    </div>
                    </div>
                 
                    </div>
                    
                </form>
            </div>
        )
}