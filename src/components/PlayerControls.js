import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';
import durationFormat from '../utils/durationFormat';
import EmojiButton from './EmojiButton';

const Container = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
  width: 640px;
`;
const Spacer = styled.div`
  flex-grow: 1;
`;

const PlayerControls = () => {
  const {
    player,
    playerState,
    volume,
    currentTime,
  } = useAppContext();

  return (
    <>
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
      <br />
      <Container>

        {playerState !== 'PLAYING' && (<EmojiButton onClick={() => player.playVideo()}>▶️</EmojiButton>)}
        {playerState === 'PLAYING' && (<EmojiButton onClick={() => player.pauseVideo()}>⏸️</EmojiButton>)}
        
        {player?.isMuted?.() ? (
          <EmojiButton onClick={() => player.unMute()}>🔇</EmojiButton>
        ) : (
          <EmojiButton onClick={() => player.mute()}>🔊</EmojiButton>
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

        <span>{durationFormat(currentTime)} / {durationFormat(player?.getDuration?.())}</span>

        <span>[{playerState}]</span>

        <Spacer />

        <EmojiButton>📤</EmojiButton>
        <EmojiButton>⚙️</EmojiButton>
        <EmojiButton onClick={() => player.stopVideo()}>⏹</EmojiButton>
        <EmojiButton>↗️</EmojiButton>
      </Container>
    </>
  );
};

export default PlayerControls;
