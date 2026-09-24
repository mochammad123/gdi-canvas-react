import { combineReducers, configureStore } from '@reduxjs/toolkit';
import layoutReducer from './layoutSlice';

const rootReducer = combineReducers({
  layout: layoutReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
