const uploadS3 = require("../config/s3-config");
const { actionableList } = require("../feat/actionablelist");
const { findUserBySub, updateUserBySub } = require("../feat/user/user.query");
const singleUpload = uploadS3.single("image");
const { Address, Identity } = require("../models");

exports.me = async (req, res) => {
  const { sub } = req.user;
  res.send(await findUserBySub(sub));
};

exports.update = async (req, res) => {
  const { sub } = req.user;
  const body = req.body;
  const privateFields = ["id", "sub", "createdAt", "updatedAt", "username"];

  privateFields.forEach((field) => {
    delete body[field];
  });

  await updateUserBySub(sub, body);
  res.send(await findUserBySub(sub));
};

exports.address = async (req, res) => {
  const { id, sub } = req.user;
  const body = req.body;
  await actionableList(id, body, Address);
  res.send(await findUserBySub(sub));
};

exports.identity = async (req, res) => {
  const { id, sub } = req.user;
  const body = req.body;
  await actionableList(id, body, Identity);
  res.send(await findUserBySub(sub));
};

exports.upload = (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    res.send(req.file);
  });
};
