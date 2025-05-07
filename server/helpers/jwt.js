const { expressjwt: jwt } = require("express-jwt");

const authJwt = () => {
    const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
    return jwt({
        secret: secret,
        algorithms: ["HS256"],
    });
};

module.exports = authJwt;