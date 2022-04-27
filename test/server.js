const express = require("express");
const app = express();

const multer = require('multer');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true, }));

// database connection
mongoose.connect("mongodb://localhost:27017/multertester", {
    useNewUrlParser: true
}).then(() => {
    console.log("DB Connected");
})

app.get("/", (req, res) => {
    res.send("Working very well");
})

const File = require("./model/fileSchema");

// const upload = multer({dest: "public/files"});

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//     }
// })

// const multerFilter = (req, file, cb) => {
//     if(file.mimetype.split('/')[1] === 'jpg'){
//         cb(null, true);
//     }else{
//         cb(new Error("Not a jpg file"), false);
//     }
// }

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Not a jpg File!!"), false);
    }
  };

const upload = multer({storage: multerStorage, fileFilter: multerFilter})

app.post("/api/uploadFile", upload.single('myFile'), async (req, res) => {
    // console.log(req.file);

    try {
        const newFile = await File.create({
            name: req.file.filename
        });

        res.status(200).json({
            status: "Success",
            message: "File created Successfully"
        })
    } catch (error) {
        res.json({
            error
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running successfully on server ${port}`)
})