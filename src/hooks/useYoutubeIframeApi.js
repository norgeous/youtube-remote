import { useState, useEffect } from 'react';

const loadYouTubeIframeApi = () => {
  return new Promise(resolve => {
    if (
      typeof window.YT === "object" &&
      typeof window.YT.ready === "function"
    ) {
      window.YT.ready(() => {
        resolve(window.YT);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
};

const createYouTubeIframe = ({ YT, elementId, onReady, onStateChange }) => {
  const newPlayer = new YT.Player(elementId, {
    width: '640',
    height: '360',
    playerVars: {
      autoplay: 1,
      playsinline: 1,
      modestbranding: 1,
      // controls: 0,
    },
    events: {
      onReady,
      onStateChange,
    }
  });

  return newPlayer;
};

const playerStates = {
  '-1': 'UNSTARTED',
  0: 'ENDED',
  1: 'PLAYING',
  2: 'PAUSED',
  3: 'BUFFERING',
  5: 'CUED',
};

const useYouTubeIframeApi = (elementId) => {
  const [player, setPlayer] = useState();
  const [playerState, setPlayerState] = useState('INITIALISED');
  const [volume, setVolume] = useState();
  const [currentTime, setCurrentTime] = useState();

  useEffect(async () => {
    const YT = await loadYouTubeIframeApi();
    const newPlayer = createYouTubeIframe({
      YT,
      elementId,
      onReady: () => {setPlayer(newPlayer); setPlayerState('READY')},
      onStateChange: ({ data }) => setPlayerState(playerStates[data]),
    });
    console.log({YT, newPlayer})
  }, []);

  // polling
  useEffect(() => {
    if (!player) return;
    const poll = () => {
      setCurrentTime(player.getCurrentTime());
      setVolume(player.getVolume());
    };
    poll();
    const t = setInterval(poll, 100);
    return () => clearInterval(t);
  }, [player]);

  return [player, playerState, volume, currentTime];
};

export default useYouTubeIframeApi;
