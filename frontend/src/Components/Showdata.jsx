
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"

export default function Showdata() {
    let [user_data, setUserData ] = useState([])
    useEffect(() =>{
        datadalo()
    }, [])
    async function datadalo(){
        await axios.get("http://localhost:7062/web/get")
              .then((abc) =>{
                console.log(abc.data)
                setUserData(abc.data)
              })
              .catch((e) =>{
                console.log(e)
              })

    }
    async function remove(id){
        try{
            if (window.confirm("Are you sure you want to delete this record")){
                await axios.delete(`http://localhost:7062/web/get/${id}`).then(()=>{
                    datadalo();
                    toast.info("Record Deleted Successfully")
                })
            }
        }catch (error) {
            toast.error(error.response.data.msg)
        }
    }
  return (
    <div className='container'>

    <ToastContainer/>
        <h1>User Data</h1>
        <hr />
        <div className='row'>

            {(user_data.length === 0) ? (
                <div className='col-md-12'>
                    <div class='card'>
                        <div class="card-body">
                            <h4 class="card-tittle text-danger">

                            </h4>
                        </div>
                    </div>
                </div>
            ):
            user_data.map((a)=>(
                <div className="col-md-3 mt-2" key={a.id}>
                    <div class="card-body">
                        <h4 class="card-title">{a.name}</h4>
                        <p class="card-text">{a.email}</p>
                        <button className="btn btn-danger" onClick={()=>{remove(a._id)}}><i class="bi bi-trash3-fill"></i></button>
                    </div>
                </div>
            ))

            
            }

        </div>
      
    </div>
  )
}
