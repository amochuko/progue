import getpass
import imaplib, os 


def fetch_email(host = '', port = 993):
    """
        A simple function that reads email through IMAP protocol from any email server
        """
    # m = imaplib.IMAP4_SSL(host=host, port=port)
    # m.noop()
    print(os.environ.get('CHUKO', 'No name'))

fetch_email('', 993)
