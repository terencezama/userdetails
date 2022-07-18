exports.S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
exports.S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
exports.S3_ENDPOINT = process.env.S3_ENDPOINT;
exports.S3_BUCKET = process.env.S3_BUCKET;

const { S3Client } = require("@aws-sdk/client-s3");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "some-bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
