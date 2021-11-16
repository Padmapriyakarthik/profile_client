
import React, { useContext, useState,useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import {Redirect} from "react-router-dom";
import {Switch} from "react-router-dom";
import './App.css';

import { Login} from "./Login";
import {Dashboard} from "./Dashboard";
import {Signup} from "./Signup";


export const WrapperContext = React.createContext(
  {
      user:null,
      token:null,
      isLoggedIn:false,
      logout:()=>{}
  }
)

const WrapperRoute = ({render,...restProps})=>{
  //const { isLoggedIn,user}=useContext(WrapperContext);
  const token=localStorage.getItem("auth_token");
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(token){
                   return <Redirect to={`/Dashboard`} /> 
              }else{
                  return render(props)
              }
          }
      }
      />
  )
}

export const ProtectRoute = ({component: Component, ...restProps})=>{
  const { user}=useContext(WrapperContext);
  const token=localStorage.getItem("auth_token");
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(token){
                return (
                  <>
                      <Component {...props} user={user}/>  
                  </>
              )
                 
              }else{
                return <Redirect to="/login"/>
              }
          }
      }
      />
  )

}
function App(){

  const [user, setUser]=useState(null);
  const [token,setToken]=useState(null);
  const [isLoggedIn, setIsLoggedIn]=useState(false);

  const logout = ()=>{
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("auth_token")
  }

  const handleLogin = (usr,token)=>{
      setUser(usr);
      setToken(token);
      setIsLoggedIn(true);
      localStorage.setItem("auth_token",token);
  }

  return (
      <BrowserRouter>
          <WrapperContext.Provider
          value={
              {
                  user,
                  token,
                  isLoggedIn,
                  logout,
              }
          }
          >
              <Switch>
                  <Route exact path="/" render={()=><Redirect to="/login"/>}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/signup" component={Signup}/>
                  <WrapperRoute
                  path = "/login"
                  render={(props)=><Login {...props} handleLogin={handleLogin}/>}
                   />
                  <ProtectRoute exact path="/Dashboard" component={Dashboard} />
              </Switch>

          </WrapperContext.Provider>

      </BrowserRouter>
  )
}
export default App;


