import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Detail = ({shoes}) => {
  // input
  const [num, setNum] = useState('')
  useEffect(() => {
    if (isNaN(num) === true) {
      alert('그러지마세요🙄')
      console.log('string')
    }
  }, [num])
  // url 파라미터 id와 상품 고유 id가 같은 지 체크
  const {id} = useParams()
  const shoe = shoes.find((x) => x.id === id)
  // 2초 뒤 사라지는 알럿
  let [saleAlert, setSaleAlert] = useState(true)
  useEffect(() => {
    let timesale = setTimeout(() => setSaleAlert(false), 2000)
    return () => {
      clearTimeout(timesale)
    }
  }, [])

  return (
    <div className="container">
      {/* 2초 뒤 사라지는 알럿 */}
      {
        saleAlert === true ?
          <div className="alert alert-warning">
            2초 이내 구매시 할인!
          </div> :
          null
      }
      <div className="row">
        <div className="col-md-6">
          <img src={process.env.PUBLIC_URL + `/img/shoes${shoe.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoe.title}</h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}</p>
          <input className="input" value={num || ""} onChange={(e) => setNum(e.target.value)}/><br/>

          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}

export default Detail