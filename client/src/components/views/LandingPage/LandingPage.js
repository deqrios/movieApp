import React, { useEffect, useState, Fragment } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import axios from "axios";
import { Row } from "antd"; // antd의 Row컴포넌트 Col컴포넌트를 감싸서 사용. 라이브러리 규칙.

function LandingPage() {
    // 읽어온 모든 영화들의 정보를 저장.
    const [Movies, setMovies] = useState([]);
    // 메인화면에 배경이 될, popular movie의 post를 저장.
    const [MainMovieImage, setMainMovieImage] = useState(null);
    // 현재페이지가 몇번페이지인지 저장.
    const [CurrentPage, setCurrentPage] = useState(0);

    // => mount될 때, fetchMovies함수를 최초 실행.
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    // => parameter로 들어온 곳에 요청을 보내고, response를 받아 state들을 갱신함.
    const fetchMovies = (endpoint) => {
        axios.get(endpoint).then((response) => {
            console.log(response.data);

            // 이전에 로드된 값 + 새로 로드한 값으로 state 갱신.
            setMovies([...Movies, ...response.data.results]);
            // 페이지를 더 읽어올 때, 페이지가 바뀌면서 results[0]도 바뀌게 되는데 이미 저장값이 있다면 그대로 사용.
            setMainMovieImage(MainMovieImage || response.data.results[0]);
            setCurrentPage(response.data.page);
        });
    };

    // => 영화정보들을 더 읽어오고 fetchMovies를 실행.
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;

        fetchMovies(endpoint);
    };

    return (
        <>
            <div style={{ width: "100%", margin: "0" }}>
                {/* Main Image */}
                {MainMovieImage && (
                    // :: MainMovieImage가 state에 저장됐을 때 그려줌.
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                    />
                )}
                <div style={{ width: "85%", margin: "1rem auto" }}>
                    <h2>Movies by latest</h2>
                    <hr />

                    {/* Movie Grid Cards */}

                    <Row gutter={[16, 16]}>
                        {Movies &&
                            // * gutter는 item들의 간격을 조정.
                            // :: 마찬가지로 영화정보들의 정보가 Movies에 담겨있을 때 그려줌.
                            Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                    <GridCards // Col은 Row와 세트.
                                        landingPage // landidngPage라는걸 명시하는 property
                                        image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                        movieId={movie.id}
                                        movieName={movie.original_title}
                                    />
                                </React.Fragment>
                            ))}
                    </Row>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
