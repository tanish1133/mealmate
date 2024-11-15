const express = require("express");
const route = express.Router();
const userSchema = require("../models/userSchema");
const ownerSchema = require("../models/ownerSchema");
const bcryptjs = require('bcryptjs');//for hasing the password and comapring the hash password while login
const dAuth = require("../middleware/dAuth");
const vAuth = require("../middleware/vAuth");
const jwt = require("jsonwebtoken");
const contactUsMail = require("../controller/contactUsMail");
const auth = require("../middleware/dAuth");


route.get('/', async (req, res) => {
    res.render("about");
})
route.get('/register', async (req, res) => {
    res.render("dregister");
});
route.get('/login', async (req, res) => {
    res.render("dlogin");
});

route.get('/vregister', async (req, res) => {
    res.render("vregister");
});
route.get('/vlogin', async (req, res) => {
    res.render("vlogin");
});




//Dinor end
route.get('/dinromessList', dAuth, async (req, res) => {
    res.render("dmessListForDiner");
});
route.get('/dinromessRequest', dAuth, async (req, res) => {
    res.render("drequestSendToMessDinor");
});
route.get('/dinorUpdateProfile', dAuth, async (req, res) => {
    res.render("dupdateProfileDinor");
});

route.get('/detailOfMess', dAuth, async (req, res) => {
    res.render("dmessDetail");
});



// vindorend
route.get('/completeProfile', async (req, res) => {
    res.render("completeProfile");
});
route.get('/vindorListRequestForMess', vAuth, async (req, res) => {
    res.render("vDinoresRquestFormess");
});
route.get('/vDinorFeedbacks', vAuth, async (req, res) => {
    res.render("vDinorFeedbacks");
});
route.get('/vindorUpdateProfile', vAuth, async (req, res) => {
    res.render("vupdateProfile");
});

route.get('/vGetDinorList', vAuth, async (req, res) => {
    try {
        console.log(req.user.listOfCustomerRequest);
        if (req.user) {
            res.send({ user: req.user.listOfCustomerRequest });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({
            success: false,
            message: "server side error",
        })
    }
})

route.get('/vFeedbackList', vAuth, async (req, res) => {
    try {
        if (req.user) {
            res.send({ user: req.user.userLargeFeedback });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({
            success: false,
            message: "server side error",
        })
    }
})

route.get('/dgetTheListOfRequestToMesses', dAuth, async (req, res) => {
    try {

        if (req.user) {
            res.send({ user: req.user });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({
            success: false,
            message: "server side error",
        })
    }

});


route.post('/dRequestToTheMess', dAuth, async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Data not sufficient",
            });
        }

        let messToWhichRequest = await ownerSchema.find({ messEmail: email })
        let { _id } = req.user;
        let { messName, messPhoneNumber, messEmail } = messToWhichRequest[0];

        let dListToMess = req.user.userlistOfRequestToMess.concat({ messName: messName, messemail: messEmail, messPhoneNumber: messPhoneNumber, timestamp: new Date() });

        let updateingTheUserRequtList = await userSchema.findOneAndUpdate({ _id: _id }, { $set: { userlistOfRequestToMess: dListToMess } });

        if (updateingTheUserRequtList) {
            res.status(200).send({
                success: true,
                message: "Your request list is updated",
            })
        } else {
            res.status(400).send({
                success: true,
                message: "Your request can not updated",
            })
        }

    } catch (e) {
        console.log(e);
        res.status(404).send({
            success: false,
            message: "Data not found",
        })
    }
})
route.post('/dAddFeedback', dAuth, async (req, res) => {
    try {

        let { email, feedbackMessage } = req.body;
        let { username, useremail, userphoneNumbe } = req.user;

        if (!email || !feedbackMessage) {
            return res.status(400).send({
                success: false,
                message: "Data not sufficient",
            });
        }

        let findUser = await ownerSchema.find({ messEmail: email });

        let addedFeedback = findUser[0].userLargeFeedback.concat({ name: username, email: useremail, phoneNumber: userphoneNumbe, feedback: feedbackMessage });

        let updatedWithFeedback = await ownerSchema.findOneAndUpdate({ messEmail: email }, { $set: { userLargeFeedback: addedFeedback } });

        if (updatedWithFeedback) {
            res.status(200).send({
                success: true,
                message: "We have noted your feedback."
            })
        } else {
            res.status(400).send({
                success: false,
                message: "We can not able noted your feedback."
            })
        }


    } catch (e) {
        console.log(e);
        res.status(404).send({
            success: false,
            message: "Data not found",
        })
    }
})
route.post('/dAddLike', dAuth, async (req, res) => {
    try {
        let { email, numberLike } = req.body;

        console.log(email, numberLike);

        if (!email || numberLike < 0) {
            return res.status(400).send({
                success: false,
                message: "Data not sufficient",
            })
        }

        let updateTheLike = await ownerSchema.findOneAndUpdate({ messEmail: email }, { $set: { messlikeDislike: { numberLike: numberLike } } });

        if (!updateTheLike) {
            return res.status(400).send({
                success: false,
                message: "Your like is not consider",
            });
        }
        console.log(updateTheLike[0]);
        // res.status(200).send({
        //     success: true,
        //     message: "Data is updated",
        //     likeCount: updateTheLike[0].messlikeDislike.numberLike,
        // });

    } catch (e) {
        console.log(e);
        res.status(404).send({
            success: false,
            message: "Data not found",
        })
    }
});

