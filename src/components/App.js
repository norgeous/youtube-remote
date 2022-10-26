import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
// import { BigEmoji } from '../styled-components/BigEmoji';

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
    const url = `https://www.youtube.com/results?search_query=${searchterm}`;
    // const url2 = encodeURIComponent(url);
    const t = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`)
      .then(res => res.text());
      // .then(res => res.json());
    const ids = [...new Set(t.match(/(?<=videoId":")([A-Za-z0-9_\-]{11})/g))];
    console.log({url, t, ids})
    setPl(ids);
  };

  return (
    <>
      {/* <div>
        <BigEmoji>📺</BigEmoji>
        Player
      </div>
      <div>
        <BigEmoji>🎛️</BigEmoji>
        Controls
      </div> */}

       
      title: {player?.videoTitle}<br/>
      state: {playerState}<br/>
      
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

      <br/>

      {playerState === 'PAUSED' && (<button onClick={() => player.playVideo()}>▶️</button>)}
      {playerState === 'PLAYING' && (<button onClick={() => player.pauseVideo()}>⏸️</button>)}
      
      {player?.isMuted?.() ? (
        <button onClick={() => player.unMute()}>🔊</button>
      ) : (
        <button onClick={() => player.mute()}>🔇</button>
      )}
      <input
        style={{
          width: 60,
          accentColor: 'white',
        }}
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={event => player.setVolume(event.target.value)}
      />

      {durationFormat(currentTime)} / {durationFormat(player?.getDuration?.())}

      <button onClick={() => player.stopVideo()}>⏏️</button>

      <hr />

      <button onClick={() => magicSearch('sasasas')}>search sasasas</button>
      <button onClick={() => magicSearch('czarface')}>search czarface</button>
      <button onClick={() => magicSearch('mfdoom')}>search mfdoom</button>
      <button onClick={() => magicSearch('luude')}>search luude</button>
      <button onClick={() => magicSearch('mungos hifi')}>search mungos hifi</button>

      <div>
        {pl.map(id => (
          <button onClick={() => player.loadVideoById(id)}>
            <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} />
            <br />
            {id}
          </button>
        ))}
      </div>
    </>
  );
};

export default App;
