const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json({ type: ["application/json", "text.plain"] }));
app.use(cors());

app.listen(5000);
