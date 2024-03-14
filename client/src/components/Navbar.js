import { Link , Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='bg-teal-400'>
          <nav>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/localfileupload">Local File Upload</Link>
              </li>
              <li>
                <Link to='/mergePdfs'>Merge PDFs</Link>
              </li>
              <li>
                <Link to='/getPdf'>Get PDF</Link>
              </li>
              <li>
                <Link to='/cloudinaryfileupload'>Cloudinary File Upload</Link>
              </li>
              <li>
                <Link to='/getFiles'>Download File</Link>
              </li>
              <li>
                <Link to='/getLocalFilesFromFolder'>Get Local Files From Folder</Link>
              </li>
              <li>
                <Link to='/fileUploadDB'>File Upload DB</Link>
              </li>
              <li>
                <Link to='/getFileDB'>Get File DB</Link>
              </li>
          </nav>
        </div>
        <Outlet/>
    </div>
    
  )
}

export default Navbar