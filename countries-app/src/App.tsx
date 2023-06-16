import "./scss/App.module.scss"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountryList from "./components/CountryList"

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path="/" element={<CountryList />} />
      </Routes>
    </div>
  )
}

export default App
