import React from 'react'
import { useState } from 'react'

const FileUploadDB = () => {
    const [file, setFile] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    
    
    const uploadFileToDB = async () => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('http://localhost:4000/api/v1/uploadFileToDB', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div >
        <h1>File Upload DB</h1>

            <input type="file" name="file" onChange={handleFile}/>
            <button onClick={uploadFileToDB}>Upload to DB</button>
    </div>
  )
}

export default FileUploadDB