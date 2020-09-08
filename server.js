const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const methodOverride = require("method-override");

// creating an express application
const app = express();

// path of .env file
dotenv.config({path: './config/config.env'})

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log("Application successfully connected with database.")
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`)
});

// application is listening on assigned port
const PORT = process.env.PORT || 3700;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`);
})

// setting up view engine
app.set("view engine", "ejs");

// setting up name of view folder
app.set("views", process.env.VIEWS_FOLDER);

// using /public folder for static files
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// home page route
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Home Page"
    })
})

// blog routes
app.use("/blogs", blogRoutes);

// 404 route
app.use((req, res) => {
    res.render("404", {
        pageTitle: "OOPS! Page Not Found.",
    });
})