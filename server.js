const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require('connect-flash');
const path = require("path");
const multer = require("multer");
const app = express();

mongoose.set("strictQuery", false);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//use express-session
app.use(
  session({
    secret: "rahul",
    saveUninitialized: true,
    resave: false,
  })
);

//app.use(flash());

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//set templetes

app.set("view engine", "ejs");
app.set("views", "views");

//defined path of upload folder
app.use("/upload", express.static(path.join(__dirname, "Upload")));
app.use(express.static("upload"));

//use multer for file upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Upload");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("webp")
  ) {
    callback(null, true);
  } else {
    console.log("Error in uploading");
    callback(null, false);
  }
};

app.use(
  multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fieldSize: 1024 * 1024 * 5 },
  }).single("image")
);

//Ui Router prefix
const Router = require("./Routes/UiRoutes");
app.use(Router);
//Api Router prefix
const ApiRouter = require("./Routes/apiRouter");
app.use("/api", ApiRouter);

// server and mongoose connection
const port = process.env.PORT | 3000;
mongoose
  .connect(
    "mongodb+srv://nodejs:203iv1Bxnx19oPOV@cluster0.zjbgce3.mongodb.net/employee_details",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(
        `server and Db connected on port no http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log(err`something went wrong`);
  });
