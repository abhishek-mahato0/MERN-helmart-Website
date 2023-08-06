import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaHome } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import './footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="logo-medias">
        <img src="/images/logo.png" alt="imag"></img>
        <p>Visit My</p>
        <div className="medias">
          <Link className="link">
            <FaFacebook />
          </Link>
          <Link className="link">
            <FaInstagram />
          </Link>
          <Link className="link">
            <FaYoutube />
          </Link>
        </div>
      </div>
      <div className="about">
        <h1>About us</h1>
        <p>
          HellMart is an exclusive showroom to get all riding accessories under
          one roof at a splendid price. We also organize Biking Events, Stunts,
          Tours, Rides, Racing Events, Exhibitions Etc. Each person at Bikers
          Mart is a moto lifestyle enthusiast. We love the thrill of speed when
          on a bike. We love changing our helmets with fashion for it is the
          crown that sits on our heads. We make sure to do what we love with
          safety precautions, standard brands and fair price. We believe helmets
          and riding gears bills are cheaper than hospital bills.
        </p>
      </div>
      <div className="contact-info">
        <p>Contact us at:</p>
        <div className="phone">
          <p>
            <BsFillTelephoneFill />: 98258785717
          </p>
        </div>
        <div className="phone">
          <p>
            <MdEmail /> : abhishek.mahato98258@gmail.com
          </p>
        </div>
        <div className="phone">
          <p>
            <FaHome /> :Baneshwor<br></br>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
