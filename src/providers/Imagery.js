import { useEffect, useState } from 'react';
import createUseContext from 'constate';
import axios from 'axios';

function useImagery() {
  const [emotes, setEmotes] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchImagery = async () => {
      const result = await axios(
        'https://api.twitchemotes.com/api/v4/channels/38981465'
      );
      console.log(result.data);
      setEmotes(result.data.emotes);
      setBadges(result.data.badges);
    };

    fetchImagery();
  }, []);

  return { emotes, badges };
}

const useImageryContext = createUseContext(useImagery);

export default useImageryContext;
