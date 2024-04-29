import BoardDetail from "./BoardDetail.jsx";
import '/src/styles/board/BoardList.css'    ;
import {useState, useEffect } from "react";
import axios from "axios";
const BoardList = () => {
    const [isActive, setIsActive, isDetail, setIsDetail ] = useState(false);
    const [ isDetail1 ] = useState(true);
    const [board_list, setBoardList] = useState([]);

    const handleClick = () => {
        setIsActive(!isActive);
    };
    const detailClick = () =>{
        setIsDetail(!isDetail);

    };
    useEffect(() => {
        axios.post('http://localhost:3300/board/list')
            .then(response => {
                setBoardList(response.data);
            });
    }, []);
        return (
            <>
                    <div className={'modal-mask ' +  (isActive ? 'animated-button' : 'normal-button')}>
                        <div className="modal-wrapper">
                            <div className="modal-x drag-disable">
                                <span onClick={handleClick}>
                                    {isActive ? <img className='toggle_open' src={'src/assets/icons8-back-64.png'} alt={'열기'}/> :
                                        <img className='toggle_close' src={'src/assets/icons8-forward-64.png'} alt={'닫기'}/>}
                                </span>
                            </div>
                            <div className="modal-container">
                                <div className="modal-header">
                                    <div className="board_local">영등포구 여의도동</div>
                                    <slot name="header">
                                        <div className="board_list">
                                            {board_list.map(boardList => {
                                                return (
                                                    <div key={boardList.board_no}>
                                                        <div className="board_list_name" onClick={detailClick}>{boardList.board_name}</div>
                                                        <div className="board_list_content">{boardList.board_content}</div>
                                                        <div className="board_list_phone">{boardList.board_phone}</div>
                                                        <div className="board_list_review">리뷰 : {boardList.review_cnt}</div>
                                                        <div className="board_list_hashtag">{boardList.review_hashtag}</div>
                                                        <div className="board_list_img"><img src="/src/assets/고양이1.jpg" alt="이미지"/></div>
                                                        <hr className="list_hr"/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                {isDetail ? <BoardDetail /> : null}
            </>
        )
}

// const aa = async () => {
//     const res = await axios.post('http://localhost:3300/board/list');
//     this.board_list = res.data;
//     console.log('board_list : ', this.board_list)
// }
export default BoardList
