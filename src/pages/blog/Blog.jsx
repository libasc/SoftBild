// import BlogCard from "../../components/BlogCard"
// import BlogHeroSection from "../../components/BlogHeroSection"

// function Blog(){
//     return(
//         <>
//         <BlogHeroSection></BlogHeroSection>

//         {/* Blog Section Starts  */}
//         <section className="container-fluid py-80 bg-blue2 bg-img-top">
//             <div className="container">
//                 <div className="row sb-blog-wrapper bg-img-blog-home">
//                     <BlogCard />
//                     <div className="col-lg-12 text-center">
//                         <button type="button" className="sf-btn3">se all</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         {/* Blog Section Ends  */}
//         </>
//     )
// }
// export default Blog


import { useEffect, useState } from "react";
import readMoreIcon from "../../assets/icons/arrow-right-blue.svg";
import BlogHeroSection from "../../components/app-components/BlogHeroSection"
import axios from "axios";
import { Link } from "react-router-dom";

function Blog(){

    const [posts, setPosts] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:4000/data")
        .then(res=>{
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <>
        <BlogHeroSection></BlogHeroSection>

        {/* Blog Section Starts  */}
        <section className="container-fluid py-80 bg-blue2 bg-img-top">
            <div className="container">
                <div className="row sb-blog-wrapper bg-img-blog-home">
                    {
                        posts.map((post, index)=>(
                            <div className="col-lg-4 d-flex" key={index}>
                                <div className="sb-blog-card1">
                                    <div className="sb-blog-card1-content">
                                        <div className="sb-blog-card1-inner-content">
                                            
                                            {/* Blog Image */}
                                            <div className="blog-card-image">
                                                <img src={post.image} alt="Blog Post Image" />
                                            </div>
                                            
                                            {/* Blog Date and Read Time */}
                                            <div className="blog-date-time">
                                                <p>October 27, 2024 <span style={{ marginLeft: '15px' }}>5 min read</span></p>
                                            </div>
                                            
                                            {/* Blog Title and Description */}
                                            <h3 className="dark-title2">{post.title}</h3>
                                            <p>{post.description}</p>
                                    
                                        </div>
                                        
                                        {/* Read More Button */}
                                        <div className="blog-read-more-btnwrapper justify-content-end">
                                        <Link to={`/EditBlog/${post.id}`} className="blog-btn-text-read-more text-gradient1 me-3">Edit</Link>
                                        <Link to={`/DeleteBlog/${post.id}`} className="blog-btn-text-read-more text-gradient1 me-3">Delete</Link>
                                            <Link to={`/BlogDetails/${post.id}`} className="blog-btn-text-read-more text-gradient1">Read More</Link>
                                            <div className="blog-btn-icon-read-more">
                                                <img src={readMoreIcon} alt="Read More Icon" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    

                    <div className="col-lg-12 text-center">
                        <button type="button" className="sf-btn3">se all</button>
                    </div>
                </div>
            </div>
        </section>
        {/* Blog Section Ends  */}
        </>
    )
}
export default Blog