route.post('/dAddRequest', dAuth, async (req, res) => {
    try {
        console.log("Adding the request to the database");
        let { email } = req.body;
        let { username, useraddress, useremail, userphoneNumbe } = req.user;
        // console.log(username, useraddress, useremail, userphoneNumbe);
        // console.log(email);
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Data not sufficient",
            });
        }
        let addRequest = await ownerSchema.find({ messEmail: email });


        let userPresent = addRequest[0].listOfCustomerRequest.filter((e) => {
            return e.email == useremail;
        });
        console.log("This is the filtered", userPresent);
        if (userPresent.length == 0) {
            let listOfCustomerRequest = addRequest[0].listOfCustomerRequest.concat({ name: username, address: useraddress, phoneNumber: userphoneNumbe, email: useremail, timestamp: new Date() });

            let updatedaddRequest = await ownerSchema.findOneAndUpdate({ messEmail: email }, { $set: { listOfCustomerRequest: listOfCustomerRequest } });
            if (updatedaddRequest) {
                res.status(200).send({
                    success: true,
                    message: "This is adding to the database about the request"
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Data is can not modify"
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: "You alredy send the request",
            });
        }



    } catch (err) {
        console.log(err);
        res.status(404).send({
            success: false,
            message: "Data not found",
        })
    }
});

route.post('/dmessDetailGetData', dAuth, async (req, res) => {
    try {
        let { email } = req.body;
        // console.log(req.body);
        if (!email) {
            return res.status(404).send({
                success: false,
                message: "Data is not sufficient",
            })
        }

        let dataOfMess = await ownerSchema.find({ messEmail: email });
        if (!dataOfMess) {
            return res.status(404).send({
                success: false,
                message: "Data not found",
            })
        }
        res.status(200).send(dataOfMess);

    } catch (e) {
        console.log(e);
        res.status(400).send({
            success: false,
            message: "Server side error"
        });
    }
});
//for getting the data to auto fill the form
route.get('/vSavedData', vAuth, async (req, res) => {
    //sending the data of the user from the token id
    try {
        console.log(req.user);
        res.send(req.user);
    } catch (err) {

        res.status(400).send({
            success: false,
            message: "server side error"
        });


    }

});

