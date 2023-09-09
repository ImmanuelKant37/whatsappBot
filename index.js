const qrcode = require('qrcode-terminal');
const enviarRespuestaAutomatica = require('./chatbot.js'); // Asegúrate de proporcionar la ruta correcta al archivo

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    phoneNumber: '5493454147145', // Reemplaza con tu número de teléfono
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    console.log('On QR!');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Authenticated');
});

client.on('change_state', state => {
});

client.on('state_change', state => {
});

client.on('ready', () => {
    console.log('Client is ready!');
    // Puedes realizar acciones aquí una vez que el cliente esté listo.
});
client.on('message', async message => {
    const remitenteNaza = '5493454263127@c.us'
    const remitenteAio  = '5493454131152@c.us'
    const remitenteMama = '5493454346151@c.us'
    const remitenteJona = '5493454144142@c.us'
    const chat = await message.getChat();


     if(message.from === remitenteMama  ){
      //  chat.sendTypingState(150 * message.body.length);
      
        
        enviarRespuestaAutomatica(client, chat,remitenteMama,message.body)
    }
    else if(message.from === remitenteNaza  ){
        chat.sendTypingState(150 * message.body.length);

        enviarRespuestaAutomatica(client, remitenteNaza,message.body)
    }
    
});

client.initialize();
