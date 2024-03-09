const router = require('express').Router();

const { localFileUpload , mergePdfs } = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/mergePdfs', mergePdfs);

module.exports = router;
  