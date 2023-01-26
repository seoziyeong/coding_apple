import './App.css';
import { useState } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import data from './data.js'
import Detail from './routes/Detail.js'
import Main from './routes/Main.js'

function App() {
  let [shoes] = useState(data)
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">J-Market</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>HOME</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>DETAIL</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>EVENT</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Main shoes={shoes}/>} />
        <Route path="*" element={<p>404</p>} />
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        {/* <Route path="/event" element={<Event/>} >
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path="two" element={<p>생일쿠폰 받기</p>} />
        </Route> */}
      </Routes>

      
    </div>
  );
}

// function Event () {
//   return(
//     <>
//       <h4>오늘의 이벤트</h4>
//       <Outlet></Outlet>
//     </>
//   )
// }

export default App;
