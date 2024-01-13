import { makeApp } from './app';
import { cmdSendDelayNotifications } from './commands/send-delay-notification.cmd';
import { cmdServer } from './commands/server.cmd';
import { logger } from './utils/logger';

async function main(argv: string[]) {
  const app = await makeApp();
  // For App Preflight
  app.options('/', (req, res) => {
    //TODO:  init setup (if any)
  });

  app.get('/_health', async (req, res, next) => {
    try {
      // db.query(`SELECT * FROM users LIMIT $1`, [5], (err res) );

      res.json({
        data: 'ok',
      });
    } catch (err: any) {
      res.json({ error: err });
    }
  });

  let cmd = argv[2];

  if (cmd !== 'server') {
    cmd = 'server';
  }

  switch (cmd) {
    case 'server':
      await cmdServer(app);
      break;
    case 'send-delay-notifications':
      await cmdSendDelayNotifications();
      break;
    default:
      logger.error({ cmd }, 'Command does not exist!');
      process.exitCode = 1;
  }
}

main(process.argv).catch((err) => {
  logger.error(err, `Uncaught error: ${err.message}`);
  process.exitCode = 1;
});

process
  .on('unhandledRejection', (why) => {
    logger.error(why ?? {}, `Unhandled rejection: ${(why as Error)?.message}`);
  })
  .on('SIGTERM', () => {
    logger.error('SIGTERM signal received: closing HTTP server');
  })
  .on('uncaughtException', (err) => {
    logger.error(err, `Uncaught Exception: ${err.message}`);
    process.exitCode = 1;
  });
