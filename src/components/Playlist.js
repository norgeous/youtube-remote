import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Playlist = () => {
  const {
    playlist,
    playlistPlayheadIndex,
    setPlaylistPlayheadIndex,
  } = useAppContext();

  return (
    <div>
      {playlist.map((id, index) => (
        <button onClick={() => setPlaylistPlayheadIndex(index)}>
          {playlistPlayheadIndex === index && '👉'}
          <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} width="80" />
          {id}
        </button>
      ))}
    </div>
  );
};

export default Playlist;
