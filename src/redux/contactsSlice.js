// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// const initialContactsState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: initialContactsState,
//   reducers: {
    
//     addContact: {
//       reducer(state, action) {
//         state.push(action.payload);
//       },
//       prepare({ name, number }) {
//         return { payload: { id: nanoid(), name, number } };
//       },
//     },
//     deleteContact: {
//       reducer(state, action) {
//         const index = state.findIndex(contact => contact.id === action.payload);
//         if (index !== -1) {
//           state.splice(index, 1);
//         }
//       },
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;

import { createSlice, nanoid } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const contactsSlice = createSlice ({
  name: 'contacts',
  initialState: {
    initialContacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  },
  reducers : {
    addContact: {
      reducer: (state, action) => {
        state.initialContacts.push(action.payload)
      },
      prepare: (name, number) => {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            number: number.trim(),
          },
        };
      },
    },
    deleteContact: (state, action) => {
      const index = state.initialContacts.findIndex(
        contact => contact.id === action.payload
      );
      state.initialContacts.splice(index, 1);
    }
  }
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer (
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, deleteAllContacts } = contactsSlice.actions;