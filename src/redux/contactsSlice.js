import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './contactsOperation';

const initialState = {
  items: [],
  loading: false,
  error: null,
};
const constsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.loading = true;
    },
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [addContact.pending]: state => {
      state.loading = true;
    },
    [addContact.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items.push(payload);
    },
    [addContact.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [removeContact.pending]: state => {
      state.loading = true;
    },
    [removeContact.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = state.items.filter(item => item.id !== payload);
    },
    [removeContact.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const contactReducer = constsSlice.reducer;
