const { actionableList } = require("../feat/actionablelist");
const { findUserBySub, updateUserBySub } = require("../feat/user/user.query");

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
exports.delete = (req, res) => {};

exports.upload = (req, res) => {
  res.send(req.user);
  //   res.send(req.cool);
};
