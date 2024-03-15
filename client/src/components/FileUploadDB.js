import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const FileUploadDB = () => {
    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFileToDB = async () => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('https://pdfpageselector-2s6w.onrender.com/api/v1/uploadFileToDB', {
                method: 'POST',
                body: formData
            })
            toast.success('File Uploaded Successfully')
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className='flex flex-col gap-4 items-center'>
            
            <h1 className='font-bold text-2xl font-serif'>File Upload DB</h1>

            <input className='p-2 border-2 border-gray-300 rounded-md w-72 text-center bg-gray-100 hover:bg-gray-200 hover:border-gray-400 transition duration-300 ease-in-out'
                type="file" name="file" onChange={handleFile}/>
            {
                file && <button className='p-2 min-w-fit text-white bg-sky-500 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 font-serif font-bold' 
                onClick={uploadFileToDB}>Upload to DB</button>
            }
            
    </div>
  )
}

export default FileUploadDB