const { User } = require("../../models");

const userMiddleware = async function (req, _, next) {
  if (Object.keys(req.kauth).length > 0) {
    const { sub, given_name, family_name, email } =
      req.kauth.grant.access_token.content;
    let user = await User.findOne({
      where: { sub: sub },
      attributes: ["sub", "id"],
    });
    if (!user) {
      user = await User.create({
        sub: sub,
        firstname: given_name,
        lastname: family_name,
        email,
      });
    }
    req.user = user;
  }

  next();
};

const actionableListMiddleware = async function (req, res, next) {
  const body = req.body;
  if (Array.isArray(body)) {
    let allItemsHasActions = true;
    body.every((element) => {
      if (!("action" in element)) {
        allItemsHasActions = false;
        return false;
      }
      return true;
    });
    if (allItemsHasActions) {
      next();
      return;
    }
  }

  res
    .status("400")
    .send("Should be an actionable list [{action: create | delete | update}]");
};

module.exports = {
  userMiddleware,
  actionableListMiddleware,
};
