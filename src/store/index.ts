import {configureStore} from '@reduxjs/toolkit';
import wifiDataReducer from './slices/wifiDataSlice';

export const store = configureStore({
  reducer: {
    wifiData: wifiDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
