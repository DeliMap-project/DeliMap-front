import '/src/styles/member/Login.css';
import {useNavigate} from "react-router-dom";
import IdFind from "./IdFind.jsx";


const Login = () => {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }
    const joinPage = () => {
        navigate("/Join");
    }
    const IdFindPage = () => {
        navigate("/IdFind");
    }
    const PwFindPage = () => {
        navigate("/PwFind");
    }
    return (
        <>
            <div className="login_container">
                <div className="login_wrapper">
                    <div className="login-top">
                        <span onClick={home}>DeliMap</span>
                    </div>
                    <div className="login-bottom">
                        <div className="login-id">
                            <input type="text" className="login-neccessary" placeholder="아이디" autoComplete='off' maxLength={12}/>
                        </div>
                        <div className="login-pw">
                            <input type="password" className="login-neccessary" placeholder="비밀번호" autoComplete='off'/>
                        </div>
                        <div className="login-btn">
                            <button>로그인</button>
                        </div>
                        <div className="login-save">
                            <label htmlFor="login-chk">
                                <input type="checkbox" name="keeplogin" id='login-chk'/>
                                <span>로그인 유지</span>
                            </label>
                            <button className="joinPage_btn" onClick={joinPage}>회원가입</button>
                        </div>
                        <div className="login_find">
                            <label>
                                <span className="login_find-id" onClick={IdFindPage}>아이디 찾기</span>
                                <span>|</span>
                                <span className="login_find-pw" onClick={PwFindPage}>비밀번호 찾기</span>
                            </label>
                        </div>
                    </div>
                    <div className="kakaoLogin">
                        <label>
                            <img src="/src/assets/icons8-kakao-30.png" alt="카카오 로그인"/>
                            <span className={'kakaoLogin_txt'}>카카오 로그인</span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login