let ownerSchema = require("../models/ownerSchema");//geting the register schema for the comaprison and to verify the token by jwt.verify() funtion

let jwt = require("jsonwebtoken");//for creating the tokens and verify the web token
//We will authenticate the user by using the jwt.verify() funtion

let auth = async (req, res, next) => {
    try {
        //getting the token
        let token = req.cookies.ownerJWT;
        //verifaying the token and getting the pivote and finally getting the id and finding the details
        let veriftUser = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(veriftUser);
        let user = await ownerSchema.findOne({ _id: veriftUser._id });
        // console.log(user);
        if (!user) {
            res.status(404).redirect('/vregister');
            // throw new Error("User not found");
            return;
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {

        console.log(err);
        res.status(400).redirect('/vlogin');


    }

};


module.exports = auth;




