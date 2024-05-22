import '/src/styles/board/BoardDetail.css';
import {useState, useEffect} from "react";
import axios from "axios";
import BoardList from "./BoardList.jsx";
import ReviewInsert from "./ReviewInsert.jsx";
import ReviewList from "./ReviewList.jsx";
import { useNavigate} from "react-router-dom";
import DefaultLayer from "../../pages/DefaultLayer.jsx";

// eslint-disable-next-line react/prop-types
const BoardDetail = ({onClose}) => {
    const navigate = useNavigate();

    const [isDetailList, setIsDetailList ] = useState([]);
    const [isReview, setIsReview ] = useState(false);
    const [isAddressToggle, setIsAddressToggle ] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [toast, setToast] = useState(false); // 토스트메시지

    const fullScore = '/src/assets/icons8-fullstar-48.png';
    const binScore = '/src/assets/icons8-binstar-48.png';
    const oneScore = isDetailList.review_score <= 0 ? binScore : fullScore;
    const twoScore = isDetailList.review_score <= 1.5 ? binScore : fullScore;
    const threeScore = isDetailList.review_score <= 2.5 ? binScore : fullScore;
    const fourScore = isDetailList.review_score <= 3.5 ? binScore : fullScore;
    const fiveScore = isDetailList.review_score <= 4.5 ? binScore : fullScore;
    const zeroScore = isDetailList.review_score <= 0.1 ? '0' : isDetailList.review_score;
    const isLogin = localStorage.getItem('isLogin');
    const member_id = localStorage.getItem('member_id');
    const board_no = localStorage.getItem('board_no');


    const showDetail = () => {
        setIsReview(!isReview);
    }
    const reviewInsert = () => {
        if(isLogin) {
            setIsReview(!isReview);
            // history.pushState(null, null, `/detail/${board_no}/ReviewI`) // 페이지 변동없이 url 변경

        }else {
            alert('로그인 후 이용이 가능합니다.')
            return false;
        }
    };

    const copyAddress = () => {
        try {
            navigator.clipboard.writeText(isDetailList.board_addressToggle).then(r =>
                // 복사 성공 시 알림 표시
                alert('주소가 복사되었습니다!')
            );
        } catch {
            // 복사 실패 시 알림 표시
            alert('주소복사에 실패했습니다!');
        }
    };
    const copyJibun = () => {
        try {
            navigator.clipboard.writeText(isDetailList.jibun_address).then(r =>
                // 복사 성공 시 알림 표시
                alert('주소가 복사되었습니다!')
            );
        } catch {
            // 복사 실패 시 알림 표시
            alert('주소복사에 실패했습니다!');
        }
    };
    const copyPostcode = () => {
        try {
            navigator.clipboard.writeText(isDetailList.postcode).then(r =>
                // 복사 성공 시 알림 표시
                alert('주소가 복사되었습니다!')
            );
        } catch {
            // 복사 실패 시 알림 표시
            alert('주소복사에 실패했습니다!');
        }
    };
    const addressToggle = () => {
        setIsAddressToggle(!isAddressToggle);
    }
    const addressModalToggle = () =>{
        setIsAddressModalOpen(!isAddressModalOpen);
    }
    const toastMessage = () => {
        setTimeout(() => {
            setToast(true);
        }, 1000);

    };
    // 상세보기
    useEffect( () => {
        let param = {
            board_no: board_no,
        }
         axios.post(`http://localhost:3300/board/detail`, param).then(response => {
             setIsDetailList(response.data);
            const detailBoard = response.data
            detailBoard.board_no = detailBoard[0].board_no;
            detailBoard.member_id = detailBoard[0].member_id;
            detailBoard.board_name = detailBoard[0].board_name;
            detailBoard.board_content = detailBoard[0].board_content;
            detailBoard.board_phone = detailBoard[0].board_phone;
             {
                 detailBoard[0].board_address.length <= 20 ?
                     detailBoard.board_address = detailBoard[0].board_address :
                     detailBoard.board_address = detailBoard[0].board_address.substring(0,20) + '...';
             }
            detailBoard.jibun_address = detailBoard[0].jibun_address;
            detailBoard.postcode = detailBoard[0].postcode;
            detailBoard.board_addressToggle = detailBoard[0].board_address;
            detailBoard.board_readcnt = detailBoard[0].board_readcnt;
            detailBoard.review_score = detailBoard[0].review_score;
         });
    }, []);

    const boardUpdate = (board_no) => {
        if (confirm("수정하시겠습니까?")) {
            localStorage.setItem('board_no', board_no);
            navigate('/BoardUpdate')
        } else {
            return false;
        }
    }

    return (
        <>
            <DefaultLayer/>
            {isReview ?
            <ReviewInsert onShow={showDetail}/> :
            <div className={'detail-container'}>
                {toast && <div className={'copyToast'}><span>클립보드에 복사되었습니다.</span></div>}
                <div className={'detail-wrapper'}>
                    <div className={'modal-close'} onClick={onClose}><span>X</span></div>
                    <div className={'detailList'}>
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
                                <div className={'detail_reviewScore drag-disable'}>
                                    <label>
                                        <img src={oneScore} alt={'별점'} title={'별점'}/>
                                        <img src={twoScore} alt={'별점'} title={'별점'}/>
                                        <img src={threeScore} alt={'별점'} title={'별점'}/>
                                        <img src={fourScore} alt={'별점'} title={'별점'}/>
                                        <img src={fiveScore} alt={'별점'} title={'별점'}/>
                                        <span className={'reviewScore'}>{zeroScore}점</span>
                                    </label>
                                </div>
                                <div className={'detail_address'}>
                                    <label>
                                        <img src={'/src/assets/icons8-map-marker-24.png'} alt={'주소'} title={'주소'}/>
                                        <span className={'address_txt'}>{isDetailList.board_address}</span>
                                        <span className={'address_toggle'} onClick={() => {addressToggle(); addressModalToggle();}}>
                                        {isAddressToggle ?
                                            <img src={'/src/assets/icons8-collapse-arrow-24.png'} alt={'닫기'}
                                                 title={'닫기'}/> :
                                            <img src={'/src/assets/icons8-expand-arrow-24.png'} alt={'열기'}
                                                 title={'열기'}/>}
                                        </span>
                                        {isAddressModalOpen ?
                                        <div className={'detailAddressModal'}>
                                            <span className={'detailAddressModal-X'} onClick={() => {addressToggle(); addressModalToggle();}}>X</span>
                                            <div className={'detailAddressModal_address'}><span className={'detailAddressModal_address_tit'}>도로명</span> : {isDetailList.board_addressToggle}
                                                <span onClick={toastMessage} className={'copyAddress'}>복사</span>
                                            </div>
                                            <div className={'detailAddressModal_jibun'}><span
                                                className={'detailAddressModal_jibun_tit'}>지번</span> : {isDetailList.jibun_address}
                                                <span onClick={copyJibun} className={'copyJibun'}>복사</span>
                                            </div>
                                            <div className={'detailAddressModal_postcode'}><span
                                                className={'detailAddressModal_postcode_tit'}>우편번호</span> : {isDetailList.postcode}
                                                <span onClick={copyPostcode} className={'copyPostcode'}>복사</span>
                                            </div>
                                        </div> : null}
                                    </label>
                                </div>
                                <div className={'detail_phone'}>
                                    <label>
                                        <img src={'/src/assets/icons8-phone-24.png'} alt={'전화번호'} title={'전화번호'}/>
                                        <span>{isDetailList.board_phone}</span>
                                    </label>
                                </div>
                                <div className={'review_btn'}>
                                    <label>
                                        {member_id === isDetailList.member_id ?
                                            <span className={'boardUpdate'}
                                                  onClick={() => boardUpdate(isDetailList.board_no)}>수정</span> : null
                                        }
                                        <img src={'/src/assets/icons8-pen-24.png'} alt={'리뷰쓰기'} title={'리뷰쓰기'}
                                             onClick={reviewInsert}/>
                                        <span className={'reviewInsert'} onClick={reviewInsert}>리뷰쓰기</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={'borderLine'}/>
                        <ReviewList/>
                    </div>
                </div>
            </div>
            }

        </>
    )

}


export default BoardDetail
