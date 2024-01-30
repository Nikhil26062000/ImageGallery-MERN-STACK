const express = require('express');
const app = express();
const PORT = process.env.PORT ||8000
require("./db/connection");
const Image = require("./model/image-model")
const multer = require("multer")
const cors = require("cors");

//Middleware
const corsOptions = {
    origin:"http://localhost:5173",
    method:"GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential:true,
  }
  app.use(cors(corsOptions));
  

app.get('/', (req, res) => {
    res.json({message:"Server is talking"})
})

////////////////////////////////////////////////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,  uniqueSuffix + '-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
app.post("/upload-image", upload.single("uploadedImage"), async(req, res) => {
    
    const imageName = req.file.filename
    try {
        await Image.create({image:imageName})
        res.status(200).json({message:"Image Uploaded"})
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(PORT , ()=>{
    console.log("listening on port :",PORT)
})