import React from 'react'
import AddBlog from '../blog/AddBlog'
import EditBlog from '../blog/EditBlog'
import DeleteBlog from '../blog/DeleteBlog'

function Page() {
  return (
    <>
    <AddBlog></AddBlog>

    <EditBlog></EditBlog>

    <DeleteBlog></DeleteBlog>
    </>
  )
}

export default Page