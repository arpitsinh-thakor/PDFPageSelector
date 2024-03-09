const router = require('express').Router();

const { localFileUpload , mergePdfs, selectedPagesByIndex} = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/mergePdfs', mergePdfs);
router.post('/selectedPagesByIndex', selectedPagesByIndex);

module.exports = router;
  