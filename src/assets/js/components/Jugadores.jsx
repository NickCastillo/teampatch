import React from 'react';
import { hot } from 'react-hot-loader';
import Carduser from './Carduser';


function Jugadores(props){
    return (
      <div>
        <h3 className="no-margin-vert profile-subtitle"> Jugadores </h3>
          <div className="cardscroll">
            <div className="card-container">
              <div className="card-body no-padding-top">
               
              </div>
            </div>      
          </div>
      </div>
    );
  }

export default hot(module)(Jugadores);

