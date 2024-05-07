import '/src/styles/member/Join.css';
import {useNavigate} from "react-router-dom";


const Join = () => {

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }
    return (
        <>
            <div className="join_container">
                <div className="wrap-join">
                    <div className="join_wrapper">
                        <div className="join-top">
                            <span onClick={home}>DeliMap</span>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-id" className="join-label-text">아이디
                                <input type="text" id="join-id" className="join-id" placeholder="아이디를 입력해주세요"
                                       autoComplete="off" maxLength={12}/>
                            </label>
                            <div className="id_check_memo">아이디는 영문+숫자 포함 6~12자 이하</div>
                            <div className="join-id-btn">
                                <span>아이디중복확인</span>
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-pw" className="join-label-text">비밀번호
                                <input type="password" id="join-pw" className="join-pw" placeholder="비밀번호를 입력해주세요"
                                       autoComplete="off"/>
                            </label>
                            <div className="pw_check_memo">
                                비밀번호는 영문+숫자+특수기호 포함 8자 이상
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-name" className="join-label-text">이름
                                <input type="text" id="join-name" className="join-name" placeholder="이름을 입력해주세요"
                                       autoComplete="off"/>
                            </label>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-nickname" className="join-label-text">닉네임
                                <input type="text" id="join-nickname" className="join-nickname"
                                       placeholder="닉네임을 입력해주세요" autoComplete="off"/>
                            </label>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-phone" className="join-label-text">전화번호
                                <input type="text" id="join-phone" className="join-phone" placeholder="전화번호를 입력해주세요"
                                       autoComplete="off" maxLength={13}/>
                            </label>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-email" className="join-label-text">이메일
                                <input type="text" id="join-email" className="join-email" placeholder="이메일을 입력해주세요"
                                       autoComplete="off"/>
                            </label>
                            <div className="email_check_memo">
                                <button className='email_cert_btn'>인증번호 전송</button>
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-email-cert" className="join-label-text">인증번호
                                <input type="text" id="join-email-cert" className="join-email-cert"
                                       placeholder="인증번호를 입력해주세요" autoComplete="off"/>
                            </label>
                            <div className="auth-area">
                                <span>인증번호 확인</span>
                            </div>
                        </div>
                        <div className="join-btn">
                            <span>회원가입</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Join