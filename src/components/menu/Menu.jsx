import React, {Component} from 'react';
import BoardListModal from '/src/components/board/BoardList.jsx'
import '/src/styles/menu/Menu.css';
import axios from "axios";
import boardInsert from "/src/components/board/BoardInsert.jsx";
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    const onboardInsert = () => {
        navigate("/BoardInsert");
    }
    const login = () => {
        navigate("/Login");
    }
        return (

            <div>
                <div className="menu-btns">
                    <div className="btns-wrapper">
                        <button className="btn-border active">지도</button>
                        <button className="btn-border">소개</button>
                        <button className="btn-border">게시판</button>
                        <button className="btn-border">채팅</button>
                        <button className="btn-border">내정보수정</button>
                        <button className="btn-border" onClick={onboardInsert}>맛집추가</button>
                        <button className="btn-border" onClick={login}>로그인< /button>

                    </div>
                </div>
                <BoardListModal/>
            </div>
        )
}


export default Menu;