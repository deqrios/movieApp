const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// * favorite에 담기는 정보의 구조.
const favoriteSchema = mongoose.Schema(
    {
        userFrom: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        movieId: {
            type: String,
        },
        movieTitle: {
            type: String,
        },
        moviePost: {
            type: String,
        },
        movieRunTime: {
            type: String,
        },
    },
    { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
