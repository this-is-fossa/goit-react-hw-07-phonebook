import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  contacts: [],
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        state.contacts.push(payload);
      },
      prepare: ({ name, number }) => {
        const id = nanoid();
        return { payload: { name, number, id } };
      },
    },
    deleteContacts(state, { payload }) {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
    },
    filterContacts(state, { payload }) {
      state.filter = payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

export const persistContactReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContacts, filterContacts } =
  contactsSlice.actions;
