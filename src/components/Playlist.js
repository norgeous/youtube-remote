import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Playlist = () => {
  const {
    player,
    playlist,
  } = useAppContext();

  return (
    <div>
      {playlist.map(id => (
        <button onClick={() => player.loadVideoById(id)}>
          <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} width="30" />
          {id}
        </button>
      ))}
    </div>
  );
};

export default Playlist;
