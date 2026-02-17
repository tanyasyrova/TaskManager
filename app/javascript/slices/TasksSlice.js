import { createSlice } from '@reduxjs/toolkit';
import propEq from 'ramda/es/propEq';
import { changeColumn } from '@asseinfo/react-kanban';

import { states } from 'presenters/TaskPresenter';

const initialState = {
  board: {
    columns: states.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    /*loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      if (!column) {
        console.warn('Unknown columnId:', columnId, 'known:', state.board.columns.map(c => c.id));
        return state;
      }


      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },*/

    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;

      // 1) пробуем строго (через propEq)
      let column = state.board.columns.find((c) => propEq('id', columnId, c));

      // 2) если не нашли — пробуем нормализованное сравнение
      if (!column) {
        const normalizedColumnId = String(columnId).trim();
        column = state.board.columns.find((c) => String(c.id).trim() === normalizedColumnId);
      }

      // 3) если всё равно не нашли — выходим
      if (!column) return state;

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },

    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;

      let column = state.board.columns.find((c) => propEq('id', columnId, c));

      if (!column) {
        const normalizedColumnId = String(columnId).trim();
        column = state.board.columns.find((c) => String(c.id).trim() === normalizedColumnId);
      }

      if (!column) return state;

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta,
      });

      return state;
    },



    /*loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));
      
      if (!column) {
        console.warn('Unknown columnId:', columnId, 'known:', state.board.columns.map(c => c.id));
        return state;
      }

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta,
      });

      return state;
    },*/
  },
});

export const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;
