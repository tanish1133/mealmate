require('dotenv').config();
let mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the mongodb");

}).catch((err) => {
    console.log("Can not connected to mongodb");
    console.log(err);
});


