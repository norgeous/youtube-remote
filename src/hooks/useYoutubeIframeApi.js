// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: 'M7lc1UVf-VE',
//     playerVars: {
//       'playsinline': 1
//     },
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }


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
    // videoId: playlist[0],
    height: '390',
    width: '640',
    playerVars: {
      'autoplay': 1,
      // 'playsinline': 1,
      // 'controls': 0, 
      // 'autohide': 1,
      // 'showinfo' : 0,
      // 'wmode': 'opaque',
      // 'rel': 0,
      // 'loop': 0,
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
