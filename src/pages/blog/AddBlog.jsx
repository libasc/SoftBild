import axios from 'axios'
import React, { useEffect, useState } from 'react'
function AddBlog() {
    const [posts, setPosts] = useState({
        title:"",
        image:"",
        description:""
    })
    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/data", posts)
    }
  return (
    <>
    <div className="container-fluid">
        <div className="container">
        <form className="row g-3 py-60">
            <div className="col-lg-12">
                <h3 className='dark-small-subtitle'>Create Post</h3>
            </div>
            <div className="col-md-6">
                <label className="form-label">Image</label>
                <input type="email" className="form-control" placeholder='Enter Image Path' 
                onChange={(e)=> setPosts({...posts, image: e.target.value})}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" placeholder='Enter Title' 
                onChange={(e)=> setPosts({...posts, title: e.target.value})}
                />
            </div>
            <div className="col-12">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" placeholder="Enter Description" 
                onChange={(e)=> setPosts({...posts, description: e.target.value})}
                />
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Publish</button>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default AddBlog