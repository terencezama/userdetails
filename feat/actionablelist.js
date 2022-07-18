const ACTION_CREATE = "create";
const ACTION_UPDATE = "update";
const ACTION_DELETE = "delete";

const actionableList = async (userId, body, Model) => {
  for (const element of body) {
    const action = element.action;
    delete element["action"];
    switch (action) {
      case ACTION_CREATE:
        element["userId"] = userId;
        await Model.create(element);
        break;
      case ACTION_UPDATE:
        element["userId"] = userId;
        await Model.update(element, {
          where: {
            userId,
            ...(element.id && { id: element.id }),
          },
        });
        break;
      case ACTION_DELETE:
        await Model.destroy({
          where: {
            userId,
            ...(element.id && { id: element.id }),
          },
        });
        break;

      default:
        break;
    }
  }
};

module.exports = {
  actionableList,
};
