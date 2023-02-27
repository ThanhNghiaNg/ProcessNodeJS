const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const cookieParser = require("cookie-parser");
const parseForm = bodyParser.urlencoded({ extended: false });
const URI =
  "mongodb+srv://owwibookstore:owwibookstore@cluster0.o5luvip.mongodb.net/TestProduct?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: URI,
  collections: "sessions",
});

//routes
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
// const mongoConnect = require("./utils/database").mongoConnect;
const mongoose = require("mongoose");
// Create User
const User = require("./models/User");

const app = express();
// app.use(csrfProtection);
// accept json and text
app.use(express.json({ type: ["application/json", "text/plain"] }));
// use cors to communicate with different client port
app.use(
  cors({
    origin: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(parseForm);
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//use Routers

// // CSRF and Authentication for each page
// app.use((req, res, next) => {
//   console.log(req.csrfToken());
//   res.locals.isLoggedIn = req.session.isLoggedIn;
//   res.locals.csrf = req.csrfToken();
//   next();
// });
app.use(bodyParser.json());

app.use("/admin", adminRoute);
app.use(authRoute);
app.use(shopRoute);
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
