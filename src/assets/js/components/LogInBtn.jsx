import React from 'react';
import { hot } from 'react-hot-loader';

function buildcreateUserPath(){
    return '/session/user';
}

function buildcreateRecintoPath(){
    return '/session/recinto';
}

const createFormUser =(correo, contrasena) => (
    fetch(buildcreateUserPath(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ correo, contrasena })
    })    
);

const createFormRecinto =(correo, contrasena) => (
    fetch(buildcreateRecintoPath(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ correo, contrasena })
    })    
);

function LogInBtn(props) {

    console.log(props);

    const [loading, setLoading] = React.useState(false);
    const [correo, setCorreo] = React.useState([]);
    const [contrasena, setContrasena] = React.useState([]);
    const [alert, setAlert] = React.useState("");

    const handleClick = () => {
        setLoading(true)
        var pathname = window.location.pathname;

        if (pathname == "/session/new-recinto"){
            createFormRecinto(correo["correo"], contrasena["contrasena"]).then((response) => {
                if (response.status == 302 ){
                    console.log("Agregado y Redireccionando con Status Code: ", response.status);
                    rootRedirect()
                    setLoading(false)
                } else {
                    console.log("Not submitted");
                    setAlert("Usuario y/o contraseña incorrecta")
                    setLoading(false)
                }
            })

        } else if (pathname == "/session/new-user"){
            createFormUser(correo["correo"], contrasena["contrasena"]).then((response) => {
                if (response.status == 302 ){
                    console.log("Agregado y Redireccionando con Status Code: ", response.status);
                    rootRedirect()
                    setLoading(false)
                } else {
                    console.log("Not submitted");
                    setAlert("Usuario y/o contraseña incorrecta")
                    setLoading(false)
                }
            })
        }
        
    }

    const changeHandlerCorreo = (event) => {
        event.preventDefault();
        const key = event.target.name;
        const val = event.target.value;
        setCorreo({
            [key]: val
        });
        console.log(key, val)
    }

    const changeHandlerContrasena = (event) => {
        event.preventDefault();
        const key = event.target.name;
        const val = event.target.value;
        setContrasena({
            [key]: val
        });
        console.log(key, val)
    }

    const cancelRedirect = () =>{
        location.href = "../log_in";
    }

    const rootRedirect = () =>{
        location.href = "/";
    }

    return(
        <div> 

            <p>{alert}</p>
            <label htmlFor="correo"><b>Email</b></label>
            <input className="input_form" type="text" placeholder="Enter Email" onChange={changeHandlerCorreo} name="correo" required/>

            <label htmlFor="contrasena"><b>Password</b></label>
            <input className="input_form" type="password" placeholder="Enter Password" onChange={changeHandlerContrasena} name="contrasena" required/>
           
            <div className="clearfix">  
                <button type="submit" 
                        className="disabled_nick"
                        onClick={handleClick} 
                        disabled={loading}
                        > 
                        {loading ? 'Cargando...': 'Login'} </button>
            </div>

            <button type="button" id="cancel" style={{'backgroundColor': "#35A6B4"}} onClick={cancelRedirect} >Cancel</button>


        </div>
    )
}

export default hot(module)(LogInBtn);