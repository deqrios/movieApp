import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

// => 영화의 정보를 props로 받아와, favorite버튼에 문구와 favorite수를 변경.
function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0); // 해당 영화의 총 favorite수 state저장.
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime,
    };

    // TODO - mount될 때 실행될 함수. (새로고침 했을 때도 변함없는 정보유지)
    // => mount될 때, 영화의 favorite된 수와 현 유저가 영화를 favorite했는지 상태를 가져옴.
    useEffect(() => {
        Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
            console.log(response.data);
            if (response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber);
            } else {
                alert("숫자 정보를 가져오는데 실패 했습니다.");
            }
        });

        Axios.post("/api/favorite/favorited", variables).then((response) => {
            if (response.data.success) {
                console.log("favorited", response.data);
                setFavorited(response.data.favorited);
            } else {
                alert("정보를 가져오는데 실패 했습니다.");
            }
        });
    }, []);

    // TODO - favorite button이 눌렸을 때 실행되는 함수. (로그인 한 상태에서만 변동이 있게끔 수정 필요)
    // => favorited 상태에 따라, 영화의 favorite수를 +/-하고, 유저의 favorited상태를 반전시킴.
    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
                console.log("remove", response.data);
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited);
                } else {
                    alert("Favorite 리스트에서 지우는 걸 실패했습니다.");
                }
            });
        } else {
            Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
                console.log("add", response.data);
                if (response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                } else {
                    alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
                }
            });
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClickFavorite}>
                {Favorited ? "Not Favorite" : "Add to Favorite"}&nbsp;
                {FavoriteNumber}
            </Button>
        </div>
    );
}

export default Favorite;