route.get('/dSavedData', dAuth, async (req, res) => {
    //sending the data of the user from the token id
    try {
        // console.log(req.user);
        // res.send(req.user);

        console.log("data to the user");
        res.send(req.user);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: "server side error"
        });


    }

});


route.post('/dRegister', async (req, res) => {

    try {
        let { username, useremail, userPassword, cpassword, useraddress, userphoneNumbe } = req.body;


        // console.log("This is the user register");
        // console.log(req.body);
        if (!username || !useremail || !userPassword || !cpassword || !useraddress || !userphoneNumbe) {
            // res.send({
            //     success: false,
            //     message: "All fields are not complete",
            // });
            res.status(401).redirect('/register');
            return;
        }
        let user = await userSchema.findOne({ useremail: useremail });
        if (!user) {
            if (userPassword != cpassword) {
                // res.status(401).send({
                //     success: false,
                //     message: "Incorrect password",
                // });
                res.status(401).redirect('/register');
                return;
            }
            let newUser = new userSchema({ username, useremail, userPassword, useraddress, userphoneNumbe });

            newUser.save();
            console.log(newUser);
            if (newUser) {
                // res.status(200).send({
                //     success: true,
                //     message: "Register successful as user",
                // });
                res.status(200).redirect('/login');

                // console.log(newUser);
            }

        } else {
            // res.status(403).send({
            //     success: false,
            //     message: "This email is already register",
            // });
            res.status(403).redirect('/register');

        }



    } catch (err) {
        // res.status(500).send({
        //     success: false,
        //     message: "Server side error",
        // });
        res.status(500).redirect('/register');
        console.log(err);
    }
});

route.post('/vRegister', async (req, res) => {
    try {

        let { messName, messEmail, messPassword, cpassword, messaddress, messPhoneNumber } = req.body;

        // console.log(req.body, "in the owner register");

        if (!messName || !messEmail || !messPassword || !cpassword || !messaddress || !messPhoneNumber) {
            // res.send({
            //     success: false,
            //     message: "All fields are not complete",
            // });
            res.status(401).redirect('/vregister');
            return;
        }
        let owner = await ownerSchema.findOne({ messEmail: messEmail });
        if (!owner) {
            if (messPassword != cpassword) {
                // res.status(401).send({
                //     success: false,
                //     message: "Incorrect password",
                // });
                res.status(401).redirect('/vregister');
                return;
            }

            let newowner = new ownerSchema({ messName, messEmail, messPassword, cpassword, messaddress, messPhoneNumber });



            newowner.save();
            if (newowner) {
                // res.status(200).send({
                //     success: true,
                //     message: "Register successful as owner",
                // });
                let token = await newowner.generateToken();
                // console.log("Token for the complete profile", token);

                res.cookie("completeProfileToken", token, {
                    expires: new Date(Date.now() + 200000),
                    httpOnly: true,
                });
                res.status(200).redirect('/completeProfile');
            }
        } else {
            res.status(403).redirect('/vregister');
        }
    } catch (err) {
        // res.status(403).send({
        //     success: false,
        //     message: "Server side error",
        // });
        res.status(500).redirect('/vregister');
        console.log(err);
    }
});

route.post('/dLogin', async (req, res) => {
    try {
        let { useremail, userPassword } = req.body;
        if (!useremail || !userPassword) {
            res.status(401).redirect('/login');
            return;
        }
        let userPrasent = await userSchema.findOne({ useremail: useremail });
        if (userPrasent) {
            let isMatch = await bcryptjs.compare(userPassword, userPrasent.userPassword);
            let token = await userPrasent.generateToken();
            // console.log(token);
            res.cookie("userJWT", token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: true,
            });
            if (isMatch) {
                res.status(200).redirect('/dinromessList');
            } else {
                res.status(401).redirect('/login');
            }

        } else {
            res.status(401).redirect('/login');
        }

    } catch (err) {
        res.status(400).redirect('/login');
        console.log(err);
    }
});

