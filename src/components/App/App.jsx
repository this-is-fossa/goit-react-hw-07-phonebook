import { Section } from '../Section/Section';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { FilterContacts } from '../FilterContacts/FilterContacts';
import { ContainerApp } from './App.styled';

export function App() {
  return (
    <ContainerApp>
      <Section title="Phonebook">
        <ContactForm />
        <Section title="Search contacts">
          <FilterContacts />
        </Section>
      </Section>
      <ContactList />
    </ContainerApp>
  );
}
