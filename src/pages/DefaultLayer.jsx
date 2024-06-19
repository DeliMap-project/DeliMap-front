import Menu from '/src/components/menu/Menu.jsx';
import React, {useEffect, useRef, useState} from 'react';
import {
  CustomOverlayMap,
  Map,
  MapInfoWindow,
  MapMarker,
  MapTypeControl,
  MapTypeId,
  ZoomControl,
} from 'react-kakao-maps-sdk';
const { kakao } = window;
import useKakaoLoader from "./useKakaoLoader.tsx"
import style from '/src/styles/DefaultLayer.module.css';
import '/src/styles/index.css'
import '/src/styles/default.css'
import axios from "axios";
import BoardDetail from "../components/board/BoardDetail.jsx";

// lat: location.latitude, lng: location.longitude
function DefaultLayer() {

    // useEffect(() => {
    //     const container = document.getElementById('map');
    //     const options = {
    //         center: new kakao.maps.LatLng(33.450701, 126.570667),
    //         level: 3
    //     }
    //     const map = new kakao.maps.Map(container, options);
    //   }, []);

  useKakaoLoader()
  const [isLocation, setIsLocation] = useState (null); // 현재 위치를 저장할 상태
  const [infoWindowOpen, setInfoWindowOpen] = useState(false); // 인포윈도우
  const [isMyLocation, setIsMyLocation] = useState(true); // 현위치 인포윈도우
  const [state, setState] = useState (
      {
        // center: {lat : location.latitude, lng : location.longitude},
        center: {lat : 37.5223156763043, lng : 126.929715483158},
        isPanto: false,
      }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler,errorHandler)// 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = (response) => { // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setIsLocation({ latitude, longitude });
  };
  const errorHandler = (error) => {
    console.log(error);
  };
  const myLocation = () => { // 현위치로 가기
    setState({
      center: {lat : isLocation.latitude, lng : isLocation.longitude},
      isPanto: false,

    })
    setInfoWindowOpen(false);
    setIsMyLocation(false);
  }

  // ---------------BoardList-------------------
  const [isList, setIsList ] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [hashtag_boardList, setHashtagList] = useState(false);

  const isLogin = localStorage.getItem('isLogin');

  useEffect(() => {
    axios.post('http://localhost:3300/board/list')
        .then(response => {
          setBoardList(response.data);

        });
  }, []);
  useEffect(() => {
    const member_id = localStorage.getItem('member_member_id');

    let param = {
      member_id: member_id
    }
    axios.post('http://localhost:3300/member/memberInfo', param)
        .then(response => {
          { isLogin ?
              localStorage.setItem('member_nickname', response.data[0].member_nickname) : null }
        });
  }, []);

  const boardToggle = () => {
    setIsList(!isList);
  };
  const boardDetail = async (board_no, index) => {
    // history.pushState(null, null, `/detail/${board_no}`) // 페이지 변동없이 url 변경
    localStorage.setItem('board_no', board_no);
    setState({
      center: {lat: boardList[index].local_lat, lng: boardList[index].local_lng},
      isPanto: true,
    })
    setInfoWindowOpen(false);
    setIsMyLocation(true);

    // 조회수 증가
    let readCntParam = {
      board_no: board_no.toString(),
    }
    await axios.post('http://localhost:3300/board/readCnt', readCntParam)
  };
  const infoWindow = () => {
    setInfoWindowOpen(!infoWindowOpen);
  }

  const hashtagBoardList = (review_hashtag) => {
    localStorage.setItem('review_hashtag', review_hashtag);
    const hashtagBoard = localStorage.getItem('review_hashtag');
    setHashtagList(true);
    let hashtagParam = {
      review_hashtag: '%' + hashtagBoard + '%'
    }
    axios.post(`http://localhost:3300/board/hashtagList`, hashtagParam).then(response => {
      setHashtagList(response.data);
    });
  }

  return (
      <>
        {isLocation && (
            <Map center= {!state.isPanto ? {lat: isLocation.latitude, lng: isLocation.longitude}  : state.center} style={{width: '100vw', height: '100vh'}}
                 level= {!state.isPanto ? 4 :3} isPanto={state.isPanto} >
              <Menu/>
              {/*{infoWindowOpen && <MapInfoWindow position={state.center} removable={true} id={'location_infoWindow'}>*/}
              {/*  <div className={'location-infoWindow-txt'}>Hello World!</div>*/}
              {/*</MapInfoWindow> }*/}
              {!state.isPanto ?
                  <MapMarker position={{lat: isLocation.latitude, lng: isLocation.longitude}} clickable={false} image={{src: '/src/assets/icons8-location-80.png', size:{width: 40, height:44}}}></MapMarker> :
                  <MapMarker position={state.center} onClick={() => {isMyLocation ? infoWindow() : null} } clickable={true} >
                    {infoWindowOpen &&  <div className={style['location-infoWindow-txt']}>
                    <BoardDetail/>
                    </div> }
                  </MapMarker>
              } {/*리스트 클릭시 지도이동 및 마커클릭시 인포윈도우 true*/}
              <MapTypeControl position={"TOPLEFT"} />
              <ZoomControl position={"LEFT"}  />
              {/*<MapTypeId type={""} />*/}
                <div className={[style['location-myLocation'], style['drag-disable']].join(" ")} onClick={myLocation}>현위치</div>
            </Map>
        )}
          <div
              className={[style['modal-mask'], (isList ? style['animated-button'] : style['normal-button'])].join(" ")}>
            <div className={style['modal-wrapper']}>
              <div className={[style['modal-x'], style['drag-disable']].join(" ")}>
                <span onClick={boardToggle} >
                  {isList ?
                      <img className={style['toggle-open']} src={'/src/assets/icons8-back-64.png'} alt={'열기'}/> :
                      <img className={style['toggle-close']} src={'/src/assets/icons8-forward-64.png'} alt={'닫기'}/>}
                </span>
              </div>
              <div className={style["modal-container"]}>
                <div className={style['local-name']}>영등포구 여의도동</div>
                <div className={style['board-list']}>
                  {boardList.map((boardList, index) => {
                    return (
                        <div className={style['board-list-body']} key={boardList.board_no}>
                          <div className={style['board-list-name']}>
                                <span onClick={() => boardDetail(boardList.board_no, index)}>{boardList.board_name}</span>
                          </div>
                          <div className={style['board-list-business-type']}>{boardList.business_type}</div>
                          <div className={style['board-list-phone']}>{boardList.board_phone}</div>
                          <div className={style['board-list-review']}>리뷰 : {boardList.review_cnt}</div>
                          <div className={style['board-list-hashtag']}>
                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[0])}>{boardList.review_hashtag.split(', ')[0]}</span>
                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[1])}>{boardList.review_hashtag.split(', ')[1]}</span>
                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[2])}>{boardList.review_hashtag.split(', ')[2]}</span>
                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[3])}>{boardList.review_hashtag.split(', ')[3]}</span>
                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[4])}>{boardList.review_hashtag.split(', ')[4]}</span>
                          </div>
                          <div className={style['board-list-img']}><img src="/src/assets/고양이1.jpg" alt="이미지"/>
                          </div>
                          <hr className={style['list-line']}/>
                        </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
      </>
  )
}

export default DefaultLayer;