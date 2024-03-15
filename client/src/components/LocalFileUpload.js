import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import dotenv from 'dotenv'
dotenv.config()

const LocalFileUpload = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUploadClick = () => {
    const formData = new FormData()
    formData.append('file', file)
    fetch(process.env.SERVER +'api/v1/localFileUpload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      toast.success('File Uploaded Successfully')
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div className='flex flex-col items-center gap-4 m-4'>
      <h2 className='px-6 text-2xl font-serif font-bold bg-blue-700 p-2 rounded-md text-white hover:bg-blue-600 transition duration-300 ease-in-out'
        >Local File Upload</h2>
      <input className='p-2 border-2 border-gray-300 rounded-md w-72 text-center bg-gray-400 hover:bg-gray-200 hover:border-gray-400 transition duration-300 ease-in-out'
        type="file" onChange={handleFileChange}/>
      <div>
      <div className='flex flex-col items-center'>
        {
          file && <button className='p-2 m-2 min-w-fit  text-white bg-sky-500 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 font-serif font-bold'
                      onClick={handleUploadClick}>
                    Upload
                  </button>
        }
      </div>
        <div>
          {
            file && (
                      <div className='text-xl font-serif font-bold bg-green-500 p-2 rounded-md text-white hover:bg-green-600 transition duration-300 ease-in-out'>
                      `File name: ${file.name} | File type - ${file.type}| File size: ${file.size} bytes`
                      </div> 
                    )
          }
        </div>
      </div>
      
    </div>
  )
}

export default LocalFileUpload