import React, { useState } from 'react';
import axios from 'axios';
import './css/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Konfiguracja danych autentykacyjnych WooCommerce
    const consumerKey = 'ck_f1bc574fd9537976604327a5769e97a0b7e19095';
    const consumerSecret = 'cs_1115df5a1163d050660f304b57c109d9af96b3e3';

    // Konfiguracja parametru dla Axios
    const axiosConfig = {
      headers: {
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
      params: {
        verify_ssl: false,
      },
    };

    try {
      // Wysłanie żądania do endpointu WooCommerce do rejestracji
      const response = await axios.post(
        'https://wootest.scharmach.pl/wp-json/wc/v3/customers',
        {
          username,
          first_name,
          last_name,
          password,
          email,
        },
        axiosConfig
      );

      const newUser = response.data;
      console.log('Nowy użytkownik:', newUser)

      // Tutaj możesz zrobić coś z nowym użytkownikiem, np. przechować go w stanie aplikacji
      alert('Udało się zarejestrować.');

      // Czyszczenie błędu
      setError('');
    } catch (error) {
      // Sprawdź, czy jest odpowiedź od serwera i czy zawiera szczegóły błędu
      if (error.response) {
        console.error('Błąd rejestracji:', error.response.data);
        
        // Sprawdź, czy to błąd związany z zajętym adresem e-mail lub nazwą użytkownika
        if (error.response.data.code === 'registration-error-email-exists') {
          alert('Konto z Twoim adresem e-mail jest już zarejestrowane.');
        }
        else if (error.response.data.code === 'registration-error-username-exists'){
          alert('Niestety ta nazwa użytkownika jest już zajęta')
        }
        else {
          alert('Niestety coś poszło nie tak.');
        }
      } else if (error.request) {
        // Żądanie zostało wysłane, ale nie otrzymało odpowiedzi
        alert('Błąd rejestracji - brak odpowiedzi:', error.request);
      } else {
        // Błąd konfiguracji żądania
        alert('Błąd konfiguracji żądania rejestracji:', error.message);
      }
    }
  };

  return (
    <div className='register-page'>
      <h2>Załóż konto:</h2>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={handleRegister} className='register-form'>
        <div className='form-group'>
          <label>Nazwa użytkownika:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Imię:</label>
          <input
            type='text'
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Nazwisko:</label>
          <input
            type='text'
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Hasło:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>E-mail:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Załóż konto</button>
      </form>
    </div>
  );
};

export default Register;
