const { User } = require("../../models");
const { findUserBySub } = require("./user.query");

const userMiddleware = async function (req, _, next) {
  if (Object.keys(req.kauth).length > 0) {
    const { sub, given_name, family_name, email } =
      req.kauth.grant.access_token.content;
    let user = await User.findOne({ where: { sub: sub }, attributes: ["sub"] });
    if (!user) {
      await User.create({
        sub: sub,
        firstname: given_name,
        lastname: family_name,
        email,
      });
    }
    req.user = await findUserBySub(sub);
  }

  next();
};

module.exports = {
  userMiddleware,
};
