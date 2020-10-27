import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Popover } from "antd"; // mousehover event처리
import { IMAGE_BASE_URL } from "../../Config";
import "./favorite.css";

function FavoritePage() {
    // * Favorite된 영화객체 정보들을 저장.
    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoritedMovie();
    }, []);

    // => 서버에 userFrom을 담아 req를 보내고, 정보를 받아와 state에 저장.
    const fetchFavoritedMovie = () => {
        Axios.post("/api/favorite/getFavoritedMovie", { userFrom: localStorage.getItem("userId") }).then((response) => {
            if (response.data.success) {
                console.log(response.data);
                setFavorites(response.data.favorites);
            } else {
                alert("영화 정보를 가져오는데 실패 했습니다.");
            }
        });
    };

    // => delete버튼을 누르면 해당 객체의 정보를 보내고, 서버에서 삭제후 response를 주면 reload함.
    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom,
        };

        Axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
            if (response.data.success) {
                fetchFavoritedMovie();
            } else {
                alert("리스트에서 지우는데 실패했습니다.");
            }
        });
    };

    // => 테이블 형식에 맞게 favorite된 영화정보를 그려줌.
    const renderCards = Favorites.map((favorite, index) => {
        // :: 객체정보에 moviePost가 있으면 Post이미지를 넣어주고, 없으면 "no Image"
        const content = <div>{favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"}</div>;

        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td>
                    <button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button>
                </td>
            </tr>
        );
    });

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>{renderCards}</tbody>
            </table>
        </div>
    );
}

export default FavoritePage;
