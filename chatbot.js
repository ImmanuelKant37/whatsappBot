const { dockStart, containerBootstrap } = require('@nlpjs/basic');
const container = containerBootstrap()
/*
const respuestasSaludos = [
    "¡Hola! Estás en el proceso de entrenarme. Cada vez que me saludas, aprendo que es un saludo.",
    "Hola, te estás tomando el tiempo de entrenarme. Cada vez que me dices 'Hola', asimilo lo que significa.",
    "¡Saludos! Tu saludo es una parte importante de mi entrenamiento. Cada vez que lo haces, lo registro.",
    "Hola, gracias por saludar. Cada vez que lo haces, agrego más información sobre los saludos.",
    "¡Saludos! Estás contribuyendo a mi aprendizaje cada vez que me dices 'Hola'.",
    "Hola, estoy aquí para aprender. Cada vez que me saludas, incorporo ese conocimiento.",
    "¡Hola! Cada vez que me saludan, amplío mi comprensión de los saludos.",
    "Hola, es un placer aprender contigo. Cada vez que me dices 'Hola', lo almaceno.",
    "¡Saludos! Cada vez que me saludas, agrego un nuevo dato a mi base de conocimientos.",
    "Hola, cada vez que interactúas conmigo, contribuyes a mi formación sobre los saludos."
  ];
  */
  // Puedes acceder a las respuestas individualmente así: respuestas[0], respuestas[1], ...
  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function mostrarEscribiendo() {
    console.log('Iniciar');
    await esperar(3000); // Esperar 2 segundos
}
async function enviarRespuestaAutomatica (client, chat,remitente, pregunta) {
  await container.start();
  console.log(container.configurations.nlp.corpora)
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  nlp.addLanguage('es');

  const numeroAleatorio = Math.floor(Math.random() * 10);
/*
// Añadir ejemplos de entrenamiento para el procesamiento de lenguaje natural
nlp.addDocument('es', 'Hola, ¿cómo estás?', 'saludo');
nlp.addDocument('es', '¿Qué tiempo hace hoy?', 'clima');
nlp.addDocument('es', 'Cuéntame un chiste', 'chiste');
nlp.addDocument('es', 'Hola', 'saludo');
nlp.addDocument('es', 'olis', 'saludo');*/

  await nlp.train();
  const response = await nlp.process('es', pregunta);
  
  const answers = response.answers
  if (answers.length >0){
  const respuestaMasPrecisa = answers[ Math.floor(Math.random() * answers.length)].answer != null 
                           ?  answers[ Math.floor(Math.random() * answers.length)].answer :''

    if (respuestaMasPrecisa!=''){
        chat.sendStateTyping();
        await mostrarEscribiendo()
   
    client.sendMessage(remitente, respuestaMasPrecisa);
    chat.clearMessages();

}
}  
}


module.exports = enviarRespuestaAutomatica;

