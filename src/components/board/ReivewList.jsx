import '/src/styles/board/ReviewList.css';
import {useEffect, useState} from "react";
import axios from "axios";

const ReviewList = () => {

    const [isReviewList, setIsReviewList ] = useState([]);
    const [isReviewHashTag, setIsReviewHashTag ] = useState([]);

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

    const hashTagListView = (review_hashtag) => {
        localStorage.setItem('review_hashtag', review_hashtag);
        setIsReviewHashTag(true);
    }

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
                                {ReviewList.review_score >= 1 ?
                                    <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score1" className="review_score1" alt="별점"/> :
                                    <img src={'/src/assets/icons8-binstar-48.png'} id="review_score1" className="review_score1" alt="별점"/>
                                }
                                {ReviewList.review_score >= 2 ?
                                    <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score1" className="review_score1" alt="별점"/> :
                                    <img src={'/src/assets/icons8-binstar-48.png'} id="review_score1" className="review_score1" alt="별점"/>
                                }
                                {ReviewList.review_score >= 3 ?
                                    <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score1" className="review_score1" alt="별점"/> :
                                    <img src={'/src/assets/icons8-binstar-48.png'} id="review_score1" className="review_score1" alt="별점"/>
                                }
                                {ReviewList.review_score >= 4 ?
                                    <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score1" className="review_score1" alt="별점"/> :
                                    <img src={'/src/assets/icons8-binstar-48.png'} id="review_score1" className="review_score1" alt="별점"/>
                                }
                                {ReviewList.review_score >= 5 ?
                                    <img src={'/src/assets/icons8-fullstar-48.png'} id="review_score1" className="review_score1" alt="별점"/> :
                                    <img src={'/src/assets/icons8-binstar-48.png'} id="review_score1" className="review_score1" alt="별점"/>
                                }
                                <div className="reviewList_reveiw_date">{ReviewList.review_date}</div>
                            </label>
                        </div>
                        <div className="reviewList_review_content">
                            <span>
                                {ReviewList.review_content}
                            </span>
                        </div>
                        <div className="reviewList_review_hashtag">
                            <span onClick={() => hashTagListView(ReviewList.review_hashtag.split(', ')[0])}>{ ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[0] : ''}</span>
                            <span onClick={() => hashTagListView(ReviewList.review_hashtag.split(', ')[1])}>{ ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[1] : ''}</span>
                            <span onClick={() => hashTagListView(ReviewList.review_hashtag.split(', ')[2])}>{ ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[2] : ''}</span>
                            <span onClick={() => hashTagListView(ReviewList.review_hashtag.split(', ')[3])}>{ ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[3] : ''}</span>
                            <span onClick={() => hashTagListView(ReviewList.review_hashtag.split(', ')[4])}>{ ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[4] : ''}</span>
                        </div>
                        <hr className="reviewList_hr"/>
                    </div>
                )
            })}

        </>

    )
}

export default ReviewList
