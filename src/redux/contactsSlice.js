import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContacts,
  removeContacts,
} from './contactsOperation';

const initialState = {
  items: [],
  loading: false,
  error: null,
};
const constsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: store => {
      store.loading = true;
    },
    [fetchContacts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items = payload;
    },
    [fetchContacts.rejected]: (store, { payload }) => {
      store.loading = true;
      store.error = payload;
    },
    [addContacts.pending]: store => {
      store.loading = true;
    },
    [addContacts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items.push(payload);
    },
    [addContacts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [removeContacts.pending]: store => {
      store.loading = true;
    },
    [removeContacts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items = store.items.filter(item => item.id !== payload);
    },
    [removeContacts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});
export const contactReducer = constsSlice.reducer;
