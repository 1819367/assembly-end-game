import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';

export default function App() {
  
  return (
      <main>   
        <Header />
        <section className='section-status'>
          <p>Game goes here</p>
        </section>
      </main>
  )
}
