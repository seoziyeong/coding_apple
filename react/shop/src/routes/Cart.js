import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { countPlus, countMinus, delOrder, delAll } from "./../store.js"
import { changeName } from './../store/user.js'

function Cart() {
  let store = useSelector((state) => {return state})
  let mycart = store.cart
  let dispatch = useDispatch()

  return (
    <div>
      <h1>{store.user}의 장바구니</h1>
      <button onClick={() => dispatch(changeName())}>개명</button>
      <button onClick={() => dispatch(delAll())}>전체 삭제</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            mycart.map((value, i) => {
              return (
                <tr key={i}>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.count}</td>
                  <td>
                    <button onClick={() => {
                      dispatch(countPlus(value.id))
                    }}>+</button>
                    <button onClick={() => {
                      dispatch(countMinus(value.id))
                    }}>-</button>
                    <button onClick={() => {
                      dispatch(delOrder(value.id))
                    }}>삭제</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Cart