# Link pagina (Heroku) 
https://prsteam2.herokuapp.com/

## 👤 Usuario creado
Mail: civargas5@uc.cl
Clave: 123456

# TeamPatch

## Sobre TeamPatch 🏀

TeamPatch es una aplicación web que le otorga a los usuarios la posibilidad de crear equipos para distintos deportes, solicitar hacerse parte de estos mismos, chatear con otros usuarios, encontrar recintos deportivos y mandarles una solicitud para arrendar alguna de sus canchas. Por otro lado, distintos recintos deportivos también pueden ser parte de TeamPatch y ofrecer sus canchas especificando sus dimensiones, precios y una descripción. El tipo de usuario se especifica desde el principio, previo al formulario de creación de usuario. 

Un usuario al crear un equipo se hace automáticamente capitán de este, como capitán, el usuario podrá acceder a una lista de solicitudes de otros usuarios que buscan ser parte del equipo. Esta lista la puede encontrarse en el perfil del mismo equipo. Como capitán además, puede editar el perfil del equipo. 

Como jugador se puede crear un nuevo equipo desde **Mis Equipos** y como recinto deportivo se puede crear una nueva cancha desde **Mis Canchas**.

## 🗂️ Diagramas 

Se realizaron diagramas de entidad/relación, wireframes y casos de uso. Todos ellos están incluidos en la carpeta _`./docs/entrega1`_

## 📬 Mailer

Al registrarse en la aplicación, llega un mail automático al mail del usuario. Este mailer automático es administrado por SendGrid.

## Nuestra NavBar
Nuestra NavBar es diferente dependiendo del tipo de usuario que se encuentra logueado (usuario jugador o usuario recinto deportivo), esta facilita el acceso a los _index_ de los distintos tipos de modelos de la aplicación web, estos son, usuarios, recintos deportivos y equipos, además, en caso de ser un jugador, puedes ver equipos propios del usuario logeado y solicitudes mandadas. En el caso contrario, de ser un recinto deportivo, se tiene acceso a las canchas propias del usuario y sus reservas. 

## 🚫 Protección de id

De manera de aumentar la seguridad, con la librería ``jwt-simple'' se encriptaron los id de las entidades en las rutas, por lo que, por medio del url no se puede saber qué id es el que se está mostrando en la view, dado que se mostrará la encriptación.

## Filtros
Algunas de estas vistas _index_ tienen filtros para poder facilitar la búsqueda de distintos modelos. Los usuarios se pueden filtrar por nombre y apellido y los equipos pueden filtrarse en base al deporte que practican.

## 🌚 Light/Dark Mode 
La NavBar también entrega un dropdown menu para cambiar el modo visual de la página, esta puede ser Auto, Light y Dark. El Auto Mode depende del modo del sistema operativo que esté accediendo a la página. 

## 📷 Manejo de imagenes 
TeamPatch maneja las imágenes con un S3 bucket publico, servicio facilitado por AWS. 

## ❌ Manejo de Errores
TeamPatch consta de un middleware que se preocupa de, en caso de toparse con algun error de codigo, redireccionar a una view de error 404 o 500 la cual le explica al usuario que hubo un error y se le entrega tambien un boton para volver al inicio. 

# React ⚛️
Si bien la aplicación se realizó casi toda en koa, se expusieron algunas funcionalidades en React, tres de estas fueron las siguientes:

## Funcionaldiad I: Formulario y Boton de Log In

El formulario y botón de Login están en React, tal que al haber algún error en los datos ingresados, se despliegue un mensaje informando que hubo un error sin refrescar la página. El botón, por otro lado, cambia de estado al ser apretado, cambiando su texto a “Cargando…” y poniéndose como disabled, para evitar que un usuario apreté dos veces este y termine registrado dos veces.

## Funcionaldiad II: MapBox 📍

Como el mapa de Mapbox que se despliega en los perfiles de los recintos deportivos se demora en cargar, se decidió colocarlo como un componente React, tal que mientras se carga, se muestre un icono que haga saber al usuario que el mapa se esta cargando. 

## Funcionaldiad III: Fotos de Perfil

Como demora más la carga de las fotos que el contenido, se realizó en react un estándar de `cargando…` apenas se despliega la página, de manera que en caso de tener mala conexión, se sabrá que hay una imagen intentando cargarse en el perfil.

# API

## API consumida
TeamPatch consume 2 API, la primera es mediante un request que permite obtener los valores de latitud y longitud en base a la dirección del recinto deportivo. La segunda API usa esta información para luego poder ubicar el recinto en un mapa via MapBox y mostrarlo en el perfil de este. 

## API expuesta
Se expuso un endpoint en la ruta https://prsteam2.herokuapp.com/api/recinto_deportivos, en esta ruta se expone la información de los recintos deportivos, de modo que pueda ser utilizada por otra entidad autorizada. Esta ruta está protegida mediante un token de ingreso de sesión, por lo que, para los usuarios no autorizados no será posible acceder a la información. 

## Cómo consumir API
En la carpeta `./api` se detalló un archivo `consumirapi.rb`, donde se ejemplifica como se puede acceder a la información de la api. Primero se debe realizar un `POST` a la ruta https://prsteam2.herokuapp.com/api/auth, con un header de la forma 

`correo` => `[correo]`

`contraseña` =>`[contraseña]`

Si este request es correcto, se recibirá un token de respuesta, este token se debe ingresar en un request `GET`, a la ruta https://prsteam2.herokuapp.com/api/recinto_deportivos. Si el token es válido, la respuesta de esta request será la información de los recintos deportivos


# Referencias:

Chat: https://www.w3schools.com/howto/howto_css_chat.asp

Boton: https://codepen.io/chancesq/pen/abvjGpN

Navbar:https://codepen.io/magnificode/pen/bdWYwy

Profile Card: https://codepen.io/veronicadev/pen/WJyOwG
