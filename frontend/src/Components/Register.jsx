import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from 'react';
import axios from 'axios';
export default function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [age, setAge] = useState(0);
  function clear() {
    setName("");
    setEmail("");
    setPass("");
    setAge(0);
  }
 async function save_data() {
    try {
      let pass_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
      let username_RE = /^[A-Za-z_-]{3,20}$/
      if (!name || !email || !pass || age === 0) {
        toast.error("All Fields Are Empty Please Fill All Required Fields")
      } else if(!pass_RE.test(pass)) {
        toast.error("Password Invalid")
      } else if(!username_RE.test(name)) {
        toast.error("Username Invalid")
      } else if(age < 18) {
        toast.error("Age Must Be Greater Than 18")
      } else {
        await axios.post("http://localhost:7062/web/reg", {
      name: name,
      email: email,
      password: pass,
      age: age
    })
    console.log("Data Saved Successfully");
    toast.success("Data Saved Successfully");
    clear();
      }} catch (error) {
      if (error.status === 409) {
        toast.error("Email Has Already Exist")
      } else {
        toast.error(error)
      console.log(error)}}}
  return (
    <div className='container'> <hr /><br />
      <h1>User Registration Form</h1><hr /><br />
      <label>Enter Your Name</label>
      <input className='form-control my-2' type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Name' /><br /><br />
      <label>Enter Your Email</label>
      <input className='form-control my-2' type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email' /><br /><br />
      <label>Enter Your Password</label>
      <input className='form-control my-2' type="password" value={pass} onChange={(e)=> setPass(e.target.value)} placeholder='Enter Password' /><br /><br />
      <label>Enter Your Age</label>
      <input className='form-control my-2' type="number" value={age} onChange={(e)=> setAge(e.target.value)} placeholder='Enter Age' /><br /><br />
      <button className='btn btn-outline-success my-2' onClick={save_data}>Submit</button>
      <ToastContainer />
    </div>
  )
}
