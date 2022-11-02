import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';
import { useState } from 'react';

const initialState = {
  name: '',
  phone: '',
};

export default function ContactForm({ onSubmit }) {
  const [state, setState] = useState({ initialState });
  const nameId = nanoid();
  const phoneId = nanoid();

  const handleChange = ev => {
    const { name, value } = ev.target;
    setState(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelSubmit = ev => {
    ev.preventDefault();
    const { name, phone } = state;
    onSubmit({ name, phone });
    setState(initialState);
  };

  const { name, phone } = state;
  return (
    <form onSubmit={handelSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        id={nameId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
      <label htmlFor={phoneId}>Number</label>
      <input
        id={phoneId}
        type="tel"
        name="phone"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Phone"
        value={phone}
        onChange={handleChange}
      />

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
