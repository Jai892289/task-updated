import './App.css'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import New from './New'
import Detail from './Detail'

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
