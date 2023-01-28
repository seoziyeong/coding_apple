import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/user.js'

let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    // 상품 개수 조절
    countPlus(state, action) {
      // state id = action으로 받은 id가 같은 경우
      let n = state.findIndex((data) => {
        return data.id === action.payload
      })
      state[n].count += 1
    },
    // 상품 개수 조절
    countMinus(state, action) {
      let n = state.findIndex((data) => {
        return data.id === action.payload
      })
      // count 를 1 이하로 조작 시 alert
      state[n].count <= 1 ?
      alert('안 살라구?') :
      state[n].count -= 1
    },
    // 장바구니 추가
    addOrder(state, action) {
      let n = state.findIndex((data) => {
        return data.id === action.payload.shoe.id
      })
      // id 중복 체크 :이미 장바구니에 담겨져 있는 상품을 또 담을 때 기존 count를 추가
      // state id = action으로 받은 id가 있으면, n은 그 index가 됨. n이 -1이라는 것은 id가 없다는 뜻
      if (n !== -1) {
        state[n].count += Number(action.payload.num)
      } else {
        // 중복 없을 경우 state에 newItem push
        let newItem = {
          id : action.payload.shoe.id,
          name : action.payload.shoe.title,
          count : Number(action.payload.num)
        }
        state.push(newItem)
      }
    },
    // 개별 삭제 : n을 잘라내고 나머지 state를 리턴
    delOrder(state, action) {
      let n = state.findIndex((data) => {
        return data.id === action.payload
      })
      state.splice(n, 1)
      return state
    },
    // 전체 삭제
    delAll(state) {
      if (window.confirm("진짜?")) return []
    }
  }
})

export let { countPlus, countMinus, addOrder, delOrder, delAll } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
  }
}) 