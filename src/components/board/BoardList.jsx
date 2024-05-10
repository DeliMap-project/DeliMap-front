import BoardDetail from "./BoardDetail.jsx";
import '/src/styles/board/BoardList.css';
import {useState, useEffect } from "react";
import axios from "axios";
import ReviewInsert from "./ReviewInsert.jsx";
import HashTagList from "./HashTagList.jsx";
const BoardList = () => {
    const [isDetail, setIsDetail ] = useState(false);
    const [isList, setIsList ] = useState(false);
    const [isListAll, setIsListAll ] = useState(false);
    const [board_list, setBoardList] = useState([]);
    const [hashtag_boardList, setHashtagList] = useState(false);
    const [hashtag_detailList, setHashtag_detailList] = useState(false);
    const isLogin = localStorage.getItem('isLogin');

    const boardToggle = () => {
        setIsList(!isList);
    };
    const boardAllToggle = () => {
        setIsListAll(!isListAll);
    };
    const boardDetail = (board_no) => {
        // setIsDetail((isDetail) => !isDetail);
        localStorage.setItem('board_no', board_no);
        setTimeout(() => {
            setIsDetail(true); // 토글 기능을 다시 수행
        }, 100);
        setIsDetail(false); // 토글 기능을 다시 수행
    };
    const closeDetail =() => {
        setIsDetail(false);
    }

    useEffect(() => {
        axios.post('http://localhost:3300/board/list')
            .then(response => {
                setBoardList(response.data);
            });
    }, []);
    useEffect(() => {
        const member_id = localStorage.getItem('member_id');

        let param = {
            member_id: member_id
        }
        axios.post('http://localhost:3300/member/orderMember', param)
            .then(response => {
                { isLogin ?
                localStorage.setItem('member_nickname', response.data[0].member_nickname)
                    : null }
            });
    }, []);
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
                {hashtag_boardList ? <HashTagList/>
                :

                <div className={isListAll ? 'animatedAll' : 'normalAll'}>
                    <div id={'modal-mask'} className={'modal-mask ' + (isList ? 'animated-button' : 'normal-button')}>
                        <div className="modal-wrapper">
                            {isDetail ?
                                <div className="modalAll-x drag-disable">
                                <span onClick={boardAllToggle}>
                                    {isListAll ?
                                        <img className='toggle_open' src={'src/assets/icons8-back-64.png'} alt={'열기'}/> :
                                        <img className='detail_open' src={'src/assets/icons8-forward-64.png'} alt={'닫기'}/> }
                                </span>
                                </div>
                                :
                                <div className="modal-x drag-disable">
                            <span onClick={boardToggle}>
                                {isList ?
                                    <img className='toggle_open' src={'src/assets/icons8-back-64.png'} alt={'열기'}/> :
                                    <img className='toggle_close' src={'src/assets/icons8-forward-64.png'} alt={'닫기'}/>}
                            </span>
                                </div>}
                            <div className="modal-container">
                                <div className="modal-header">
                                    <div className="board_local">영등포구 여의도동</div>
                                    <slot name="header">
                                        <div className="board_list">
                                            {board_list.map(boardList => {
                                                return (
                                                    <div className={'board_list_wrap'} key={boardList.board_no}>
                                                        <div className="board_list_name">
                                                            <span onClick={() => boardDetail(boardList.board_no)}>{boardList.board_name}</span>
                                                        </div>
                                                        <div className="board_list_content">{boardList.board_content}</div>
                                                        <div className="board_list_phone">{boardList.board_phone}</div>
                                                        <div className="board_list_review">리뷰 : {boardList.review_cnt}</div>
                                                        <div className="board_list_hashtag">
                                                            {/*<span>{boardList.review_hashtag}</span>*/}
                                                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[0])}>{boardList.review_hashtag.split(', ')[0]}</span>
                                                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[1])}>{boardList.review_hashtag.split(', ')[1]}</span>
                                                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[2])}>{boardList.review_hashtag.split(', ')[2]}</span>
                                                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[3])}>{boardList.review_hashtag.split(', ')[3]}</span>
                                                            <span onClick={() => hashtagBoardList(boardList.review_hashtag.split(', ')[4])}>{boardList.review_hashtag.split(', ')[4]}</span>
                                                        </div>
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
                    {isDetail && <BoardDetail onClose={closeDetail}/>}
                </div>
                }
            </>
        )
}

export default BoardList
