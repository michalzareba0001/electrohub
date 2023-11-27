import React from 'react';
import { useUser } from '../Context/UserContext';
import './css/UserPanel.css';

const UserPanel = () => {
  const { user } = useUser();

  return (
    <div className='user-panel-page'>
      {user ? (
        <>
          <h2>{user.username}</h2>
          <h3>{user.name}</h3>
          <p>Imię: {user.first_name}</p>
          <p>Nazwisko: {user.last_name}</p>
          <p>{user.id}</p>
          {/* Dodaj inne informacje o użytkowniku, jeśli są dostępne */}
        </>
      ) : (
        <p>Użytkownik niezalogowany</p>
      )}
    </div>
  );
};

export default UserPanel;
