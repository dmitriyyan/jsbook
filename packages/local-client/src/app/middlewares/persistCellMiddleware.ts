import {
  TypedStartListening,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';

import { cellsApi } from '../../components/Cells/cellsApi';
import { cellSlice, selectCells } from '../../components/Cells/cellsSlice';
import { AppDispatch, RootState } from '../store';

export type SliceActions<T> = {
  [K in keyof T]: {
    type: K;
    payload: T[K] extends (payload: infer P) => void ? P : never;
  };
}[keyof T];

export type ActionTypes = SliceActions<typeof cellSlice.actions>;

const persistCellMiddleware = createListenerMiddleware();

const { addCell, deleteCell, updateCell, moveCell } = cellSlice.actions;

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startAppListening =
  persistCellMiddleware.startListening as AppStartListening;

startAppListening({
  matcher: isAnyOf(addCell, deleteCell, updateCell, moveCell),
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(
      cellsApi.endpoints.saveCells.initiate(
        selectCells(listenerApi.getState().cells)
      )
    );
  },
});

export default persistCellMiddleware;
