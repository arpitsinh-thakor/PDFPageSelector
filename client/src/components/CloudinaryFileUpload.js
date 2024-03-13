import React from 'react'

const CloudinaryFileUpload = () => {
  return (
    <div>
        <h1>Cloudinary File Upload</h1>
        
        <form action="http://localhost:4000/api/v1/cloudinaryFileUpload" 
            method="POST" encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload File</button>
        </form>
        
    </div>
  )
}

export default CloudinaryFileUpload