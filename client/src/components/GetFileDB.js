import React, {useState} from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, PDFPage } from 'pdf-lib';
import { set } from 'mongoose';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const GetFileDB = () => {
    const [id, setId] = useState('')
    const [fileUrl, setFileUrl] = useState(null);

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

    const [numPages, setNumPages] = useState(null);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    
    const [selectedPages, setSelectedPages] = useState([]);
    const handleCheckbox = (e) => {
        const value = parseInt(e.target.value);
        if(e.target.checked){
            setSelectedPages([...selectedPages, value]);
        } else {
            setSelectedPages(selectedPages.filter(page => page !== value));
        }
    }

    const downloadSelectedPagesFile = async () => {
       const pdfDoc = await PDFDocument.create();
        const loadedPdf = fileUrl
        const loadedPdfBytes = await fetch(loadedPdf).then(res => res.arrayBuffer());
        const loadedPdfDoc = await PDFDocument.load(loadedPdfBytes);
        const indexes = selectedPages.map(page => page - 1);
        const copiedPages = await pdfDoc.copyPages(loadedPdfDoc, indexes);
        copiedPages.forEach((page) => {
            pdfDoc.addPage(page);
        });
        const pdfBytes = await pdfDoc.save();
        const file = new Blob([pdfBytes], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        downloadFile(fileURL);       

    }

    const downloadFile = (fileURL) => {
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'selectedPages.pdf');
        document.body.appendChild(link);
        link.click();
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
                    <embed src={fileUrl} type='application/pdf' width="100%" height="400px" />
                </div>      
        }

        {/* //download selected pages of pdf */}
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {/* //loop all pages */}
            {
                Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ),
                )
            }
        </Document>

        {/* //select pages by button to download */}
        <div>
            <h2>Select Pages to Download</h2>
            {/* //loop checkboxes for all pages */}
            {
                Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <label key={`page_${index + 1}`}>
                            <input type="checkbox" value={index + 1} 
                                onChange={handleCheckbox}
                            />
                            {index + 1}
                        </label>
                    )
                )
            }
            <button onClick={downloadSelectedPagesFile}>Download</button>

        </div>

    </div>

  )
}

export default GetFileDB