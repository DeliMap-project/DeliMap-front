import '/src/styles/member/IdFind.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const IdFind = () => {

    const [id_find_email, setId_find_email ] = useState('');
    const [id_find_certNumber, setId_find_certNumber ] = useState('');
    const navigate = useNavigate();

    const pwFindPage = () => {
        navigate("/PwFind");
    }
    const id_back = () => {
        navigate("/Login");
    }
    const id_find_certBtn = () => {
        if(id_find_email === ''){
            alert("이메일을 입력해주세요.");
        }
    }
    const id_find_btn_txt = () => {
        if(id_find_email === ''){
            alert("이메일을 입력해주세요.");
            return false;
        }
        if(id_find_certNumber === ''){
            alert("인증번호을 입력해주세요.");
        }
    }
    return (
        <>
            <div className={'id_find_container'}>
                <div className={'id_find_wrap'}>
                    <div className={'id_find_tit'}>
                        <label>
                            <img src={'/src/assets/icons8-back-64.png'} alt={'뒤로 가기'} title={'뒤로가기'} onClick={id_back}/>
                            <span>아이디 찾기</span>
                        </label>
                    </div>
                    <div className={'idFind_tit'}>
                        <div className={'id_find_idPart'}>
                            <span>아이디 찾기</span>
                        </div>
                        <div className={'id_find_pwPart'} onClick={pwFindPage}>
                            <span>비밀번호 찾기</span>
                        </div>
                    </div>
                    <div className={'id_find_idWrap'}>
                        <label>
                            <div className={'id_find_radio_txt'}>
                                <label>
                                    <input type={'radio'} checked/>
                                    <span className={'id_find_email'}>이메일로 찾기</span>
                                </label>
                            </div>
                            <div className={'id_find_cert'}>
                                <label>
                                    <input type={'text'} placeholder={'이메일'} className='id_find_emailInput' value={id_find_email} onChange={(e) => setId_find_email(e.target.value)}/>
                                    <span className={'id_find_certBtn'} onClick={id_find_certBtn}>인증 요청</span>
                                </label>
                            </div>
                            <input type={'text'} placeholder={'인증번호'} className={'id_find_certNumber'} value={id_find_certNumber} onChange={(e) => setId_find_certNumber(e.target.value)}/>
                        </label>
                    </div>
                    <div className={'id_find_btn'}>
                        <span className={'id_find_btn_txt'} onClick={id_find_btn_txt}>아이디 찾기</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IdFind