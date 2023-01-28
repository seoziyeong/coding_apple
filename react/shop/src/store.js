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
    countPlus(state, action) {
      // state id = action으로 받은 id가 같은 경우
      let n = state.findIndex((data) => {
        return data.id === action.payload
      })
      state[n].count += 1
    },
    countMinus(state, action) {
      let n = state.findIndex((data) => {
        return data.id === action.payload
      })
      state[n].count <= 1 ?
      alert('안 살라구?') :
      state[n].count -= 1
    },
    addOrder(state, action) {
      let n = state.findIndex((data) => {
        return data.id === action.payload.shoe.id
      })
      // state id = action으로 받은 id가 있으면, n은 그 index가 됨.
      // n이 -1이라는 것은 id가 없다는 뜻
      if (n !== -1) {
        state[n].count += Number(action.payload.num)
      } else {
        let newItem = {
          id : action.payload.shoe.id,
          name : action.payload.shoe.title,
          count : Number(action.payload.num)
        }
        state.push(newItem)
      }
    },
    delOrder(state, action) {
      let n = state.findIndex((data) => {
        return data.id === action.payload
      })
      state.splice(n, 1)
      return state
    },
    delAll(state) {
      if (window.confirm("진짜?")) {
        return []
      }
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