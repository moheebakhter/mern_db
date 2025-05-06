
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css"

export default function Showdata() {

    let [user_data, setUserData ] = useState([])
    let [na, setNa] = useState("")
    let [em, setEm] = useState("")
    let [id, setId] = useState("")
    let [age, setAge] = useState(0)


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

    async function Edit(){
        try{
            await axios.put(`http://localhost:7062/web/get/${id}`,{
                name: na,
                email: em,
                age:age
            }).then((e)=>{
                datadalo();
                toast.success(e.data.msg)
                document.querlySelector(".subhan").click()

            })
        } catch(error) {
            toast.error(error.response.data.msg)
        }
    }
    function  fetch_data (a,b,c,d){
        setNa(a)
        setEm(b)
        setId(d)
        setAge(c)
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
                        {/* 1 */}
                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onClick={()=> fetch_data(a.name,a.email,a.age,a._id)}>
                            <i class='bi bi-pen' data-bs-toggle="modal" data-bs-target="#exampleModal"></i> </button>
                    </div>
                </div>
            ))

            
            }

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" className="form-control mt-2" value={na} onChange={(e)=>setNa(e.target.value)}/>
        <input type="text" className="form-control mt-2" value={em} onChange={(e)=>setEm(e.target.value)}/>
        <input type="text" className="form-control mt-2" value={age} onChange={(e)=>setAge(e.target.value)}/>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary subhan" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={Edit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
      
    </div>
  )
}
