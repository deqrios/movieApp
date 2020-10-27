import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import Axios from "axios";
import Favorite from "./Sections/Favorite";

// => 영화의 세부정보나 배역인물들의 profile사진을 볼 수 있게 하는 컴포넌트.
function MovieDetail(props) {
    let movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    // => 영화의 모든 정보와 등장인물들의 정보를 가져옴.
    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        //  console.log("props.match", props.match);

        Axios.get(endpointInfo).then((response) => {
            //  console.log("!", response.data);
            setMovie(response.data);
        });

        Axios.get(endpointCrew).then((response) => {
            // console.log(response.data);
            setCasts(response.data.cast);
        });
    }, []);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };

    return (
        <div>
            {/* Header */}

            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} title={Movie.original_title} text={Movie.overview} />

            {/* Body */}
            <div style={{ width: "85%", margin: "1rem auto" }}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />

                {/* Movie Info */}

                <MovieInfo movie={Movie} />

                <br />
                {/* Actors Grid */}
                <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {ActorToggle && (
                    <Row gutter={[16, 16]}>
                        {Casts &&
                            Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                    />
                                </React.Fragment>
                            ))}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default MovieDetail;
