[![Action ci](https://github.com/SourerDev/api-properties-you/actions/workflows/action_ci.yml/badge.svg)](https://github.com/SourerDev/api-properties-you/actions/workflows/action_ci.yml)

# Api - Properties & You

Este repositorio es la API de Properties and You, que nos permitirá realizar solicitudes de información para presentarla en el front-end. Con esta API, podremos acceder a datos importantes sobre propiedades, como su ubicación, características y precios, para que los usuarios puedan buscar propiedades que se ajusten a sus necesidades específicas. Además, la API nos permitirá actualizar la información de las propiedades en tiempo real para garantizar que los usuarios estén viendo información precisa y actualizada.

## Comenzando 🚀

### Pre-requisitos 📋

Debes contar con los siguientes requisitos:

```text
node 18.8.1
nodemon 
```

### Instalación 🔧

**Primero** Debes hacer un fork del repositorio y luego clonar

Asegurate de crear el archivo ` .env ` en el directorio raíz, con la siguiente variables de entorno:

```javascript
DATABASE = ""
SECRET_KEY = ""

#variables para el envio de email
NODEMAILER_USER=''
NODEMAILER_PASS=''
```

*También puedes mirar el archivo* `.env.example`

**Luego** instala las dependencias necesarias

```bash
npm i
```

**Finalmente** tienes los siguientes scripts para hacer funcionar la API → `npm start` para un ambiente de producción y `npm run dev` para un ambiente de desarrollo.

## Construido con 🛠️

* [express.js](https://expressjs.com/es/starter/installing.html) - server

## Wiki 📖

Encontrará más información sobre este proyecto en nuestra [Wiki](https://github.com/SourerDev/proyecto-final-frontend/wiki)

## Autores ✒️

**Yhonier Alegria** - _Initial Work and maintenance_ - [SourerDev](https://github.com/SourerDev).\
**Tomás Pérez** - _Initial Work and maintenance_ - [TomasPerez1](https://github.com/TomasPerez1).\
**Enzo Monti** - _Initial Work_ - [enzo2022](https://github.com/enzo2022).\
**Arturo Gutierrez** - _Initial Work_ - [arturogutierrez11](https://github.com/arturogutierrez11).\
**Chantal Coutenceau** - _Initial Work_ - [chanticou](https://github.com/chanticou).\
**Agustin Berger** - _Initial Work_ - [Agustin-Berger](https://github.com/Agustin-Berger).\
**Rodrigo Mauricio** - _Initial Work_ - [rmalegr](https://github.com/rmalegr).\
**Hermes Ortiz** - _Initial Work_ - [asouesou](https://github.com/asouesou)
