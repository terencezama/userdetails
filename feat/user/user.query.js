const { User, Address, Identity } = require("../../models");
const findUserBySub = async function (sub) {
  return User.findOne({
    where: { sub: sub },
    include: [Address, Identity],
  });
};

const updateUserBySub = async function (sub, data) {
  return User.update(data, {
    where: { sub },
  });
};

module.exports = {
  findUserBySub,
  updateUserBySub,
};
