import React, {useState} from 'react'
// import { Document, Page, pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const GetFileDB = () => {
    const [id, setId] = useState('')
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null);
    const [jsonData, setJsonData] = useState(null);

    const handleId = (e) => {
        setId(e.target.value)
    }
    const getFile = async () => {
        const formData = new FormData()
        console.log("getfile called - "+id)
        formData.append('id', id)
        const response = await fetch('http://localhost:4000/api/v1/getFileDB', {
            method: 'POST',
            body: formData
        })
        const data = await response.blob()
        const file = new Blob([data], {type: 'application/pdf'})
        const fileURL = URL.createObjectURL(file)
        setFileUrl(fileURL)
    }
        


  return (
    <div>
        <h1>Get File from DB</h1>
        <input type="text" onChange={handleId} placeholder="Enter ID" />
        <button onClick={getFile}>Get File</button>
        {
               fileUrl && <div>
                    <h2>File</h2>
                    <a href={fileUrl} download >Download File</a>
                    <embed src={fileUrl} type='application/pdf' width="100%" height="600px" />
                </div>      
        }
    </div>
  )
}

export default GetFileDB