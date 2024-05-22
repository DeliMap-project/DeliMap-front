import '/src/styles/board/BoardInsert.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useState} from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
const BoardInsert = () => {

    const navigate = useNavigate();
    const [file_no, setFile_no ] = useState('');
    const [board_name, setBoard_name ] = useState('');
    const [board_content, setBoard_content ] = useState('');
    const [board_phone, setBoard_phone ] = useState('');
    const [board_corporateNum, setBoard_corporateNum ] = useState('');
    const [detailAddress, setDetailAddress] = useState("");
    const [zipCode, setZipcode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [jibunAddress, setJibunAddress] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const completeHandler = (data) =>{
        console.log(data)
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

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
        },
        content: {
            width: "500px",
            height: "600px",
            margin: 'auto',
            WebkitOverflowScrolling: 'touch',
            position: 'absolute',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'full',
            borderRadius: '10px',
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
    const addressModalClose = () => {
        setIsModalOpen(false);
    }
  const goCancel_btn = () => {
      if (confirm("등록을 취소하시겠습니까?")) {
          navigate("/");
      } else {
          return false;
      }
  }
  const goInsert_btn = () => {
      const member_id = localStorage.getItem('member_id');

      if(file_no === ''){
          alert('대표이미지를 입력해주세요.');
          return false;
      }
      if(board_name === ''){
          alert('맛집 이름을 입력해주세요.');
          return false;
      }
      if(board_content === ''){
          alert('맛집 설명을 입력해주세요.');
          return false;
      }
      if(roadAddress === ''){
          alert('맛집 주소를 입력해주세요.');
          return false;
      }
      if(detailAddress === ''){
          alert('상세 주소를 입력해주세요.');
          return false;
      }
      if(board_phone === ''){
          alert('맛집 전화번호를 입력해주세요.');
          return false;
      }
      if(board_corporateNum === ''){
          alert('사업자번호를 입력해주세요.');
          return false;
      }

      let param = {
          member_id : member_id,
          board_name : board_name,
          board_content : board_content,
          board_phone : board_phone,
          board_address : roadAddress,
          corporateNum : board_corporateNum,
          postcode : zipCode,
          detail_address : detailAddress,
          jibun_address : jibunAddress,
          file_no : '1',
      }
      axios.post('http://localhost:3300/board/addBoard', param).then(response => {
          alert("등록 되었습니다.");
          navigate("/");
      })
  }
    return (
        <>
            <div className="boardInsert_container">
                <div className="boardInsert_wrapper">
                    <div className="tasty_info">
                        <div className="mainTitle">DeliMap 정보입력</div>
                        <div className="tasty_file">
                            <label htmlFor="insert_file">사진<span>(대표이미지 1장을 입력해주세요)</span></label>
                            <input type="file" id="insert_file" className="insert_file drag-disable" accept="image/*"  value={file_no} onChange={(e) => setFile_no(e.target.value)}/>
                        </div>
                        <div className="tasty_title">
                            <label htmlFor="insert_name">맛집 이름</label>
                            <input type="text" id="insert_name" className="insert_name" autoComplete="off" placeholder="맛집 이름을 입력해주세요" value={board_name} onChange={(e) => setBoard_name(e.target.value)}/>
                        </div>
                        <div className="tasty_content">
                            <label htmlFor="insert_content">맛집 설명</label>
                            <textarea id="insert_content" className="insert_content" autoComplete="off" placeholder="맛집 설명을 입력해주세요" value={board_content} onChange={(e) => setBoard_content(e.target.value)}></textarea>
                        </div>
                        <div className="tasty_address">
                            <label>맛집 주소</label>
                            <br/>
                            <input value={zipCode} readOnly placeholder="우편번호" className={'zipCode'} onChange={zip_code} />
                            <button onClick={addressToggle} className={'addressToggle'}>우편번호 검색</button>
                            <br/>
                            <input value={roadAddress} readOnly placeholder="주소" className={'roadAddress'} onChange={road_address} />
                            <input value={jibunAddress} type={"hidden"} className={'jibunAddress'} onChange={jibun_address} />
                            <br/>
                            <Modal isOpen={isModalOpen} ariaHideApp={false} style={customStyles}>
                                <div className={'addressModalClose'} onClick={addressModalClose}><span> X 닫기</span>
                                </div>
                                <DaumPostcode onComplete={completeHandler} style={{height: '90%'}}/>
                            </Modal>
                            <input type="text" id={'insert_address'} onChange={isDetail_address} value={detailAddress} placeholder="상세주소" autoComplete="off" className={'detailAddress'}/>
                            <br/>
                        </div>
                        <div className="tasty_phone">
                            <label htmlFor="insert_phone">맛집 전화번호</label>
                            <input type="text" id="insert_phone" className="insert_phone" maxLength="13"
                                   autoComplete="off" placeholder="맛집 전화번호를 입력해주세요" value={board_phone}
                                   onChange={(e) => setBoard_phone(e.target.value)}/>
                        </div>
                        <div className="tasty_num">
                            <label htmlFor="insert_num">사업자 번호</label>
                            <input type="text" id="insert_num" className="insert_num" autoComplete="off"
                                   placeholder="사업자 번호를 입력해주세요" value={board_corporateNum}
                                   onChange={(e) => setBoard_corporateNum(e.target.value)}/>
                        </div>
                        <div className="goInsert">
                            <button onClick={goCancel_btn} className="goCancel_btn">취소</button>
                            <button onClick={goInsert_btn} className="goInsert_btn">등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardInsert