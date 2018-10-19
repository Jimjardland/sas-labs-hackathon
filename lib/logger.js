const winston = require('winston');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
require('winston-daily-rotate-file');

const logDir = path.join(process.cwd(), '/logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transport = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: logDir
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [transport]
});

const logError = msg => {
  console.error(chalk.red(msg));
  logger.error(msg);
};

module.exports = { logError };
