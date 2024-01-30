const express = require('express');
const app = express();
const PORT = process.env.PORT ||8000
require("./db/connection");
const Image = require("./model/image-model")
const multer = require("multer")
const cors = require("cors");
const path = require("path")


// Add this middleware to serve static files (images) from the specified directory
// this solution is done by ChatGPT
app.use('/images', express.static( path.resolve(__dirname, '../../frontend/public/images')));
console.log( path.resolve(__dirname, '../../frontend/public/images'));

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
        // this is the place where i have to store the images in frontend
        const destinationPath =  path.resolve(__dirname, '../../frontend/public/images');
      cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,  uniqueSuffix + '-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
app.post("/upload-image", upload.single("uploadedImage"), async(req, res) => {
    
    
    try {
        const imageName = req.file.filename
        await Image.create({image:imageName})
        res.status(200).json({message:"Image Uploaded"})
    } catch (error) {
        res.send(error.message)
    }
    
})


//////////////////////////////////////
//get image from db
app.get("/get-images",async(req,res)=>{
   try {
    const data = await Image.find();
    res.status(200).json({message:data});
   } catch (error) {
    res.status(404).send(error);
   }
})

app.listen(PORT , ()=>{
    console.log("listening on port :",PORT)
})