import React, {Component} from 'react';
import BoardListModal from '/src/components/board/BoardList.jsx'
import '/src/styles/menu/Menu.css';
import axios from "axios";
import boardInsert from "/src/components/board/BoardInsert.jsx";
import {useNavigate} from "react-router-dom";
import BoardList from "/src/components/board/BoardList.jsx";

const Menu = () => {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('isLogin');

    const onboardInsert = () => {
        if(isLogin) {
            navigate("/BoardInsert");
        }else {
            alert('로그인 후 이용이 가능합니다.')
            return false;
        }
    }
    const login = () => {
        navigate("/Login");
    }
    const logout = () => {
        window.localStorage.removeItem('member_id');
        window.localStorage.removeItem('isLogin');
        location.reload();
    }
    const home = () => {
            location.reload()
    }
        return (

            <div>
                <div className="menu-btns">
                    <div className="btns-wrapper">
                        <ul>
                            <li className={'active'}>
                                {/*<img src={'/src/assets/icons8-home-64.png'} alt={'홈'}/>*/}
                                <button className="btn-border" onClick={home}>홈</button>
                            </li>
                            <li>
                                <button className="btn-border">게시판</button>
                            </li>
                            <li>
                                <button className="btn-border">채팅</button>
                            </li>
                            <li>
                                <button className="btn-border">저장</button>
                            </li>
                            <li>
                                <button className="btn-border" onClick={onboardInsert}>맛집추가</button>
                            </li>
                            <li>
                                {isLogin ?
                                    <button className="btn-border" onClick={logout}>로그아웃< /button> :
                                    <button className="btn-border" onClick={login}>로그인< /button>
                                }
                            </li>
                                <button className="btn-border">더보기</button>
                            <li>

                            </li>
                        </ul>


                    </div>
                </div>
            </div>
        )
}


export default Menu;