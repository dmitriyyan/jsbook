import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cell } from './cellsSlice';

export const cellsApi = createApi({
  reducerPath: 'cellsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCells: builder.query<Cell[], void>({
      query: () => ({
        url: '/cells',
      }),
    }),
    saveCells: builder.mutation<void, Cell[]>({
      query: (cells) => ({
        url: '/cells',
        method: 'POST',
        body: { cells },
      }),
    }),
  }),
});

export const { useGetCellsQuery, useSaveCellsMutation } = cellsApi;
