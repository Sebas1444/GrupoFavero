import React from 'react';
import HeaderAs from './HeaderAs';
// import AgroSiloHero from './AgroSiloHero';
// import AgroSiloServices from './AgroSiloServices';
// import AgroSiloAbout from './AgroSiloAbout';
import FooterAs from './FooterAs';

export default function App() {
  return (
    <div className="flex flex-col">
      <HeaderAs />
      {/* <AgroSiloHero />
      <AgroSiloServices />
      <AgroSiloAbout /> */}
      <FooterAs />
    </div>
  );
}