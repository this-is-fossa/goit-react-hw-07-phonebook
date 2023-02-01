import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await fetchContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContactsThunk = createAsyncThunk(
  'contacts/AddContacts',
  async (contact, thunkAPI) => {
    try {
      const data = await addContacts(contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContactsThunk = createAsyncThunk(
  'contacts/DeleteContacts',
  async (id, thunkAPI) => {
    try {
      const data = await deleteContacts(id);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
