import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Game from './react/Game';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderGame = () => {
  root.render(
    <React.StrictMode>
      <Game />
    </React.StrictMode>
  );
}

root.render(
    <React.StrictMode>
      <Game />
    </React.StrictMode>
);

export {renderGame}