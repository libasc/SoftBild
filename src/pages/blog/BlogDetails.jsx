import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BlogDetails() {
    const [posts, setPosts] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:4000/data/${id}`)
        .then(res=>{
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


  return (
    <>
    {/* <h1>Blog Details {id}</h1> */}
    <h1>{posts.title}</h1>
    <img src={posts.image} alt="" style={{width:200}} />
    <p>{posts.description}</p>

    </>
  )
}

export default BlogDetails