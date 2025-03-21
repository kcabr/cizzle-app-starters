import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import themeReducer from './slices/themeSlice'
import notificationsReducer from './slices/notificationsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch