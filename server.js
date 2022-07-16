const express = require("express");
let session = require("express-session");
const app = express();
let memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: "qmfQBWyWwFAeaFqzAgmwYwuD",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
const keycloak = require("./config/keycloak-config.js").initKeycloak();
app.use(keycloak.middleware());
app.use((req, _, next) => {
  if (Object.keys(req.kauth).length > 0) {
    req.user = req.kauth.grant.access_token.content;
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/userdetails.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});