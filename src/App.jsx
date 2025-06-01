import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { languagesData } from './languages';

export default function App() {
  const [currentWord, setCurrentWord] = useState('react') //initialize state
  const [ guessedLetters, setGuessedLetters ] = useState([]) //initialize an empty array
  // console.log(guessedLetters) //

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  //create a new array to hold the guessed letters, prevent duplicate letters
  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => {
       if(!prevLetters.includes(letter)) {  //If the letter is not already in the array
        return [...prevLetters, letter]  // Add the letter to the array
      }
        return prevLetters //Otherwise, return the array unchanged
    })
  }

  //display the language from the languages.js file
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

  //display the keyboard, change to uppercase
  const keyboardElements = [...alphabet].map((letter) => (
    <button 
      key={letter}
      className='btn btn-primary'
      onClick={() =>  addGuessedLetter(letter)} //pass the letter as a string
      >
      {letter.toUpperCase()}
    </button>
  ));

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

        <section className='section-keyboard'>
          {keyboardElements}
        </section>

        <button 
          className='btn btn-new-game'>New Game</button>

      </main>
  )
}
