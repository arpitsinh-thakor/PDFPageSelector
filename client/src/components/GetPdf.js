  import React from 'react'

  const GetPdf = () => {
    return (
      <div>
        <h1>Get PDF</h1>
        
        <form action="http://localhost:4000/api/v1/getPdf" 
          method="GET">
          <input type="hidden" name="fileName" value="1710003215095" />
          <button type="submit">Get PDF</button>
        </form>
      </div>
    )
  }

  export default GetPdf