import React from 'react'

const MergePdfs = () => {
  function handleSubmit(event){
    event.preventDefault()
    
    const formData = new FormData(event.target)
    fetch('http://localhost:4000/api/v1/mergePdfs', {
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
      <h1>Merge PDFs</h1>
      <form action="http://localhost:4000/api/v1/mergePdfs" 
            method="post" encType="multipart/form-data"
            onSubmit={handleSubmit}
            >
        <input type="file" name="file1"/>
        <input type="file" name="file2"/>
        <button type="submit">Merge</button>
      </form>
    </div>
  )
}

export default MergePdfs