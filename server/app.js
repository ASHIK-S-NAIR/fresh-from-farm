const dotenv = require('dotenv');
dotenv.config()

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT || 8000;

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB connection
mongoose.connect(process.env.DATABASE,  {
    useNewUrlParser: true,
    // useUnifiedTopoloy: true,
    // useCreateIndex: true
}).then(() => {
    console.log("DB connected")
})

// routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const employeeRoute = require("./routes/employee");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

// My routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api", employeeRoute);

app.get("/", (req, res) => {
    res.send("revenew dipp")
})

app.listen(port, () => {
    console.log(`Server is running on : ${port}`);
})