import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { BigEmoji } from '../styled-components/BigEmoji';

// import yt from 'youtube-search-without-api-key';

// console.log({yt})

const playlist = [
  'W-59sWasI98',
  'bMaN0rgPs4c',
  'fYiuDNUeDRM',
];

const durationFormat = duration => {
  const s = String(~~(duration % 60)).padStart(2, '0');
  const m = String(~~(duration / 60) % 60).padStart(2, '0');
  const h = String(~~(duration / 3600) % 3600).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const App = () => {
  const {
    player,
    playerState,
    volume,
    currentTime,
  } = useAppContext();

  const [pl,setPl] = useState(playlist);

  const magicSearch = async (searchterm) => {
    const t = await fetch(`https://cors-anywhere.herokuapp.com/https://www.youtube.com/results?search_query=${searchterm}`)
      .then(res => res.text());
    const ids = [...new Set(t.match(/(?<=videoId":")([A-Za-z0-9_\-]{11})/g))];
    setPl(ids);
  };

  return (
    <>
      <div>
        <BigEmoji>📺</BigEmoji>
        Player
      </div>
      <div>
        <BigEmoji>🎛️</BigEmoji>
        Controls
      </div>

       
      
      <div id="player"/>
      <br />
      <input
        style={{
          width: 640,
          accentColor: 'red',
        }}
        type="range"
        min={0}
        max={player?.getDuration?.()}
        value={currentTime}
        onChange={event => player.seekTo(event.target.value)}
      />
      {durationFormat(currentTime)} / {durationFormat(player?.getDuration?.())}<br/>

      <br/>

      <input
        style={{
          width: 100,
          accentColor: 'white',
        }}
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={event => player.setVolume(event.target.value)}
      />

      <div>
        {pl.map(id => (
          <button onClick={() => player.loadVideoById(id)}>
            <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} />
            <br />
            {id}
          </button>
        ))}
      </div>
      <div>
        <button onClick={() => player.playVideo()}>play</button>
        <button onClick={() => player.stopVideo()}>stop</button>
        <button onClick={() => player.pauseVideo()}>pause</button>
      </div>
      title: {player?.videoTitle}<br/>
      state: {playerState}<br/>

      <div>
        is muted: {player?.isMuted?.() ? 'true' : 'false'}<br/>
        <button onClick={() => player.mute()}>mute</button>
        <button onClick={() => player.unMute()}>unMute</button>
      </div>
      <button onClick={() => magicSearch('sasasas')}>search sasasas</button>
      <button onClick={() => magicSearch('czarface')}>search czarface</button>
    </>
  );
};

export default App;
