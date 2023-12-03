import os

from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

load_dotenv()

# bot setup
Token = os.getenv('TELEGRAM_BOT_API')
app = ApplicationBuilder().token(Token).build()

# bot functions

async def start(update, ctx:ContextTypes.DEFAULT_TYPE):
    """ start """
    await update.message.reply_text(f'''Hello {update.effective_user.first_name}, you are welcome! To get help using this bot (me), kindly send me the `/info` command''')

async def info(update, ctx:ContextTypes.DEFAULT_TYPE):
    """ help """
    await update.message.reply_text(
        """
        /start -> Welcome to the channel
        /info -> This particular message
        /content -> The body of the work available to student
        /Python -> This first video from the playlist
        /SQL -> The first vidoe of the SQL playlist
        /contact -> Our contact page
        /subgraph -> The first vidoe of the Sub Graph testing playlist
        """
    )

async def content(update, ctx:ContextTypes.DEFAULT_TYPE):
    """ content """
    await update.message.reply_text("We have various playlist and articles available")

async def Python(update, ctx:ContextTypes.DEFAULT_TYPE):
    """ Python """
    await update.message.reply_text("Paste the link to the Python playlist here!")

async def SQL(update, ctx:ContextTypes.DEFAULT_TYPE):
    """ SQL """
    await update.message.reply_text("Paste the link to the SQL playlist here!: http://example.com")

async def sub_graph_testing(update, ctx:ContextTypes.DEFAULT_TYPE):
    """  sub graph testing """
    await update.message.reply_text("Subject link: https://www.youtube.com/watch?v=cB7o2n-QrnU&list=PLTqyKgxaGF3SNakGQwczpSGVjS_xvOv3h")


app.add_handler(CommandHandler('start', start))
app.add_handler(CommandHandler('content', content))
app.add_handler(CommandHandler('info', info))
app.add_handler(CommandHandler('Python', Python))
app.add_handler(CommandHandler('SQL', SQL))
app.add_handler(CommandHandler('subgraph', sub_graph_testing))

app.run_polling()
