import '/src/styles/board/BoardInsert.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

const BoardInsert = () => {

    const [file_no, setFile_no ] = useState('');
    const [board_name, setBoard_name ] = useState('');
    const [board_content, setBoard_content ] = useState('');
    const [board_address, setBoard_address ] = useState('');
    const [board_phone, setBoard_phone ] = useState('');
    const [board_corporateNum, setBoard_corporateNum ] = useState('');

    const navigate = useNavigate();

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
      if(board_address === ''){
          alert('맛집 주소를 입력해주세요.');
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
          board_address : board_address,
          corporateNum : board_corporateNum,
          img : file_no
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
                            <label htmlFor="insert_address">맛집 주소</label>
                            <input type="text" id="insert_address" className="insert_address" autoComplete="off" placeholder="맛집 주소를 입력해주세요" value={board_address} onChange={(e) => setBoard_address(e.target.value)}/>
                        </div>
                        <div className="tasty_phone">
                            <label htmlFor="insert_phone">맛집 전화번호</label>
                            <input type="text" id="insert_phone" className="insert_phone" maxLength="13" autoComplete="off" placeholder="맛집 전화번호를 입력해주세요" value={board_phone} onChange={(e) => setBoard_phone(e.target.value)}/>
                        </div>
                        <div className="tasty_num">
                            <label htmlFor="insert_num">사업자 번호</label>
                            <input type="text" id="insert_num" className="insert_num" autoComplete="off" placeholder="사업자 번호를 입력해주세요" value={board_corporateNum} onChange={(e) => setBoard_corporateNum(e.target.value)}/>
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