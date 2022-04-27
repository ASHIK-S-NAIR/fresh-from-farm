const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const imgModel = require("./model");

const port = 3000;

// database connection
mongoose.connect("mongodb://localhost:27017/multertester2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected");
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.set("view engine", "ejs");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage: storage});

app.get("/", (req, res) => {
  imgModel.find({}, (err, items) => {
      if(err){
          console.log(err);
          res.status(500).send("An error occured", err);
      }else{
          res.render('imagesPage', {items: items});
      }
  })
});

app.post("/", upload.single('image'), (req, res, next) => {
    var obj = {
        name : req.body.name,
        desc : req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        } 
    } 
    imgModel.create(obj, (err, item) => {
        if(err){
            conole.log(err)
        }else{
            res.redirect('/')
        }
    })
})

app.listen(port, () => {
  console.log(`Server is running : ${port}`);
});
