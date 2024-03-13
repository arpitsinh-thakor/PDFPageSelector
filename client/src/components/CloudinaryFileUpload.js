import React from 'react'
import { useState } from 'react'

const CloudinaryFileUpload = () => {

  const [file, setFile] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }


  const handlerUploadToCloudinary = (e) => {
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'cloudinaryFileUpload')

    fetch('http://localhost:4000/api/v1/uploadFileToCloudinary', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setUploadedFile(true)
    })
    .catch(error => {
      console.error(error)
    })
  }
  return (
    <div>
        <h1>Cloudinary File Upload</h1>
        
        <input type="file" onChange={handleFileChange}/>
        <button onClick={handlerUploadToCloudinary}>Upload to Cloudinary</button>
        {
          uploadedFile && (
            <div>
              <h2>File uploaded to Cloudinary successfully</h2>
              <h3>File name: ${file.name} | File type - ${file.type}| File size: ${file.size} bytes</h3>
            </div>
          )
        }
    </div>
  )
}

export default CloudinaryFileUpload