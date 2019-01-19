import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// Global CSS
import './style.css'

// import environmental variables
require('dotenv').config();

// bootsrap React App
ReactDOM.render(( < App / > ), document.getElementById('root'));