import '/src/styles/board/BoardUpdate.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const BoardUpdate = () => {

    const [update_file_no, setUpdate_file_no ] = useState('');
    const [update_board_name, setUpdate_board_name ] = useState('');
    const [update_board_content, setUpdate_board_content ] = useState('');
    const [update_board_address, setUpdate_board_address ] = useState('');
    const [update_board_phone, setUpdate_board_phone ] = useState('');
    const [update_board_list, setUpdate_board_list ] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:3300/board/detail')
            .then(response => {
                setUpdate_board_list(response.data);
                const updateBoard = response.data
                updateBoard.board_no = updateBoard[0].board_no;
                updateBoard.board_name = updateBoard[0].board_name;
                updateBoard.board_content = updateBoard[0].board_content;
                updateBoard.board_phone = updateBoard[0].board_phone;
                updateBoard.board_address = updateBoard[0].board_address;
            });
    }, []);
  const updateGoCancel_btn = () => {
      if (confirm("수정을 취소하시겠습니까?")) {
          navigate("/");
      } else {
          return false;
      }
  }
  const goUpdate_btn = () => {
      const member_id = localStorage.getItem('member_id');
      const board_no = localStorage.getItem('board_no');


      if(update_file_no === ''){
          alert('대표이미지를 입력해주세요.');
          return false;
      }
      if(update_board_name === ''){
          alert('맛집 이름을 입력해주세요.');
          return false;
      }
      if(update_board_content === ''){
          alert('맛집 설명을 입력해주세요.');
          return false;
      }
      if(update_board_address === ''){
          alert('맛집 주소를 입력해주세요.');
          return false;
      }
      if(update_board_phone === ''){
          alert('맛집 전화번호를 입력해주세요.');
          return false;
      }

      let param = {
          board_name : update_board_name,
          board_content : update_board_content,
          board_phone : update_board_phone,
          board_address : update_board_address,
          board_no : board_no,
      }
      axios.post('http://localhost:3300/board/updateBoard', param).then(response => {
          alert("수정 되었습니다.");
          navigate("/");
      })
  }
    return (
        <>
            <div className="boardUpdate_container">
                <div className="boardUpdate_wrapper">
                    <div className="updateTasty_info">
                        <div className="updateMainTitle">DeliMap 정보수정</div>
                        <div className="updateTasty_file">
                            <label htmlFor="update_file">사진<span>(대표이미지 1장을 입력해주세요)</span></label>
                            <input type="file" id="update_file" className="update_file drag-disable" accept="image/*"  value={update_file_no} onChange={(e) => setUpdate_file_no(e.target.value)}/>
                        </div>
                        <div className="updateTasty_title">
                            <label htmlFor="update_name">맛집 이름</label>
                            <input type="text" id="update_name" className="update_name" autoComplete="off" value={update_board_list.board_name} onChange={(e) => setUpdate_board_name(e.target.value)}/>
                        </div>
                        <div className="updateTasty_content">
                            <label htmlFor="update_content">맛집 설명</label>
                            <textarea id="update_content" className="update_content" autoComplete="off" placeholder="맛집 설명을 입력해주세요" value={update_board_content} onChange={(e) => setUpdate_board_content(e.target.value)}></textarea>
                        </div>
                        <div className="updateTasty_address">
                            <label htmlFor="update_address">맛집 주소</label>
                            <input type="text" id="update_address" className="update_address" autoComplete="off" placeholder="맛집 주소를 입력해주세요" value={update_board_address} onChange={(e) => setUpdate_board_address(e.target.value)}/>
                        </div>
                        <div className="updateTasty_phone">
                            <label htmlFor="update_phone">맛집 전화번호</label>
                            <input type="text" id="update_phone" className="update_phone" maxLength="13" autoComplete="off" placeholder="맛집 전화번호를 입력해주세요" value={update_board_phone} onChange={(e) => setUpdate_board_phone(e.target.value)}/>
                        </div>
                        <div className="goUpdate">
                            <button onClick={updateGoCancel_btn} className="updateGoCancel_btn">취소</button>
                            <button onClick={goUpdate_btn} className="goUpdate_btn">수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardUpdate