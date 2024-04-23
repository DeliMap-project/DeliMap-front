import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
      </div>
    </>
  )
}

export default App
