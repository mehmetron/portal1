// @ts-nocheck
import React, { useState, useEffect } from "react";

// Resource where I learned about DRF sessionauth with cookies
// https://www.youtube.com/watch?v=HYOvEIimVzI
import Cookies from "js-cookie";

export default function Dashboard() {
  const [state, setState] = useState([]);
  useEffect(() => {
    const query = async () => {
      const apiCall = await fetch(`http://127.0.0.1:8000/api/lead`);
      const user = await apiCall.json();
      setState([...user]);
    };
    query();
  }, []);

  const create = () => {
    fetch(`http://127.0.0.1:8000/snippets/2`, {
      method: "DELETE",
      headers: {
        "X-CSRFTOKEN": Cookies.get("csrftoken"),
      },
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => create()}>Delete</button>
      <p>Your session auth cookie is: {Cookies.get("csrftoken")}</p>
      <ul>
        {state.map((contact) => {
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
