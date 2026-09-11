import winston from "winston";
import expressWinston from "express-winston";

const LOGS_FILE_NAME = "request.log";
const LOGS_FOLDER = "logs";

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: LOGS_FILE_NAME,
      dirname: LOGS_FOLDER,
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});
