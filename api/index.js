import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  accessKeyId: process.env.SECRETACCESSKEY,
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "aws-myblog",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
app.post("/api/upload", uploadToS3.single("file"), function (req, res) {
  const imageUrl = req.file.location;
  res.json({ imageUrl }.imageUrl);
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
});
app.listen(8800, () => {
  console.log("first connected");
});

app.get("/", (req, res) => {
  res.json("hello this is backendaa");
});
