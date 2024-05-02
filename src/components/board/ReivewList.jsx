import '/src/styles/board/ReviewList.css';
import {useEffect, useState} from "react";
import axios from "axios";

const ReviewList = () => {

    const [isReviewList, setIsReviewList ] = useState([]);

    // 리뷰 리스트
    useEffect(() => {
        const board_no = localStorage.getItem('board_no');
        let reviewParam = {
            board_no: board_no,
        }
        axios.post(`http://localhost:3300/review/list`, reviewParam)
            .then(response => {
                setIsReviewList(response.data);
            });
    }, []);

    return(
        <>
            <div className={'reviewList_title'}>리뷰</div>
            {isReviewList.map(ReviewList => {
                return (
                    <div key={ReviewList.review_no}>
                        <div className="reviewList_wrap">
                            <label>
                                <div className={'reviewList_profile'}></div>
                                <span className={'reviewList_member_nickname'}>{ReviewList.member_nickname}</span>
                            </label>
                        </div>
                        <div className="reviewList_img">
                            <img src="/src/assets/고양이1.jpg" alt="이미지"/>
                        </div>
                        <div className={'reviewList_score'}>
                            <label>
                                <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score1" className="review_score1" alt="별점" />
                                <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score2" className="review_score2" alt="별점" />
                                <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score3" className="review_score3" alt="별점" />
                                <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score4" className="review_score4" alt="별점" />
                                <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score5" className="review_score5" alt="별점" />
                                <div className="reviewList_reveiw_date">{ReviewList.review_date}</div>
                            </label>
                        </div>
                        <div className="reviewList_review_content">
                            <span>{ReviewList.review_content}</span>
                        </div>
                        <div className="reviewList_review_hashtag">
                            <span>{ReviewList.review_hashtag}</span>
                        </div>
                        <hr className="reviewList_hr"/>
                    </div>
                )
            })}
        </>

    )
}

export default ReviewList
