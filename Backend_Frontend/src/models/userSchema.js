require('dotenv').config();
const mongoose = require("mongoose");
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    useraddress: {
        type: String,
        require: true,


    },
    useremail: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email invalid");
            }
        },

    },
    userPassword: {
        type: String,
        require: true,
    },
    userphoneNumbe: {

        type: String,
        require: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Phone invalid");
            }
        },

    },
    userlistOfRequestToMess: [{

        messName: {
            type: String,
        },
        messemail: {
            type: String,
        },
        messPhoneNumber: {
            type: Number,
        },
        timestamp: {
            type: String,
        },

    }],
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]

}, { timestamps: true });
userSchema.methods.generateToken = async function () {
    try {
        let token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        //seting the token in the tokens array and also returning the token and the piot will be the _id of the user
        this.tokens = this.tokens.concat({ token: token });
        return token;
    } catch (err) {
        res.send({
            success: false,
            message: "Token can not generate user",
        });
        console.log(err);
    }
}

userSchema.pre('save', async function (next) {
    if (this.isModified("userPassword")) {
        this.userPassword = await bcryptjs.hash(this.userPassword, 10);
    }
    next();
});
const userModel = new mongoose.model('userMessRegistration', userSchema);

module.exports = userModel;
