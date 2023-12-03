import smtplib
from email import encoders
from email.mime import base, multipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText

from bs4 import BeautifulSoup as bs

# """TODO: check to for multiply addresses"""
def send_mail(email, password, from_addr, to_addr, subject, email_template = ''):
    """A function to send email using smtp module"""

    # init messege to send
    msg = multipart.MIMEMultipart('alternative')
    msg['from'] = from_addr
    msg['to'] = to_addr
    msg['subject'] = subject

    # creating two email body

    #  body of email as html
    print('email_template is : {}', email_template)
    if email_template is not None:
        with open(email_template, 'r', 1, 'utf-8') as html_file:
            # print(html_file.read())
    # else:
        # html = """This email is sent using <b>Python</b>!"""
    #  body of email as text
    txt = bs(html, 'html.parser').text

    txt_path = MIMEText(txt, 'plain')
    html_path = MIMEText(html, 'html')

    # attach the email body to the mail message
    msg.attach(txt_path)
    msg.attach(html_path)


    print(msg)
    # init SMTP Server (Microsoft365, Outlook, Hotmail, and live.com)
    # server = smtplib.SMTP(host='smtp.office365.com',port=587)
    # connect to the SMTP server as TLS mode (secure) and send EHLO
    # server.starttls()

    # login to the account using credentials
    # server.login(email, password)
    # send email
    # server.sendmail(from_addr, to_addr, msg.as_string())

    # terminate SMTP server
    # server.quit()



EMAIL = 'email@exmaple.com'

send_mail(
    EMAIL, password='password',
    from_addr=EMAIL, to_addr='to@example.com', subject= 'Just a subject')
