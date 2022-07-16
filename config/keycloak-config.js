let session = require("express-session");
let Keycloak = require("keycloak-connect");

let _keycloak;

let keycloakConfig = {
  clientId: "userdetails",
  bearerOnly: true,
  serverUrl: "https://auth.techapps.cloud",
  realm: "techapps",
  realmPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmXfNStbZcelPZ8RqowbISHJdzJCOPqFv/Aq1PryPcLc4Fz14xCiTgvV6YdErEGWyTQCG5BTzIkHBgU15LtDPWnaLRrn2hKuEEM2rizp7WkKAO3rcsFoxCmbCu3krEEJ4HywjTWBY9kgfspZqyGA5eEsGvWl1/xL8whehmBJGwBIqfqv9HaxzzHwx+Xy60iS76kn9MCinhzQ7XiNi6iQ/gKFePWzVVPCqQj+g0YtsVBrjF/Huh4ivbgT78+1LoUYQUpvv+kyenaADFjpr/UihPXd+dIN5S0UTTbYaNvFBDRbdg36gQDmTi3YD56UjZNA3I4NoFjq+nDroa3tArYX4CQIDAQAB",
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    let memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
