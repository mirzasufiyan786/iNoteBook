import React,{useState} from 'react'
import {  useNavigate  } from 'react-router-dom';


export default function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate =useNavigate ();
    const handelSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login',{
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}), 
      });

      const json = await response.json()
      console.log(json) 
      if(json.success){
        // save the auth token and redirect
        localStorage.setItem('token' , json.authtoken);
        props.showAlert("logged In Successfully ","success")
        navigate ("/");
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
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"  onChange={onChange} value={credentials.password} id="password" name='password'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
