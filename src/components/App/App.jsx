import { GlobalStyle } from '../GlobalStyle';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Wrapper, Notification } from './App.styled';
import initialContacts from 'contacts.json';
import { useState, useEffect } from 'react';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
  return initialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (checkAddedContacts(newContact.name)) {
      alert(`${newContact.name} is already in contacts.`)
    } else { setContacts(prevState => [...prevState, newContact])}
  };

  const checkAddedContacts = newName => { 
    return contacts.find(({ name }) => name === newName);
  };

    const deleteContact = contactId => {
    setContacts(prevState =>  prevState.filter(contact => contact.id !== contactId));
  };

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value.trim());
  };

    const getFiltredContacts = () => {
      return contacts.filter(
      contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    };
  
    return (
    <Wrapper>
      <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      
      <h2>Contacts</h2>
        {<Filter value={filter} onChange={handleFilter} />}
        {getFiltredContacts()[0] && contacts[0] ?
          <ContactList items={getFiltredContacts()} onDeleteContact={deleteContact} /> :
           <Notification>No contacts found...</Notification>} 
      <GlobalStyle />
    </Wrapper>
  )};

