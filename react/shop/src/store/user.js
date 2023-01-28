import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'Seo',
  reducers : {
    changeName(state) {
      return 'Jiyoeng ' + state
    }
  }
})

export let { changeName } = user.actions
export default user