import React, {useEffect, useState} from 'react'
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

    const [pdfViewer, setPdfViewer] = useState(false)
    const handlePDFViewer = () => {
        setPdfViewer(!pdfViewer)
    }

    const [allFiles, setAllFiles] = useState([])
    const[selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        console.log("useEffect called")
        const getFiles = async () => {
            const response = await fetch('http://localhost:4000/api/v1/getAllFilesDB', {
                method: 'GET'
            })
            const data = await response.json()
            setAllFiles(data)
        }
        getFiles()
    }, [])

  return (
    <div className='flex flex-col items-center m-4 gap-5 w-full'>
        <h1 className='text-2xl font-bold '>Get File from DB</h1>
        <div className='flex flex-row p-2 gap-2'>
           {
               //display all files in db and select one
                allFiles && allFiles.map(file => (
                     <div className='flex flex-col items-center gap-2'>
                          <button className='p-2 min-w-fit text-white bg-sky-500 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                             onClick={() => setId(file._id)}>{file.filename}</button>
                     </div>
                ))
           }
        </div>
        <div>
            {
                selectedFile && <button className='p-2 min-w-fit text-white bg-sky-500 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                onClick={getFile}>Load File</button>
            }
        </div>
        <button className='p-2 min-w-fit text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            onClick={handlePDFViewer}>
            {pdfViewer ? 'Hide PDF Viewer' : 'Show PDF Viewer'}
        </button>
        <div className='w-full'>
            {
                pdfViewer && fileUrl && <div className='flex flex-col justify-center items-center gap-2'>
                        <a href={fileUrl} download 
                            className='p-2 min-w-fit text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                            >Download Original File</a>
                        <embed src={fileUrl} type='application/pdf' width="80%" height="500px" 
                            className='rounded-md  border-8 border-black  hover:shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-120 border-double '
                        />
                    </div>      
            }
        </div>

        {/* //select pages by button to download */}
        <div className=' flex flex-col items-center w-full gap-2'>
            <h2 className='text-2xl font-bold'
                >Select Pages to Download</h2>
            <button className='p-2 min-w-fit text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                onClick={downloadSelectedPagesFile}>Download Selected Pages PDF</button>
            {/* //loop checkboxes for all pages */}
            <div>
            <Document 
            file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}
            className={`p-4 flex flex-row flex-wrap justify-center  w-full h-auto overflow-hidden gap-5 bg-orange-200 `}
            >
            {
                Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <label 
                            key={`page_${index + 1}`}>
                            <input className='hidden'
                                type="checkbox" value={index + 1} 
                                onChange={handleCheckbox}
                            />
                            <p className={`p-2  bg-sky-500 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  w-full rounded-md sm:text-sm focus:ring-1
                                    ${selectedPages.includes(index+1) ? 'border-2 border-black  bg-sky-500' : 'bg-orange-300'}
                                            `}
                                onClick={handleCheckbox}>{`Page -> ${index+1}`}</p>
                            <Page 
                                className={` overflow-hidden rounded-md h-[750px] 
                                    ${selectedPages.includes(index+1) ? 'opacity-95 border-2 border-black border-dashed ' : 'bg-orange-300'}
                                    hover: 'shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-120 hover: shadow-lg'
                                    `}
                                key={`page_${index + 1}`} pageNumber={index + 1} onChange={handleCheckbox}
                                />
                        </label>
                    )
                )
            }
            </Document>
            </div>
            

        </div>      
        

    </div>

  )
}

export default GetFileDB