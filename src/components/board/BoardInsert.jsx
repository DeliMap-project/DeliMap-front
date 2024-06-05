import style from '/src/styles/board/BoardInsert.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useState} from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
const BoardInsert = () => {

    const navigate = useNavigate();
    const [file_no, setFile_no ] = useState('');
    const [board_name, setBoard_name ] = useState('');
    const [business_type, setBusiness_type ] = useState('');
    const [board_phone, setBoard_phone ] = useState('');
    const [detailAddress, setDetailAddress] = useState("");
    const [zipCode, setZipcode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [jibunAddress, setJibunAddress] = useState("");
    const [localLat, setLocalLat] = useState("");
    const [localLng, setLocalLng] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [selectedPark, setSelectedPark] = useState(null); // 제공서비스 - 주차
    const [selectedReserve, setSelectedReserve] = useState(null); // 제공서비스 - 예약
    const [selectedPack, setSelectedPack] = useState(null); // 제공서비스 - 포장
    const [selectedDelivery, setSelectedDelivery ] = useState(null); // 제공서비스 - 배달
    const [selectedPet, setSelectedPet ] = useState(null); // 제공서비스 - 반려동물
    const [selectedWifi, setSelectedWifi ] = useState(null); // 제공서비스 - wifi


    const { kakao } = window;

    const completeHandler = (data) =>{
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.address, (result, status) => {
            setLocalLat(result[0].y) // 위도
            setLocalLng(result[0].x) // 경도
        });
        setZipcode(data.zonecode); //우편번호
        setRoadAddress(data.roadAddress + ' ' + data.buildingName); // 도로명주소
        if(data.userSelectedType === 'R'){ // 검색 결과에서 사용자가 선택한 주소의 타입이 도로명인경우
            setJibunAddress(data.autoJibunAddress.replace(data.sido,'').replace(data.sigungu, '').trim()); // 지번주소
        }else if(data.userSelectedType === 'J'){ // 검색 결과에서 사용자가 선택한 주소의 타입이 지번인경우
            setJibunAddress(data.jibunAddress.replace(data.sido,'').replace(data.sigungu, '').trim()); // 지번주소
        }
        if(data.autoJibunAddress === '') {
            setJibunAddress(data.jibunAddress.replace(data.sido,'').replace(data.sigungu, '').trim()); // 지번주소
        }
        setIsModalOpen(false);
    }

    // 우편 Modal 스타일
    const postStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
        },
        content: {
            width: "500px",
            height: "600px",
            margin: 'auto',
            WebkitOverflowScrolling: 'touch',
            position: 'absolute',
            border: '1px solid rgb(248, 179, 60)',
            background: '#fff',
            overflow: 'full',
            borderRadius: '10px',
            outline: 'none',
            padding: '20px'
        },
    };
    // 제공서비스 Modal 스타일
    const serviceStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
        },
        content: {
            width: "400px",
            height: "600px",
            margin: 'auto',
            WebkitOverflowScrolling: 'touch',
            position: 'absolute',
            border: '1px solid rgb(248, 179, 60)',
            background: '#fff',
            borderRadius: '10px',
            overflow: 'visible',
            outline: 'none',
            padding: '20px'
        },
    };

    // 검색 클릭
    const addressToggle = () =>{
        setIsModalOpen(!isModalOpen);
    }
    //  우편번호 event
    const zip_code = (e) =>{
        setZipcode(e.target.value);
    }
    // 도로명주소 event
    const road_address = (e) =>{
        setRoadAddress(e.target.value);
    }
    // 지번주소 event
    const jibun_address = (e) =>{
        setJibunAddress(e.target.value);
    }
    // 상세 주소검색 event
    const isDetail_address = (e) =>{
        setDetailAddress(e.target.value);
    }
    // 주소 위도 event
    const localLat_address = (e) =>{
        setLocalLat(e.target.value);
    }
    // 주소 경도 event
    const localLng_address = (e) =>{
        setLocalLng(e.target.value);
    }
    const addressModalClose = () => {
        setIsModalOpen(false);
    }
    // 제공서비스 모달 열기
    const ServiceModalOpen = () => {
        setIsServiceModalOpen(true);
    }
    // 제공서비스 모달 닫기
    const serviceModalClose = () => {
        setIsServiceModalOpen(false);
        setSelectedPark(null);
        setSelectedReserve(null);
        setSelectedPack(null);
        setSelectedDelivery(null);
        setSelectedPet(null);
        setSelectedWifi(null);
    }
    const parkSelected = (event) => { // 제공서비스 - 주차
        setSelectedPark(event.target.value);
    };
    const reserveSelected = (event) => { // 제공서비스 - 예약
        setSelectedReserve(event.target.value);
    };
    const packSelected = (event) => { // 제공서비스 - 포장
        setSelectedPack(event.target.value);
        };
    const deliverySelected = (event) => { // 제공서비스 - 배달
        setSelectedDelivery(event.target.value);
    };
    const petSelected = (event) => { // 제공서비스 - 반려동물 출입
        setSelectedPet(event.target.value);
    };
    const wifiSelected = (event) => { // 제공서비스 - wifi
        setSelectedWifi(event.target.value);
    };

    const serviceCancel_btn = () => {
        serviceModalClose()
    }
    const serviceInsert_btn = () => {
        setIsServiceModalOpen(false);

    }
    const goCancel_btn = () => {
      if (confirm("등록을 취소하시겠습니까?")) {
          navigate("/");
      } else {
          return false;
      }
    }
    const goInsert_btn = () => {
      const board_member_id = localStorage.getItem('board_member_id');

      if(file_no === ''){
          alert('대표이미지를 입력해주세요.');
          return false;
      }
      if(board_name === ''){
          alert('맛집 이름을 입력해주세요.');
          return false;
      }
      if(business_type === ''){
          alert('업종을 입력해주세요.');
          return false;
      }
      if(roadAddress === ''){
          alert('맛집 주소를 입력해주세요.');
          return false;
      }
      if(board_phone === ''){
          alert('맛집 전화번호를 입력해주세요.');
          return false;
      }


      let param = {
          member_id : board_member_id,
          board_name : board_name,
          business_type : business_type,
          board_phone : board_phone,
          board_address : roadAddress,
          service_list : ' ' + selectedPark + ' ' + selectedReserve + ' ' + selectedPack + ' ' + selectedDelivery + ' ' + selectedPet + ' ' + selectedWifi,
          postcode : zipCode,
          detail_address : detailAddress,
          jibun_address : jibunAddress,
          file_no : '1',
          local_lat : localLat,
          local_lng : localLng,
      }
      axios.post('http://localhost:3300/board/addBoard', param).then(response => {
          alert("등록 되었습니다.");
          navigate("/");
      })
  }
    return (
        <>

            <div id={'board-insert-container'} className={style["board-insert-container"]}>
                <div id={'board-insert-wrapper'} className={style["board-insert-wrapper"]}>
                    <div>
                        <div className={style["board-insert-title"]}>DeliMap 정보입력</div>
                        <div className={style["board-insert-file"]}>
                            <label htmlFor="insert-file">사진<span>(대표이미지 1장을 입력해주세요)</span></label>
                            <input type="file" id="insert-file" className={[style['insert-file'], style['drag-disable']].join(' ')} accept="image/*"  value={file_no} onChange={(e) => setFile_no(e.target.value)}/>
                        </div>
                        <div className={style["board-insert-name"]}>
                            <label htmlFor="insert-name">맛집 이름</label>
                            <input type="text" id="insert-name" className={style["insert-name"]} autoComplete="off" placeholder="맛집 이름을 입력해주세요" value={board_name} onChange={(e) => setBoard_name(e.target.value)}/>
                        </div>
                        <div className={style["board-insert-business-type"]}>
                            <label htmlFor="insert-business-type">업종</label>
                            <input type={'text'} id="insert-business-type" className={style["insert-business-type"]} autoComplete="off" placeholder="업종을 입력해주세요" value={business_type} onChange={(e) => setBusiness_type(e.target.value)}></input>
                        </div>
                        <div className={style["board-insert-address"]}>
                            <label>맛집 주소</label>
                            <br/>
                            <input value={zipCode} readOnly placeholder="우편번호" className={style['zip-code']} onChange={zip_code} />
                            <button onClick={addressToggle} className={style['address-toggle']}>우편번호 검색</button>
                            <br/>
                            <input value={roadAddress} readOnly placeholder="주소" className={style['road-address']} onChange={road_address} />
                            <input value={jibunAddress} type={"hidden"} className={style['jibun-address']} onChange={jibun_address} />
                            <input value={localLat} type={"hidden"} onChange={localLat_address} />
                            <input value={localLng} type={"hidden"} onChange={localLng_address} />
                            <br/>
                            <Modal isOpen={isModalOpen} ariaHideApp={false} style={postStyles}>
                                <div className={style['address-modal-close']} onClick={addressModalClose}><span> X 닫기</span></div>
                                <DaumPostcode onComplete={completeHandler} style={{height: '90%'}}/>
                            </Modal>
                            <input type="text" onChange={isDetail_address} value={detailAddress} placeholder="상세주소(동, 층, 호)" autoComplete="off" className={style['detail-address']}/>
                            <br/>
                        </div>
                        <div className={style["board-insert-phone"]}>
                            <label htmlFor="insert-phone">맛집 전화번호</label>
                            <input type="text" id="insert-phone" className={style["insert-phone"]} maxLength="13"
                                   autoComplete="off" placeholder="맛집 전화번호를 입력해주세요" value={board_phone}
                                   onChange={(e) => setBoard_phone(e.target.value)}/>
                        </div>
                        <div className={style["board-insert-service"]}>
                            <span className={style["insert-service"]}>제공 서비스</span>
                            <label>
                                <span className={style['insert-service-img']}><img src={'/src/assets/icons8-checked-checkbox-50.png'} alt={'제공서비스'}/></span>
                                <span className={style['service-choice']} onClick={ServiceModalOpen}>선택</span>
                            </label>
                            <span className={style['service-list']}>
                                {selectedPark === '유료주차' || selectedPark === '무료주차' ?
                                    <span>주차<img src={'/src/assets/icons8-done-24.png'} alt={'확인'}/></span> : null}
                                {selectedReserve === '예약가능' ?
                                    <span>예약<img src={'/src/assets/icons8-done-24.png'} alt={'확인'}/></span> : null}
                                {selectedPack === '포장가능' ? <span>포장<img src={'/src/assets/icons8-done-24.png'} alt={'확인'}/></span> : null}
                                {selectedDelivery === '배달가능' ?
                                    <span>배달<img src={'/src/assets/icons8-done-24.png'} alt={'확인'}/></span> : null}
                                {selectedPet === '반려동물 출입 가능' ?
                                    <span>반려동물<img src={'/src/assets/icons8-done-24.png'} alt={'확인'}/></span> : null}
                                {selectedWifi === 'wifi' ?
                                    <span>wifi<img src={'/src/assets/icons8-done-24.png'} alt={'확인'}/></span> : null}
                                {selectedPark === '' && selectedReserve === '' && selectedPack === '' && selectedDelivery === '' && selectedPet === '' && selectedWifi === '' ? '없음' : null}
                                </span>
                            <Modal isOpen={isServiceModalOpen} ariaHideApp={false} style={serviceStyles}>
                                <div className={style['service-modal-close']} onClick={serviceModalClose}><span> X 닫기</span></div>
                                <div className={style['service-title']}><span>제공 서비스</span></div>
                                <div>
                                    <div className={style['selected-park']}>
                                        <span>주차</span>
                                        <div>
                                            <input type="radio" id={'park-paid'} className={style['park-paid']} value="유료주차" checked={selectedPark === '유료주차'} onChange={parkSelected}/>
                                            <label htmlFor={'park-paid'}>유료</label>
                                            <input type="radio" id={'park-free'} className={style['park-free']} value="무료주차" checked={selectedPark === '무료주차'} onChange={parkSelected}/>
                                            <label htmlFor={'park-free'}>무료</label>
                                            <input type="radio" id={'park-impossibility'} className={style['park-impossibility']} value={''} checked={selectedPark === ''} onChange={parkSelected}/>
                                            <label htmlFor={'park-impossibility'}>불가</label>
                                        </div>
                                    </div>
                                    <div className={style['selected-reserve']}>
                                        <span>예약</span>
                                        <div>
                                            <input type="radio" id={'reserve-possibility'} className={style['reserve-possibility']} value="예약가능" checked={selectedReserve === '예약가능'} onChange={reserveSelected}/>
                                            <label htmlFor={'reserve-possibility'}>가능</label>
                                            <input type="radio" id={'reserve-impossibility'} className={style['reserve-impossibility']} value="" checked={selectedReserve === ''} onChange={reserveSelected}/>
                                            <label htmlFor={'reserve-impossibility'}>불가</label>
                                        </div>
                                    </div>
                                    <div className={style['selected-pack']}>
                                        <span>포장</span>
                                        <div>
                                            <input type="radio" id={'pack-possibility'} className={style['pack-possibility']} value="포장가능" checked={selectedPack === '포장가능'} onChange={packSelected}/>
                                            <label htmlFor={'pack-possibility'}>가능</label>
                                            <input type="radio" id={'pack-impossibility'} className={style['pack-impossibility']} value="" checked={selectedPack === ''} onChange={packSelected}/>
                                            <label htmlFor={'pack-impossibility'}>불가</label>
                                        </div>
                                    </div>
                                    <div className={style['selected-delivery']}>
                                        <span>배달</span>
                                        <div>
                                            <input type="radio" id={'delivery-possibility'} className={style['delivery-possibility']} value="배달가능" checked={selectedDelivery === '배달가능'} onChange={deliverySelected}/>
                                            <label htmlFor={'delivery-possibility'}>가능</label>
                                            <input type="radio" id={'delivery-impossibility'} className={style['delivery-impossibility']} value="" checked={selectedDelivery === ''} onChange={deliverySelected}/>
                                            <label htmlFor={'delivery-impossibility'}>불가</label>
                                        </div>
                                    </div>
                                    <div className={style['selected-pet']}>
                                        <span>반려동물 출입</span>
                                        <div>
                                            <input type="radio" id={'pet-possibility'} className={style['pet-possibility']} value="반려동물 출입 가능" checked={selectedPet === '반려동물 출입 가능'} onChange={petSelected}/>
                                            <label htmlFor={'pet-possibility'}>가능</label>
                                            <input type="radio" id={'pet-impossibility'} className={style['pet-impossibility']} value="" checked={selectedPet === ''} onChange={petSelected}/>
                                            <label htmlFor={'pet-impossibility'}>불가</label>
                                        </div>
                                    </div>
                                    <div className={style['selected-wifi']}>
                                        <span>WIFI</span>
                                        <div>
                                            <input type="radio" id={'wifi-possibility'} className={style['wifi-possibility']} value="wifi" checked={selectedWifi === 'wifi'} onChange={wifiSelected}/>
                                            <label htmlFor={'wifi-possibility'}>있음</label>
                                            <input type="radio" id={'wifi-impossibility'} className={style['wifi-impossibility']} value="" checked={selectedWifi=== ''} onChange={wifiSelected}/>
                                            <label htmlFor={'wifi-impossibility'}>없음</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={style['service-btn']}>
                                    <span onClick={serviceCancel_btn} className={style['service-cancel-btn']}>취소</span>
                                    <span onClick={serviceInsert_btn} className={style['service-insert-btn']}>완료</span>
                                </div>
                            </Modal>
                        </div>
                        <div className={style["go-btn"]}>
                            <button onClick={goCancel_btn} className={style["go-cancel-btn"]}>취소</button>
                            <button onClick={goInsert_btn} className={style["go-insert-btn"]}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardInsert