const jwt = require('jsonwebtoken');

let creatTokenAsPivote = async (pivote) => {
    try {
        let token = await jwt.sign({ pivote: pivote.toString() }, process.env.SECRET_KEY);
        return token;
    } catch (e) {
        console.log(e);
        throw new Error("Token can not be generated");
    }
};

module.exports = creatTokenAsPivote;