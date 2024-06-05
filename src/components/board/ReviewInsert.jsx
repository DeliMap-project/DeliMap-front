import '/src/styles/board/ReviewInsert.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ReviewInsert = ({onShow}) => {

    const [isDetailList, setIsDetailList ] = useState([]);
    const [review_content, setReview_content ] = useState('');
    const [review_hashtag, setReview_hashtag ] = useState('');
    const [review_score, setReview_score ] = useState('1');

    const [score1, setScore1] = useState('/src/assets/icons8-fullstar-48.png');
    const [score2, setScore2] = useState('/src/assets/icons8-binstar-48.png');
    const [score3, setScore3] = useState('/src/assets/icons8-binstar-48.png');
    const [score4, setScore4] = useState('/src/assets/icons8-binstar-48.png');
    const [score5, setScore5] = useState('/src/assets/icons8-binstar-48.png');
    const fullScore = '/src/assets/icons8-fullstar-48.png';
    const binScore = '/src/assets/icons8-binstar-48.png';
    const navigate = useNavigate();

    useEffect( () => {
        const board_no = localStorage.getItem('board_no');
        let param = {
            board_no: board_no,
        }
        axios.post('http://localhost:3300/board/detail', param).then(response => {
            setIsDetailList(response.data);
            const detailBoard = response.data
            detailBoard.board_no = detailBoard[0].board_no;
            detailBoard.board_name = detailBoard[0].board_name;
        });
    }, []);

    const reviewReg = () => {
        const board_no = localStorage.getItem('board_no');
        const member_id = localStorage.getItem('board_member_id');
        const member_nickname = localStorage.getItem('member_nickname');

        // let review_hashtag = review_hashtag.replace(/#/g, ', #').substring(2);

        if(review_content === ''){
            alert("리뷰 내용을 입력해주세요.");
            return false
        }
        let param = {
            member_id: member_id,
            member_nickname: member_nickname,
            review_content: review_content,
            review_score: review_score,
            review_hashtag: review_hashtag.replace(/#/g, ', #').substring(2),
            board_no: board_no,
        }
        axios.post('http://localhost:3300/review/insert', param).then(response => {
        alert("등록 되었습니다.")
            location.reload();

        });
    };
    const reviewCancel = () => {
        if (confirm("리뷰 등록을 취소하시겠습니까?")) {
            onShow();
        } else {
            return false;
        }
    }
    const changeImage = (index) => {
        if (index === 1) {
            setScore2('/src/assets/icons8-binstar-48.png');
            setScore3('/src/assets/icons8-binstar-48.png');
            setScore4('/src/assets/icons8-binstar-48.png');
            setScore5('/src/assets/icons8-binstar-48.png');
            setReview_score('1');
            // review_score.value = '1';
        }
        if (index === 2) {
            setScore2('/src/assets/icons8-fullstar-48.png');
            setScore3('/src/assets/icons8-binstar-48.png');
            setScore4('/src/assets/icons8-binstar-48.png');
            setScore5('/src/assets/icons8-binstar-48.png');
            setReview_score('2');
            // review_score.value = '1';
        }
        if (index === 3) {
            setScore2('/src/assets/icons8-fullstar-48.png');
            setScore3('/src/assets/icons8-fullstar-48.png');
            setScore4('/src/assets/icons8-binstar-48.png');
            setScore5('/src/assets/icons8-binstar-48.png');
            setReview_score('3');
            // review_score.value = '1';
        }
        if (index === 4) {
            setScore2('/src/assets/icons8-fullstar-48.png');
            setScore3('/src/assets/icons8-fullstar-48.png');
            setScore4('/src/assets/icons8-fullstar-48.png');
            setScore5('/src/assets/icons8-binstar-48.png');
            setReview_score('4');
            // review_score.value = '1';
        }
        if (index === 5) {
            setScore2('/src/assets/icons8-fullstar-48.png');
            setScore3('/src/assets/icons8-fullstar-48.png');
            setScore4('/src/assets/icons8-fullstar-48.png');
            setScore5('/src/assets/icons8-fullstar-48.png');
            setReview_score('5');
            // review_score.value = '1';
        }
    };

    const notPaste = (event) => {
        event.preventDefault();
        alert('붙여넣기가 금지 되어 있습니다.');
    };
    const hashNull = () => {
        const review_hashtag = document.getElementById("review_hashtag");
        if(review_hashtag.value ==='') {
            review_hashtag.value  = review_hashtag.value.concat('#');
        }
        if(review_hashtag.value.charAt(review_hashtag.value.indexOf('##'))) {
            review_hashtag.value = review_hashtag.value.replace('##','#');
        }
    };
    const hashtagClick = () => {
        const review_hashtag = document.getElementById("review_hashtag");
        if(review_hashtag.value === '') {
            review_hashtag.value  = review_hashtag.value.concat('#');
        }
    };
    const addLetterOnSpace= () => {
        const review_hashtag = document.getElementById("review_hashtag");
        const review_hashtagValue = review_hashtag.value;
        review_hashtag.value = review_hashtagValue.replace(" ", "#"); // 띄어쓰기마다 "#"를 추가
        if(review_hashtag.value.charAt(review_hashtag.value.indexOf('##'))) {
            review_hashtag.value = review_hashtag.value.replace('##','#');
        }
    };

    return (
        <>
            <div className="review-modal-mask">
                <div className="review-modal-wrapper">
                    <div className="review-modal-x drag-disable" onClick={reviewCancel}>
                        <span>X</span>
                    </div>
                    <div className="review-modal-container">
                        <div className="review-modal-header">
                            <div className="reviewInsert_wrapper">
                                <span>{isDetailList.board_name}</span>
                            </div>
                            <div className="reviewInsert_container">
                                <div className="reviewInsert_score_wrap">
                                    <div className="reviewInsert_score">
                                        <img src={score1} id="review_score1" className="review_score1" alt="별점" onClick={() => changeImage(1)}/>
                                        <img src={score2} id="review_score2" className="review_score2" alt="별점" onClick={() => changeImage(2)}/>
                                        <img src={score3} id="review_score3" className="review_score3" alt="별점" onClick={() => changeImage(3)}/>
                                        <img src={score4} id="review_score4" className="review_score4" alt="별점" onClick={() => changeImage(4)}/>
                                        <img src={score5} id="review_score5" className="review_score5" alt="별점" onClick={() => changeImage(5)}/>
                                    </div>
                                </div>
                                <div className="reviewInsert_content">
                                    <textarea placeholder="리뷰 내용을 적어주세요." rows="12" cols="48" value={review_content} onChange={(e) => setReview_content(e.target.value)}></textarea>
                                </div>
                                <div className="reviewInsert_hashtag drag-disable">
                                    <input type="text" onPaste={notPaste} onKeyUp={hashNull} onInput={addLetterOnSpace} onClick={hashtagClick} placeholder="#해시태그" className="drag-disable" id="review_hashtag" autoComplete="off" value={review_hashtag} onChange={(e) => setReview_hashtag(e.target.value)}/>
                                </div>
                                <div className="reviewInsert_btn">
                                    <button className="reviewInsert_cancel" onClick={reviewCancel}>취소</button>
                                    <button className="reviewInsert_reg" onClick={reviewReg}>등록</button>
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