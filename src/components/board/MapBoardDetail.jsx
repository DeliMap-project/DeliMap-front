import style from '/src/styles/board/MapBoardDetail.module.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import ReviewList from "./ReviewList.jsx";
const { kakao } = window;



const MapBoardDetail = () => {

  const navigate = useNavigate();
  const [isLocation, setIsLocation] = useState (null); // 현재 위치를 저장할 상태

  const [isDetailList, setIsDetailList ] = useState([]);
  const [roadToast, setRoadToast] = useState(false); // 도로명토스트메시지
  const [saveShow, setSaveShow] = useState(false); // 저장 버튼 여부

  const fullScore = '/src/assets/icons8-fullstar-48.png';
  const binScore = '/src/assets/icons8-binstar-48.png';
  const oneScore = isDetailList.review_score <= 0 ? binScore : fullScore;
  const twoScore = isDetailList.review_score <= 1.5 ? binScore : fullScore;
  const threeScore = isDetailList.review_score <= 2.5 ? binScore : fullScore;
  const fourScore = isDetailList.review_score <= 3.5 ? binScore : fullScore;
  const fiveScore = isDetailList.review_score <= 4.5 ? binScore : fullScore;
  const zeroScore = isDetailList.review_score <= 0.1 ? '0' : isDetailList.review_score;
  const board_no = localStorage.getItem('board_no');
  const member_nickname = localStorage.getItem('member_nickname');
  const member_member_id = localStorage.getItem('member_member_id');
  const local_lat = localStorage.getItem('local_lat');
  const local_lng = localStorage.getItem('local_lng');
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
      detailBoard.jibun_address = detailBoard[0].jibun_address;
      detailBoard.postcode = detailBoard[0].postcode;
      detailBoard.board_address = detailBoard[0].board_address;
      detailBoard.board_readcnt = detailBoard[0].board_readcnt;
      detailBoard.review_score = detailBoard[0].review_score;
      detailBoard.local_lat = detailBoard[0].local_lat;
      detailBoard.local_lng = detailBoard[0].local_lng;
      detailBoard.review_cnt = detailBoard[0].review_cnt;
    {
      detailBoard[0].service_list.trim().length > 0 ?
          detailBoard.service_list = detailBoard[0].service_list :
          detailBoard.service_list = null;
    }
    });
    saved()
  }, []);
  const go_map = () => {
    navigate('/')
  }
  const addressCopy = () => {
      try {
        navigator.clipboard.writeText(isDetailList.board_address).then(
            setTimeout(() => {
              setRoadToast(false);
            }, 1500),
            setRoadToast(true)
        )
      } catch {
        alert('주소복사에 실패했습니다!');
      }
  }
  const saveInsert = () => {
    let param = {
      board_no: board_no,
      board_name : isDetailList.board_name,
      member_id : member_member_id,
      member_nickname : member_nickname
    }
    axios.post(`http://localhost:3300/save/saveInsert`, param).then(response => {
    });
  }
  const saveDelete = () => {
    let param = {
      board_no: board_no,
      member_id : member_member_id,
      member_nickname : member_nickname
    }
    axios.post(`http://localhost:3300/save/saveDelete`, param).then(response => {
    });
  }
  const saved = () => {
    let saveParam = {
      board_no: board_no,
      member_id : member_member_id,
      member_nickname : member_nickname
    }
    axios.post(`http://localhost:3300/save/saved`, saveParam).then(response => {
      console.log('response', response)
      console.log('response.data', response.data)
      console.log('response.data', response.data.cnt)
      if(response.data[0].cnt === 1) {
        setSaveShow(true);
      }
    });
  }
  const share = () => {
    const url = location.href;
    try {
      navigator.clipboard.writeText(url).then(
      )
      alert('복사 되었습니다');
    } catch {
      alert('주소복사에 실패했습니다!');
    }
  }
  return (
    <>

      <div className={style['map-detail-container']}>
        <div className={style['map-detail-wrap']}>
          <div className={style['map-detail-tit']}>
            <span>{isDetailList.board_name}</span>
          </div>
            <div className={style['map-detail-txt01']}>
              <div className={style['map-detail-review-score']}>
                <label>
                  <div className={style['map-detail-business-type']}>
                    <span className={style['map-detail-board-business-type']}>{isDetailList.business_type}</span>
                  </div>
                  <span className={style['map-detail-line']}>ㅣ</span>
                  <div className={style['drag-disable']}>
                    <img src={oneScore} alt={'별점'} title={'별점'}/>
                    <img src={twoScore} alt={'별점'} title={'별점'}/>
                    <img src={threeScore} alt={'별점'} title={'별점'}/>
                    <img src={fourScore} alt={'별점'} title={'별점'}/>
                    <img src={fiveScore} alt={'별점'} title={'별점'}/>
                  </div>
                  <span
                      className={[style['map-detail-review-score-txt'], style['drag-disable']].join(' ')}>{zeroScore}점</span>
                  <span className={style['map-detail-review-score-review-cnt']}>리뷰 : {isDetailList.review_cnt}</span>
                </label>
              </div>
            </div>
          <div className={style['map-detail-txt02']}>
            <span className={style['map-detail-home']} onClick={go_map}><img src={'/src/assets/icons8-marker-64.png'} alt={'지도'}/>지도</span>
              <span onClick={() => setSaveShow(!saveShow)} className={style['map-detail-save']}>
                {!saveShow ?
                    <span onClick={saveInsert}><img src={'/src/assets/free-icon-save-instagram-5662990.png'} alt={'저장'}/>저장</span> :
                    <span onClick={saveDelete}><img src={'/src/assets/free-icon-save-instagram-5668020.png'} alt={'저장'}/>저장</span>}
              </span>
              <span onClick={share} className={style['map-detail-share']}><img src={'/src/assets/icons8-share-24.png'} alt={'공유'}/>공유</span>
            </div>
            <div className={style['detail-info']}>
              <div>
                  <img className={style['map-detail-address-img']} src={'/src/assets/icons8-map-marker-24.png'} alt={'주소'} title={'주소'}/>
              </div>
              <div className={style['map-detail-address01']}>
              {roadToast && <div className={style['address-copy-toast']}><span>주소가 복사되었습니다.</span></div>}
                  <span className={style['map-detail-road']}><span>도로명</span><span>ㅣ</span>{isDetailList.board_address}</span>
                  <span className={style['map-detail-road-copy']} onClick={addressCopy}>복사</span>
              </div>
              <div className={style['map-detail-address02']}>
                  <span className={style['map-detail-jibun']}><span>지번</span><span>ㅣ</span>{isDetailList.jibun_address}</span>
                  <span className={style['map-detail-postcode']}>우) {isDetailList.postcode}</span>
              </div>
              <div className={style['map-detail-phone']}>
                <label>
                  <img src={'/src/assets/icons8-phone-24.png'} alt={'전화번호'} title={'전화번호'}/>
                  <span className={style['map-detail-board-phone']}>{isDetailList.board_phone}</span>
                </label>
              </div>
              {isDetailList.service_list != null ?
              <div className={style['map-detail-service']}>
                <label>
                  <img src={'/src/assets/icons8-memo-48.png'} alt={'tag'}/>
                  <span className={style['map-detail-board-service']}>{isDetailList.service_list}</span>
                </label>
              </div> : null
              }
            </div>
        </div>
        <div className={style['map-wrap']}>
          <div className={style['map-content-tit']}>
            <span>장소</span>
          </div>
          <Map center={{lat: local_lat, lng: local_lng}} style={{width: '90%', height: '400px', margin:'0 auto'}}
                 level= {3}>
              <MapMarker position={{lat: local_lat, lng: local_lng}} image={{src: '/src/assets/icons8-location-80.png', size:{width: 40, height:44}}}></MapMarker>
            </Map>
        </div>
        <div className={style['review-wrap']}>
          <ReviewList/>
        </div>
      </div>
    </>
  )
}
export default MapBoardDetail