route.post('/vLogin', async (req, res) => {
    try {
        let { messEmail, messPassword } = req.body;
        // console.log(req.body);
        if (!messEmail || !messPassword) {
            res.status(401).redirect('/vlogin');
            return;
        }
        let userPresent = await ownerSchema.findOne({ messEmail: messEmail });
        if (userPresent) {
            let isMatch = await bcryptjs.compare(messPassword, userPresent.messPassword);
            let token = await userPresent.generateToken();
            // console.log(token);
            console.log(token);
            console.log(isMatch);
            res.cookie("ownerJWT", token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: true,
            });
            if (isMatch) {
                res.status(200).redirect('/vindorListRequestForMess');
            } else {
                res.status(401).redirect('/vlogin');
            }

        } else {
            res.status(401).redirect('/vlogin');
        }
    } catch (err) {
        res.status(400).redirect('/vlogin');
        console.log(err);
    }
});

route.put('/completeProfile', async (req, res) => {
    try {
        // console.log(req.body);
        let { vegitableDish, ricePlate, wheatRoti, salad, vegdish, dabbaSystem, starttime, endtime, messType, messacceptingNewCustomer, messnumberOfCustomer, priceOfThali, city } = req.body;
        console.log(req.body);
        console.log(vegitableDish, ricePlate, wheatRoti, salad, vegdish, dabbaSystem, starttime, endtime, messType, messacceptingNewCustomer, messnumberOfCustomer, priceOfThali, city);
        if (!vegitableDish || !ricePlate || !wheatRoti || !salad || !vegdish || !dabbaSystem || !starttime || !endtime || !messType || !messacceptingNewCustomer || !messnumberOfCustomer || !priceOfThali || !city) {
            res.status(403).send({
                success: false,
                message: "Input every field"
            });
            return;
        }

        let completeProfile = req.cookies.completeProfileToken;

        let pivote = jwt.verify(completeProfile, process.env.SECRET_KEY);

        // console.log(pivote);




        let updateUser = await ownerSchema.findOneAndUpdate({ _id: pivote._id }, { $set: { city: city, messlikeDislike: { numberLike: 0, numberDislike: 0 }, messthaliDetails: { priceOfThali: priceOfThali, dabbaSystem: dabbaSystem, vegitableDish: vegitableDish, ricePlate: ricePlate, wheatRoti: wheatRoti, salad: salad, messTime: { openTime: starttime, closeTime: endtime }, messType: messType, messnumberOfCustomer: messnumberOfCustomer, messacceptingNewCustomer: messacceptingNewCustomer } } }, {
            new: true
        });
        console.log(updateUser);


        if (updateUser) {
            console.log("user after updated:", updateUser);
            res.status(200).send({
                success: true,
                message: "user is updated",
            })
            // res.status(200).redirect('/vlogin');
        } else {
            res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // console.log(user);



    } catch (err) {
        console.log(err);
        console.log(err.name);
        if (err.name === "JsonWebTokenError") {
            res.status(400).send({
                success: false,
                message: "Token must be provided before completing the profile"

            });
            return;
        }
        res.status(400).send({
            success: false,
            message: "Server side error",

        });

    }
});


route.put('/vsaveEditProfile', vAuth, async (req, res) => {
    try {
        let { messName, messaddress, messPhoneNumber, vegitableDish, ricePlate, wheatRoti, salad, priceOfThali, starttime, endtime, messnumberOfCustomer, city, dabbaSystem, messType, messacceptingNewCustomer } = req.body;

        // console.log(messName, messaddress, messPhoneNumber, vegitableDish, ricePlate, wheatRoti, salad, priceOfThali, starttime, endtime, messnumberOfCustomer, city, dabbaSystem, messType, messacceptingNewCustomer);

        if (!messName || !messaddress || !messPhoneNumber || !vegitableDish || !ricePlate || !wheatRoti || !salad || !priceOfThali || !starttime || !endtime || !messnumberOfCustomer || !city || !dabbaSystem || !messType || !messacceptingNewCustomer) {
            res.status(403).send({
                success: false,
                message: "Input every field"
            });
            return;
        }
        let _id = req.user._id;

        let updateUser = await ownerSchema.findOneAndUpdate({ _id: _id }, { $set: { messName: messName, messaddress: messaddress, messPhoneNumber: messPhoneNumber, city: city, messthaliDetails: { priceOfThali: priceOfThali, dabbaSystem: dabbaSystem, vegitableDish: vegitableDish, ricePlate: ricePlate, wheatRoti: wheatRoti, salad: salad, messTime: { openTime: starttime, closeTime: endtime }, messType: messType, messnumberOfCustomer: messnumberOfCustomer, messacceptingNewCustomer: messacceptingNewCustomer } } }, {
            new: true
        });

        if (updateUser) {
            // console.log("user after updated:", updateUser);
            res.status(200).send({
                success: true,
                message: "user is updated",
            })

        } else {
            res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

    } catch (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError") {
            res.status(400).send({
                success: false,
                message: "Token must be provided before updating the profile"
            });
            return;
        }
        res.status(400).send({
            success: false,
            message: "Server side error",
        });
    }
});

route.put('/dsaveEditProfile', dAuth, async (req, res) => {
    try {
        let { username, useraddress, userphoneNumbe } = req.body;

        // console.log(username, useraddress, userphoneNumbe);

        if (!username || !useraddress || !userphoneNumbe) {
            res.status(403).send({
                success: false,
                message: "Input every field"
            });
            return;
        }
        let _id = req.user._id;

        let updateUser = await userSchema.findOneAndUpdate({ _id: _id }, { $set: { username: username, useraddress: useraddress, userphoneNumbe: userphoneNumbe } }, {
            new: true
        });

        if (updateUser) {
            // console.log("user after updated:", updateUser);
            res.status(200).send({
                success: true,
                message: "user is updated",
            })

        } else {
            res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

    } catch (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError") {
            res.status(400).send({
                success: false,
                message: "Token must be provided before updating the profile"
            });
            return;
        }
        res.status(400).send({
            success: false,
            message: "Server side error",
        });
    }
});

route.get('/getMessList', async (req, res) => {
    try {
        console.log(`Going to the getmessdetails`);
        let listOwner = await ownerSchema.find({});

        if (listOwner) {
            res.status(200).send(listOwner);
        } else {
            res.status(404).send({
                success: false,
                message: "Data not found"
            })
        }

    } catch (e) {
        res.status(400).send({
            success: false,
            message: "Server side error"
        });
        console.log(e);
    }
});



route.post('/contactMail', async (req, res) => {
    try {
        console.log(req.body);
        let { name, last_name, email, message, pnumber } = req.body;


        let data = await contactUsMail(name, last_name, email, message, pnumber);

        if (data.response == '250 Message received') {
            res.status(200).send({
                success: true,
                message: "Your query is recorded successfully"
            });
        } else {
            res.status(538).send({
                success: false,
                message: "Mail can not be send to the team"
            });
        }

    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Server side error"
        });
        console.log(err);
    }
})

route.get('/dlogout', dAuth, async (req, res) => {
    try {
        console.log("Loging out");

        res.clearCookie("userJWT");

        req.user.tokens.filter((element) => {
            return element.token != req.token;
        });
        await req.user.save();
        res.status(200).redirect('/');

    } catch (err) {
        res.status(400).redirect('/');
    }
});

route.get('/vlogout', vAuth, async (req, res) => {
    try {
        // console.log("Loging out");
        res.clearCookie("ownerJWT");
        res.clearCookie("completeProfileToken");

        req.user.tokens.filter((element) => {
            return element.token != req.token;
        });
        await req.user.save();
        res.status(200).redirect('/');

    } catch (err) {
        res.status(400).redirect('/');
    }
});








module.exports = route;