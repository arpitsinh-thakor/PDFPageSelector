import React, { useEffect } from 'react'
import { useState } from 'react'

const GetFilesFromLocal = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    
    
    useEffect(() => {
        const getFiles = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/v1/getLocalFilesFromFolder')
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
    <div>
        <h1>Get Files From Local</h1>
        {
            files === null? 'No files found' : 'founded files are:'
        }
        {
            loading? 'Loading...' : files.map((file, index) => (
                <div key={index}>
                    <p>{file}</p>
                </div>
            ))
        }
        
    </div>
  )
}

export default GetFilesFromLocal