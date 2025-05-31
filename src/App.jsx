import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { languagesData } from './languages';

export default function App() {
  
const languagesElement = languagesData.map(language => (
  <span
    key={language.name}
    style={{
      backgroundColor: language.backgroundColor,
      color: language.color
    }}
    className='span-languages'
  >
    {language.name}
  </span>
))

  return (
      <main>   
        <Header />
        <section className='section-game-status'>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
        <section className='section-language-container'>
            {languagesElement}
        </section>
      </main>
  )
}
