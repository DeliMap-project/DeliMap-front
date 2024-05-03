import BoardDetail from "./BoardDetail.jsx";
import '/src/styles/board/HashTagList.css';
import {useState, useEffect } from "react";
import axios from "axios";
import ReviewInsert from "./ReviewInsert.jsx";
const HashTagList = () => {
    const [isDetail, setIsDetail ] = useState(false);
    const [isList, setIsList ] = useState(false);
    const [isListAll, setIsListAll ] = useState(false);
    const [hashtag_list, setHashtagList] = useState([]);

    const boardToggle = () => {
        setIsList(false);
    };
    const boardAllToggle = () => {
        setIsListAll(false);
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

    useEffect( () => {
        const review_hashtag = localStorage.getItem('review_hashtag');
        let param = {
            review_hashtag: '%' + review_hashtag + '%',
        }
        axios.post('http://localhost:3300/board/hashtaglist', param)
            .then(response => {
                setHashtagList(response.data);
            });
    }, []);
        return (
            <>
                <div className={isListAll ? 'animatedAll' : 'normalAll'}>
                    <div className={'hashTagList_modal-mask ' + (isList ? 'animated-button' : 'normal-button')}>
                        <div className="hashTagList_modal-wrapper">
                            {isDetail ?
                                <div className="hashTagList_modalAll-x drag-disable">
                                <span onClick={boardAllToggle}>
                                    {isListAll ?
                                        <img className='toggle_open' src={'src/assets/icons8-back-64.png'} alt={'열기'}/> :
                                        <img className='detail_open' src={'src/assets/icons8-forward-64.png'} alt={'닫기'}/> }
                                </span>
                                </div>
                                :
                                <div className="hashTagList_modal-x drag-disable">
                            <span onClick={boardToggle}>
                                {isList ?
                                    <img className='toggle_open' src={'src/assets/icons8-back-64.png'} alt={'열기'}/> :
                                    <img className='toggle_close' src={'src/assets/icons8-forward-64.png'} alt={'닫기'}/>}
                            </span>
                                </div>}
                            <div className="hashTagList_modal-container">
                                <div className="hashTagList_modal-header">
                                    <div className="board_local">영등포구 여의도동1</div>
                                    <slot name="header">
                                        <div className="board_list">
                                            {hashtag_list.map(hashtagList => {
                                                return (
                                                    <div className={'board_list_wrap'} key={hashtagList.board_no}>
                                                        <div className="board_list_name">
                                                            <span onClick={() => boardDetail(hashtagList.board_no)}>{hashtagList.board_name}</span>
                                                        </div>
                                                        <div className="board_list_content">{hashtagList.board_content}</div>
                                                        <div className="board_list_phone">{hashtagList.board_phone}</div>
                                                        <div className="board_list_review">리뷰 : {hashtagList.review_cnt}</div>
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
            </>
        )
}

export default HashTagList
