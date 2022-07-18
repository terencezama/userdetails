const { User, Address, Identity } = require("../../models");
const findUserBySub = async function (sub) {
  return User.findOne({
    where: { sub: sub },
    include: [Address, Identity],
  });
};

module.exports = {
  findUserBySub,
};
