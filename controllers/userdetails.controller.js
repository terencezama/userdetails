const {
  findUserBySub,
  updateUserById,
  updateUserBySub,
} = require("../feat/user/user.query");

const { Address } = require("../models");
const ACTION_CREATE = "create";
const ACTION_UPDATE = "update";
const ACTION_DELETE = "delete";

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
  for (const element of body) {
    const action = element.action;
    delete element["action"];
    switch (action) {
      case ACTION_CREATE:
        element["userId"] = id;
        await Address.create(element);
        break;
      case ACTION_UPDATE:
        element["userId"] = id;
        const elementId = element.id;
        delete element["id"];
        await Address.update(element, {
          where: {
            id: elementId,
          },
        });
        break;
      case ACTION_DELETE:
        await Address.delete(element);
        break;

      default:
        break;
    }
  }
  res.send(await findUserBySub(sub));
};

exports.identity = async (req, res) => {};
exports.delete = (req, res) => {};

exports.upload = (req, res) => {
  res.send(req.user);
  //   res.send(req.cool);
};
