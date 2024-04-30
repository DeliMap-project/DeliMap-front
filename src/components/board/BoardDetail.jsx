import '/src/styles/board/BoardDetail.css';
import {useState, useEffect} from "react";
import axios from "axios";
import BoardList from "./BoardList.jsx";

// eslint-disable-next-line react/prop-types
const BoardDetail = ({onClose}) => {
    const [isDetailList, setIsDetailList ] = useState([]);
    const [isReview, setIsReview ] = useState(false);

    const fullScore = '/src/assets/icons8-fullstar-48.png';
    const binScore = '/src/assets/icons8-binstar-48.png';
    const oneScore = isDetailList.review_score <= 0 ? binScore : fullScore;
    const twoScore = isDetailList.review_score <= 1.5 ? binScore : fullScore;
    const threeScore = isDetailList.review_score <= 2.5 ? binScore : fullScore;
    const fourScore = isDetailList.review_score <= 3.5 ? binScore : fullScore;
    const fiveScore = isDetailList.review_score <= 4.5 ? binScore : fullScore;
    const zeroScore = isDetailList.review_score <= 0.1 ? '0' : isDetailList.review_score;

    const reviewInsert = () => {
        setIsReview(!isReview);
    };

    const copyAddress = () => {
        try {
            navigator.clipboard.writeText(isDetailList.board_address);
            // 복사 성공 시 알림 표시
            alert('주소가 복사되었습니다!');
        } catch {
            // 복사 실패 시 알림 표시
            alert('주소복사에 실패했습니다!');
        }
    };
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
            detailBoard.board_content = detailBoard[0].board_content;
            detailBoard.board_phone = detailBoard[0].board_phone;
            detailBoard.board_address = detailBoard[0].board_address;
            detailBoard.board_readcnt = detailBoard[0].board_readcnt;
            detailBoard.review_score = detailBoard[0].review_score;
         });
    }, []);

    return (
        <>
            <div className={'detail-container'}>
                <div className={'detail-wrapper'}>
                    <div className={'modal-close'} onClick={onClose}><span>X</span></div>
                    <div>
                        <div className={'detail_del'}>
                            <div className={'detail_del_img drag-disable'}>
                                <div className={'detail_image'}>
                                    <div>
                                        <span className={'backIcon'}><img src={'/src/assets/icons8-back-64.png'} alt={'이전'} title={'이전'}/></span>
                                        <span className={'nextIcon'}><img src={'/src/assets/icons8-forward-64.png'} alt={'다음'} title={'다음'}/></span>
                                    </div>
                                </div>
                            </div>
                            <div className={'detail_body'}>
                                <div className={'detail_name'}>{isDetailList.board_name}</div>
                                <div className={'detail_content'}>{isDetailList.board_content}</div>
                                <div className={'detail_reviewScore'}>
                                    <label>
                                        <img src={oneScore} alt={'별점'} title={'별점'}/>
                                        <img src={twoScore} alt={'별점'} title={'별점'}/>
                                        <img src={threeScore} alt={'별점'} title={'별점'}/>
                                        <img src={fourScore} alt={'별점'} title={'별점'}/>
                                        <img src={fiveScore} alt={'별점'} title={'별점'}/>
                                        <span className={'reviewScore'}>{zeroScore}점</span>
                                    </label>
                                </div>
                                <div className={'detail_phone'}>
                                    <label>
                                        <img src={'/src/assets/icons8-phone-24.png'} alt={'전화번호'} title={'전화번호'}/>
                                        <span>{isDetailList.board_phone}</span>
                                    </label>
                                </div>
                                <div className={'detail_address'}>
                                    <label>
                                        <img src={'/src/assets/icons8-map-marker-24.png'} alt={'주소'} title={'주소'}/>
                                        <span>{isDetailList.board_address}</span>
                                        <span onClick={copyAddress} className={'copyAddress'}>복사</span>
                                    </label>
                                </div>
                                <div className={'review_btn'}>
                                    <label>
                                        <img src={'/src/assets/icons8-pen-24.png'} alt={'리뷰쓰기'} title={'리뷰쓰기'} onClick={reviewInsert}/>
                                        <span className={'reviewInsert'} onClick={reviewInsert}>리뷰쓰기</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={'borderLine'}/>
                    </div>
                </div>
            </div>
        </>
    )

}


export default BoardDetail
