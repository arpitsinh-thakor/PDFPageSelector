import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import dotenv from 'dotenv'
dotenv.config()

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

    fetch(process.env.SERVER +'api/v1/uploadFileToCloudinary', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setUploadedFile(true)
      toast.success('File Uploaded Successfully to Cloudinary')
    })
    .catch(error => {
      console.error(error)
    })
  }
  return (
    <div className='flex flex-col items-center gap-4 m-4'>
        
        <h1 className='px-6 text-2xl font-serif font-bold bg-blue-700 p-2 rounded-md text-white hover:bg-blue-600 transition duration-300 ease-in-out'
          >Cloudinary File Upload</h1>
        
        <input 
          className='p-2 border-2 border-gray-300 rounded-md w-72 text-center bg-gray-100 hover:bg-gray-200 hover:border-gray-400 transition duration-300 ease-in-out'
          type="file" 
          onChange={handleFileChange}/>

        {
          file && (
              <button 
                  className='p-2 min-w-fit text-white bg-sky-500 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 font-serif font-bold'
                  onClick={handlerUploadToCloudinary}>Upload to Cloudinary</button>
            )
        }
        
        {
          uploadedFile && (
            <div className='text-xl font-serif font-bold bg-green-500 p-2 rounded-md text-white hover:bg-green-600 transition duration-300 ease-in-out'
            >
              <h3>{`File name: ${file.name} | File type - ${file.type}| File size: ${file.size} bytes`}</h3>
            </div>
          )
        }
    </div>
  )
}

export default CloudinaryFileUpload