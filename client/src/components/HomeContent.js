import React from 'react'

const HomeContent = () => {
  return (
    <div className='flex flex-col items-center text-center'>
        <div className='flex flex-col items-center'>
            <h2 className='text-xl font-bold'>
                About Us:
            </h2>
            <div className='w-8/12'>
                At PDF Page Selector, we understand the importance of efficiently managing and manipulating PDF documents. Our platform provides a simple yet powerful solution for selecting specific pages from PDF files, tailored to suit your needs.
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <h2 className='text-xl font-bold'>
            How It Works:
            </h2>
            <div>
                <ul >
                    <li><span className='underline font-semibold'>Upload:</span> Select the PDF file you want to work with and upload it to our platform.</li>
                    <li><span className='underline font-semibold'>Select Pages:</span> Choose the specific pages you wish to extract or manipulate.</li>
                    <li><span className='underline font-semibold'>Download:</span>Download: Download the modified PDF with your selected pages.</li>
                </ul>
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <h2 className='text-xl font-bold'>
            Features:
            </h2>
            <div>
                <ul>
                    <li><span className='underline font-semibold'>Easy to Use:</span> Easy to Use: Our platform is designed to be user-friendly and intuitive.</li>
                    <li><span className='underline font-semibold'>Customization:</span> Customization: Select only the pages you need, saving time and resources.</li>
                    <li><span className='underline font-semibold'>Security:</span> Your files are securely processed and deleted after use, ensuring confidentiality.</li>   
                </ul>
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <h2 className='text-xl font-bold'>
            Why Choose Us:
            </h2>
            <div>
                <ul>
                    <li><span className='underline font-semibold'>Efficiency:</span> Our platform is designed to streamline the process of selecting pages from PDF files.</li>
                    <li><span className='underline font-semibold'>Reliability:</span> We provide a dependable solution for managing and manipulating PDF documents.</li>
                    <li><span className='underline font-semibold'>Convenience::</span> With our platform, you can easily select and download specific pages from PDF files.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default HomeContent