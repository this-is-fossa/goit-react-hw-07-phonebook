import axios from 'axios';

const contactsAPI = axios.create({
  baseURL: `https://63daad062af48a60a7d3b5bf.mockapi.io/contacts`,
});

export const fetchContacts = async () => {
  const { data } = await contactsAPI.get();
  return data;
};

export const addContacts = async contact => {
  const { data } = await contactsAPI.post('', contact);
  return data;
};

export const deleteContacts = async contactId => {
  const { data } = await contactsAPI.delete(`/${contactId}`);
  return data;
};
