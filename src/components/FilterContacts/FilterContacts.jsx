import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/contactSelectors';
import { filterContacts } from 'redux/contactsSlice';
import { Title, Input } from './FilterContacts.styled';

export const FilterContacts = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(filterContacts(e.target.value));
  };
  return (
    <Title>
      Find contacts by name
      <Input type="text" name="filter" value={filter} onChange={handleChange} />
    </Title>
  );
};
