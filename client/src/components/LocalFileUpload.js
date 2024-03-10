import React from 'react'
import { useState } from 'react'

const LocalFileUpload = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUploadClick = () => {
    const formData = new FormData()
    formData.append('file', file)
    fetch('http://localhost:4000/api/v1/localFileUpload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange}/>
      <div>
        {
          file && `File name: ${file.name} | File type - ${file.type}| File size: ${file.size} bytes`
        }
      </div>
      <button onClick={handleUploadClick}>
        Upload
      </button>
    </div>
  )
}

export default LocalFileUpload