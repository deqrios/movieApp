const { User } = require("../models/User");

// => 쿠키에 들어있는 정보로 DB쪽에서 유저를 탐색, 찾은 유저정보를 request에 담아 다음 프로세스로 넘김.
let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                isAuth: false,
                error: true,
            });

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = { auth };
