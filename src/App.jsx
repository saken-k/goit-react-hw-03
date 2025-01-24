import { useEffect, useState } from "react";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import initialContacts from "./contacts.json";
import ContactForm from "./components/ContactForm/ContactForm";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  });
  const [search, setSearch] = useState("");

  const addContacts = (newContact) => {
    setContacts((prev) => {
      const isDuplicate = prev.some(
        (contact) => contact.number === newContact.number
      );

      if (isDuplicate) {
        iziToast.error({
          title: "Error",
          message: "This number already exists in the contact list.",
          position: "topRight",
          timeout: 3000,
        });
        return prev;
      }

      iziToast.success({
        title: "Success",
        message: "Contact added successfully!",
        position: "topRight",
        timeout: 3000,
      });

      return [...prev, newContact];
    });
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (contactId) => {
    setContacts((prev) => {
      return prev.filter((contacts) => contacts.id !== contactId);
    });
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContacts} />
        <SearchBox value={search} onSearch={setSearch} />
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </div>
    </>
  );
}

export default App;
