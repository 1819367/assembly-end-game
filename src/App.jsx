import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';

export default function App() {
  
  return (
      <main>   
        <Header />
        <section className='section-game-status'>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
      </main>
  )
}
