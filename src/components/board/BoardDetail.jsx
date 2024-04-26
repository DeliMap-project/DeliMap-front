import '/src/styles/board/BoardDetail.css';
import {useState, useEffect} from "react";
import axios from "axios";

const BoardDetail = () => {
    const [board_list, setBoardList] = useState([]);

    return (
        <>

            <div className='modal-mask'>
                <div className="modal-wrapper">
                    <div className="modal-x drag-disable">
                        <span onClick="closeModal">X</span>
                    </div>
                    <div className="modal-container">
                        <div className="modal-header">
                            <slot name="header">
                                <div className="board_wrapper">
                                    <div className="board_image">
                                        <img src="/src/assets/고양이1.jpg" alt="사진"/>
                                    </div>
                                </div>
                                <div className="board_title">
                                    <span>식당이름</span>
                                </div>
                                <div className="board_content">
                                    <span>식당소개</span>
                                </div>
                                <div className="board_score">
                                    <label>
                                        <span className="board_score_left">
                                            {/*<img src="src/assets/free-icon-save-instagram-5662990.png" v-show="showNotSave"*/}
                                              {/*     onClick="showNotSave = false; showIsSave = true" alt="저장" title="저징"/>*/}
                                              {/*<img src="src/assets/free-icon-save-instagram-5668020.png" v-show="showIsSave"*/}
                                              {/*     onClick="showNotSave = true; showIsSave = false" alt="저장" title="저장"/>*/}
                                            <span className="board_share" onClick="copyUrl">
                                              <img src="src/assets/icons8-share-24.png" alt="공유하기" title="공유하기"/>
                                            </span>
                                        </span>
                                        <span className="board_score_right">
                                          <label>
                                              <img src='src/assets/icons8-binstar-48.png' alt={'별점'}/>
                                              <img src='src/assets/icons8-binstar-48.png' alt={'별점'}/>
                                              <img src='src/assets/icons8-binstar-48.png' alt={'별점'}/>
                                              <img src='src/assets/icons8-binstar-48.png' alt={'별점'}/>
                                              <img src='src/assets/icons8-binstar-48.png' alt={'별점'}/>
                                              {/*<span v-if="review_score>=1">리뷰점수</span>*/}
                                              <span className="notScore">0점</span>
                                          </label>
                                        </span>
                                    </label>
                                </div>
                                <div className="board_address">
                                    <img src="src/assets/icons8-map-marker-24.png" alt="주소"/>
                                    <span>주소<button className="addressCopy" onClick="copyAddress">복사</button></span>
                                </div>
                                <div className="board_phone">
                                    <img src="src/assets/icons8-phone-24.png" alt="전화 번호"/>
                                    <span>전화번호</span>
                                </div>
                                <div className="board_review">
                                    <button className="board_review_btn"
                                            onClick="reviewModal = true; boardModal = false;">리뷰 쓰기
                                    </button>
                                </div>

                                <div className="borderLine"/>

                            </slot>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )

}
export default BoardDetail
