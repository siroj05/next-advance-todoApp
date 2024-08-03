import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface task {
  totalTask : number
}

const initialState : task = {
  totalTask : 0
}

const taskSlice = createSlice({
  name : 'task',
  initialState,
  reducers : {
    totalTask : (state, action: PayloadAction<task>) => {
      state.totalTask = action.payload.totalTask
    },
    resetTask : (state) => {
      state.totalTask = 0
    }
  }
})

export const {totalTask, resetTask} = taskSlice.actions
export default taskSlice.reducer