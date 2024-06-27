const db = require('../db/mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

exports.attachmentStorage = new GridFsStorage({
    db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'Attachments'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  exports.bookletStorage = new GridFsStorage({
    db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'BookletImages'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  exports.projectStorage = new GridFsStorage({
    db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'ProjectFiles'
          };
          resolve(fileInfo);
        });
      });
    }
  });