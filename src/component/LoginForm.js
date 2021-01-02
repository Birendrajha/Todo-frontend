import React ,{useState,useEffect}  from "react";
import "./../styles/App.css";
  


function LoginForm(props){

    const [email,setEmail] = useState("");
    const [password,setPassword] =  useState("");
     return  <div className="login">
      <input type="text"placeholder="Enter Email" value={email} onChange={(event)=>{setEmail(event.target.value)}}></input>
      <input type="password"placeholder="Enter password" value ={password} onChange={(event)=>{setPassword(event.target.value)}}></input>
    {props.error? <div className="error">{props.error}</div> :null}
      <button onClick={()=>props.signupHandler(email,password)} >sign up</button>
      <button onClick={()=>props.loginHandler(email,password)}>login</button>
     </div>
    
}

export default LoginForm;