import pino from "pino";

const LOG_LEVEL = "debug";

const logger = pino(
  {
    level: LOG_LEVEL,
    transport: {
      targets: [
        // {
        //   target: "pino/file",
        //   options: { destination: `${__dirname}/../../../logs/app.log` },
        //   level: LOG_LEVEL,
        // },
        {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
          },
          level: LOG_LEVEL,
        },
      ],
    },
  },
);

export default logger;
