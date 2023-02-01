import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/contactSelectors';
import { deleteContacts } from 'redux/contactsSlice';
import { ListTitle, CardList, Card, DeleteBtn } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  function filteredContacts() {
    const normalValue = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalValue)
    );
  }

  return (
    <div>
      <ListTitle>Contacts list</ListTitle>
      <CardList>
        {filteredContacts().length > 0 &&
          filteredContacts().map(({ name, number, id }) => (
            <Card key={id}>
              <p>
                {name}: {number}
              </p>
              <DeleteBtn
                type="button"
                onClick={() => dispatch(deleteContacts(id))}
              >
                Delete
              </DeleteBtn>
            </Card>
          ))}
      </CardList>
    </div>
  );
};
