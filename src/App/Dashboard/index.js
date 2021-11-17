import React, { useContext, useEffect, useState } from "react"
import { WrapperContext } from "../index"
import { getuser,updateuser } from "../interaction"
import '../App.css';
export const Dashboard=({history})=>{
    
    //const {token} = useContext(WrapperContext)
    const token=localStorage.getItem("auth_token");
    let [user,setUser]=useState({name:"",email:"",mobile:"",dob:null,gender:""});
    const [age,setAge]=useState();
    const[loading,setloading]=useState(0)
    const [message,setMessage]=useState("");
    const [successmessage,setSuccessMessage]=useState("");

    const getUserInfo=()=>{
      //  const {email}=user
     //   console.log(email);
        getuser(token).then((info)=>{
            user=info.data;
            if(user.dob){
                calculateAge(user.dob);
            }
           setUser(user);
           setloading(1);
        }).catch((error)=>{
            console.log(error);
        })
    }

    function calculateAge(birthday) { 
        console.log(typeof(birthday));
        var dob=new Date(birthday)
        var ageDifMs = Date.now() - dob.getTime();
        var ageDate = new Date(ageDifMs); 
        var ages=Math.abs(ageDate.getUTCFullYear() - 1970);
        setAge(ages);
        
    }

    const update=()=>{
       
        setMessage("")
        setSuccessMessage("")
        const {dob,gender,mobile}=user;
        if(dob){
            calculateAge(dob);
        }
        if(isNaN(mobile)){
            setMessage("not a valid mobilenumber");
        }else{
            setSuccessMessage("updated Successfully")
            updateuser(dob,gender,mobile,token).then((info)=>{
                console.log(info);
                user=info.data;
                if(user.dob){
                    calculateAge(user.dob);
                }
               setUser(user);
               setSuccessMessage("");
               setloading(1);
            }).catch((error)=>{
                console.log(error);
            })
            
        }  
    }
    const logout=()=>{
        localStorage.removeItem("auth_token");
        history.push(`/login`)
    }
    useEffect(()=>{
        if(!loading){
            getUserInfo()
        }
    },[loading])
    
    return(
        <>
        <ul className="nav p-1">
               <li className="nav-item">
               <button type="button" className="btn btn-link logout"  onClick={logout}>Logout</button>
               </li>
        </ul>

        <div className="container center " >
        
        <form >
        <h1 className="head p-5">Profile</h1>
        <div className="row">
            <div offset="col-6">
            <div className="row">
                <div className="col-6"><label>Name</label></div>
                <div className="col-6">{user.name}</div>
                <div className="col-6"><label>Email</label></div>
                <div className="col-6">{user.email}</div>
                <div className="col-6 p-2"><label for="birthday">Birthday:</label></div>
                <div className="col-6 p-2"><input 
                    type="date" 
                    name="birthday" 
                    id="birthday"
                    className="form-control" 
                    placeholder="Enter Mobileno."
                    value = {user.dob}
                    required
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, dob:e.target.value}))
                    }}
                    /></div>
                <div className="col-6 p-2"><label>Age</label></div>
                <div className="col-6 p-2">{age}</div>
                <div className="col-6 p-2">
                    <label for="fname">Mobile No.</label></div>
                <div className="col-6 p-2">
                <input 
                    type="tel" 
                    name="firstname" 
                    id="fname"
                    className="form-control" 
                    placeholder="Enter Mobileno."
                    value = {user.mobile}
                    required
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, mobile:e.target.value}))
                    }}
                    />
                </div>
                <div className="col-6 p-2"><label>Gender</label></div>
                <div className="col-6 p-2">
                <input 
                    type="radio" 
                    name="Gender" 
                    id="female"
                    checked={user.gender=="female"}
                    value ="female"
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, gender:e.target.value}))
                    }}
                    />
                <label for="female">Female</label>&nbsp;&nbsp;
                <input 
                    type="radio" 
                    name="Gender" 
                    id="male"
                    checked={user.gender=="male"}
                    value ="male"
                    onChange={(e)=>{
                        setUser((usr)=>({...usr, gender:e.target.value}))
                    }}
                    />
                <label for="male">Male</label>  </div>
            </div>
            <p className="error">{message}</p>
            <button 
            type="button"
            className="btn btn-primary"
            onClick={update}
            >Update</button>
            <p className="message">{successmessage}</p>
            </div>
            </div>
            
        </form>
    </div>
    </>
    )
    
}