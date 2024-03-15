import React, { useEffect } from 'react'
import { useState } from 'react'
import dotenv from 'dotenv'
dotenv.config()

const GetFilesFromLocal = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    
    
    useEffect(() => {
        const getFiles = async () => {
            try {
                const res = await fetch(process.env.SERVER +'api/v1/getLocalFilesFromFolder')
                const data = await res.json()
                setFiles(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        getFiles()
    }, [])

  return (
    <div className='flex flex-col items-center'>
        <h1 className='font-bold text-2xl'>Get Files From Local</h1>
        {
            loading? 'No files found' : 'founded files are:'
        }
        {
            loading? 'Loading...' : files.map((file, index) => (
                <div className='flex flex-row gap-4 p-2 m-1 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out rounded-md w-72 text-center font-serif font-bold text-xl'
                    key={index}>
                        <p>{file}</p>
                    </div>
            ))
        }
        
    </div>
  )
}

export default GetFilesFromLocal