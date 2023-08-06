import React from 'react';
import './css/about.css';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Footer from '../../components/footer/Footer';
const About = () => {
  return (
    <div className="about-main">
      <div className="about-poster">
        <h1>About</h1>
      </div>
      <div className="about-us">
        <div className="about-text">
          <p>
            Hellmart is an exclusive showroom to get all riding accessories
            under one roof at a splendid price.
          </p>
          <p>
            We also organize Biking Events, Stunts, Tours, Rides, Racing Events,
            Exhibitions Etc.
          </p>
          <p>
            Each person at Bikers Mart is a moto lifestyle enthusiast. We love
            the thrill of speed when on a bike. We love changing our helmets
            with fashion for it is the crown that sits on our heads. We make
            sure to do what we love with safety precautions, standard brands and
            fair price. We believe helmets and riding gears bills are cheaper
            than hospital bills.
          </p>
        </div>

        <div className="about-img">
          <img src="images/about.jpg" alt="pic"></img>
        </div>
      </div>
      <div className="them">
        <div className="about-sub">
          <h2>What they say</h2>
        </div>
        <div className="they-say">
          <img src="images/poster2.png" alt="poster"></img>
          <p>
            <FaQuoteLeft className="red" />
            I feel one with the machine as it allows me complete control and I
            entrust my life upon it. The feel of wind on my face, on my hair, My
            sharp focus and split-second decisions, The feeling of freedom and
            control. Some are in love with speed, some like the smell of tires,
            The sound of brakes, remnants of skid marks, Crowning helmets that
            make statements!
            <FaQuoteRight className="red" />
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
