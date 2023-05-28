const nodemailer = require('nodemailer')

const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS } =
  process.env

// TRANSPORT NODEMAILER CONFIGURATION
const transport = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
})

const registerMessage = (userName, email) => ({
  from: '"Properties&you" <pfgrupo05a@gmail.com>',
  to: email,
  subject: 'Gracias por registrarse en Properties&you',
  text: `Bienvenido ${userName} a Properties&you, su registro fue exitoso`,
  html: `<p style="text-align:center;">Bienvenido ${userName} a Properties&you, su registro fue exitoso</p>
  </br>
  <div style="text-align:center;">
  <img src="https://isewa.org.in/wp-content/uploads/2021/06/success.gif" alt="thanks!" />
  </div>`,
})

const messageForUsersCreateProperty = (data, email, userName) => ({
  from: 'Propertis&you <pfgrupo05@gmail.com>',
  to: email,
  subject: 'Registo de Propiedad',
  text: 'Registro exitoso',
  html: `<p style="text-align:center;">
          Hola ${userName} !!, Gracias por confiar en nosotros. 
          Estaremos encantados de ayudarle a vender o Arrendar su casa,
          por lo que pronto nos contactaremos con usted.
  
          Cordial saludo
`,
})

const sendEmailToOwner = (
  email,
  userName,
  cellphone,
  photo,
  emailOwuner,
  userNameOwner,
) => ({
  from: 'Properties&you <pfgrupo05a@gmail.com>',
  to: emailOwuner,
  subject: 'Registo de Propiedad',
  text: 'Propertis&you, un usuario esta interesado en su propiedad!',
  html: `<p style="text-align:center;">
          Hola ${userNameOwner} !!, el usuario ${userName} esta interesado en su propiedad. Aqui le dejamos los datos de interesado. 
          Datos personales:
          <div>
            <ul>
            <li>
              <img style='width:100px; heigth:100px' src=${photo} alt='foto'>
            </li>
            <li>
             Telefono ${cellphone},
            Email: ${email}
            </li>
            </div> 
          </div>
          Contactese con el/ella a la brevedad! 
  
          Cordial saludo,
          Propertis&you.
`,
})

// const messageForClient = (userName, email) => {
//   return (message = {
//     from: "Propertis&you' <pfgrupo05@@gmail.com>",
//     to: email,
//     subject: `Registo de Propiedad`,
//     text: `Registro exitoso`,
//     html: `<p style="text-align:center;">
//           Hola ${userName} !!, Gracias por confiar en nosotros.
//           Estaremos encantados de ayudarle a vender o Arrendar su casa,
//           por lo que pronto nos contactaremos con usted.

//           Cordial saludo

//           Propertis&you

//           <h2>su propiedad</h2>
//       </p>
//       </br>
//       `,
//   });
// };

module.exports = {
  transport,
  registerMessage,
  sendEmailToOwner,
  messageForUsersCreateProperty,
}
