'use client';

// Import restapi for function calls
// Import socket for listening for real time messages

import { GroupDTO, IFeeds, PushAPI } from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { EVENTS, createSocketConnection } from '@pushprotocol/socket';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

const provider = ethers.getDefaultProvider();


export default function PushNFT() {
  const [wallet, setWallet] = useState<PushAPI | null>(null);
  const [message, setMessage] = useState<string | File | any>(null);
  const [requestChats, setRequesChats] = useState<IFeeds[]>([]);
  const [chats, setChats] = useState<IFeeds[]>([]);
  const [myGroups, setMyGroups] = useState<GroupDTO[] | []>([]);
  const [joinedGroups, setJoinedGroups] = useState<GroupDTO[] | []>([]);

  // random wallet for test, ideally this is the wallet you will connect
  const signer = ethers.Wallet.createRandom();

  const initPushAPI = useCallback(() => {
    // init wallet user, pass `prod` instead of `staging` for mainnet apps
    PushAPI.initialize(signer, {
      env: process.env.NODE_ENV !== 'production' ? ENV.STAGING : ENV.PROD,
      progressHook(progress) {
        console.log(progress);
      },
    }).then((signerProfile) => {
      console.log(signerProfile);
      setWallet(signerProfile);
    });
  }, []);

  useEffect(() => {
    initPushAPI();
    listChatRequests();
  }, []);

  // Create Socket Connection for Realtime updates (Listen to incoming messages)
  const pushSDKSocket = createSocketConnection({
    user: signer.address,
    socketType: 'chat',
    socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
    env: process.env.NODE_ENV !== 'production' ? ENV.STAGING : ENV.PROD,
  });

  // React to message payload getting recieved
  pushSDKSocket?.on(EVENTS.CHAT_RECEIVED_MESSAGE, (msg) => {
    console.log(msg);
  });

  const listChats = async () => {
    // list user chat
    const userChats = await wallet?.chat.list('CHATS');
    if (userChats?.length) {
      setChats((prvUsers) => [...prvUsers, ...userChats]);
    }
  };

  const listChatRequests = async () => {
    // list chat request by unknown user
    const res = await wallet?.chat.list('REQUESTS');
    console.log(res);
    // setRequesChats(prvRequest => [prvRequest, res])
  };

  const acceptChatRequest = async (user: string) => {
    try {
      const res = await wallet?.chat.accept(user);
      console.log(res);
    } catch (err) {
      // TODO: throw error
      console.error(err);
    }
  };
  const rejectChatRequest = async (user: string) => {
    try {
      const res = await wallet?.chat.reject(user);
      console.log(res);
    } catch (err) {
      // TODO: throw error
      console.error(err);
    }
  };

  const blockChatRequest = async (users: string[]) => {
    try {
      const res = await wallet?.chat.block(users);
      console.log(res);
    } catch (err) {
      // TODO: throw error
      console.error(err);
    }
  };

 

  const joinGroup = async (groupID: string) => {
    try {
      const requested = await wallet?.chat.group.join(groupID);
      // TODO: add to listOfJoinedGroups
      // setJoinedGroups(requested)
    } catch (err) {}
  };

  return (
    <>
      <div>
        <div>
          {/* link to createGroup page */}
          <button onClick={() => ''}>Create a Group</button>
        </div>
        {/* List available `Groups` here */}
        {myGroups.length > 0 && (
          <ul>
            {myGroups.map((grp, i) => (
              <li key={i}>
                <span>{grp.groupName}</span>
                <span>{grp.groupImage}</span>

                {/* {!isMemberOfGroup(signer.wallet, grp.members) && (
                  <span onClick={() => joinGroup(grp.chatId)}>Join Group</span>
                )} */}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p>List of request for chat</p>
        <ul>
          {
            // TODO: loop the list and initiate an accept button
            requestChats.map((reqChat, i) => (
              <li key={i}>
                <div className='userDetails'>
                  <span>{reqChat.profilePicture}</span>
                  <span>{reqChat.name}</span>
                </div>
                <div className='chatRequestResponse'>
                  <span
                    className='accept'
                    onClick={() => acceptChatRequest(reqChat.chatId!)}
                  >
                    Accept
                  </span>
                  <span
                    className='reject'
                    onClick={() => rejectChatRequest(reqChat.chatId!)}
                  >
                    Reject
                  </span>
                  <span
                    className='block'
                    onClick={() => blockChatRequest([reqChat.chatId!])}
                  >
                    Block
                  </span>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}
