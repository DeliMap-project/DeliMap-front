import style from "/src/styles/board/BoardDetail.module.css";
import {useState, useEffect} from "react";
import axios from "axios";
// import BoardList from "./BoardList.jsx";
import ReviewInsert from "./ReviewInsert.jsx";
// import ReviewList from "./ReviewList.jsx";
import {Link, useNavigate} from "react-router-dom";
import DefaultLayer from "../../pages/DefaultLayer.jsx";
const BoardDetail = () => {
    const navigate = useNavigate();

    const [isDetailList, setIsDetailList ] = useState([]);
    const [isReview, setIsReview ] = useState(false);
    const [isAddressToggle, setIsAddressToggle ] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [roadToast, setRoadToast] = useState(false); // 도로명토스트메시지
    const [jibunToast, setJibunToast] = useState(false); // 지번명 토스트메시지
    const [postToast, setPostToast] = useState(false); // 우편번호 토스트메시지

    const fullScore = '/src/assets/icons8-fullstar-48.png';
    const binScore = '/src/assets/icons8-binstar-48.png';
    const oneScore = isDetailList.review_score <= 0 ? binScore : fullScore;
    const twoScore = isDetailList.review_score <= 1.5 ? binScore : fullScore;
    const threeScore = isDetailList.review_score <= 2.5 ? binScore : fullScore;
    const fourScore = isDetailList.review_score <= 3.5 ? binScore : fullScore;
    const fiveScore = isDetailList.review_score <= 4.5 ? binScore : fullScore;
    const zeroScore = isDetailList.review_score <= 0.1 ? '0' : isDetailList.review_score;
    const isLogin = localStorage.getItem('isLogin');
    const board_no = localStorage.getItem('board_no');
    localStorage.setItem('local_lat', isDetailList.local_lat);
    localStorage.setItem('local_lng', isDetailList.local_lng);



    const reviewInsert = () => {
        if(isLogin) {
            setIsReview(!isReview);
            // history.pushState(null, null, `/detail/${board_no}/ReviewI`) // 페이지 변동없이 url 변경

        }else {
            alert('로그인 후 이용이 가능합니다.')
            return false;
        }
    };
    const addressToggle = () => {
        setIsAddressToggle(!isAddressToggle);
    }
    const addressModalToggle = () =>{
        setIsAddressModalOpen(!isAddressModalOpen);
    }
    const toastMessage = (param) => {
      if (param === 1) {
        try {
          navigator.clipboard.writeText(isDetailList.board_addressToggle).then(
            setTimeout(() => {
              setRoadToast(false);
            }, 1500),
            setRoadToast(true)
          )
        } catch {
          alert('주소복사에 실패했습니다!');
        }
      } else if (param === 2) {
        try {
          navigator.clipboard.writeText(isDetailList.jibun_address).then(
            setTimeout(() => {
              setJibunToast(false);
            }, 1500),
            setJibunToast(true),
          )
        } catch {
          alert('주소복사에 실패했습니다!');
        }
      } else if (param === 3) {
        try {
          navigator.clipboard.writeText(isDetailList.postcode).then(
            setTimeout(() => {
              setPostToast(false);
            }, 1500),
            setPostToast(true),
          )
        } catch {
          alert('주소복사에 실패했습니다!');
        }
      }
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
            detailBoard.business_type = detailBoard[0].business_type;
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
            detailBoard.local_lat = detailBoard[0].local_lat;
            detailBoard.local_lng = detailBoard[0].local_lng;
            detailBoard.review_cnt = detailBoard[0].review_cnt;
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
          <div className={style['detail-container']}>
            <div className={style['detail-wrapper']}>
              <div>
                <div className={style['detail-business-type']}>
                  <div className={style['detail-name']}>
                    <span className={style['board-name']}>
                      <Link to={`/MapBoardDetail:${board_no}`} target="_blank" title={isDetailList.board_name} style={{color: 'black'}}>{isDetailList.board_name}</Link>
                    </span>
                  </div>
                  <div className={[style['detail-score'], style['drag-disable']].join(" ")}>
                    <label>
                      <span className={style['review-cnt']}>리뷰 : {isDetailList.review_cnt}<span>|</span></span>
                      <img src={oneScore} alt={'별점'} title={'별점'}/>
                      <img src={twoScore} alt={'별점'} title={'별점'}/>
                      <img src={threeScore} alt={'별점'} title={'별점'}/>
                      <img src={fourScore} alt={'별점'} title={'별점'}/>
                      <img src={fiveScore} alt={'별점'} title={'별점'}/>
                      <span className={style['total-score']}>{zeroScore}점</span>
                    </label>
                  </div>
                  <div className={style['detail-address']}>
                    <label>
                      <img src={'/src/assets/icons8-map-marker-24.png'} alt={'주소'} title={'주소'}/>
                      <span className={style['address-txt']}>{isDetailList.board_address}</span>
                      <span onClick={() => {addressToggle();addressModalToggle();}} className={style['address-toggle-img']}>
                        {isAddressToggle ?
                            <img src={'/src/assets/icons8-collapse-arrow-24.png'} alt={'닫기'} title={'닫기'}/> :
                            <img src={'/src/assets/icons8-expand-arrow-24.png'} alt={'열기'} title={'열기'}/>}
                      </span>
                      {isAddressModalOpen ?
                          <div className={style['detail-address-modal']}>
                            <span className={style['detail-address-modal-x']} onClick={() => {addressToggle();addressModalToggle();}}>X</span>
                            <div className={style['detail-address-modal-address']}>
                              <span className={style['detail-address-modal-address-tit']}>도로명</span> : {isDetailList.board_addressToggle}
                              <span onClick={() => toastMessage(1)} className={style['copy-address']}>복사</span>
                            </div>
                            <div className={style['detail-address-modal-jibun']}>
                              <span className={style['detail-address-modal-jibun-tit']}>지번</span> : {isDetailList.jibun_address}
                              <span onClick={() => toastMessage(2)} className={style['copy-jibun']}>복사</span>
                            </div>
                            <div className={style['detail-address-modal-postcode']}>
                              <span className={style['detail-address-modal-postcode-tit']}>우편번호</span> : {isDetailList.postcode}
                              <span onClick={() => toastMessage(3)} className={style['copy-postcode']}>복사</span>
                            </div>
                          </div> : null}
                    </label>
                  </div>
                  <div className={style['detail-phone']}>
                    <label>
                      <img src={'/src/assets/icons8-phone-24.png'} alt={'전화번호'} title={'전화번호'}/>
                      <span>{isDetailList.board_phone}</span>
                    </label>
                  </div>
                  <div className={style['review-btn']}>
                    <label>
                      <img src={'/src/assets/icons8-pen-24.png'} alt={'리뷰쓰기'} title={'리뷰쓰기'} onClick={reviewInsert}/>
                      <span className={style['review-insert']} onClick={reviewInsert}>리뷰쓰기</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {roadToast && <div className={style['copy-toast']}><span>도로명주소가 복사되었습니다.</span></div>}
            {jibunToast && <div className={style['copy-toast']}><span>지번주소가 복사되었습니다.</span></div>}
            {postToast && <div className={style['copy-toast']}><span>우편번호가 복사되었습니다.</span></div>}
          </div>
        </>
    )

}


export default BoardDetail
