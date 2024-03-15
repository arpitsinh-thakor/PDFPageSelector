import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='absolute flex flex-col bottom-0 w-full bg-gradient-to-r from-cyan-500 to-blue-500  text-center text-white items-center p-1'>
            <div className='  text-2xl font-bold text-white hover:text-cyan-500 cursor-pointer hover:bg-white transition-all p-1 rounded-md'
                >PDF Page Selector</div>
            <div className=' text-white hover:text-cyan-500 cursor-pointer hover:bg-white transition-all p-1 rounded-md font-bold'
                >Created by: <a href='https://www.linkedin.com/in/arpitsinh-thakor-305848203/' target='_blank' rel='noreferrer'>Arpitsinh Thakor</a></div>
            <div>Copyright © 2024 PDF Page Selector. All rights reserved.</div>
        </footer>
    </div>
  )
}

export default Footer