import '/src/styles/member/PwFind.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const PwFind = () => {
    const [pw_find_idInput, setPw_find_idInput ] = useState('');
    const [pw_find_emailInput, setPw_find_emailInput ] = useState('');
    const [pw_find_certNumber, setPw_find_certNumber ] = useState('');
    const [isPwCert, setIsPwCert] = useState(false);

    const navigate = useNavigate();

    const idFindPage = () => {
        navigate("/IdFind");
    }
    const pw_back = () => {
        navigate("/Login");
    }

    const pw_find_certBtn = () => {
        if(pw_find_idInput === '' || !pw_find_idInput.trim()){
            alert('아이디를 입력해주세요.');
            document.getElementById('pw_find_idInput').focus();
            return false;
        }
        if(pw_find_emailInput === '' || !pw_find_emailInput.trim()) {
            alert('이메일을 입력해주세요.');
            document.getElementById('pw_find_emailInput').focus();
            return false;
        }else {
            alert('인증번호가 전송되었습니다.')
            document.getElementById('pw_find_certNumber').focus();
            setIsPwCert(true);
        }
    }
    const pw_find_btn_txt = () => {
        if(pw_find_idInput === '' || !pw_find_idInput.trim()) {
            alert('아이디를 입력해주세요.');
            document.getElementById('pw_find_idInput').focus();
            return false;
        }
        if(pw_find_emailInput === '' || !pw_find_emailInput.trim()) {
            alert('이메일을 입력해주세요.');
            document.getElementById('pw_find_emailInput').focus();
            return false;
        }
        if(pw_find_certNumber === '' || !pw_find_certNumber.trim()) {
            alert('인증번호를 입력해주세요.');
            document.getElementById('pw_find_certNumber').focus();
            return false;
        }
        if(isPwCert === false) {
            alert("인증요청을 해주세요.");
        }
    }
    return(
        <>
            <div className={'pw_find_container'}>
                <div className={'pw_find_wrap'}>
                    <div className={'pw_find_tit'}>
                        <label>
                            <img src={'/src/assets/icons8-back-64.png'} alt={'뒤로 가기'} title={'뒤로가기'} onClick={pw_back}/>
                            <span>비밀번호 찾기</span>
                        </label>
                    </div>
                    <div className={'pwFind_tit'}>
                        <div className={'pw_find_idPart'} onClick={idFindPage}>
                            <span>아이디 찾기</span>
                        </div>
                        <div className={'pw_find_pwPart'}>
                            <span>비밀번호 찾기</span>
                        </div>
                    </div>
                    <div className={'pw_find_idWrap'}>
                        <label>
                            <div className={'pw_find_radio_txt'}>
                                <label>
                                    <input type={'radio'} checked/>
                                    <span className={'pw_find_email'}>이메일로 찾기</span>
                                </label>
                            </div>
                            <div className={'pw_find_cert'}>
                                <input type={'text'} placeholder={'아이디'} id={'pw_find_idInput'} className={'pw_find_idInput'}  value={pw_find_idInput} onChange={(e) => setPw_find_idInput(e.target.value)}/>
                                <div>
                                    <input type={'text'} placeholder={'이메일'} id={'pw_find_emailInput'} className='pw_find_emailInput' value={pw_find_emailInput} onChange={(e) => setPw_find_emailInput(e.target.value)}/>
                                    <button className={'pw_find_certBtn'} onClick={pw_find_certBtn}>인증 요청</button>
                                </div>
                            </div>
                            <input type={'text'} placeholder={'인증번호'} id={'pw_find_certNumber'} className={'pw_find_certNumber'} value={pw_find_certNumber} onChange={(e) => setPw_find_certNumber(e.target.value)}/>
                        </label>
                    </div>
                    <div className={'pw_find_btn'} onClick={pw_find_btn_txt}>
                        <span className={'pw_find_btn_txt'}>비밀번호 찾기</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PwFind