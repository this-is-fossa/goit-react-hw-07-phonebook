import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contactSelectors';
import { addContact } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { Form, FormTitle, Input, FormBtn } from './ContactForm.styled';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    }

    if (e.currentTarget.name === 'number') {
      setNumber(e.currentTarget.value);
    }
  };

  function isSameContact(name, number) {
    return (
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      ) || contacts.find(contact => contact.number.trim() === number.trim())
    );
  }

  const newContact = (name, number) => {
    const contact = {
      name,
      number,
    };
    isSameContact(name, number)
      ? alert('This contact is already exists')
      : dispatch(addContact(contact));
  };

  const handleSubmit = e => {
    e.preventDefault();
    newContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle htmlFor="name">Name</FormTitle>
      <Input
        onChange={handleInputChange}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <FormTitle htmlFor="number">Number</FormTitle>
      <Input
        onChange={handleInputChange}
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <FormBtn type={'submit'}>Add contact</FormBtn>
    </Form>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
