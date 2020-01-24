import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import createUseContext from 'constate';

function useImagery() {
  const [{ data, loading, error }] = useAxios(
    'https://api.twitchemotes.com/api/v4/channels/38981465'
  );
  const [emotes, setEmotes] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setEmotes(data.emotes);
      setBadges(data.badges);
    }
  }, [loading, error, data]);

  return { emotes, badges };
}

const useImageryContext = createUseContext(useImagery);

export default useImageryContext;
