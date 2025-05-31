import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { languagesData } from './languages';

export default function App() {
  const [currentWord, setCurrentWord] = useState('react') //initialize state
 
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

  //turn the current word into an array, and map over the letters, set the index as the key prop
  const letterElements = [...currentWord].map((letter, index) => (
    <span key={index} className='span-current-word'>
      {letter}
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
        <section className='section-word-display'>
            {letterElements}
        </section>
      </main>
  )
}
