import '/src/styles/board/BoardList.css';
const BoardList = () => {
        return (
            <>
                <div>게시판 리스트</div>
                <teleport to="body">
                    <div className="modal-mask">
                        <div className="modal-wrapper">
                            <div className="modal-x drag-disable">
                                <span>X</span>
                            </div>
                            <div className="modal-container">
                                <div className="modal-header">
                                    <div className="board_local">영등포구 여의도동</div>
                                    <slot name="header">
                                        <div className="board_list">
                                            <div className="board_list_name">
                                            </div>
                                            <div className="board_list_content" id="board_list_content"></div>
                                            <div className="board_list_phone"></div>
                                            <div className="board_list_review">리뷰 :</div>
                                            <div className="board_list_hashtag">
                                                <span></span>
                                            </div>
                                            <div className="board_list_img">
                                            </div>
                                            <hr className="list_hr"/>
                                        </div>
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </teleport>
            </>
        )
}
// const aa = async () => {
//     const res = await axios.post('http://localhost:3300/board/list');
//     this.board_list = res.data;
//     console.log('board_list : ', this.board_list)
// }
export default BoardList
