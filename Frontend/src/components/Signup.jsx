import React,{useState} from 'react'
import {  useNavigate  } from 'react-router-dom';

export default function Signup(props) {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"", cpassword:""})
    let navigate =useNavigate ();
    const handelSubmit = async(e) =>{
        e.preventDefault();
        const{name,email,password}=credentials;
        const response = await fetch('http://localhost:5000/api/auth/createuser',{
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name ,email,password}), 
          });
    
          const json = await response.json()
          console.log(json) 
          if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token' , json.authtoken);
            navigate ("/");
            props.showAlert("Account creates Successfully","success")
          }
           else{
            props.showAlert("Invalid credentials","danger")
           }
        }
        const onChange = (e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
  return (
  
    <div className='container'>
      <form onSubmit={handelSubmit}>
      <div className="mb-3">
    <label for="name" className="form-label">Enter your name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name='name'/>
  </div>
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" required minLength={5} onChange={onChange} name='password'/>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" required minLength={5} onChange={onChange} name='cpassword'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}
