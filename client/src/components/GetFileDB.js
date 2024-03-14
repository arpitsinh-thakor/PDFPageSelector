import React, {useState} from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, PDFPage } from 'pdf-lib';
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
    <div className='bg-red-500'>
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

        {/* //select pages by button to download */}
        <div className='bg-green-500 flex flex-col items-center '>
            <h2>Select Pages to Download</h2>
            {/* //loop checkboxes for all pages */}
            <div>
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
            </div>
            <button onClick={downloadSelectedPagesFile}>Download</button>

        </div>

        {/* //download selected pages of pdf */}
        <div>
        <Document className='bg-red-500'
            file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {/* //loop all pages */}
            {
                Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <div className='bg-red-500 flex flex-row mx-auto items-center justify-center'>
                            <div>
                            <p className='h-[20px]'>{`Page - ${index + 1}`}</p>
                            <Page 
                                className='bg-orange-300 display: inline-block h-[900px] w-auto'
                                key={`page_${index + 1}`} pageNumber={index + 1} />
                            </div>
                        </div>
                    ),
                )
            }
        </Document>
        </div>

        

    </div>

  )
}

export default GetFileDB