import './App.css';
import Home from '../src/components/Home'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LocalFileUpload from '../src/components/LocalFileUpload'
import Navbar from '../src/components/Navbar'
import MergePdfs from './components/MergePdfs';
import GetPdf from './components/GetPdf';
import CloudinaryFileUpload from './components/CloudinaryFileUpload';
import DownloadFile from './components/DownloadFile';
import GetFilesFromLocal from './components/GetFilesFromLocal';
import FileUploadDB from './components/FileUploadDB';
import GetFileDB from './components/GetFileDB';


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
                  path: '/getPdf',
                  element: <GetPdf/>
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
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
