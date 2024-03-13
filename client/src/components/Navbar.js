import { Link , Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        navbar
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
        </nav>
        <Outlet/>
    </div>
  )
}

export default Navbar