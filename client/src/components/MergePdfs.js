import React, {useState} from 'react'
import toast from 'react-hot-toast'
import dotenv from 'dotenv'
dotenv.config()

const MergePdfs = () => {
  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)

  const handleFile1 = (event) => {
    setFile1(event.target.files[0])
  }
  const handleFile2 = (event) => {
    setFile2(event.target.files[0])
  }

  function handleSubmit(event){
    event.preventDefault()
    
    const formData = new FormData(event.target)
    fetch(process.env.SERVER +'api/v1/mergePdfs', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      toast.success('PDFs Merged Successfully')
    })
    .catch(error => {
      console.error(error)
    })
  }
  return (
    <div className='flex flex-col items-center gap-4 m-4'>
      <h1 className='px-6 text-2xl font-serif font-bold bg-blue-700 p-2 rounded-md text-white hover:bg-blue-600 transition duration-300 ease-in-out'
          >Merge PDFs</h1>
      <form 
            className='flex flex-col gap-4'
            action= {`${process.env.SERVER}"api/v1/mergePdfs"`}
            method="post" encType="multipart/form-data"
            onSubmit={handleSubmit}
            >
        <input className='p-2 border-2 border-gray-300 rounded-md w-72 text-center bg-gray-400 hover:bg-gray-200 hover:border-gray-400 transition duration-300 ease-in-out'
          type="file" name="file1" onChange={handleFile1}/>
        <input className='p-2 border-2 border-gray-300 rounded-md w-72 text-center bg-gray-400 hover:bg-gray-200 hover:border-gray-400 transition duration-300 ease-in-out'
          type="file" name="file2" onChange={handleFile2}/>
        
        {
          file1 && file2 && (
                  <button 
                    className='p-2 min-w-fit text-white bg-sky-500 border border-transparent rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 font-serif font-bold'
                    type="submit">Merge</button>
                  ) 
        }
        
      </form>
    </div>
  )
}

export default MergePdfs