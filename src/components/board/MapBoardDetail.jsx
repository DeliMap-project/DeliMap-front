import '/src/styles/board/MapBoardDetail.css';
import {useEffect} from "react";
const { kakao } = window;



const MapBoardDetail = () => {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    }

    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div className={'mapDetail_container'}>
        <div className={'mapDetail_wrap'}>
          <div className={'mapDetail_main_txt'}>
            <span className={'mapDetail_txt'}>Title</span>
            <div className={'mapDetail_sub01_txt'}>
              <div className={'mapDetail_reviewScore drag-disable'}>
                <label>
                  <img src={'/src/assets/icons8-binstar-48.png'} alt={'별점'} title={'별점'}/>
                  <img src={'/src/assets/icons8-binstar-48.png'} alt={'별점'} title={'별점'}/>
                  <img src={'/src/assets/icons8-binstar-48.png'} alt={'별점'} title={'별점'}/>
                  <img src={'/src/assets/icons8-binstar-48.png'} alt={'별점'} title={'별점'}/>
                  <img src={'/src/assets/icons8-binstar-48.png'} alt={'별점'} title={'별점'}/>
                  <span className={'mapDetail_reviewScore_score'}>5점</span>
                  <span className={'mapDetail_reviewScore_reviewCnt'}>리뷰 3</span>
                </label>
              </div>
            </div>
            <div className={'mapDetail_sub02_txt'}>
              <span className={'mapDetail_home'}><img src={'/src/assets/icons8-marker-64.png'} alt={'지도'}/>지도</span>
              <span className={'mapDetail_save'}><img src={'/src/assets/free-icon-save-instagram-5668020.png'} alt={'저장'}/>저장</span>
              <span className={'mapDetail_share'}><img src={'/src/assets/icons8-share-24.png'} alt={'공유'}/>공유</span>
            </div>

          </div>
        </div>
        <div className={'mapDetail_map'} id="map">

        </div>
      </div>
    </>
  )
}
export default MapBoardDetail