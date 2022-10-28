import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';
import durationFormat from '../utils/durationFormat';
import EmojiButton from './EmojiButton';

const Container = styled.div`
  border: 1px solid red;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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
    <Container>
      <Row>
        <input
          style={{
            width: '100%',
            accentColor: 'red',
          }}
          type="range"
          min={0}
          max={player?.getDuration?.()}
          value={currentTime}
          onChange={event => player.seekTo(event.target.value)}
        />
      </Row>
      <Row>

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

        <EmojiButton onClick={() => player.seekTo(2000)}>📤</EmojiButton>
        <EmojiButton>⚙️</EmojiButton>
        <EmojiButton onClick={() => player.stopVideo()}>⏹</EmojiButton>
        <EmojiButton>↗️</EmojiButton>
      </Row>
    </Container>
  );
};

export default PlayerControls;
