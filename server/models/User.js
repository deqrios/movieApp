const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

// * user정보구조.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minglength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

// => user정보를 확인 후, DB에 저장.
userSchema.pre("save", function (next) {
    var user = this;

    // :: 기존유저정보의 password가 수정 된 경우, 바뀐 password를 hash처리하고 저장.
    if (user.isModified("password")) {
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// => 등록된 user의 해쉬화된 비밀번호와 입력받은 비밀번호를 비교해서 err or isMatch를 리턴하는 함수 생성.
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// => token을 생성하고 저장하는 함수 생성.
userSchema.methods.generateToken = function (cb) {
    var user = this;
    console.log("user", user);
    console.log("userSchema", userSchema);
    var token = jwt.sign(user._id.toHexString(), "secret");
    var oneHour = moment().add(1, "hour").valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

// => 토큰을 확인하고 비교하는 정적 함수 생성.
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, "secret", function (err, decode) {
        user.findOne({ _id: decode, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
