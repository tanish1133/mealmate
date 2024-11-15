require('dotenv').config();
const mongoose = require("mongoose");
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

let ownerSchema = new mongoose.Schema({

    messName: {
        type: String,
        require: true,
    },
    messPhoneNumber: {
        type: Number,
    },
    messEmail: {
        type: String,
        require: true,
    },
    messPassword: {
        type: String,
        require: true,
    },
    messaddress: {
        type: String,
        require: true,
    },
    city: {
        type: String,
    },
    messlikeDislike: {
        numberLike: {
            type: Number
        },
        numberDislike: {
            type: Number
        }
    },
    userLargeFeedback: [{
        name: {
            type: String
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        feedback: {
            type: String
        }
    }],
    messthaliDetails: [{
        priceOfThali: {
            type: String,
        },
        dabbaSystem: {
            type: String,

        },
        vegitableDish: {
            type: String
        },
        ricePlate: {
            type: String
        },
        wheatRoti: {
            type: String
        },
        salad: {
            type: String
        },
        messTime: {
            openTime: String,
            closeTime: String,
        },
        messType: {
            type: String
        },
        messnumberOfCustomer: {
            type: String
        },
        messacceptingNewCustomer: {
            type: String
        },

    }],
    listOfCustomerRequest: [{
        name: {
            type: String
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String,
        }

    }],
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
}, { timestamps: true });

ownerSchema.methods.generateToken = async function () {
    try {
        let token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        return token;
    } catch (err) {
        res.send({
            success: false,
            message: "Token can not generate for owner",
        });
        console.log(err);
    }
}

ownerSchema.pre("save", async function (next) {
    if (this.isModified("messPassword")) {
        // console.log(`Before:${this.password}`);
        this.messPassword = await bcryptjs.hash(this.messPassword, 10);//text password to be hashed and the rounda of the round funtions defalut is 10 and max is 12 but it requre more time funtion return the one way hash the hash value is assined to the password field itself
        // console.log(`After:${this.password}`);

    }
    next();//TO go to the next step to complete the funtion
})



const ownerModel = new mongoose.model('ownerMessRegistration', ownerSchema);

module.exports = ownerModel;
