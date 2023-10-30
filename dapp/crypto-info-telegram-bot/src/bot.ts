import { Telegraf } from 'telegraf';
import { getNewListings } from './api';

interface TelegramReponse {
  data: Record<string, any>;
  [key: string]: any;
}

export async function runTelegramBot(
  TELEGRAM_BOT_TOKEN: string,
  liquidity?: string
) {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

  try {
    bot.start((ctx) =>
      ctx.reply(
        `Hello there! Welcome to my telegram bot. \nI respond to /help. Please try it!, `
      )
    );

    bot.help((ctx) =>
      ctx.reply(` 
      1. Get new listings of tokens with liquidity below $100,000,000 with /newlistings`)
    );

    bot.command('newlistings', async (ctx) => {
      const res = await getNewListings({
        minLiquidity: parseInt(liquidity) || 100_000_000,
      });

      bot.telegram.sendMessage(ctx.chat.id, res);
    });

    // bot.command('quit', async (ctx) => {
    //   await ctx.telegram.leaveChat(ctx.message.chat.id);
    // });

    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    return bot;
  } catch (err) {
    throw Error(err);
  }
}
