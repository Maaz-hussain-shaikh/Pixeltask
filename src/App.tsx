import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ComboBox from './ComboBox'

function App() {
  return (
    <>
    <h1>Combo Box Task </h1>
    <ComboBox/> 
      <div>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
     

    </>
  )
}

export default App
