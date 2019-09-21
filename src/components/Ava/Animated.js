import React, { useCallback, useEffect, useState } from 'react';
import { countBy } from 'lodash';

import EmoteBucketSystem from 'helpers/EmoteBucketSystem';
import { useChatContext, useImageryContext } from 'providers';

const ebs = new EmoteBucketSystem({
  emoteThreshold: 2,
  trackedEmotes: ['avalonPOG', 'avalonFEELS'],
  onThresholdReached: emote => {
    console.log('onThresholdReached', emote);
  }
});

function Animated() {
  const { connected, client } = useChatContext();
  const { emotes } = useImageryContext();
  const [emoteCodes, setEmoteCodes] = useState();

  const processEmotes = useCallback(
    message => {
      const occurances = countBy(message.split(' '), token => token);
      const filtered = Object.keys(occurances)
        .filter(key => emoteCodes.includes(key))
        .reduce((obj, key) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = occurances[key];
          return obj;
        }, {});
      return Object.keys(filtered).forEach(key =>
        ebs.processIncomgingEmote(key)
      );
    },
    [emoteCodes]
  );

  useEffect(() => {
    const codes = emotes.map(emote => emote.code);
    setEmoteCodes(codes);
  }, [emotes]);

  useEffect(() => {
    if (connected && client) {
      client.onAction((_channel, _user, message) => processEmotes(message));
      client.onPrivmsg((_channel, _user, message) => processEmotes(message));
    }
  }, [connected, client, processEmotes]);

  return <div className="App" />;
}

export default Animated;