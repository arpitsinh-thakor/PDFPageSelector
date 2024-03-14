import './App.css';
import Home from '../src/components/Home'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LocalFileUpload from '../src/components/LocalFileUpload'
import Navbar from '../src/components/Navbar'
import MergePdfs from './components/MergePdfs';
import CloudinaryFileUpload from './components/CloudinaryFileUpload';
import DownloadFile from './components/DownloadFile';
import GetFilesFromLocal from './components/GetFilesFromLocal';
import FileUploadDB from './components/FileUploadDB';
import GetFileDB from './components/GetFileDB';
import { Toaster } from 'react-hot-toast';


function App() {

  const router = createBrowserRouter(
      [
          {
              path: "/",
              element: <Navbar/>,
              children:[
                {
                  path: "/",
                  element: <Home/>,
                },
                {
                  path: "/localfileupload",
                  element: <LocalFileUpload/>,
                },
                {
                  path: "/mergePdfs",
                  element: <MergePdfs/>,
                },
                {
                  path: '/cloudinaryfileupload',
                  element: <CloudinaryFileUpload/>
                },
                {
                  path: "/getFiles",
                  element: <DownloadFile/>,
                },
                {
                  path: "/getLocalFilesFromFolder",
                  element: <GetFilesFromLocal/>,
                },
                {
                  path: '/fileUploadDB',
                  element: <FileUploadDB/>
                },
                {
                  path: 'getFileDB',
                  element: <GetFileDB/>
                }
              ]
          },
      ]
  )

  return (
    <div className=''>
        <RouterProvider router={router}/>
        <Toaster/>
    </div>
  );
}

export default App;
