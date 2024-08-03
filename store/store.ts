import { configureStore } from "@reduxjs/toolkit";
import taskReucer from '@/app/(todo)/todo-app/(dashboard)/taskSlice'

const store = configureStore({
  reducer: {
    task : taskReucer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store