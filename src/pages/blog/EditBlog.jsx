import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function EditBlog() {
    const [posts, setPosts] = useState({
        title:"",
        image:"",
        description:""
    })
    const {id} = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:4000/data/${id}`)
        .then(res=>{
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[id])

    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:4000/data/${id}`, posts)
        .then(res=>{
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <>
    <div className="container-fluid">
        <div className="container">
        <form className="row g-3 py-60">
            <div className="col-lg-12">
                <h3 className='dark-small-subtitle'>Edit Post</h3>
            </div>
            <div className="col-md-6">
                <label className="form-label">Image</label>
                <input type="email" className="form-control" placeholder='Enter Image Path' 
                value={posts.image}
                onChange={(e)=> setPosts({...posts, image: e.target.value})}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" placeholder='Enter Title' 
                value={posts.title}
                onChange={(e)=> setPosts({...posts, title: e.target.value})}
                />
            </div>
            <div className="col-12">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" placeholder="Enter Description" 
                value={posts.description}
                onChange={(e)=> setPosts({...posts, description: e.target.value})}
                />
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update</button>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default EditBlog