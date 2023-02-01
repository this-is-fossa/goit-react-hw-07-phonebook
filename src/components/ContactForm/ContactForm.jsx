import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contactSelectors';
import { addContactsThunk } from 'redux/contactsThunk';
import { Form, FormTitle, Input, FormBtn } from './ContactForm.styled';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
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
        contact => contact.name.toLowerCase() === name.toLowerCase()
      ) || contacts.find(contact => contact.number === number)
    );
  }

  const newContact = (name, number) => {
    const contact = {
      name,
      number,
    };
    isSameContact(name, number)
      ? alert('This contact is already exists')
      : dispatch(addContactsThunk(contact));
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
