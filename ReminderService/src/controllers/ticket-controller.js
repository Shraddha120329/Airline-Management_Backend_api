const TicketService = require('../services/email-service');

const create = async (req, res) => {
    try {
        const response = await TicketService.createNotification(req.body);
        return res.status(201).json({
            message: 'Successfully registered an email reminder',
            success: true,
            err: {},
            data: response,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Unable to register an email reminder',
            success: false,
            err: error,
            data: {}
        });
    
    }
}

module.exports ={
    create
}