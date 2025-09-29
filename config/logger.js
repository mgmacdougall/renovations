import winston from 'winston';
const logger = winston.createLogger({
    level: 'info', // Minimum level to log
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Logs to console
        new winston.transports.File({ filename: 'logs/app.log' }) // Logs to file
    ]

});

export default logger;