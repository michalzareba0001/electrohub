import React from 'react'
import './css/AboutUs.css'
import { Link } from 'react-router-dom'
import CompanyImg from '../Assets/przyjaciele-smieja-sie-i-bawia_edited.webp'
const AboutUs = () => {
  return (
    <div className='about-us'>
      <div className='about-us-left'>
        <h1>O Nas</h1>
        <h2>Witaj w ElectroHub!</h2>

        <p>Jesteśmy zespołem pasjonatów technologii, dla których świat elektroniki to nie tylko praca, ale przede wszystkim fascynująca podróż po nieznanym. W ElectroHub nie tylko dostarczamy najnowsze gadżety elektroniczne, ale również dzielimy się naszą wiedzą i pasją z Tobą.</p>

        <h2>Nasza Misja</h2>
        <p><strong>Naszą misją jest przekształcanie Twoich codziennych doświadczeń poprzez innowacyjne i wysokiej jakości produkty elektroniczne.</strong> Wierzymy, że technologia może ułatwić życie, dostarczając nowoczesne, funkcjonalne i kreatywne rozwiązania.</p>

        <p><strong>Co Nas wyróżnia?</strong>
          Innowacyjność: Przeszukujemy świat, aby dostarczyć Ci najnowsze trendy i innowacje z dziedziny elektroniki. Nasza oferta obejmuje produkty, które nie tylko spełnią Twoje oczekiwania, ale także zaskoczą Cię swoją nowatorskością.
        </p>

        <p><strong>Jakość:</strong> W ElectroHub cenimy jakość ponad wszystko. Każdy produkt, który trafia do naszej oferty, przechodzi rygorystyczne testy, aby zapewnić Ci trwałość, niezawodność i satysfakcję.
        </p>
        <p><strong>Pasja:</strong> Kochamy to, co robimy, i chcemy, abyś podzielał(a) z nami tę pasję do elektroniki. Nasz zespół składa się z ekspertów, którzy nie tylko znają się na rzeczy, ale także uwielbiają dzielić się swoją wiedzą z Tobą.
        </p>
        <p><strong>Obsługa Klienta:</strong> Twoje zadowolenie jest dla nas priorytetem. Nasi eksperci ds. obsługi klienta są gotowi pomóc w każdej kwestii, abyś mógł(a) cieszyć się zakupami u nas.
        </p>
        <h2>Dołącz do Nas!</h2>
        <p>Razem z ElectroHub wyruszamy w podróż pełną elektryzujących odkryć. Przekonaj się sam(a), dlaczego jesteśmy miejscem, które elektryzuje Twoje zainteresowania!
        </p>
        <h3>Dziękujemy, że jesteś z nami!</h3>

        <h3>Zespół ElectroHub</h3>

      </div>
      <div className='about-us-right'>
       <img src={CompanyImg} alt='Company' className='company-img'/> 
       <Link to='/contact'><button>Kontakt</button></Link>

      </div>
    </div>

  )
}

export default AboutUs