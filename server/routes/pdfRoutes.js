const router = require('express').Router();

const { localFileUpload , mergePdfs, selectedPagesByIndex, 
    getPdf, uploadFileToCloudinary, getFiles, 
    getLocalFilesFromFolder, uploadFileToDB,
    getFileDB, getAllFilesDB} = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/mergePdfs', mergePdfs);
router.post('/selectedPagesByIndex', selectedPagesByIndex);
router.get('/getPdf', getPdf)
router.post('/uploadFileToCloudinary', uploadFileToCloudinary)
router.get('/getFiles', getFiles)
router.get('/getLocalFilesFromFolder', getLocalFilesFromFolder)
router.post('/uploadFileToDB', uploadFileToDB)
router.post('/getFileDB', getFileDB)
router.get('/getAllFilesDB', getAllFilesDB)

module.exports = router;