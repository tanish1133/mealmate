let bcryptjs = require("bcryptjs");
let verificationHash = async (password) => {
    try {
        let hashPassword = await bcryptjs.hash(password, 10);//text password to be hashed and the rounda of ;

        return hashPassword;
    } catch (err) {
        console.log(err);
        return null;
    }
};
module.exports = verificationHash;