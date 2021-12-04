const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');
const multer = require("multer")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Connnected to Mongo")).catch((err)=>console.log(err));
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images");
    },
    filename:(req, file, cb)=> {
        cb(null, `${file.originalname}`);
    }
})
const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been upload");
})
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)
app.listen("5000",()=>{
    console.log("Backend is running.");
});