import './App.css';
import { useState } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios'
import data from './data.js'
import Detail from './routes/Detail.js'
import Cart from './routes/Cart.js'

function App() {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState(data)  // 상품 리스트
  const [showBtn, setShowBtn] = useState(true)  // 더 보기 버튼 숨기기

  // ^ 메인 UI
  function Main({shoes}) {
    // 상품 더 보기 GET
    function getdata() {
      Promise
        .all(['https://codingapple1.github.io/shop/data2.json', 'https://codingapple1.github.io/shop/data3.json']
        .map((u) => axios.get(u)))
        .then(
          axios.spread((res1, res2) => {
              let copy = [...shoes, ...res1.data]
              if (shoes.length == 3) {
                setShoes(copy)
              } else if (shoes.length > 3) {
                let copy = [...shoes, ...res2.data]
                setShoes(copy)
                setShowBtn(false)
              }
          })
        )
        .catch((err) => { console.log(err) })
    }

    return (
      <>
        <div className="main-bg"></div>
        <div className="container">
          <div className="row">
            { shoes.map((s,i) => {
              return (
                <div
                  key={i}
                  className="col-md-4"
                  onClick={() => navigate(`/detail/${+i}`)}
                >
                  <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`} width="80%" alt=""/>
                  <h4>{s.title}</h4>
                  <p>{s.price}</p>
                </div>
              )})
            }
          </div>
        </div>
        {showBtn ? <Button variant="outline-secondary" onClick={getdata}>더 보기</Button> : null}
      </>
    )
  }

  // ^ App
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">J-Market</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>HOME</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>DETAIL</Nav.Link>
            <Nav.Link onClick={() => {navigate('/event')}}>EVENT</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>CART</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Main shoes={shoes} />} />
        <Route path="*" element={<p>404</p>} />
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>

    </div>
  );
}

export default App;
