import React, {Component} from 'react';
import BoardListModal from '/src/components/board/BoardList.jsx'
import '/src/styles/menu/Menu.css';
import axios from "axios";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { // vue에서 data() - return{} 역할
            board_list: [],
        };
    }

    async componentDidMount() { // vue에서 Mounted역할
        console.log('Component mounted!');
        // 마운팅 후 실행되는 코드
    }

    render() {
        return (

            <div>
                <div className="menu-btns">
                    <div className="btns-wrapper">
                        <button className="btn-border active">지도</button>
                        <button className="btn-border">소개</button>
                        <button className="btn-border" onClick={onBoardList}>게시판</button>
                        <button className="btn-border">채팅</button>
                        <button className="btn-border">내정보수정</button>
                        <button className="btn-border">맛집추가</button>
                        <button className="btn-border"> 로그인(임시)< /button>
                    </div>
                </div>
                <BoardListModal/>
            </div>
        )
    }
}

function onBoardList() {
    alert('클릭');
}

export default Menu;