import React, { useState } from 'react';
import './css/Contact.css';
import BanerBig from '../Components/BanerBig/BanerBig';
import Mapa from '../Components/Mapa/Mapa';

const Contact = () => {
  // Stan dla danych formularza
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  // Funkcja do obsługi zmiany w polach formularza
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkcja do obsługi przesyłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://wootest.scharmach.pl/wp-content/themes/wootesttheme/handle-contact-form.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
          alert('Niestety coś poszło nie tak. Wyślij maila na adres: test@testowo.pl')
      }

      alert('Formularz został wysłany');
  } catch (error) {
      console.error('Błąd podczas wysyłania formularza:', error);
  }
};

  return (
    <div className='contact'>
      <BanerBig currentIndex={1} />
      <div className='contact-main'>
        <div className='contact-left'>
          <div className='contact-adres'>
            <h4>Adres:</h4>
            <p>
              ulica testowa 33
              <br />
              00-001 Testowo
            </p>
          </div>
          <div className='contact-tel'>
            <h4>Telefon:</h4>
            <a href='tel:0048555555555'>+48 555 555 555</a>
          </div>
          <div className='contact-mail'>
            <h4>E-mail:</h4>
            <a href='mailto:test@testowo.pl'>test@testowo.pl</a>
          </div>
        </div>
        <div className='contact-right'>
          <form onSubmit={handleSubmit} className='contact-form'>
            <div className='form-group'>
              <label>Imię:</label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>Nazwisko:</label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>E-mail:</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Wiadomość:</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type='submit'>Wyślij</button>
          </form>
        </div>
      </div>
      <div className='contact-mapa'>
        <h2>Zobacz nas na mapie</h2>
        <Mapa />
      </div>
    </div>
  );
};

export default Contact;
