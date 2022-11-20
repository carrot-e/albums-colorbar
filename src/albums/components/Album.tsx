import React, { useContext } from 'react';
import { Album as AlbumInterface } from '../hooks/useAlbums';
import AlbumInGrid from './AlbumInGrid';
import AlbumInRow from './AlbumInRow';
import PageStateContext, { AlbumView } from '../context/PageStateContext';

function Album({ album }: { album: AlbumInterface }) {
  const { view } = useContext(PageStateContext);
  if (view === AlbumView.ROW) {
    return <AlbumInRow album={album} />;
  }

  if (view === AlbumView.GRID) {
    return <AlbumInGrid album={album} />;
  }

  return null;
}

export default Album;
