import { Row, Col } from 'react-bootstrap'

// * 상품 컴포넌트
function Card({shoes}) {
  const imgId = shoes.id + 1
  return (
    <Col sm className="shoes_card">
      <img src={process.env.PUBLIC_URL + `/img/shoes${imgId}.jpg`} width="80%" alt=""/>
      <h4>{shoes.title}</h4>
      <p>{shoes.price}</p>
    </Col>
  )
}

// * 메인 UI
function Main({shoes}) {
  return (
    <>
      <div className="main-bg"></div>
      <Row>
        {
          shoes.map((shoes) => {
            return (
              <Card shoes={shoes}/>
            )
          })
        }
      </Row>
    </>
  )
}

export default Main