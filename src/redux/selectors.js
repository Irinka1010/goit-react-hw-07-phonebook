export const getPhonebook = state => state.contacts.items;
export const getFilter = state => state.filter;
export const getState = contacts => ({
  loading: contacts.loading,
  error: contacts.error,
});

export const getFilteredContacts = store => {
  const { filter, contacts } = store;
  if (!filter) {
    return contacts.items;
  }
  const normalizedFilter = filter.toLocaleLowerCase();

  const filteredContacts = contacts.items.filter(({ name }) => {
    const normalizedName = name.toLocaleLowerCase();
    const result = normalizedName.includes(normalizedFilter);

    return result;
  });
  return filteredContacts;
};
