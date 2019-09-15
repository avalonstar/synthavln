import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';
import { useEffect, useState } from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import createUseContext from 'constate';

import firestore from 'firestore';

import useMessageContext from './Messages';

const { REACT_APP_TWITCH_API_CLIENT_ID } = process.env;

function useChat() {
  const [messages, dispatch] = useMessageContext();
  const [connected, setConnected] = useState(false);
  const [snapshot, loading] = useDocumentOnce(
    firestore
      .firestore()
      .collection('authentication')
      .doc('twitch')
  );

  useEffect(() => {
    if (!loading) {
      const initializeClients = async () => {
        const { accessToken } = snapshot.data();
        const api = await TwitchClient.withCredentials(
          REACT_APP_TWITCH_API_CLIENT_ID,
          accessToken
        );
        const chat = await ChatClient.forTwitchClient(api, {
          webSocket: true,
          logLevel: 'debug'
        });
        await chat.connect();
        await chat.waitForRegistration();
        await chat.join('avalonstar');

        if (chat.isConnected) {
          setConnected(true);
        }

        chat.onPrivmsg((channel, user, message, msg) => {
          const event = { user, message, tags: msg, isAction: false };
          dispatch({ type: 'add', event });
        });

        chat.onAction((channel, user, message, msg) => {
          const event = { user, message, tags: msg, isAction: true };
          dispatch({ type: 'add', event });
        });

        return chat;
      };

      initializeClients();
    }
  }, [loading, snapshot, dispatch]);

  return { loading, connected, messages, chat };
}

const useChatContext = createUseContext(useChat);

export default useChatContext;
