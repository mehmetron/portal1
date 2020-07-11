// @ts-nocheck
import React, { useState, useEffect } from "react";

export default function Save() {
  // const [contacts, setContacts] = useState([
  //   {
  //     id: 1,
  //     name: "bob",
  //     email: "bob@gmail.com",
  //   },
  // ]);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const query = async () => {
      const apiCall = await fetch(`http://127.0.0.1:8000/api/lead`);
      const user = await apiCall.json();
      setContacts([...user]);
    };
    query();
    // fetch("api/lead")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setContacts([...data]);
    //   });
  }, []);

  return (
    <div>
      <ul>
        {contacts.map((contact) => {
          return (
            <li key={contact.id}>
              {contact.name} - {contact.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
