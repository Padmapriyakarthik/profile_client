import React, { useState } from "react"
import { login,signup} from "../interaction"
import '../App.css';

export const Login = ({history})=>{
    const [user,setUser]=useState({name:"",email:"",password:"",confirmpassword:""})
    const [isSignup,toggle]=useState(false);
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");

    const handlepage=()=>{
        toggle(!isSignup);
    }

    const handleSignIn = ()=>{
        const {email,password} =user
      
        if(email===""){
            setcustomMessage("Enter your email")
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            setcustomMessage("Enter valid Email id")
        }
        else if(password===""){
            setcustomMessage("Required field cannot be empty")
        }
        else
        {
            setcustomMessage(" ")
            login(email,password)
            .then((data)=>{
                const {email,token,message}=data;
                if(token)
                {
                    setMessage(" ");
                    setcustomMessage(" ");
                    localStorage.setItem("auth_token",token);
                    alert(message);
                    history.push(`/Dashboard`)      
                }
                else
                {
                    setcustomMessage(message);
                }        
            }).catch((error)=>{
                 console.log("error");
            })
        }
    }

    

    const signup=()=>{
        history.push(`/signup`)
    }
   
    return(
        <div className="container  center p-5" >   
            <form>
                <h1 className="head">SignIn</h1>
                <div className="row" >
                    <div offset="col-2">
                <div className="row">
                    <div className="col-12">
                        <label for="email">Email</label>
                            <input 
                        type="email" 
                        name="email" 
                        id="email"
                        className="form-control" 
                        placeholder="Enter Email"
                        value = {user.email} 
                        onChange={(e)=>{
                            setUser((usr)=>({...usr, email:e.target.value}))
                        }}
                        required/>
                    </div>
                 <div  className=" col-12">
                        <label for="password" >Password</label>

                        <input 
                        type="password" 
                        name="password" 
                        id="password"
                        className="form-control" 
                        placeholder="Enter Your password"
                        value = {user.password}
                    
                        onChange={(e)=>{
                            setUser((usr)=>({...usr, password:e.target.value}))
                        }}
                        required/>
                </div>
                </div>
               <p className="error">{custommessage}</p>
                <button 
                type="button"
                className="btn btn-primary"
                onClick={handleSignIn}
                >SignIn</button> 
                <p className="message">{message}</p>
                <span style={{fontSize:"22px"}}>Not an user already?</span>
                <button type="button" className="btn btn-link message" onClick={signup}>Sign up</button>
                </div>
                </div>
                
            </form>
        </div>
   
    )
}