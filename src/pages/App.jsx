import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteTest1 from './RouteTest1';
import RouteTest2 from './RouteTest2'
import DefaultLayer from './DefaultLayer'
import BoardInsert from '/src/components/board/BoardInsert.jsx'
import Join from "../components/member/Join.jsx";
import Login from "../components/member/Login.jsx";
import IdFind from "../components/member/IdFind.jsx";
import PwFind from "../components/member/PwFind.jsx";
import BoardUpdate from "../components/board/BoardUpdate.jsx";
import MapBoardDetail from "../components/board/MapBoardDetail.jsx";

function App() {
  const test = async () => {
    let res = await axios.get('https://api.kbland.kr/land-property/property/getPsaleExpsStatcList');
    // console.log(res.data.dataBody.data)
  }
  const board_no = localStorage.getItem('board_no');

  const router = createBrowserRouter([
    {path: '/', element: <DefaultLayer/>},
    {path: '/route1', element: <RouteTest1/>},
    {path: '/route2', element: <RouteTest2/>},
    {path: '/BoardInsert', element: <BoardInsert/>},
    {path: '/Join', element: <Join/>},
    {path: '/Login', element: <Login/>},
    {path: '/IdFind', element: <IdFind/>},
    {path: '/PwFind', element: <PwFind/>},
    {path: '/BoardUpdate', element: <BoardUpdate/>},
    {path: `/MapBoardDetail:${board_no}`, element: <MapBoardDetail/>},
  ])
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
