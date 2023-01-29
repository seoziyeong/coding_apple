import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Nav, Button, Modal } from 'react-bootstrap'
import { useDispatch } from "react-redux"
import { addOrder } from "./../store.js"

const Detail = ({shoes}) => {
  const navigate = useNavigate();
	let dispatch = useDispatch()
  // Param check : url 파라미터 id와 상품 고유 id가 같은 지 체크
  const {id} = useParams()
  const shoe = shoes.find((x) => x.id == id)

  // 최근 본 상품 : watched에 id 넣기
  useEffect(() => {
    let watched = JSON.parse(localStorage.getItem('watched'))
    watched.push(shoe.id)  // 접속한 Detail 페이지의 상품 id를 push
    watched = new Set(watched) // 중복제거
    // watched = [...watched]  // ojbect > array
    watched = Array.from(watched)  // ojbect > array
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [])

  // alert : 5초 뒤 사라지는 알럿
  let [saleAlert, setSaleAlert] = useState(true)
  useEffect(() => {
    let timesale = setTimeout(() => setSaleAlert(false), 5000)
    return () => {
      clearTimeout(timesale)
    }
  }, [saleAlert])

  // modal
  const [show, setShow] = useState(false)

  // input : 숫자 외 입력 방지
  const [num, setNum] = useState('')
  useEffect(() => {
    if (isNaN(num) === true) {
      alert('그러지마세요🙄')
      setNum('')
    }
  }, [num])

  // tab
  const [tab, setTab] = useState(0)

  // ^ tab contents
  function TabContent({tab}) {
    const [fade, setFade] = useState("")
    useEffect(() => {
      setFade('end')
      return () => {
        setFade('') // clean up
      }
    }, [tab])

    return (
      <div className={`start ${fade}`}>
        {[
          <div>내용0</div>,
          <div>내용1</div>,
          <div>내용2</div>
        ][tab]}
      </div>
    )
  }

  // Detail component fade 효과
  const [fade, setFade] = useState("")
    useEffect(() => {
      setFade('end')
      return () => {
        setFade('') // clean up
      }
    }, [tab])
  
  return (
    <div className={`container start ${fade}`}>
      {
        saleAlert === true ?
          <div className="alert alert-warning">
            5초 이내 구매시 할인! 🤩
          </div> :
          null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${shoe.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoe.title}</h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}</p>
          <input 
            className="input"
            value={num || ""}
            onChange={(e) => setNum(e.target.value)}
          /><br/>
          <button className="btn btn-danger" onClick={() => {
            dispatch(addOrder({shoe, num}))
            setShow(true)
          }}>주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
      </Nav.Item>
    </Nav>

    <TabContent tab={tab}/>
    {/* 장바구니 modal */}
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>성공</Modal.Title>
      </Modal.Header>
      <Modal.Body>장바구니에 성공적으로 넣었다규</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          쇼핑 계속하기
        </Button>
        <Button variant="primary" onClick={() => {navigate('/cart')}}>
          장바구니로 이동
        </Button>
      </Modal.Footer>
    </Modal>
    </div> 
  )
}

export default Detail