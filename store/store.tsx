import { configureStore } from '@reduxjs/toolkit';
import wheelReducer from './wheelSlice';

export const store = configureStore({
  reducer: {
    wheel: wheelReducer,
  },
});

// 定義 RootState 和 AppDispatch 類型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
