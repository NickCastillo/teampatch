import React from 'react';
import { hot } from 'react-hot-loader';
import { useEffect, useState} from 'react';
const jwt = require("jwt-simple");

function buildPerfilPath(userId) {
  return `/users/${jwt.encode(userId, 'xxx')}/perfil-react`;
}

const fetchPerfil = (userId) => {
  fetch(
    buildPerfilPath(userId))
    .then(response => response.json())
};


const handleClick = () => {
  console.log("click");
};


function Perfiles({data}) {

  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    console.log("publicamos");
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <img src={data.userFoto} className="card-img" width="160" height="200"/>
      </div>
      
  );
}

export default hot(module)(Perfiles);
