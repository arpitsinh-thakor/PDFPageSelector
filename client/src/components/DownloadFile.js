import React, { useEffect, useState} from 'react'

const DownloadFile = () => {
    const [files, setFiles] = useState([])
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/v1/getFiles')
                const data = await res.json()
                setFiles(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFiles()
    })

  return (
    <div>
        
        <h1>Download File</h1>
        <div>
            {
                files.map((file, index) => (
                    <div key={index}>
                        <h4>{file.name}</h4>
                        <a href={file.url} download={file.name}>Download</a>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default DownloadFile