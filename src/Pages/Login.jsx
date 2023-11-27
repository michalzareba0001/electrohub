import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import './css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
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
      // Wysłanie żądania do endpointu WooCommerce do autentykacji
      const response = await axios.post(
        'https://wootest.scharmach.pl/wp-json/jwt-auth/v1/token',
        {
          password,
          username,
        },
        axiosConfig
      );

      // Przetwarzanie odpowiedzi (otrzymasz token dostępowy)
      const accessToken = response.data.token;

      // Pobranie dodatkowych informacji o użytkowniku
      const userResponse = await axios.get('https://wootest.scharmach.pl/wp-json/wp/v2/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Pobranie imienia i nazwiska użytkownika z odpowiedzi
      const {name, id } = userResponse.data;

      

      // Ustawienie użytkownika w kontekście
      setUser({
        username: username,
        accessToken: accessToken,
        name: name,
        id: id,
      });

      console.log('Dane użytkownika:', userResponse.data);

      // Tutaj możesz zrobić coś z tokenem, np. przechować go w stanie aplikacji lub w local storage

      console.log('Udało się zalogować. Token dostępowy:', accessToken);

      // Przekierowanie do panelu użytkownika
      navigate('/userpanel');
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-left'>
        <h2>Zaloguj się</h2>
        <form onSubmit={handleLogin} className='login-form'>
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
            <label>Hasło:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Zaloguj się</button>
        </form>
      </div>
      <div className='login-right'>
        <div className='register-div'>
          <h2>Nie masz jeszcze konta? </h2>
          <Link to='/register' alt='rejestracja'><button>Załóż konto</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
