import * as api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
const isDuplicate = ({ name, phone }, contacts) => {
  const normalizedName = name.toLowerCase();
  const normalizedPhone = phone.toLowerCase();

  const result = contacts.find(item => {
    return (
      normalizedName === item.name.toLowerCase() &&
      normalizedPhone === item.phone.toLowerCase()
    );
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

export const addContact = createAsyncThunk(
  'contacts/add',
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

      if (isDuplicate(data, contacts.items)) {
        alert(`${data.name}: ${data.phone} is already exist`);
        return false;
      }
    },
  }
);
export const removeContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await api.removeContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
