import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import css from 'components/Phonebook/Phonebook.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getFilter, getState } from 'redux/selectors';

import {
  fetchContacts,
  addContacts,
  removeContacts,
} from 'redux/contactsOperation';
import { setFilter } from 'redux/filterSlice';
import { useEffect } from 'react';

export default function Phonebook() {
  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const { loading, error } = useSelector(getState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const hendelChenge = ev => {
    const { value } = ev.target;
    dispatch(setFilter(value));
  };

  const onAddContact = data => {
    const action = addContacts(data);
    dispatch(action);
  };
  const onRemoveContacts = id => {
    const action = removeContacts(id);
    dispatch(action);
  };

  return (
    <>
      <div className={css.formContact}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={onAddContact} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.title}>Contacts</h2>
        <Filter onChange={hendelChenge} value={filter} />
        {contacts.length > 0 && (
          <ContactsList items={contacts} removeContacts={onRemoveContacts} />
        )}
        {loading && <p>...loading</p>}
        {error && <p>oops, something went wrong</p>}
      </div>
    </>
  );
}
