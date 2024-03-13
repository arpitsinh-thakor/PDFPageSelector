const router = require('express').Router();

const { localFileUpload , mergePdfs, selectedPagesByIndex, getPdf, uploadFileToCloudinary} = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/mergePdfs', mergePdfs);
router.post('/selectedPagesByIndex', selectedPagesByIndex);
router.get('/getPdf', getPdf)
router.post('/uploadFileToCloudinary', uploadFileToCloudinary)

module.exports = router;