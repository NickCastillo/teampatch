import React from 'react';
import { hot } from 'react-hot-loader';

function SignInBtn(props) {
    
    //console.log("props:", props.data);

    const [info, setInfo] = React.useState({
        'nombre': '',
        'username': ''
    });
    const [loading, setLoading] = React.useState(false);
   
    function buildcreateUserPath(){
        return 'users-create';
    }

    const createForm = (nombre, username) => {
        console.log("En createForm: ", nombre, username);
        fetch(buildcreateUserPath()), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({nombre, username})
        }
    }
    
    const handleClick = () => {
        setLoading(true)
        console.log("para create: ", info["nombre"], info["username"])
        createForm(info["nombre"], info["username"])
        .then((response) => {
            if (response.status === 201){
                console.log("submitted")
            }
        })
    }

    const myChangeHandler = (event) => {
        event.preventDefault();
        const key = event.target.name;
        const val = event.target.value;
        setInfo({
            [key]: val
        });
        console.log(key, val)
    }

    return (
        <div>
          <label forhtml="name">Nombre</label>
          <input className="input_form" type="text" id="nombre" name="nombre" onChange={myChangeHandler} value={info.nombre}
          placeholder="Nombre" required/>

          <label forhtml="username">Username</label>
          <input className="input_form" type="text" id="username" name="username" onChange={myChangeHandler} value={info.username}
          placeholder="Username" required/>

          <label forhtml="correo">Email</label>
          <input className="input_form" type="text" id="correo" name="correo" onChange={myChangeHandler} value={info.correo}
          placeholder="Email" required/>

          <label forhtml="foto">Foto</label>
          <input type="file" id="foto" name="foto" onChange={myChangeHandler} value={info.foto} />
          <br></br>
          <br></br>

          <label forhtml="telefono">Numero de Telefono</label>
          <input className="input_form" type="text" id="telefono" name="telefono" onChange={myChangeHandler} value={info.telefono}
          placeholder="Numero de Telefono" required/>

          <label forhtml="contrasena">Contraseña</label>
          <input className="input_form" type="password" id="contrasena" name="contrasena" onChange={myChangeHandler} value={info.contrasena}
          placeholder="Contraseña" required/>

            <div className="clearfix">  
                <button type="submit" 
                        className="disabled_nick"
                        onClick={handleClick} 
                        disabled={loading}
                        > 
                        {loading ? 'Cargando...': 'Sign Up'} </button>
            </div>
        </div>
    
  );
}

export default hot(module)(SignInBtn);
