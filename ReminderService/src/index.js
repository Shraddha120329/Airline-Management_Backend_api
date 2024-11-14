const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server-config');


//const { sendBasicEmail } = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service.js');

const jobs = require('./utils/job.js');
const { subscribeMessage, createChannel } = require('./utils/messageQueue.js');
const { REMINDER_BINDING_KEY } = require('./config/server-config.js');

const setupAndStartServer = async () => {
    const app = express();
 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY )


    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        //jobs();

        // sendBasicEmail(
        //     'bookingappservice@gmail.com',
        //     'shraddhayadav1203@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
                

        // );
    });
}

setupAndStartServer();