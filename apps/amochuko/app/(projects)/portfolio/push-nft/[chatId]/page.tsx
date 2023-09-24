'use client';

import { BaseMessageTypes, PushAPI } from '@pushprotocol/restapi';
import { useEffect, useState } from 'react';

interface ChatIDParams {
  params: Record<string, any>;
}
export default function ChatID(props: ChatIDParams) {
  const chatId = props.params.chatId;

  const [wallet, setWallet] = useState<PushAPI | null>(null);
  const [message, setMessage] = useState<string | File | any>(null);

  useEffect(() => {}, []);

  // send msg
  const sendMsg = async (
    toAddress: string,
    msg: string,
    type: BaseMessageTypes
  ) => {
    // send a message
    try {
      const res = await wallet?.chat.send(toAddress, {
        content: msg,
        type: type,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p>Send Message</p>
      <ul className='chat-ul'>{/* list chat history */}</ul>

      <div className='chat-input'>
        {/* Get userAddress for route param */}
        <input
          type='text'
          name='messge'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={() => sendMsg(chatId, message, 'Text')}>Send</button>
      </div>
    </div>
  );
}
