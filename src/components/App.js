import React, { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

const playlist = ['W-59sWasI98'];

const App = () => {
  const {
    test,
    YT
  } = useAppContext();

  useEffect(() => {
    if (!YT) return;
    const player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: playlist[0],
      playerVars: {
        'playsinline': 1
      },
      events: {
        // 'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
      }
    });
  }, [YT]);

  return (
    <>
      new app {test}
      {typeof YT}
      <div id="player"/>
      final
    </>
  );
};

export default App;
