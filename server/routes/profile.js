const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
  retrieveImgUrls,
  retrieveAvatarUrl
} = require('../controllers/profile');

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()} ${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: fileStorageEngine,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
    };
    callback(null, true)
}, });

router.route('/upload').post(protect, upload.array('images', 5), retrieveImgUrls);

router.route('/upload-avatar').post(protect, upload.single('avatar'), retrieveAvatarUrl);

router.route('/edit').put(protect, editProfile);

router.route('/load').get(protect, loadProfile);



module.exports = router;