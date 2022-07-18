const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const imageMimeTypeFilter = (req, file, cb) => {
  console.log("some shit");
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};
const s3 = new S3Client({
  forcePathStyle: true,
  credentials: {
    accessKeyId: "S3RVER", // This specific key is required when working offline
    secretAccessKey: "S3RVER",
  },
  endpoint: "http://localhost:8000",
  region: "us-east-1",
});

const uploadS3 = multer({
  fileFilter: imageMimeTypeFilter,
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "local-bucket",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

module.exports = uploadS3;
