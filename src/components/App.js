import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

const playlist = [
  'W-59sWasI98',
  'bMaN0rgPs4c',
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

  return (
    <>
      <div id="player"/>
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

      <div>
        <button onClick={() => player.loadVideoById(playlist[0])}>playlist 0</button>
        <button onClick={() => player.loadVideoById(playlist[1])}>playlist 1</button>
        <br/>
        <button onClick={() => player.playVideo()}>play</button>
        <button onClick={() => player.stopVideo()}>stop</button>
        <button onClick={() => player.pauseVideo()}>pause</button>
        <button onClick={() => player.mute()}>mute</button>
        <button onClick={() => player.unMute()}>unMute</button>
      </div>
      title: {player?.videoTitle}<br/>
      state: {playerState}<br/>
      vol: {volume}<br/>
      is muted: {player?.isMuted?.() ? 'true' : 'false'}<br/>
    </>
  );
};

export default App;
