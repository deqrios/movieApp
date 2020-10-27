import React from "react";
import { Col } from "antd"; // * antd의 Col컴포넌트, image카드를 설정한 비율대로 그려줌. Responsive 함.

// => props를 받아 image를 카드형식으로 그려줌.
function GridCards(props) {
    // :: props에 landingPage가 명시되면, 랜딩페이지에 맞게 return을 하고, 아니면 detail view return.
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                {/* 한 컬럼에 24사이즈임. */}
                <div style={{ position: "relative" }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: "100%", height: "320px" }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        );
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                {/* 한 컬럼에 24사이즈임. */}
                <div style={{ position: "relative" }}>
                    <img style={{ width: "100%", height: "320px" }} src={props.image} alt={props.chracterName} />
                </div>
            </Col>
        );
    }
}

export default GridCards;
