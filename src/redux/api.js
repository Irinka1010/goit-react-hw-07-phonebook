import axios from 'axios';

axios.defaults.baseURL = 'https://63582cd9c27556d28939031c.mockapi.io';
export const getContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const addContact = async data => {
  const { data: result } = await axios.post('/contacts', data);
  return result;
};

export const removeContact = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};
