'use strict';
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dhzys3qdd',
  api_key: '494695181883633',
  api_secret: '90e7X9Nkp7MPToSDCr_IrrvbPJs'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'users',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser
;
