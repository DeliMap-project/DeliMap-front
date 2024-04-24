import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/App.css'
// eslint-disable-next-line no-unused-vars
import Menu from '/src/components/menu/Menu.jsx';
import axios from 'axios';



function App() {
  const [count, setCount] = useState(0)

  const test = async () => {
    let res = await axios.get('https://api.kbland.kr/land-property/property/getPsaleExpsStatcList');
    console.log(res.data.dataBody.data)
  }

  
  test();

  return (
    <>
      <div>
        <p>Hello DeliMap!</p>
        <Menu/>
      </div>
    </>
  )
}

export default App
