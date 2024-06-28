import React from 'react';
import Homecontent from './HomeContent';
import Navbar from './Navbar';
import Footer from './Footer';

function Home() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Navbar />
      <Homecontent />
      <Footer />
    </div>
  );
}

export default Home;
