require('dotenv').config();
let mongoose = require('mongoose');
let validator = require('validator');
let bcryptjs = require('bcryptjs');
let jwt = require("jsonwebtoken");//for creating the tokens




let registerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 30,
        uppercase: true,
    },
    email: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        },
        minlength: 4,
        lowercase: true,

    },
    password: {
        type: String,
        require: true,
        // validate(value) {
        //     if (!validator.isStrongPassword(value)) {
        //         throw new Error("Password is not strong");
        //     }
        // },
        minlength: 3,

    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    isValid: {
        type: Boolean,
        require: true,
    }

});
//creating the tokens for the new user with the unique id of each user when it will register 
//method is used when we use the instance of the schema
//static is used when the we use the method on the model directly
registerSchema.methods.generateToken = async function () {
    try {

        let token = await jwt.sign({ id: this._id.toString() }, process.env.SECRET_KEY);//first parameter is the payload and the second parameter is the secret key use to generate the token secret key is the must be grater than 32 char more the char more the secure the token. 
        // payload is nothing but the extra data which is transmited. 
        // token is impoertant for the user authntication when it creates the new account then the token is generated and stored at the backend.

        //To hide the data from the the git hub user by which the forking user will get the private data here the secrete key is private for the sign the and to generate the token to deal with this we will create the .env file and put the key to the .env file and add the process.env.SECRET_KEY to the place to the direct key and then the .env file is inclued into the .gitignore file. 



        this.tokens = this.tokens.concat({ token: token });
        // console.log("token is:" + token);

        return token;
    } catch (err) {
        res.send("The error part " + err);
        console.log("The error part " + err);
    }
};



//using the hash futnion to hash the password before storing it to the database using pre funtion which is get called every update and new document adding
registerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // console.log(`Before:${this.password}`);
        this.password = await bcryptjs.hash(this.password, 10);//text password to be hashed and the rounda of the round funtions defalut is 10 and max is 12 but it requre more time funtion return the one way hash the hash value is assined to the password field itself
        // console.log(`After:${this.password}`);
    }
    next();//TO go to the next step to complete the funtion

});



//creating the model of the schema 
let registerModel = mongoose.model("MyRegister", registerSchema);

//exporting the module
module.exports = registerModel;



