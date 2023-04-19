import { configureStore } from '@reduxjs/toolkit';
import cellReducer from '../components/Cells/cellsSlice';
import { cellsApi } from '../components/Cells/cellsApi';
import persistCellMiddleware from './middlewares/persistCellMiddleware';

export const store = configureStore({
  reducer: {
    cells: cellReducer,
    [cellsApi.reducerPath]: cellsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(persistCellMiddleware.middleware)
      .concat([cellsApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
