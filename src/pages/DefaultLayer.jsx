import Menu from '/src/components/menu/Menu.jsx';
import '../styles/default.css'
import React, { useEffect } from 'react';
import BoardListModal from "/src/components/board/BoardList.jsx";

const { kakao } = window;

function DefaultLayer() {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
    
        const map = new kakao.maps.Map(container, options);
      }, []);
    return (
        // <div id="map" style={{width: '1920px', height: '1080px'}}>
        <div id="map" style={{width: '100vw', height: '100vh'}}>
            <Menu/>
            <BoardListModal/>
        </div>
    )
}

export default DefaultLayer;