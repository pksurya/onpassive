import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ReduxRoot } from './ReduxRoot';

ReactDOM.render(
  <React.StrictMode>
    <ReduxRoot />    
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
