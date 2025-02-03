import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Banner/Banner.css'; // Este é o arquivo CSS que você irá criars

const Banner = () => {
  return (
    <div className="banner">
      <Link to="/business" className="banner-button">
        Preencha suas informações abaixo 
      </Link>
      <div>     
      </div>
    </div>

  );
};

export default Banner;
