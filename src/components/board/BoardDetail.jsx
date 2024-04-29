import '/src/styles/board/BoardDetail.css';
import {useState, useEffect} from "react";
import axios from "axios";

const BoardDetail = () => {
    const [isDetail, setIsDetail ] = useState([]);
    const [isDisplay, setIsDisplay ] = useState(false);

    const close = () => {
        setIsDisplay(!isDisplay);
    }
    useEffect( () => {
        const board_no = localStorage.getItem('board_no');
        let param = {
            board_no: board_no,
        }
         axios.post('http://localhost:3300/board/detail', param).then(response => {
            setIsDetail(response.data);
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
            <div className={'detail-container ' + (isDisplay ? 'display-none' : 'display-block')}>
                <div className={'detail-wrapper'}>
                    <div className={'modal-close'} onClick={close}><span>X</span></div>
                    <div>
                        {
                            <>
                                <div>board_no : {isDetail.board_no}</div>
                                <div>board_name : {isDetail.board_name}</div>
                                <div>board_content : {isDetail.board_content}</div>
                                <div>board_phone : {isDetail.board_phone}</div>
                                <div>board_address : {isDetail.board_address}</div>
                                <div>board_readcnt : {isDetail.board_readcnt}</div>
                                <div>review_score : {isDetail.review_score}</div>
                            </>
                        }
                    </div>
                </div>
            </div>

        </>
    )

}


export default BoardDetail
