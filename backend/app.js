const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const blogPostRoute = require("./routes/blogposts");
const categoryRoute = require("./routes/categories");
const path = require("path");

const app = express();
app.use(express.json());
dotenv.config();
// Fix mongoose error
mongoose.set("strictQuery", false);

// CORS error
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  //headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //allow request to continue and be handled by routes
  next();
});
app.use("images", express.static(path.join(__dirname, "/images")));

// Connect DB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB."))
  .catch((err) => console.log("error: ", err));

// Handle image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// Handle image upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded.");
});

app.get("/api", (req, res) => {
  res.send("api is running properly");
});

// auth route
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/blogposts", blogPostRoute);
app.use("/api/categories", categoryRoute);

app.listen(9000, () => {
  console.log(`listening on port 9000...`);
});

module.exports = app;
