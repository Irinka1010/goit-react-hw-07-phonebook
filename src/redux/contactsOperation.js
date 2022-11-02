import * as api from 'contacts-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
const isDuplicate = (data, contacts) => {
  const normalizedName = data.name.toLowerCase();

  const result = contacts.find(({ name, phone }) => {
    return normalizedName === name.toLowerCase() && data.phone === phone;
  });
  return Boolean(result);
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await api.getContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDuplicate(data, contacts.item)) {
        alert(`${data.name}: ${data.phone} is already exist`);
        return false;
      }
    },
  }
);
export const removeContacts = createAsyncThunk(
  'contacts/remove',
  async (id, { rejectWithValue }) => {
    try {
      await api.removeContact(id);
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
