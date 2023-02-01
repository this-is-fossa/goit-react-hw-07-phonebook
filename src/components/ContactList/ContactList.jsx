import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/contactSelectors';
import { getContactsThunk, deleteContactsThunk } from 'redux/contactsThunk';
import {
  ListTitle,
  Loading,
  CardList,
  Card,
  DeleteBtn,
} from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filterTerm = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  function filteredContactsList() {
    const filter = filterTerm.toLowerCase().trim();
    return Array.isArray(contacts)
      ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
      : [];
  }

  const filteredContacts = filteredContactsList();

  return (
    <div>
      <ListTitle>Contacts list</ListTitle>
      {isLoading && !error && <Loading>Request in progress...</Loading>}
      {!isLoading && (
        <CardList>
          {filteredContacts.reverse().map(({ name, number, id }) => (
            <Card key={id}>
              <p>
                {name}: {number}
              </p>
              <DeleteBtn
                type="button"
                onClick={() => {
                  dispatch(deleteContactsThunk(id));
                }}
              >
                Delete
              </DeleteBtn>
            </Card>
          ))}
        </CardList>
      )}
    </div>
  );
};
