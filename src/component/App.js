import React ,{useState,useEffect}  from "react";
import TodoList from "./TodoList";
import LoginForm  from "./LoginForm";
import "./../styles/App.css";

function App(){

    const [loggedIn,setLoggedIn] = useState(false);
    const [error,setError] = useState(undefined);
    const [token,setToken] = useState("");
    const [store,setStore] = useState(null);
    
    const signupHandler = (email,password)=>{
        console.log(email,password);
    }

    const logout = ()=>{
        localStorage.removeItem('login');
        setLoggedIn(false);
    }

    useEffect(()=>{
        let store = JSON.parse(localStorage.getItem('login'));
         if( store && store.login){
        setLoggedIn(store.login);
        setToken(store.token);
        console.log(store.login);
        console.log(store.token);
         }
    },[])
    const loginHandler = (email,password)=>{
       console.log(email,password);
       fetch("http://localhost:8000/login",{
           method:"POST",
           body :JSON.stringify({email:email,password:password}),
           headers:{
               "content-Type":"application/json"
           },
       }).then((r)=>{
                 console.log(r)
                r.json().then((result)=>{
                    console.log(result);
                    localStorage.setItem('login',JSON.stringify({
                        login:true,
                        token:result.token
                    }))
                    setLoggedIn(true)
                })
                      if(r.ok){
                       
            return{success:true};
             
            
           }
           else{
               return r.json()
            
          }
           
       })
        }




     return loggedIn ?
     <>
      <TodoList token={token}/>
      <button id="btn" onClick={logout}>Logout</button>

      </>
     
       : <>
       <body>
        <LoginForm signupHandler={signupHandler} loginHandler={loginHandler} error={error}/>
       </body>
       </>
}

export default App;