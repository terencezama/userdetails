const { actionableListMiddleware } = require("../feat/user/user.middleware");

module.exports = (app) => {
  const controller = require("../controllers/userdetails.controller");
  const keycloak = require("../config/keycloak-config.js").getKeycloak();
  let router = require("express").Router();

  router.get("/me", keycloak.protect("user"), controller.me);
  router.post("/update", keycloak.protect("user"), controller.update);
  router.post(
    "/address",
    [keycloak.protect("user"), actionableListMiddleware],
    controller.address
  );
  router.post(
    "/identity",
    [keycloak.protect("user"), actionableListMiddleware],
    controller.identity
  );
  //This route should be protected by admin
  // router.delete("/delete", keycloak.protect("user"), controller.update);

  router.post(
    "/upload/:imageType",
    keycloak.protect("user"),
    controller.upload
  );

  app.use("/", router);
};
