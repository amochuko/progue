import 'dotenv/config';
import { runTelegramBot } from './bot';
import { ENV } from './utils/config';

async function main(argv: string[]) {
  const liquidity = argv[2];

  await runTelegramBot(ENV.TELEGRAM_BOT_TOKEN, liquidity);
}

main(process.argv).catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});

process
  .on('unhandledRejection', (why) => {
    console.error(why ?? {}, `Unhandled rejection: ${(why as Error)?.message}`);
  })
  .on('SIGTERM', () => {
    console.error('SIGTERM signal received: closing HTTP server');
  })
  .on('uncaughtException', (err) => {
    console.error(err);
    process.exitCode = 1;
  });
