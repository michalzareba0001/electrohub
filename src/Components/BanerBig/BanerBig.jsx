import React, { useState, useEffect } from 'react';
import './BanerBig.css';

const BanerBig = ({ currentIndex }) => {
    const [bannerData, setBannerData] = useState(null);
    const [featuredMediaUrl, setFeaturedMediaUrl] = useState(null);
    const [additionalImageUrl, setAdditionalImageUrl] = useState(null);
    

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await fetch('https://wootest.scharmach.pl/wp-json/wp/v2/banery');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBannerData(data[currentIndex]); // Załóżmy, że pierwszy element to "Baner 1"

                // Pobierz URL obrazka wyróżniającego
                const featuredMediaResponse = await fetch(data[currentIndex]._links['wp:featuredmedia'][0].href);
                const featuredMediaData = await featuredMediaResponse.json();
                setFeaturedMediaUrl(featuredMediaData.source_url);

                // Pobierz URL dodatkowego obrazka
                const additionalImageId = data[currentIndex].acf.dodatkowy_obrazek;
                const additionalImageResponse = await fetch(`https://wootest.scharmach.pl/wp-json/wp/v2/media/${additionalImageId}`);
                const additionalImageData = await additionalImageResponse.json();
                setAdditionalImageUrl(additionalImageData.source_url);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };
        fetchBannerData();
        
    }, [currentIndex]);
   
    const containerStyle = {
        backgroundImage: `url(${featuredMediaUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className='banner-big' style={containerStyle}>
            {bannerData && (
                <>
                        <div className="banner-left">
                            <h2>{bannerData.acf.duzy_opis}</h2>
                            <h3>{bannerData.acf.maly_opis}</h3>
                            <p>{bannerData.acf.link}</p>
                        </div>
                        <div className='banner-right'>
                            {additionalImageUrl && <a href={bannerData.acf.link}><img src={additionalImageUrl} alt='dodatkowy obrazek' /></a>}
                        </div>
                </>
            )}
        </div>
    );
};

export default BanerBig;