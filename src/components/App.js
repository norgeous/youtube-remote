import React from 'react';
import { useAppContext } from '../contexts/AppContext';
// import { BigEmoji } from '../styled-components/BigEmoji';
import Search from './Search';
import durationFormat from '../utils/durationFormat';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

const App = () => {
  const {
    player,
    playerState,
    volume,
    currentTime,
  } = useAppContext();

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

      {playerState !== 'PLAYING' && (<button onClick={() => player.playVideo()}>▶️</button>)}
      {playerState === 'PLAYING' && (<button onClick={() => player.pauseVideo()}>⏸️</button>)}
      
      {player?.isMuted?.() ? (
        <button onClick={() => player.unMute()}>🔇</button>
      ) : (
        <button onClick={() => player.mute()}>🔊</button>
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

      <button onClick={() => player.stopVideo()}>⏹</button>

      <hr />

      <Playlist />

      <hr />

      <Search />
      <SearchResults />
    </>
  );
};

export default App;
