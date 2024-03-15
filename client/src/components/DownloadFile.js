import React, { useEffect, useState} from 'react'
import dotenv from 'dotenv'
dotenv.config()

const DownloadFile = () => {
    const [files, setFiles] = useState([])
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await fetch(process.env.SERVER +'api/v1/getFiles')
                const data = await res.json()
                setFiles(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFiles()
    })

  return (
    <div className='flex flex-col items-center m-4 gap-2'>
        
        <h1 className='font-serif font-bold bg-blue-700 p-2 rounded-md text-white hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer text-lg'
        >Download Files from Cloudinary</h1>
        <div className='flex flex-col items-center gap-1'>
            {
                files.map((file, index) => (
                    <div className='flex flex-row items-center gap-2 m-1'
                        key={index}>
                        <h4 className='font-serif font-bold bg-green-500 p-2 rounded-md text-white hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer text-lg'
                            >{file.name}</h4>
                        <a 
                            className='text-blue-500 hover:underline hover:text-blue-700 transition duration-300 ease-in-out cursor-pointer text-lg'
                            href={file.url} download={file.name}>View on Cloudinary</a>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default DownloadFile