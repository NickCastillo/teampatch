import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import Perfiles from './components/Perfiles';

import Jugadores from './components/Jugadores';

import SignInBtn from './components/SignInBtn';
import LogInBtn from './components/LogInBtn';

import Map from './components/map';

const reactAppContainer = document.getElementById('react-app');
const reactSignInBtnContainer = document.getElementById('react-SignInBtn');
const reactLogInBtnContainer = document.getElementById('react-LogInBtn');
const reactMap = document.getElementById('react-map');

if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}


const perfilesAppContainer = document.getElementById('perfiles-app');

if (perfilesAppContainer) {
  const data = perfilesAppContainer.dataset;
  console.log(data)
  ReactDOM.render(<Perfiles data = {data}/>, perfilesAppContainer);
}

const jugadoresContainer = document.getElementById('react-jugadores');

if (jugadoresContainer) {
  ReactDOM.render(<Jugadores />, jugadoresContainer);
}
    
if (reactSignInBtnContainer) {
  const data = reactSignInBtnContainer.dataset
  ReactDOM.render(<SignInBtn data={data}/>, reactSignInBtnContainer);
}

if (reactLogInBtnContainer){
  const data = reactLogInBtnContainer.dataset 
  ReactDOM.render(<LogInBtn data={data}/>, reactLogInBtnContainer);
}

if (reactMap){
  const data = reactMap.dataset;
  ReactDOM.render(<Map data = {data}/>, reactMap);
}

