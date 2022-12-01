const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");

const app = express();
const usersRoute = require("./routes/users");
const indexRoute = require("./routes/index");
app.use(express.static(path.join(rootDir, "public")));

app.use(usersRoute);
app.use(indexRoute);

app.listen(3001);
