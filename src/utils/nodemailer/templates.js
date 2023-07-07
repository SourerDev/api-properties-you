module.exports = {
  registerMessage: ({ userName }) => `
  <html>
  <head>
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      p {
        padding: 5px 0;
        text-align: justify;
      }
      h1 {
        font-size: 20px;
        text-align: center;
        margin-bottom: 20px;
      }
      body {
        font-family: Arial, Helvetica, sans-serif;
      }
      .content {
        position: relative;
        margin: 40px auto;
        max-width: 450px;
        border-radius: 10px;
        padding: 10px 30px;
        box-shadow: 1px 1px 4px 1px rgba(128, 128, 128, 0.579);
      }
      header {
        width: 65px;
        margin: 5px auto;
      }
      .img-header {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background-color: #eceff1;
        overflow: hidden;
      }
      main {
        margin-top: 40px;
      }
      .content-btn {
        padding: 20px 0;
        text-align: center;
      }
      .btn-verify {
        padding: 10px 20px;
        background: #16486f;
        border-radius: 10px;
        color: white;
        font-weight: 400;
        text-decoration: none;
        font-size: 20px;
      }

      footer {
        display: flex;
        border-top: 1px solid rgba(128, 128, 128, 0.609);
        margin-top: 20px;
        padding: 10px 0;
      }
      .ft-logo {
        font-size: 18px;
        width: 90%;
        display: flex;
      }
      .icon {
        background-color: #dddfe2;
        border-radius: 50%;
        padding: 1px;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <header>
        <img
          class="img-header"
          width="50"
          height="50"
          src="https://isewa.org.in/wp-content/uploads/2021/06/success.gif"
          alt="Properties and you temporal image"
        />
      </header>
      <main>
        <h1>¡Bienvenido a Properties & You!</h1>
        <p>Hi <strong> ${userName} </strong>,</p>
        <p>
          Estamos encantados de darte la bienvenida a nuestra aplicación web, el
          lugar perfecto para encontrar las propiedades e inmuebles de tus
          sueños. Aquí, te ofrecemos una experiencia única y personalizada para
          facilitar tu búsqueda y ayudarte a encontrar el hogar perfecto.
        </p>

        <p>
          No importa si eres un comprador, un vendedor o simplemente estás
          buscando inspiración, <strong>Properties & You</strong> es el lugar
          ideal para satisfacer tus necesidades inmobiliarias. Nuestro equipo de
          profesionales altamente capacitados está listo para brindarte
          asistencia personalizada y responder a todas tus preguntas.
        </p>

        <p>
          Así que adelante, comienza tu emocionante viaje en
          <strong>Properties & You</strong>. Esperamos que encuentres
          <em>exactamente lo que buscas</em> y que esta aplicación se convierta
          en tu compañero de confianza en tu búsqueda de propiedades.
        </p>

        <div class="content-btn">
          <a
            class="btn-verify"
            href="https://properties-you-development.vercel.app/"
          >
            Verificar cuenta</a
          >
        </div>
      </main>
      <footer>
        <div class="ft-logo">
          <img
            width="30"
            height="30"
            src="https://images.vexels.com/media/users/3/142719/isolated/preview/f07a4b2d673e9935e58e6ff8262d4a1d-icono-de-casas-de-triangulo.png"
            alt="Properties and you temporal image"
          />
          <p>Properties & You</p>
        </div>
        <a
          href="https://github.com/SourerDev/Proyecto-Final-Frontend"
          target="_blank"
        >
          <img
            width="30"
            height="30"
            class="icon"
            src="https://cdn-icons-png.flaticon.com/512/2111/2111612.png"
            alt=""
          />
        </a>
      </footer>
    </div>
  </body>
</html>

  `,
}
/**
 * <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style></style>
    </head>
    <body>
    </body>
  </html>
*/
