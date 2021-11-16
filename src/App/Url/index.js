import React, { useContext, useEffect, useState } from "react"

import { WrapperContext } from "../index"
import { addurl,visitUrl} from "../interaction";

export const Shorturl = ({history})=>{
    const {user,token} = useContext(WrapperContext)
    const [url,setUrl]=useState({shorturl:"",originalurl:""});
    const [custommessage,setcustomMessage]=useState("");
    const [message,setMessage]=useState("");

   
    const handleCreate=()=>{
        const {shorturl,originalurl} =url
      
        if(shorturl==="")
        {
            setcustomMessage("Enter your custom url")
        }
        else if(originalurl==="")
        {
            setcustomMessage("Enter valid url")
        }
        else
       {
           
        setcustomMessage(" ")
        addurl(token, shorturl,originalurl)
       .then((data)=>{
            const {message,url}=data;
            if(url)
            {
                setMessage(url);
                alert(url);  
               // setUrl({shorturl:"",originalurl:""}); 
            }
            else
            {
                setcustomMessage(message);
                alert(message);
            }
            console.log(data)
        })
        .catch((error)=>{
           console.log(error);
        })
        }
    
    }

    const openUrl=()=>{

        const {email}=user
        console.log(email);
        const {shorturl}=url ;
        visitUrl(token,shorturl,email)
        .then((data)=>{
            const {message}=data;
           
           // setUrl({shorturl:"",originalurl:""}); 
            alert(message);
            //window.location.href = message;
            window.open(message, "_blank")
        }).catch((error)=>{
            console.log(error);
        });

    }
    const create=()=>{
        history.push(`/Shorturl`)
    }
    const view_current_month=()=>{
        history.push(`/Dashboard`)
    }
    const view=()=>{
        history.push(`/CreatedUrl`);
    }
    useEffect(()=>{
        console.log("user::::",user)
    },[])


    return(
        <div className="container p-1">
            <div className="row">
                <div className="col-4">
                <ul className="nav flex-column">
                <li className="nav-item">
                    <button type="button" className="btn btn-link" style={{color: "green",fontSize: "24px"}} onClick={view_current_month}>Report</button>
                </li>
                <li className="nav-item">
                    <button type="button" className="btn btn-link" style={{color: "green",fontSize: "24px"}} onClick={create}> Create Short Url </button>
                </li>
                <li className="nav-item">
                <button type="button" className="btn btn-link" style={{color: "green",fontSize: "24px"}} onClick={view}> Availabel ShortUrl's </button>
                </li>
                </ul>
                </div>
                
        <div className="col-8 center" >
        
            <form >
                <h1 style={{fontSize: "28px"}}>Create Url</h1>
                <div className="row">
                    <div offset="col-2">
                <div className="row">
                <div  className="col-12">
                    <label htmlFor="oUrl" style={{color: "Black",fontSize: "22px"}}>Original Url</label>
                <input 
                type="text"
                name="url"
                id="oUrl"
                className="form-control"
                placeholder="Original Url"
                required
                value={url.originalurl}
                onChange={(e)=>{
                    setUrl((newurl)=>({...newurl,originalurl:e.target.value}))
                }}
                />
                </div>
                <div className="col-12">
                    <label htmlFor="surl" style={{color: "Black",fontSize: "22px"}}>ShortUrl</label> 
                <input 
                type="text"
                name="name"
                id="surl"
                className="form-control"
                required
                value={url.shorturl}
                placeholder="Your own short url"
                onChange={(e)=>{
                    setUrl((newurl)=>({...newurl,shorturl:e.target.value}))
                }}
                />
            </div>
            </div>
                <p style={{color: "red",fontSize: "18px"}}>{custommessage}</p>
                <button 
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
                >create url</button>
                  <span style={{color: "Black",fontSize: "18px"}}>visit the site with your url</span> 

                <button type="button" className="btn btn-link" onClick={openUrl} style={{fontSize: "18px",backgroundColor:"whitesmoke"}}>https://urlshortner-servers.herokuapp.com/short-url/{message}</button>
                
                <span style={{color: "Black",fontSize: "18px"}}>your url:</span> 
                <p style={{color:"Red",fontSize:"18px"}}>https://urlshortner-servers.herokuapp.com/short-url/{message}</p>
           </div>
           </div>
            </form>
        </div>
            </div>
        
        </div>
        )
 
}
