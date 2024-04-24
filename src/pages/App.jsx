import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteTest1 from './RouteTest1';
import RouteTest2 from './RouteTest2'
import DefaultLayer from './DefaultLayer'

function App() {
  const test = async () => {
    let res = await axios.get('https://api.kbland.kr/land-property/property/getPsaleExpsStatcList');
    console.log(res.data.dataBody.data)
  }

  const router = createBrowserRouter([
    {path: '/', element: <DefaultLayer/>},
    {path: '/route1', element: <RouteTest1/>},
    {path: '/route2', element: <RouteTest2/>},
  ])
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
