import PropTypes from 'prop-types';
import css from 'components/ContactsList/ContactsList.module.css';
export default function ContactsList({ items, removeContacts }) {
  const elements = items.map(({ name, phone, id }) => {
    return (
      <li className={css.item} key={id}>
        <span className={css.marker}></span>
        <p>{`${name} : ${phone}`}</p>
        <button
          className={css.button}
          type="button"
          onClick={() => {
            removeContacts(id);
          }}
        >
          Delete
        </button>
      </li>
    );
  });
  return <ul className={css.list}>{elements}</ul>;
}
ContactsList.propTypes = {
  removeContacts: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      createdAt: PropTypes.string,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
