import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Detail = ({shoes}) => {
  // Param check : url 파라미터 id와 상품 고유 id가 같은 지 체크
  const {id} = useParams()
  const shoe = shoes.find((x) => x.id == id)

  // alert : 5초 뒤 사라지는 알럿
  let [saleAlert, setSaleAlert] = useState(true)
  useEffect(() => {
    let timesale = setTimeout(() => setSaleAlert(false), 5000)
    return () => {
      clearTimeout(timesale)
    }
  }, [])

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
          <button className="btn btn-danger">주문하기</button> 
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
    </div> 
  )
}

export default Detail