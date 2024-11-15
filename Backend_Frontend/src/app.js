require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
//connecting to the mongodb database
require("./db/conn");
//getting the hbs view engine fo the frontend
const hbs = require("hbs");
const route = require("./router/miainRouting");



const bcryptjs = require('bcryptjs');//for hasing the password
const cookieparser = require("cookie-parser");// to parse the cookie which is get by the 

app.use(cookieparser());// setting the cookie parser to parse the cookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//intial the router set router always after the parser for the json  middle ware and urlencoded
app.use(route);
let viewPath = path.join(__dirname, "../Templates/views");
let staticPath = path.join(__dirname, "../public");
let partialsPath = path.join(__dirname, "../Templates/partials");
//partials must be register before the view engine setup
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});