import {NavLink, Outlet } from 'react-router-dom'
import '../App.css'

const Navbar = () => {
  return (
    <div>
        <div>
          <nav className='flex flex-row p-4 list-none bg-gradient-to-r from-cyan-500 to-blue-500 '>
              <div className='w-3/12 text-center'>
                <li >
                  <NavLink className={`text-white p-2 font-bold text-3xl`} 
                    exact activeClassName="active"
                  to="/">Home</NavLink>
                </li>
              </div>
              <div className='w-9/12 flex flex-row flex-wrap gap-7 justify-center'>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to="/localfileupload">Local File Upload</NavLink>
                </li>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to='/mergePdfs'>Merge PDFs</NavLink>
                </li>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to='/cloudinaryfileupload'>Cloudinary File Upload</NavLink>
                </li>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to='/getFiles'>Download File</NavLink>
                </li>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to='/getLocalFilesFromFolder'>Get Local Files From Folder</NavLink>
                </li>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to='/fileUploadDB'>File Upload DB</NavLink>
                </li>
                <li>
                  <NavLink className={`text-white p-2 font-bold text-xl`} 
                  to='/getFileDB'>Get File DB</NavLink>
                </li>
              </div>
          </nav>
        </div>
        <Outlet/>
    </div>
    
  )
}

export default Navbar