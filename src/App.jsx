import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { languagesData } from './languages';
import clsx from 'clsx'
import { getFarewellText } from './utils';

export default function App() {
  // State values
  const [currentWord, setCurrentWord] = useState('react') //initialize state
  const [ guessedLetters, setGuessedLetters ] = useState([]) //initialize an empty array

  //Derived Values 
  const wrongGuessCount = 
    guessedLetters.filter(letter => !currentWord.includes(letter)).length;
  const isGameWon = 
    currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = 
    wrongGuessCount >= languagesData.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  
  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

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
  const languagesElement = languagesData.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;
    
    return (
      <span
        aria-label= {isLanguageLost ? "Lost language" : language.name}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color
        }}
        className={clsx(
          'span-languages',
          isLanguageLost && 'span-languages-lost'
        )}
      >
        {language.name}
      </span>
  )
})

  //turn the current word into an array, and map over the letters, set the index as the key prop
  const letterElements = [...currentWord].map((letter, index) =>  (
    <span key={index} className={clsx('span-current-word')}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : <span> </span>} 
    </span> 
    ));

  //display the keyboard, change to uppercase
    const keyboardElements = [...alphabet].map((letter) => {
    //update the color of the keyboard key when the letter is correct or incorrect
    const isGuessed = guessedLetters.includes(letter); //Has this letter been guessed yet?
    const isCorrect = isGuessed && currentWord.includes(letter); //The letter has been guessed and it is in the current word
    const isIncorrect = isGuessed && !currentWord.includes(letter); //The letter has been guessed and it is NOT in the current word

    return (
      <button 
        aria-label={`Guess letter ${letter.toUpperCase()}`}
        key={letter}
        className={clsx(
          'btn',
          'btn-keyboard',
          {
            'btn-keyboard_correct': isCorrect,
            'btn-keyboard_incorrect': isIncorrect
          }
        )}
        onClick={() =>  addGuessedLetter(letter)} //pass the letter as a string
        disabled={isGameOver}  //Disable the keyboard when the game is over
        >
          {letter.toUpperCase()}
      </button>
    );
});

 function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
            <>
              {getFarewellText(languagesData[wrongGuessCount - 1].name)}
            </>
             )
        }
        if (isGameWon) {
            return ( 
            <>  <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
            )
        } 
        if (isGameLost) {
            return (
            <>  <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
            )
        }
        return null
   }

  return (
      <main>   

        <Header />

        <section 
          aria-live="polite" 
          role="status"
          className={clsx(
            'section-game-status',
          {
            'section-game-status_won': isGameWon,
            'section-game-status_lost': isGameLost,
            'section-game-status_farewell': !isGameOver && isLastGuessIncorrect
          }  
          )}
        >
           {renderGameStatus()}

        </section>
    
        <section className={clsx('section-language-container')}>
            {languagesElement}
        </section>

        <section className={clsx('section-word-display')}>
            {letterElements}
        </section>
        
        <section className={clsx('section-keyboard')}>
          {keyboardElements} 
        </section>

      { isGameOver ? 
        <button aria-label='Start a new game' className={clsx('btn', 'btn-new-game')}>
            New Game
        </button> :
           null}

      </main>
  )
}
