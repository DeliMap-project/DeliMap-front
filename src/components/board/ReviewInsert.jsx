import '/src/styles/board/ReviewInsert.css';

const ReviewInsert = () => {

    return (
        <>
            <div className="review-modal-mask">
                <div className="review-modal-wrapper">
                    <div className="review-modal-x drag-disable">
                        <span>X</span>
                    </div>
                    <div className="review-modal-container">
                        <div className="review-modal-header">
                            <div className="reviewInsert_wrapper">
                                <span>식당 이름</span>
                            </div>
                            <div className="reviewInsert_container">
                                <div className="reviewInsert_score_wrap">
                                    <div className="reviewInsert_score">
                                        <img src="src/assets/icons8-fullstar-48.png" id="review_score1"
                                             className="review_score1" alt="별점"/>
                                        <img src="src/assets/icons8-binstar-48.png" id="review_score2"
                                             className="review_score2" alt="별점"/>
                                        <img src="src/assets/icons8-binstar-48.png" id="review_score3"
                                             className="review_score3" alt="별점"/>
                                        <img src="src/assets/icons8-binstar-48.png" id="review_score4"
                                             className="review_score4" alt="별점"/>
                                        <img src="src/assets/icons8-binstar-48.png" id="review_score5"
                                             className="review_score5" alt="별점"/>
                                    </div>
                                </div>
                                <div className="reviewInsert_content">
                                    <textarea placeholder="리뷰 내용을 적어주세요."></textarea>
                                </div>
                                <div className="reviewInsert_hashtag drag-disable">
                                    <input type="text" placeholder="#해시태그" className="drag-disable"
                                           id="review_hashtag"
                                           autoComplete="off"/>
                                </div>
                                <div className="reviewInsert_btn">
                                    <button className="reviewInsert_cancel">취소</button>
                                    <button className="reviewInsert_reg">등록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ReviewInsert;